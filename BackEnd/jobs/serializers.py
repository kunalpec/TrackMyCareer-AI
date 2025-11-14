from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Application, Job, ProfilePhoto, Resume

User = get_user_model()


class UserSummarySerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "username", "email", "full_name", "role")

    def get_full_name(self, obj: User) -> str:
        return obj.get_full_name() or obj.username

    def get_role(self, obj: User) -> str:
        return "recruiter" if obj.is_staff else "candidate"


class ResumeSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Resume
        fields = ("id", "file", "file_url", "uploaded_at")
        read_only_fields = ("id", "file_url", "uploaded_at")

    def get_file_url(self, obj: Resume) -> str | None:
        request = self.context.get("request")
        if not obj.file:
            return None
        if request:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url

    def create(self, validated_data):
        user = self.context["request"].user
        return Resume.objects.create(user=user, **validated_data)


class ProfilePhotoSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProfilePhoto
        fields = ("id", "photo", "photo_url", "updated_at")
        read_only_fields = ("id", "photo_url", "updated_at")

    def get_photo_url(self, obj: ProfilePhoto) -> str | None:
        request = self.context.get("request")
        if not obj.photo:
            return None
        if request:
            return request.build_absolute_uri(obj.photo.url)
        return obj.photo.url


class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()
    resume_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "full_name",
            "photo_url",
            "resume_url",
            "resume_name",
        )

    def get_full_name(self, obj: User) -> str:
        return obj.get_full_name() or obj.username

    def get_photo_url(self, obj: User) -> str | None:
        request = self.context.get("request")
        photo = getattr(obj, "profile_photo", None)
        if not photo or not photo.photo:
            return None
        if request:
            return request.build_absolute_uri(photo.photo.url)
        return photo.photo.url

    def _get_latest_resume(self, obj: User) -> Resume | None:
        return obj.resumes.order_by("-uploaded_at").first()

    def get_resume_url(self, obj: User) -> str | None:
        resume = self._get_latest_resume(obj)
        if not resume or not resume.file:
            return None
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(resume.file.url)
        return resume.file.url

    def get_resume_name(self, obj: User) -> str | None:
        resume = self._get_latest_resume(obj)
        if not resume or not resume.file:
            return None
        return resume.file.name.split("/")[-1]


class JobSerializer(serializers.ModelSerializer):
    recruiter = UserSummarySerializer(read_only=True)
    is_expired = serializers.SerializerMethodField()
    logo_url = serializers.SerializerMethodField()
    applications_count = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = (
            "id",
            "title",
            "company",
            "location",
            "salary_range",
            "experience",
            "job_type",
            "description",
            "deadline",
            "logo",
            "logo_url",
            "recruiter",
            "created_at",
            "updated_at",
            "is_expired",
            "applications_count",
        )
        read_only_fields = (
            "id",
            "recruiter",
            "created_at",
            "updated_at",
            "is_expired",
            "logo_url",
            "applications_count",
        )

    def get_is_expired(self, obj: Job) -> bool:
        return obj.is_expired()

    def get_logo_url(self, obj: Job) -> str | None:
        request = self.context.get("request")
        if obj.logo and request:
            return request.build_absolute_uri(obj.logo.url)
        if obj.logo:
            return obj.logo.url
        return None

    def get_applications_count(self, obj: Job) -> int:
        return obj.applications.count()

    def create(self, validated_data):
        request = self.context["request"]
        validated_data["recruiter"] = request.user
        return super().create(validated_data)


class ApplicationSerializer(serializers.ModelSerializer):
    user = UserSummarySerializer(read_only=True)
    job = JobSerializer(read_only=True)
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = (
            "id",
            "user",
            "job",
            "status",
            "resume_snapshot",
            "resume_url",
            "applied_at",
        )
        read_only_fields = (
            "id",
            "user",
            "job",
            "resume_snapshot",
            "resume_url",
            "applied_at",
        )

    def get_resume_url(self, obj: Application) -> str | None:
        if obj.resume_snapshot:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.resume_snapshot.url)
            return obj.resume_snapshot.url
        resume = getattr(obj.user, "resume", None)
        if resume and resume.file:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(resume.file.url)
            return resume.file.url
        return None


class ApplicantListSerializer(ApplicationSerializer):
    class Meta(ApplicationSerializer.Meta):
        fields = (
            "id",
            "user",
            "status",
            "resume_url",
            "applied_at",
        )


class ApplicationStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ("status",)

    def validate_status(self, value: str) -> str:
        if value not in dict(Application.Status.choices):
            raise serializers.ValidationError("Invalid status value.")
        return value

