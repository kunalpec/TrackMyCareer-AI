import React from "react";
import styles from "./JobTrackingPage.module.css";

const JobTrackingPage = () => {
  const jobs = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Google",
      image: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
      status: "Shortlisted",
    },
    {
      id: 2,
      role: "Data Analyst",
      company: "Microsoft",
      image: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
      status: "Interview",
    },
    {
      id: 3,
      role: "Backend Engineer",
      company: "Amazon",
      image: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
      status: "Applied",
    },
    {
      id: 4,
      role: "UI/UX Designer",
      company: "Meta",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
      status: "Rejected",
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Applied":
        return "#f0ad4e";
      case "Shortlisted":
        return "#5cb85c";
      case "Interview":
        return "#0275d8";
      case "Rejected":
        return "#d9534f";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Applied Job Status</h2>
      <div className={styles.cardList}>
        {jobs.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <img src={job.image} alt={job.company} className={styles.companyLogo} />
            <div className={styles.jobInfo}>
              <h3>{job.role}</h3>
              <p>{job.company}</p>
            </div>
            <span
              className={styles.status}
              style={{ backgroundColor: statusColor(job.status) }}
            >
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTrackingPage;
