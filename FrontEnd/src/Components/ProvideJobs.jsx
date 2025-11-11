import React from "react";
import { Briefcase, MapPin, DollarSign, Clock, User, CheckCircle, Mail, Phone, FileText, Building } from 'lucide-react';
import styles from "./ProvideJobs.module.css";
import JobPosted from "./JobPostedCard";
import image4 from "../assets/softwareperson.jpg";

const ProvideComp = () => {

  const Job1 = [{
    role: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$90k - $120k",
    experience: "2+ Years",
    jobType: "Full-Time",
    logo: image4 ,
    description: "We’re looking for a skilled React developer to join our dynamic team.",
  },{
    role: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$90k - $120k",
    experience: "2+ Years",
    jobType: "Full-Time",
    logo: image4,
    description: "We’re looking for a skilled React developer to join our dynamic team.",
  },{
    role: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$90k - $120k",
    experience: "2+ Years",
    jobType: "Full-Time",
    logo: image4 ,
    description: "We’re looking for a skilled React developer to join our dynamic team.",
  },{
    role: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$90k - $120k",
    experience: "2+ Years",
    jobType: "Full-Time",
    logo: image4 ,
    description: "We’re looking for a skilled React developer to join our dynamic team.",
  }];
  return (
    <div className={styles.PostContainer}>
      <div className={styles.Jobs}>

        {/* --- Job Post Form Section --- */}
        <div className={styles.JobPostArea}>
          <h2 className={styles.SectionTitle}>Create New Job Post</h2>
          <form className={styles.JobForm}>
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

            <div className={styles.FormField}>
              <label htmlFor="company">Company</label>
              <div className={styles.InputWithIcon}>
                <Building className={styles.Icon} size={18} />
                <input type="text" id="company" placeholder="e.g., Google" />
              </div>
            </div>

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
                  <input type="text" id="salaryRange" placeholder="$80k - $100k" />
                </div>
              </div>
            </div>

            <div className={styles.RowFields}>
              <div className={styles.FormField}>
                <label htmlFor="experience">Experience</label>
                <div className={styles.InputWithIcon}>
                  <Clock className={styles.Icon} size={18} />
                  <input type="text" id="experience" placeholder="e.g., 3+ Years" />
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

            <div className={styles.FormField}>
              <label htmlFor="jobDescription">Job Description</label>
              <div className={styles.InputWithIcon}>
                <FileText className={styles.Icon} size={18} />
                <textarea
                  id="jobDescription"
                  rows="5"
                  placeholder="Provide a detailed description of the role responsibilities and requirements..."
                ></textarea>
              </div>
            </div>

            <div className={styles.FormField}>
              <label htmlFor="companyLogoUrl">Company Image/Logo URL</label>
              <input
                type="text"
                id="companyLogoUrl"
                placeholder="https://placehold.co/100x100"
              />
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
          <p>List of jobs will appear here...</p>
          {Job1.map((item, index) => (
            <JobPosted key={index} job={item} />
          ))}
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