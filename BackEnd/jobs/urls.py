from django.urls import path

from .views import (
    ApplicationStatusUpdateView,
    ApplyToJobView,
    AuthLoginView,
    AuthLogoutView,
    AuthMeView,
    AuthRegisterView,
    JobApplicantsListView,
    JobDetailView,
    JobListCreateView,
    MyApplicationsListView,
    ProfilePhotoView,
    ResumeView,
    UserProfilePhotoUpdateView,
    UserProfileResumeUpdateView,
    UserProfileView,
)


urlpatterns = [
    path("jobs/", JobListCreateView.as_view(), name="job-list-create"),
    path("jobs/<int:pk>/", JobDetailView.as_view(), name="job-detail"),
    path("jobs/<int:job_id>/apply/", ApplyToJobView.as_view(), name="job-apply"),
    path(
        "jobs/<int:job_id>/applicants/",
        JobApplicantsListView.as_view(),
        name="job-applicants",
    ),
    path(
        "applications/<int:pk>/",
        ApplicationStatusUpdateView.as_view(),
        name="application-update",
    ),
    path("my-applications/", MyApplicationsListView.as_view(), name="my-applications"),
    path("resume/", ResumeView.as_view(), name="resume"),
    path("profile/photo/", ProfilePhotoView.as_view(), name="profile-photo"),
    path("user/profile/", UserProfileView.as_view(), name="user-profile"),
    path(
        "user/profile/update-photo/",
        UserProfilePhotoUpdateView.as_view(),
        name="user-profile-photo-update",
    ),
    path(
        "user/profile/update-resume/",
        UserProfileResumeUpdateView.as_view(),
        name="user-profile-resume-update",
    ),
    path("auth/register/", AuthRegisterView.as_view(), name="auth-register"),
    path("auth/login/", AuthLoginView.as_view(), name="auth-login"),
    path("auth/logout/", AuthLogoutView.as_view(), name="auth-logout"),
    path("auth/me/", AuthMeView.as_view(), name="auth-me"),
]

