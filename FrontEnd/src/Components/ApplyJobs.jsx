import React, { useState } from "react";
import styles from "./ApplyJobs.module.css";
import { User, Users, ClipboardList, Briefcase } from "lucide-react";
import DefaultPage from "./DefaultPage";
import ProfilePage from "./Profilepage";
import ApplicationsPage from "./Applicationspage";
import JobTrackingPage from "./JobTrackingPage";
import { useAppContext } from "../Context/AppContext";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/1077/1077012.png";

const ApplyComp = () => {
  const { user, userProfile, userProfileLoading } = useAppContext();
  const [activeTab, setActiveTab] = useState("status");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfilePage />;
      case "jobs":
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
      <aside className={styles.sidebar}>
        <div className={styles.profileSection}>
          <div className={styles.profileCircle}>
            <img
              src={userProfile?.photo_url || DEFAULT_AVATAR}
              alt="profile"
              className={userProfileLoading ? styles.photoLoading : ""}
            />
          </div>
          <p className={styles.name}>{user?.full_name || user?.username}</p>
          <p className={styles.role}>Candidate</p>
        </div>

        <ul className={styles.menu}>
          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "status" ? styles.navButtonActive : ""
              }`}
              onClick={() => setActiveTab("status")}
            >
              <User size={18} /> <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "jobs" ? styles.navButtonActive : ""
              }`}
              onClick={() => setActiveTab("jobs")}
            >
              <Briefcase size={18} /> <span>Find Jobs</span>
            </button>
          </li>

          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "track" ? styles.navButtonActive : ""
              }`}
              onClick={() => setActiveTab("track")}
            >
              <ClipboardList size={18} /> <span>Track</span>
            </button>
          </li>

          <li>
            <button
              className={`${styles.navButton} ${
                activeTab === "profile" ? styles.navButtonActive : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <Users size={18} /> <span>Profile</span>
            </button>
          </li>
        </ul>
      </aside>

      <div className={styles.mainContent}>{renderContent()}</div>
    </div>
  );
};

export default ApplyComp;
