import React, { useMemo, useState } from "react";
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
  Loader2,
  Download,
  Mail,
  Users,
} from "lucide-react";
import styles from "./ProvideJobs.module.css";
import JobPosted from "./JobPostedCard";
import { useAppContext } from "../Context/AppContext";

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "offered", label: "Offered" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

const defaultFormState = {
  title: "",
  company: "",
  location: "",
  salary_range: "",
  experience: "",
  job_type: "full_time",
  deadline: "",
  description: "",
  logo: null,
};

const ProvideComp = () => {
  const {
    postedJobs,
    postedJobsLoading,
    postJob,
    fetchApplicants,
    updateApplicantStatus,
  } = useAppContext();

  const [formState, setFormState] = useState(defaultFormState);
  const [submitting, setSubmitting] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicantsData, setApplicantsData] = useState({
    results: [],
    count: 0,
    next: null,
    previous: null,
    page: 1,
  });
  const [applicantsLoading, setApplicantsLoading] = useState(false);

  const totalPages = useMemo(() => {
    if (!applicantsData.count) return 0;
    return Math.ceil(applicantsData.count / 10);
  }, [applicantsData.count]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    setFormState((prev) => ({ ...prev, logo: file || null }));
  };

  const resetForm = () => {
    setFormState(defaultFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formState,
      };
      if (payload.deadline) {
        payload.deadline = `${payload.deadline}T23:59:59`;
      }
      await postJob(payload);
      resetForm();
    } catch {
      // handled in context
    } finally {
      setSubmitting(false);
    }
  };

  const loadApplicants = async (jobId, page = 1) => {
    setApplicantsLoading(true);
    try {
      const data = await fetchApplicants(jobId, page);
      if (data) {
        setSelectedJobId(jobId);
        setApplicantsData({
          results: data.results || [],
          count: data.count ?? (data.results ? data.results.length : 0),
          next: data.next,
          previous: data.previous,
          page,
        });
      }
    } finally {
      setApplicantsLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, statusValue) => {
    try {
      const updated = await updateApplicantStatus(applicationId, statusValue);
      setApplicantsData((prev) => ({
        ...prev,
        results: prev.results.map((item) =>
          item.id === updated.id ? { ...item, status: updated.status } : item
        ),
      }));
    } catch {
      // handled in context
    }
  };

  const renderPagination = () => {
    if (!selectedJobId || totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
      <div className={styles.pagination}>
        <button
          type="button"
          onClick={() => loadApplicants(selectedJobId, Math.max(1, applicantsData.page - 1))}
          disabled={applicantsData.page === 1}
        >
          Prev
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={pageNumber === applicantsData.page ? styles.activePage : ""}
            onClick={() => loadApplicants(selectedJobId, pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            loadApplicants(selectedJobId, Math.min(totalPages, applicantsData.page + 1))
          }
          disabled={applicantsData.page === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={styles.PostContainer}>
      <div className={styles.Jobs}>
        <div className={styles.JobPostArea}>
          <h2 className={styles.SectionTitle}>Create New Job Post</h2>
          <form className={styles.JobForm} onSubmit={handleSubmit}>
            <div className={styles.FormField}>
              <label htmlFor="title">Job Title *</label>
              <div className={styles.InputWithIcon}>
                <Briefcase className={styles.Icon} size={18} />
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Senior Software Engineer"
                  value={formState.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.FormField}>
              <label htmlFor="company">Company</label>
              <div className={styles.InputWithIcon}>
                <Building className={styles.Icon} size={18} />
                <input
                  id="company"
                  type="text"
                  placeholder="e.g., Google"
                  value={formState.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.RowFields}>
              <div className={styles.FormField}>
                <label htmlFor="location">Location</label>
                <div className={styles.InputWithIcon}>
                  <MapPin className={styles.Icon} size={18} />
                  <input
                    id="location"
                    type="text"
                    placeholder="Remote or City"
                    value={formState.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles.FormField}>
                <label htmlFor="salary_range">Salary Range</label>
                <div className={styles.InputWithIcon}>
                  <DollarSign className={styles.Icon} size={18} />
                  <input
                    id="salary_range"
                    type="text"
                    placeholder="$80k - $100k"
                    value={formState.salary_range}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.RowFields}>
              <div className={styles.FormField}>
                <label htmlFor="experience">Experience</label>
                <div className={styles.InputWithIcon}>
                  <Clock className={styles.Icon} size={18} />
                  <input
                    id="experience"
                    type="text"
                    placeholder="e.g., 3+ Years"
                    value={formState.experience}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={styles.FormField}>
                <label htmlFor="job_type">Job Type</label>
                <div className={styles.InputWithIcon}>
                  <User className={styles.Icon} size={18} />
                  <select
                    id="job_type"
                    value={formState.job_type}
                    onChange={handleInputChange}
                  >
                    <option value="full_time">Full-Time</option>
                    <option value="part_time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="temporary">Temporary</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.FormField}>
              <label htmlFor="deadline">Deadline *</label>
              <div className={styles.InputWithIcon}>
                <Calendar className={styles.Icon} size={18} />
                <input
                  id="deadline"
                  type="date"
                  value={formState.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.FormField}>
              <label htmlFor="description">Job Description</label>
              <div className={styles.InputWithIcon}>
                <FileText className={styles.Icon} size={18} />
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Provide detailed role responsibilities and requirements..."
                  value={formState.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.FormField}>
              <label htmlFor="logo">Company Logo</label>
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>

            <button
              type="submit"
              className={styles.PostJobButton}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className={styles.spinner} />
                  Posting...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Post Job Now
                </>
              )}
            </button>
          </form>
        </div>

        <div className={styles.JobPostedArea}>
          <div className={styles.postedHeader}>
            <h2 className={styles.SectionTitle}>Jobs Posted</h2>
            <div className={styles.postedMeta}>
              <Users size={16} />
              <span>{postedJobs.length} active postings</span>
            </div>
          </div>
          {postedJobsLoading ? (
            <div className={styles.loader}>
              <Loader2 size={24} className={styles.spinner} />
              Loading jobs...
            </div>
          ) : postedJobs.length > 0 ? (
            postedJobs.map((job) => (
              <JobPosted
                key={job.id}
                job={job}
                onViewApplicants={() => loadApplicants(job.id, 1)}
              />
            ))
          ) : (
            <p>No jobs posted yet...</p>
          )}
        </div>
      </div>

      <div className={styles.ApplicationArea}>
        <div className={styles.applicantsHeader}>
          <h2 className={styles.SectionTitle}>Applicants</h2>
          {selectedJobId && (
            <button
              type="button"
              className={styles.refreshButton}
              onClick={() => loadApplicants(selectedJobId, applicantsData.page)}
              disabled={applicantsLoading}
            >
              Refresh
            </button>
          )}
        </div>

        {selectedJobId ? (
          <>
            <div className={styles.applicantsMeta}>
              <span>Total Applicants: {applicantsData.count}</span>
              <span>
                Page {applicantsData.page}
                {totalPages ? ` of ${totalPages}` : ""}
              </span>
            </div>

            <div className={styles.applicantsTableWrapper}>
              {applicantsLoading ? (
                <div className={styles.loader}>
                  <Loader2 size={24} className={styles.spinner} />
                  Loading applicants...
                </div>
              ) : applicantsData.results.length ? (
                <table className={styles.applicantsTable}>
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Email</th>
                      <th>Applied</th>
                      <th>Resume</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicantsData.results.map((application) => (
                      <tr key={application.id}>
                        <td>{application.user.full_name}</td>
                        <td>{application.user.email}</td>
                        <td>
                          {new Date(application.applied_at).toLocaleString()}
                        </td>
                        <td>
                          {application.resume_url ? (
                            <a
                              href={application.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.resumeLink}
                            >
                              <Download size={16} />
                              View Resume
                            </a>
                          ) : (
                            <span className={styles.noResume}>No resume</span>
                          )}
                        </td>
                        <td>
                          <select
                            value={application.status}
                            onChange={(event) =>
                              handleStatusChange(
                                application.id,
                                event.target.value
                              )
                            }
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.emailButton}
                            onClick={() =>
                              window.open(`mailto:${application.user.email}`)
                            }
                          >
                            <Mail size={16} />
                            Email
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No applicants yet for this job.</p>
              )}
            </div>
            {renderPagination()}
          </>
        ) : (
          <p>Select a job to view applicants.</p>
        )}
      </div>
    </div>
  );
};

export default ProvideComp;
