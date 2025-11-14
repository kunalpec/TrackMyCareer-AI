from __future__ import annotations

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Application, Job, ProfilePhoto, Resume
from .serializers import (
    ApplicantListSerializer,
    ApplicationSerializer,
    ApplicationStatusUpdateSerializer,
    JobSerializer,
    ProfilePhotoSerializer,
    ResumeSerializer,
    UserProfileSerializer,
    UserSummarySerializer,
)

User = get_user_model()


class JobListCreateView(generics.ListCreateAPIView):
    """
    List all jobs or create a new job posting.
    """

    queryset = Job.objects.select_related("recruiter").all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        mine = self.request.query_params.get("mine")
        if mine and self.request.user.is_authenticated:
            if mine.lower() in {"1", "true", "yes"}:
                queryset = queryset.filter(recruiter=self.request.user)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Only recruiters can post jobs.")
        serializer.save(recruiter=self.request.user)


class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.select_related("recruiter").all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class JobApplicantsListView(generics.ListAPIView):
    serializer_class = ApplicantListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        job = get_object_or_404(Job, pk=self.kwargs["job_id"])
        if job.recruiter != self.request.user:
            raise PermissionDenied("You do not have permission to view these applicants.")
        return job.applications.select_related("user").prefetch_related("user__resumes").order_by(
            "-applied_at"
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class ApplicationStatusUpdateView(generics.UpdateAPIView):
    queryset = Application.objects.select_related("job", "user")
    serializer_class = ApplicationStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        application = super().get_object()
        if application.job.recruiter != self.request.user:
            raise PermissionDenied("You do not have permission to update this application.")
        return application

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        instance.refresh_from_db()
        response_serializer = ApplicationSerializer(instance, context={"request": request})
        return Response(response_serializer.data, status=status.HTTP_200_OK)


class ResumeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        resumes = Resume.objects.filter(user=request.user).order_by("-uploaded_at")
        serializer = ResumeSerializer(resumes, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ResumeSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProfilePhotoView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        photo = getattr(request.user, "profile_photo", None)
        if not photo:
            return Response(
                {"detail": "Profile photo not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ProfilePhotoSerializer(photo, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        photo = getattr(request.user, "profile_photo", None)
        serializer = ProfilePhotoSerializer(
            instance=photo,
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED if photo is None else status.HTTP_200_OK,
        )


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user, context={"request": request})
        return Response(serializer.data)


class UserProfilePhotoUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    ALLOWED_TYPES = {"image/jpeg", "image/png", "image/jpg"}
    MAX_SIZE = 3 * 1024 * 1024  # 3MB

    def put(self, request):
        file = request.FILES.get("photo") or request.FILES.get("file")
        if not file:
            return Response(
                {"detail": "Please select a photo to upload."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if file.content_type not in self.ALLOWED_TYPES:
            return Response(
                {"detail": "Only JPG and PNG files are allowed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if file.size > self.MAX_SIZE:
            return Response(
                {"detail": "Photo must be smaller than 3MB."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        photo_obj, _ = ProfilePhoto.objects.get_or_create(user=request.user)
        if photo_obj.photo:
            photo_obj.photo.delete(save=False)
        photo_obj.photo = file
        photo_obj.save()

        serializer = UserProfileSerializer(request.user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfileResumeUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    MAX_SIZE = 5 * 1024 * 1024  # 5MB

    def put(self, request):
        file = request.FILES.get("resume") or request.FILES.get("file")
        if not file:
            return Response(
                {"detail": "Please select a resume to upload."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not file.name.lower().endswith(".pdf"):
            return Response(
                {"detail": "Only PDF files are allowed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if file.size > self.MAX_SIZE:
            return Response(
                {"detail": "Resume must be smaller than 5MB."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing = Resume.objects.filter(user=request.user)
        for resume in existing:
            if resume.file:
                resume.file.delete(save=False)
        existing.delete()

        Resume.objects.create(user=request.user, file=file)

        serializer = UserProfileSerializer(request.user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ApplyToJobView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, job_id: int):
        job = get_object_or_404(Job, pk=job_id)

        if job.is_expired():
            return Response(
                {"detail": "This job is no longer accepting applications."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application, created = Application.objects.get_or_create(
            user=request.user,
            job=job,
        )

        if created:
            application.snapshot_resume()

        serializer = ApplicationSerializer(application, context={"request": request})
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class MyApplicationsListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Application.objects.filter(user=self.request.user)
            .select_related("job", "job__recruiter")
            .order_by("-applied_at")
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class AuthRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username") or request.data.get("email")
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name", "")
        last_name = request.data.get("last_name", "")
        role = request.data.get("role", "candidate")

        if not username or not password:
            return Response(
                {"detail": "Username/email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"detail": "A user with this username already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        if role == "recruiter":
            user.is_staff = True
            user.save(update_fields=["is_staff"])

        login(request, user)
        serializer = UserSummarySerializer(user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {"user": serializer.data, "token": token.key},
            status=status.HTTP_201_CREATED,
        )


class AuthLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        identifier = request.data.get("username") or request.data.get("email")
        password = request.data.get("password")

        if not identifier or not password:
            return Response(
                {"detail": "Username/email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=identifier, password=password)

        if not user and "@" in identifier:
            try:
                username = User.objects.only("username").get(email__iexact=identifier).username
                user = authenticate(request, username=username, password=password)
            except User.DoesNotExist:
                user = None

        if not user:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        login(request, user)
        serializer = UserSummarySerializer(user)
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        return Response({"user": serializer.data, "token": token.key})


class AuthLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AuthMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSummarySerializer(request.user)
        token, _ = Token.objects.get_or_create(user=request.user)
        return Response({"user": serializer.data, "token": token.key})
