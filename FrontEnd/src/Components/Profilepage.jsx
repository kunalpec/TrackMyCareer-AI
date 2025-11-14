import React, { useEffect, useState } from "react";
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

import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/1077/1077012.png";

const ProfilePage = () => {
  const {
    user,
    userProfile,
    userProfileLoading,
    uploadResume,
    updateProfilePhoto,
  } = useAppContext();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    resume: "",
    resumeURL: "",
  });

  const [message, setMessage] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      name: user?.full_name || user?.username || "",
      email: user?.email || "",
    }));
  }, [user]);

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      resume: userProfile?.resume_name || "",
      resumeURL: userProfile?.resume_url || "",
    }));
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (file.type && !allowedTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Photo must be smaller than 3MB.");
      return;
    }
    setPhotoUploading(true);
    try {
      await updateProfilePhoto(file);
      toast.success("Photo updated successfully");
    } catch (error) {
      const message = error.response?.data?.detail || "Unable to update photo.";
      toast.error(message);
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF resumes are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume must be smaller than 5MB.");
      return;
    }
    setResumeUploading(true);
    try {
      await uploadResume(file);
      toast.success("Resume uploaded successfully");
    } catch (error) {
      const message = error.response?.data?.detail || "Unable to upload resume.";
      toast.error(message);
    } finally {
      setResumeUploading(false);
    }
  };

  const handleSave = () => {
    setMessage("✅ Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const currentPhoto = userProfile?.photo_url || DEFAULT_AVATAR;
  const currentResumeUrl = userProfile?.resume_url;
  const currentResumeName = userProfile?.resume_name;
  const isPdfResume = currentResumeName
    ? currentResumeName.toLowerCase().endsWith(".pdf")
    : false;
  const isPhotoLoading = photoUploading;
  const isResumeLoading = resumeUploading;

  return (
    <div className={styles.profileContainer1}>
      {/* --- Profile Form --- */}
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.photoArea}>
            <img src={currentPhoto} alt="Profile" className={styles.profilePic} />
            <label htmlFor="photoUpload" className={styles.editPhotoBtn}>
              <Camera size={16} className="mr-1" />{" "}
              {isPhotoLoading ? "Uploading..." : "Edit Photo"}
            </label>
            <input
              id="photoUpload"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handlePhotoChange}
              className={styles.hiddenInput}
              disabled={isPhotoLoading || userProfileLoading}
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
            accept=".pdf"
            onChange={handleResumeUpload}
            className={styles.hiddenInput}
            disabled={isResumeLoading}
          />
          <div className={styles.resumeStatusRow}>
            {isResumeLoading ? (
              <p className={styles.emptyResume}>Uploading resume...</p>
            ) : profile.resume ? (
              <p className={styles.resumeName}>
                <FileText size={16} /> {profile.resume}
              </p>
            ) : (
              <p className={styles.emptyResume}>No resume uploaded yet</p>
            )}
            {profile.resumeURL && (
              <a
                href={profile.resumeURL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewResumeLink}
              >
                View
              </a>
            )}
          </div>

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
        {currentResumeUrl ? (
          isPdfResume ? (
            <iframe
              src={currentResumeUrl}
              title="Resume Preview"
              className={styles.resumeFrame}
            />
          ) : (
            <a
              href={currentResumeUrl}
              download={currentResumeName || "resume"}
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
