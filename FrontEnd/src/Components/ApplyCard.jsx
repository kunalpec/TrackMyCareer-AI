import React from "react";
import styles from "./ApplyCard.module.css";
import {
  Briefcase,
  MapPin,
  Clock,
  CalendarClock,
  Building2,
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

const STATUS_LABELS = {
  applied: "Applied",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offered: "Offered",
  hired: "Hired",
  rejected: "Rejected",
};

const statusBadgeColor = (status) => {
  switch (status) {
    case "applied":
      return "#2563eb";
    case "shortlisted":
      return "#0ea5e9";
    case "interview":
      return "#9333ea";
    case "offered":
      return "#16a34a";
    case "hired":
      return "#14b8a6";
    case "rejected":
      return "#ef4444";
    default:
      return "#475569";
  }
};

const ApplyCard = ({
  job,
  expandedJob,
  toggleExpand,
  onApply,
  hasApplied,
  application,
}) => {
  const isExpanded = expandedJob === job.id;
  const isExpired = job.is_expired;
  const deadlineLabel = job.deadline
    ? new Date(job.deadline).toLocaleDateString()
    : "No deadline";
  const status = application?.status;
  const statusLabel = status ? STATUS_LABELS[status] || status : null;

  return (
    <div className={`${styles.applyCard} ${isExpired ? styles.expired : ""}`}>
      <div className={styles.cardLogo}>
        <img
          src={job.logo_url || job.logo || "https://placehold.co/64x64"}
          alt={job.company || "Company"}
          className={styles.companyLogo}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.header}>
          <h3 className={styles.jobRole}>{job.title}</h3>
          {isExpired ? (
            <span className={styles.expiredBadge}>Expired</span>
          ) : (
            <span className={styles.deadlineBadge}>
              <CalendarClock size={16} />
              {deadlineLabel}
            </span>
          )}
        </div>
        <p className={styles.companyName}>{job.company || "Company Confidential"}</p>

        <div className={styles.jobDetails}>
          <p>
            <MapPin size={16} /> {job.location || "Remote"}
          </p>
          <p>
            <Briefcase size={16} /> {formatJobType(job.job_type)}
          </p>
          <p>
            <Clock size={16} /> {job.experience || "Experience Flexible"}
          </p>
        </div>

        <div className={styles.metaRow}>
          <span>
            <Building2 size={16} /> Recruiter:{" "}
            {job.recruiter?.full_name || job.recruiter?.username || "N/A"}
          </span>
          {statusLabel && (
            <span
              className={styles.statusBadge}
              style={{ backgroundColor: `${statusBadgeColor(status)}20`, color: statusBadgeColor(status) }}
            >
              {statusLabel}
            </span>
          )}
          <span>
            <Users size={16} /> Applicants: {job.applications_count ?? 0}
          </span>
        </div>

        <p className={styles.shortDesc}>
          {job.description
            ? `${job.description.slice(0, 120)}${
                job.description.length > 120 ? "..." : ""
              }`
            : "No description provided."}
        </p>

        {isExpanded && (
          <div className={styles.expandedSection}>
            <p>{job.description || "No additional details provided."}</p>
          </div>
        )}
      </div>

      <div className={styles.buttonColumn}>
        <button
          onClick={() => toggleExpand(job.id)}
          className={styles.secondaryButton}
        >
          {isExpanded ? "Hide Details" : "View Details"}
        </button>
        <button
          className={styles.applyBtn}
          disabled={isExpired || hasApplied}
          onClick={() => onApply(job.id)}
        >
          {isExpired ? "Closed" : hasApplied ? "Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default ApplyCard;
