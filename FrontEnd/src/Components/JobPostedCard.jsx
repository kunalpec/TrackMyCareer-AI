import React, { useMemo } from "react";
import styles from "./JobPostedCard.module.css";
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  CalendarClock,
  Users,
} from "lucide-react";

const formatJobType = (value) => {
  switch (value) {
    case "full_time":
      return "Full-Time";
    case "part_time":
      return "Part-Time";
    case "contract":
      return "Contract";
    case "internship":
      return "Internship";
    case "temporary":
      return "Temporary";
    default:
      return value;
  }
};

const JobPosted = ({ job, onViewApplicants }) => {
  const deadline = useMemo(() => {
    if (!job.deadline) {
      return { label: "No deadline", expired: false };
    }
    const date = new Date(job.deadline);
    const expired = job.is_expired;
    return {
      label: date.toLocaleDateString(),
      expired,
    };
  }, [job.deadline, job.is_expired]);

  return (
    <div className={styles.JobCard}>
      <div className={styles.JobHeader}>
        <img
          src={job.logo_url || job.logo || "https://placehold.co/80x80"}
          alt="Company Logo"
          className={styles.CompanyLogo}
        />
        <div>
          <h3 className={styles.JobTitle}>{job.title}</h3>
          <p className={styles.CompanyName}>{job.company || "Company not specified"}</p>
        </div>
      </div>

      <div className={styles.JobDetails}>
        <p>
          <MapPin className={styles.Icon} />
          {job.location || "Remote"}
        </p>
        <p>
          <DollarSign className={styles.Icon} />
          {job.salary_range || "Not Disclosed"}
        </p>
        <p>
          <Clock className={styles.Icon} />
          {job.experience || "Experience Flexible"}
        </p>
        <p>
          <Briefcase className={styles.Icon} />
          {formatJobType(job.job_type)}
        </p>
      </div>

      <div className={styles.DeadlineRow}>
        <span className={`${styles.deadlineBadge} ${deadline.expired ? styles.deadlineExpired : ""}`}>
          <CalendarClock size={16} />
          {deadline.expired ? "Expired" : `Deadline: ${deadline.label}`}
        </span>
        <span className={styles.applicantsCount}>
          <Users size={16} />
          {job.applications_count ?? 0} applicants
        </span>
      </div>

      <p className={styles.Description}>
        {job.description ? job.description.slice(0, 160) : "No job description provided."}
        {job.description && job.description.length > 160 ? "..." : ""}
      </p>

      <div className={styles.Buttons}>
        <button className={styles.ApplyButton} type="button" onClick={onViewApplicants}>
          View Applicants
        </button>
      </div>
    </div>
  );
};

export default JobPosted;
