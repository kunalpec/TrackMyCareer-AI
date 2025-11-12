import React, { useState } from "react";
import styles from "./Profilepage.module.css";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  FileText,
  CheckCircle,
  Camera,
  Eye,
} from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    resume: "",
    resumeURL: "",
    photo: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfile({ ...profile, photo: photoURL });
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const resumeURL = URL.createObjectURL(file);
      setProfile({ ...profile, resume: file.name, resumeURL });
    }
  };

  const handleSave = () => {
    setMessage("✅ Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.profileContainer1}>
      {/* --- Profile Form --- */}
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.photoArea}>
            <img src={profile.photo} alt="Profile" className={styles.profilePic} />
            <label htmlFor="photoUpload" className={styles.editPhotoBtn}>
              <Camera size={16} className="mr-1" /> Edit Photo
            </label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={styles.hiddenInput}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.inputGroup}>
              <User size={18} />
              <input
                type="text"
                name="name"
                value={profile.name}
                placeholder="Applicant Name"
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <Mail size={18} />
              <input
                type="email"
                name="email"
                value={profile.email}
                placeholder="Email"
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <Phone size={18} />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                placeholder="Mobile Number"
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <MapPin size={18} />
              <input
                type="text"
                name="location"
                value={profile.location}
                placeholder="Location"
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        {/* --- Bio Section --- */}
        <div className={styles.bioSection}>
          <h3>About Me</h3>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Description"
            className={styles.textArea}
          />
        </div>

        {/* --- Resume Upload --- */}
        <div className={styles.resumeSection}>
          <h3>
            <FileText size={18} className="inline-block mr-1" /> Resume
          </h3>
          <label htmlFor="resumeUpload" className={styles.uploadLabel}>
            <Upload size={16} className="mr-1" /> Upload Resume
          </label>
          <input
            id="resumeUpload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className={styles.hiddenInput}
          />
          {profile.resume ? (
            <p className={styles.resumeName}>
              <FileText size={16} /> {profile.resume}
            </p>
          ) : (
            <p className={styles.emptyResume}>No resume uploaded yet</p>
          )}
        </div>

        <div className={styles.saveSection}>
          <button className={styles.saveBtn} onClick={handleSave}>
            <CheckCircle size={18} /> Save Changes
          </button>
          {message && <p className={styles.successMsg}>{message}</p>}
        </div>
      </div>

      {/* --- Resume Preview Section --- */}
      <div className={styles.ResumeReader}>
        <h3 className={styles.resumeTitle}>
          <Eye size={18} /> Resume Preview
        </h3>
        {profile.resumeURL ? (
          profile.resume.endsWith(".pdf") ? (
            <iframe
              src={profile.resumeURL}
              title="Resume Preview"
              className={styles.resumeFrame}
            />
          ) : (
            <a
              href={profile.resumeURL}
              download={profile.resume}
              className={styles.downloadLink}
            >
              Click here to download and view your resume
            </a>
          )
        ) : (
          <div className={styles.blankResumeBox}>
            <FileText size={40} color="#999" />
            <p>No resume uploaded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
