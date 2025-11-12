import React from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  User,
  CheckCircle,
  FileText,
  Building,
  Calendar,
} from "lucide-react";
import styles from "./ProvideJobs.module.css";
import JobPosted from "./JobPostedCard";
import { useAppContext } from "../Context/AppContext";

const ProvideComp = () => {
  const { PostedJob } = useAppContext(); // ✅ Destructure properly

  return (
    <div className={styles.PostContainer}>
      <div className={styles.Jobs}>
        {/* --- Job Post Form Section --- */}
        <div className={styles.JobPostArea}>
          <h2 className={styles.SectionTitle}>Create New Job Post</h2>

          <form className={styles.JobForm}>
            {/* Job Role */}
            <div className={styles.FormField}>
              <label htmlFor="jobRole">Job Role *</label>
              <div className={styles.InputWithIcon}>
                <Briefcase className={styles.Icon} size={18} />
                <input
                  type="text"
                  id="jobRole"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div className={styles.FormField}>
              <label htmlFor="company">Company</label>
              <div className={styles.InputWithIcon}>
                <Building className={styles.Icon} size={18} />
                <input type="text" id="company" placeholder="e.g., Google" />
              </div>
            </div>

            {/* Location & Salary */}
            <div className={styles.RowFields}>
              <div className={styles.FormField}>
                <label htmlFor="location">Location</label>
                <div className={styles.InputWithIcon}>
                  <MapPin className={styles.Icon} size={18} />
                  <input type="text" id="location" placeholder="Remote or City" />
                </div>
              </div>

              <div className={styles.FormField}>
                <label htmlFor="salaryRange">Salary Range</label>
                <div className={styles.InputWithIcon}>
                  <DollarSign className={styles.Icon} size={18} />
                  <input
                    type="text"
                    id="salaryRange"
                    placeholder="$80k - $100k"
                  />
                </div>
              </div>
            </div>

            {/* Experience & Job Type */}
            <div className={styles.RowFields}>
              <div className={styles.FormField}>
                <label htmlFor="experience">Experience</label>
                <div className={styles.InputWithIcon}>
                  <Clock className={styles.Icon} size={18} />
                  <input
                    type="text"
                    id="experience"
                    placeholder="e.g., 3+ Years"
                  />
                </div>
              </div>

              <div className={styles.FormField}>
                <label htmlFor="jobType">Job Type</label>
                <div className={styles.InputWithIcon}>
                  <User className={styles.Icon} size={18} />
                  <select id="jobType">
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Last Date to Apply */}
            <div className={styles.FormField}>
              <label htmlFor="lastDate">Last Date to Apply *</label>
              <div className={styles.InputWithIcon}>
                <Calendar className={styles.Icon} size={18} />
                <input type="date" id="lastDate" required />
              </div>
            </div>

            {/* Job Description */}
            <div className={styles.FormField}>
              <label htmlFor="jobDescription">Job Description</label>
              <div className={styles.InputWithIcon}>
                <FileText className={styles.Icon} size={18} />
                <textarea
                  id="jobDescription"
                  rows="5"
                  placeholder="Provide detailed role responsibilities and requirements..."
                ></textarea>
              </div>
            </div>

            {/* Company Logo Upload */}
            <div className={styles.FormField}>
              <label htmlFor="companyLogoFile">Company Image/Logo Upload</label>
              <input type="file" id="companyLogoFile" accept="image/*" />
            </div>

            <button type="submit" className={styles.PostJobButton}>
              <CheckCircle size={18} />
              Post Job Now
            </button>
          </form>
        </div>

        {/* --- Job Posted Section --- */}
        <div className={styles.JobPostedArea}>
          <h2 className={styles.SectionTitle}>Jobs Posted</h2>
          {PostedJob.length > 0 ? (
            PostedJob.map((item, index) => <JobPosted key={index} job={item} />)
          ) : (
            <p>No jobs posted yet...</p>
          )}
        </div>
      </div>

      {/* --- Applications Area --- */}
      <div className={styles.ApplicationArea}>
        <h2 className={styles.SectionTitle}>Applications</h2>
        <p>Applications from candidates will appear here...</p>
      </div>
    </div>
  );
};

export default ProvideComp;
