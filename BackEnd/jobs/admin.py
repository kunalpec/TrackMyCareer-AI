from django.contrib import admin

from .models import Application, Job, ProfilePhoto, Resume


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "company",
        "recruiter",
        "deadline",
        "created_at",
    )
    list_filter = ("job_type", "deadline", "created_at")
    search_fields = ("title", "company", "recruiter__username")


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "job",
        "status",
        "applied_at",
    )
    list_filter = ("status", "applied_at")
    search_fields = ("user__username", "job__title", "job__company")


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("user", "uploaded_at")
    search_fields = ("user__username",)


@admin.register(ProfilePhoto)
class ProfilePhotoAdmin(admin.ModelAdmin):
    list_display = ("user", "updated_at")
    search_fields = ("user__username",)
