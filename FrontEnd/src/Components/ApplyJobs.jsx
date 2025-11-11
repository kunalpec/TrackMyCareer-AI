import React, { useState } from "react";
import styles from "./ApplyJobs.module.css";
import { User, Users, ClipboardList } from "lucide-react";

// Component Imports
import ProfilePage from "./ProfilePage";
import ApplicationsPage from "./Applicationspage"; // ✅ fixed filename capitalization

// Dummy Track Component
const Track = () => (
  <div className={styles.trackContainer}>
    <h2 className={styles.trackTitle}>Track Applications</h2>
    <p className={styles.trackSubtitle}>
      Track the status of your job applications here.
    </p>
  </div>
);

// Static Stats for Default Page
const stats = {
  totalApplied: 12,
  shortlisted: 4,
  interviews: 2,
  rejected: 3,
};

// Default Page Component
const DefaultPage = () => (
  <div className={styles.defaultPageContainer}>
    <h2 className={styles.welcomeTitle}>Welcome, Kunal! 👋</h2>
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

// ===============================
// Main Apply Component
// ===============================
const ApplyComp = () => {
  const [activeTab, setActiveTab] = useState("status");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfilePage />;
      case "applicants":
        return <ApplicationsPage />;
      case "track":
        return <Track />;
      case "status":
      default:
        return <DefaultPage />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.profileCircle}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="profile"
            />
          </div>
          <p className={styles.name}>Kunal</p>
        </div>

        {/* Sidebar Buttons */}
        <ul className={styles.menu}>
          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "status" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("status")}
            >
              <User size={18} /> <span>Status</span>
            </button>
          </li>

          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "profile" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={18} /> <span>Profile</span>
            </button>
          </li>

          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "applicants" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("applicants")}
            >
              <Users size={18} /> <span>Applications</span>
            </button>
          </li>

          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "track" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("track")}
            >
              <ClipboardList size={18} /> <span>Track</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className={styles.mainContent}>{renderContent()}</div>
    </div>
  );
};

export default ApplyComp;
