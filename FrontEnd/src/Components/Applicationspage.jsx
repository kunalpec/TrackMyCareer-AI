import React, { useMemo, useState } from "react";
import JobCard from "./ApplyCard";
import styles from "./ApplicationsPage.module.css";
import { useAppContext } from "../Context/AppContext";
import { Loader2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

const ApplicationsPage = () => {
  const { jobs, jobsLoading, applications, applyToJob, userProfile, uploadResume } =
    useAppContext();
  const [expandedJob, setExpandedJob] = useState(null);
  const [uploading, setUploading] = useState(false);

  const applicationMap = useMemo(() => {
    const map = new Map();
    applications.forEach((application) => {
      map.set(application.job.id, application);
    });
    return map;
  }, [applications]);

  const appliedJobIds = useMemo(() => new Set(applicationMap.keys()), [applicationMap]);

  const toggleExpand = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const handleApply = async (jobId) => {
    await applyToJob(jobId);
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a PDF resume.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5MB.");
      return;
    }
    setUploading(true);
    try {
      await uploadResume(file);
      toast.success("Resume uploaded successfully");
    } catch (error) {
      const message = error.response?.data?.detail || "Unable to upload resume.";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.applicationsContainer}>
      <section className={styles.resumeSection}>
        <h3 className={styles.resumeTitle}>Resume</h3>
        <label className={styles.resumeBar}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            disabled={uploading}
          />
          <button
            type="button"
            className={styles.resumeButton}
            disabled={uploading}
          >
            <UploadCloud size={18} />
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
          <div className={styles.resumeStatus}>
            {userProfile?.resume_url ? (
              <>
                <span className={styles.resumeUploaded}>Resume Uploaded ✔</span>
                <a
                  href={userProfile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeLink}
                >
                  {userProfile.resume_name || "View"}
                </a>
              </>
            ) : (
              <span className={styles.resumeEmpty}>No resume uploaded yet</span>
            )}
          </div>
        </label>
      </section>

      <section className={styles.jobsSection}>
        <div className={styles.jobsHeader}>
          <h2 className={styles.pageTitle}>Available Jobs</h2>
        </div>

        {jobsLoading ? (
          <div className={styles.loader}>
            <Loader2 className={styles.spinner} size={28} />
            Loading jobs...
          </div>
        ) : jobs.length ? (
          <div className={styles.jobsList}>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                expandedJob={expandedJob}
                toggleExpand={toggleExpand}
                onApply={handleApply}
                hasApplied={appliedJobIds.has(job.id)}
                application={applicationMap.get(job.id)}
              />
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>No jobs available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default ApplicationsPage;
