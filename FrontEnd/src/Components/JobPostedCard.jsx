import React from "react";
import styles from "./JobPostedCard.module.css";
import { MapPin, DollarSign, Clock, Briefcase } from "lucide-react";

const JobPosted = ({ job }) => {
  // Random border color generator
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div
      className={styles.JobCard}
      style={{ border: `2px solid ${getRandomColor()}` }}
    >
      <div className={styles.JobHeader}>
        <img
          src={job.logo || "https://placehold.co/80x80"}
          alt="Company Logo"
          className={styles.CompanyLogo}
        />
        <div>
          <h3 className={styles.JobTitle}>{job.role}</h3>
          <p className={styles.CompanyName}>{job.company}</p>
        </div>
      </div>

      <div className={styles.JobDetails}>
        <p>
          <MapPin className={styles.Icon} />
          {job.location || "Remote"}
        </p>
        <p>
          <DollarSign className={styles.Icon} />
          {job.salary || "Not Disclosed"}
        </p>
        <p>
          <Clock className={styles.Icon} />
          {job.experience || "Fresher"}
        </p>
        <p>
          <Briefcase className={styles.Icon} />
          {job.jobType || "Full-Time"}
        </p>
      </div>

      <p className={styles.Description}>
        {job.description || "No job description provided."}
      </p>

      <div className={styles.Buttons}>
        <button className={styles.ApplyButton}>View Details</button>
        <button className={styles.DeleteButton}>Delete Job</button>
      </div>
    </div>
  );
};

export default JobPosted;
