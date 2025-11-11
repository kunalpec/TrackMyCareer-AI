// pages/ApplicationsPage.jsx
import React, { useState } from "react";
import JobCard from "./ApplyCard";
import styles from "./ApplicationsPage.module.css";

const ApplicationsPage = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  const toggleExpand = (id) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const jobData = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechNova",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      location: "Remote",
      experience: "1-3 years",
      type: "Full-time",
      description:
        "Join our frontend team to build beautiful, responsive interfaces using React, Tailwind, and modern web tools.",
    },
    {
      id: 2,
      role: "Data Analyst",
      company: "DataScape",
      logo: "https://cdn-icons-png.flaticon.com/512/2206/2206368.png",
      location: "Chandigarh",
      experience: "0-2 years",
      type: "Internship",
      description:
        "Work with real-world datasets to derive insights and create visual dashboards for analytics-driven decision making.",
    },
    {
      id: 3,
      role: "Machine Learning Engineer",
      company: "AIWorks",
      logo: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
      location: "Bangalore",
      experience: "2+ years",
      type: "Full-time",
      description:
        "Develop ML models for recommendation systems, NLP, and computer vision using Python, TensorFlow, and PyTorch.",
    },
  ];

  return (
    <div className={styles.applicationsContainer}>
      <h2 className={styles.pageTitle}>Available Jobs</h2>

      <div className={styles.jobsHorizontalScroll}>
        {jobData.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            expandedJob={expandedJob}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
