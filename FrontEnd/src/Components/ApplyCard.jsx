import React from "react";
import styles from "./ApplicationsPage.module.css";
import { Briefcase, MapPin, Clock } from "lucide-react";

const ApplyCard = ({ job, expandedJob, toggleExpand }) => {
  const isExpanded = expandedJob === job.id;

  return (
    <div className={styles.applyCard}>
      {/* Left Section - Company Logo */}
      <div className={styles.cardLogo}>
        <img src={job.logo} alt={job.company} className={styles.companyLogo} />
      </div>

      {/* Middle Section - Job Info */}
      <div className={styles.cardContent}>
        <h3 className={styles.jobRole}>{job.role}</h3>
        <p className={styles.companyName}>{job.company}</p>

        <div className={styles.jobDetails}>
          <p><MapPin size={16} /> {job.location}</p>
          <p><Briefcase size={16} /> {job.experience}</p>
          <p><Clock size={16} /> {job.type}</p>
        </div>

        <p className={styles.shortDesc}>{job.description.slice(0, 90)}...</p>

        {isExpanded && (
          <div className={styles.expandedSection}>
            <p>{job.description}</p>
            <button className={styles.finalApplyBtn}>Apply Now</button>
          </div>
        )}
      </div>

      {/* Right Section - Apply Button */}
      <div className={styles.buttonRow}>
        <button onClick={() => toggleExpand(job.id)} className={styles.applyBtn}>
          {isExpanded ? "Hide Details" : "View & Apply"}
        </button>
      </div>
    </div>
  );
};

export default ApplyCard;
