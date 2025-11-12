import React, { useState } from "react";
import styles from "./ApplyJobs.module.css";
import { User, Users, ClipboardList } from "lucide-react";
// Pages
import DefaultPage from "./DefaultPage";
import ProfilePage from "./Profilepage";
import ApplicationsPage from "./Applicationspage"; // ✅ fixed filename capitalization
import JobTrackingPage from "./JobTrackingPage";
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
        return <JobTrackingPage />;
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
