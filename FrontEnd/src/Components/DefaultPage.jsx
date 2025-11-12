import React, { useState, useEffect } from "react";
import styles from "./DefaultPage.module.css";

const DefaultPage = () => {
  const [stats, setStats] = useState({
    totalApplied: 0,
    shortlisted: 0,
    interviews: 0,
    rejected: 0,
  });

  useEffect(() => {
    // Fetch stats from API if needed
    // setStats(fetchedData);
  }, []);

  return (
    <div className={styles.defaultPageContainer}>
      <h2 className={styles.welcomeTitle}>Welcome, Kunal! 👋</h2>
      <p className={styles.welcomeSubtitle}>
        Here’s a quick summary of your job application progress.
      </p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>{stats.totalApplied || 0}</h3>
          <p>Total Applications</p>
        </div>
        <div className={styles.statCard}>
          <h3>{stats.shortlisted}</h3>
          <p>Shortlisted</p>
        </div>
        <div className={styles.statCard}>
          <h3>{stats.interviews}</h3>
          <p>Interview Calls</p>
        </div>
        <div className={styles.statCard}>
          <h3>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
      </div>

      {/* --- Tip Section --- */}
      <div className={styles.tipSection}>
        <h4>💡 Tip for You</h4>
        <p>
          Keep your resume updated and tailor your cover letters for each
          application to stand out from the crowd!
        </p>
      </div>
    </div>
  );
};

export default DefaultPage;
