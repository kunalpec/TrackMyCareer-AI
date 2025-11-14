from __future__ import annotations

import os
import uuid

from django.conf import settings
from django.core.files.base import ContentFile
from django.db import models
from django.utils import timezone


def application_resume_snapshot_upload_to(instance: "Application", filename: str) -> str:
    extension = os.path.splitext(filename)[1]
    return f"resumes/applications/{instance.job_id}/{uuid.uuid4().hex}{extension}"


def job_logo_upload_to(instance: "Job", filename: str) -> str:
    extension = os.path.splitext(filename)[1]
    return f"jobs/logos/{uuid.uuid4().hex}{extension}"


class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("contract", "Contract"),
        ("internship", "Internship"),
        ("temporary", "Temporary"),
    ]

    recruiter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="jobs",
    )
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)
    salary_range = models.CharField(max_length=255, blank=True)
    experience = models.CharField(max_length=255, blank=True)
    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPE_CHOICES,
        default="full_time",
    )
    description = models.TextField(blank=True)
    logo = models.ImageField(
        upload_to=job_logo_upload_to,
        null=True,
        blank=True,
    )
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.title} ({self.company})"

    def is_expired(self) -> bool:
        if not self.deadline:
            return False
        return timezone.now() > self.deadline


class Resume(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resumes",
    )
    file = models.FileField(upload_to="resumes/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self) -> str:
        return f"{self.user.get_full_name() or self.user.username} resume"


class ProfilePhoto(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile_photo",
    )
    photo = models.ImageField(upload_to="profile_photos/")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.user.get_full_name() or self.user.username} photo"


class Application(models.Model):
    class Status(models.TextChoices):
        APPLIED = "applied", "Applied"
        SHORTLISTED = "shortlisted", "Shortlisted"
        INTERVIEW = "interview", "Interview"
        OFFERED = "offered", "Offered"
        HIRED = "hired", "Hired"
        REJECTED = "rejected", "Rejected"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications",
    )
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications",
    )
    resume_snapshot = models.FileField(
        upload_to=application_resume_snapshot_upload_to,
        null=True,
        blank=True,
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.APPLIED,
    )
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "job")
        ordering = ["-applied_at"]

    def __str__(self) -> str:
        return f"{self.user} -> {self.job} ({self.status})"

    def snapshot_resume(self) -> None:
        """
        Create a copy of the user's resume at the time of application.
        """
        if self.resume_snapshot:
            return

        resume = self.user.resumes.order_by("-uploaded_at").first()
        if not resume or not resume.file:
            return

        resume.file.open("rb")
        try:
            content = resume.file.read()
        finally:
            resume.file.close()

        filename = os.path.basename(resume.file.name)
        self.resume_snapshot.save(filename, ContentFile(content), save=True)
