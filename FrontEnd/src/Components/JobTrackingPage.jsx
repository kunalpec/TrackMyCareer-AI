import React from "react";
import styles from "./JobTrackingPage.module.css";
import { useAppContext } from "../Context/AppContext";
import { Loader2 } from "lucide-react";

const STATUS_LABELS = {
  applied: "Applied",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offered: "Offered",
  hired: "Hired",
  rejected: "Rejected",
};

const statusColor = (status) => {
  switch (status) {
    case "applied":
      return "#f59e0b";
    case "shortlisted":
      return "#10b981";
    case "interview":
      return "#3b82f6";
    case "offered":
      return "#6366f1";
    case "hired":
      return "#0ea5e9";
    case "rejected":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

const JobTrackingPage = () => {
  const { applications, applicationsLoading } = useAppContext();

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Application Timeline</h2>
      {applicationsLoading ? (
        <div className={styles.loader}>
          <Loader2 size={28} className={styles.spinner} />
          Loading your applications...
        </div>
      ) : applications.length ? (
        <div className={styles.cardList}>
          {applications.map((application) => (
            <div key={application.id} className={styles.jobCard}>
              <div className={styles.jobInfo}>
                <h3>{application.job.title}</h3>
                <p>{application.job.company || "Company Confidential"}</p>
                <p className={styles.appliedDate}>
                  Applied on {new Date(application.applied_at).toLocaleString()}
                </p>
              </div>
              <span
                className={styles.status}
                style={{ backgroundColor: statusColor(application.status) }}
              >
                {STATUS_LABELS[application.status] || application.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>You haven’t applied for any jobs yet.</p>
      )}
    </div>
  );
};

export default JobTrackingPage;
