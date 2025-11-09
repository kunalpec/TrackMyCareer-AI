import React from "react";
import styles from "./ApplicationCard.module.css";

const ApplyComp = ({ jobinfo }) => {
  const {
    Role = "Job Title Not Available",
    companyName = "Company Not Specified",
    location = "Location Not Specified",
    applicants = 0,
    logoUrl,
  } = jobinfo || {};

  return (
    <div className={styles.jobCard}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className={styles.companyLogo}
        />
      ) : (
        <div className={styles.companyLogoPlaceholder}></div>
      )}
      <h3 className={styles.jobTitle}>{Role}</h3>
      <p className={styles.companyName}>{companyName}</p>
      <p className={styles.jobDetails}>{location}</p>
      <p className={styles.jobDetails}>Number of Applicants: {applicants}</p>
      <button className={styles.applyNowBtn}>Apply Now</button>
    </div>
  );
};

export default ApplyComp;
