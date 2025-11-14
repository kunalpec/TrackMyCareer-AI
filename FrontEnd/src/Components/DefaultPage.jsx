import React, { useMemo } from "react";
import styles from "./DefaultPage.module.css";
import { useAppContext } from "../Context/AppContext";

const DefaultPage = () => {
  const { user, applications } = useAppContext();

  const stats = useMemo(() => {
    const summary = {
      totalApplied: applications.length,
      shortlisted: 0,
      interviews: 0,
      rejected: 0,
    };

    applications.forEach((application) => {
      switch (application.status) {
        case "shortlisted":
          summary.shortlisted += 1;
          break;
        case "interview":
          summary.interviews += 1;
          break;
        case "rejected":
          summary.rejected += 1;
          break;
        default:
          break;
      }
    });

    return summary;
  }, [applications]);

  return (
    <div className={styles.defaultPageContainer}>
      <h2 className={styles.welcomeTitle}>
        Welcome, {user?.full_name || user?.username || "Candidate"}! 👋
      </h2>
      <p className={styles.welcomeSubtitle}>
        Here’s a quick summary of your job application progress.
      </p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>{stats.totalApplied}</h3>
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
