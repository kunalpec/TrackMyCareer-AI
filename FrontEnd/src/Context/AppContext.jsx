import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

const AppContext = createContext(undefined);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const TOKEN_STORAGE_KEY = "tmc_auth_token";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(null);
  const userRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [postedJobsLoading, setPostedJobsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userProfileLoading, setUserProfileLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Token ${token}`;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const fetchJobs = useCallback(
    async (pageUrl) => {
      setJobsLoading(true);
      try {
        const endpoint = pageUrl ? pageUrl : "/jobs/";
        const config =
          typeof endpoint === "string" && endpoint.startsWith("http")
            ? undefined
            : { params: { page_size: 50 } };
        const { data } = await api.get(endpoint, config);
        const records = data.results || data;
        setJobs(records);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        if (![401, 403].includes(error.response?.status)) {
          toast.error("Unable to load jobs.");
        }
      } finally {
        setJobsLoading(false);
      }
    },
    []
  );

  const fetchPostedJobs = useCallback(async (options = {}) => {
    const currentUser = options.user ?? userRef.current;
    if (!currentUser || currentUser.role !== "recruiter") {
      setPostedJobs([]);
      return;
    }
    setPostedJobsLoading(true);
    try {
      const { data } = await api.get("/jobs/", {
        params: { mine: true, page_size: 50 },
      });
      const records = data.results || data;
      setPostedJobs(records);
    } catch (error) {
      console.error("Failed to fetch posted jobs", error);
      if (![401, 403].includes(error.response?.status)) {
        toast.error("Unable to load posted jobs.");
      }
    } finally {
      setPostedJobsLoading(false);
    }
  }, []);

  const fetchApplications = useCallback(async (options = {}) => {
    const currentUser = options.user ?? userRef.current;
    if (!currentUser || currentUser.role !== "candidate") {
      setApplications([]);
      return;
    }
    setApplicationsLoading(true);
    try {
      const { data } = await api.get("/my-applications/", {
        params: { page_size: 50 },
      });
      const records = data.results || data;
      setApplications(records);
    } catch (error) {
      console.error("Failed to fetch applications", error);
      if (![401, 403].includes(error.response?.status)) {
        toast.error("Unable to load applications.");
      }
    } finally {
      setApplicationsLoading(false);
    }
  }, []);

  const fetchUserProfile = useCallback(async (options = {}) => {
    const currentUser = options.user ?? userRef.current;
    if (!currentUser) {
      setUserProfile(null);
      return;
    }
    setUserProfileLoading(true);
    try {
      const { data } = await api.get("/user/profile/");
      setUserProfile(data);
    } catch (error) {
      const statusCode = error.response?.status;
      if (![401, 403, 404].includes(statusCode)) {
        console.error("Failed to fetch user profile", error);
        toast.error("Unable to load profile.");
      }
      if (statusCode === 404) {
        setUserProfile(null);
      }
    } finally {
      setUserProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    const hydrateAuthenticatedUser = async () => {
      if (!token) {
        if (!isActive) return;
        setUser(null);
        setInitializing(false);
        await fetchJobs();
        return;
      }
      try {
        const { data } = await api.get("/auth/me/");
        if (!isActive) {
          return;
        }
        setUser(data.user);
        setToken(data.token);
        await Promise.all([
          fetchJobs(),
          fetchApplications({ user: data.user }),
          fetchPostedJobs({ user: data.user }),
          fetchUserProfile({ user: data.user }),
        ]);
      } catch (error) {
        console.error("Failed to load authenticated user", error);
        if (!isActive) {
          return;
        }
        setToken(null);
        setUser(null);
        await fetchJobs();
      } finally {
        if (!isActive) {
          return;
        }
        setInitializing(false);
      }
    };

    hydrateAuthenticatedUser();

    return () => {
      isActive = false;
    };
  }, [token, fetchJobs, fetchApplications, fetchPostedJobs, fetchUserProfile]);

  useEffect(() => {
    if (!initializing && token && user) {
      if (user.role === "recruiter") {
        fetchPostedJobs();
      } else {
        fetchApplications();
      }
      fetchUserProfile();
    }
  }, [user, token, initializing, fetchPostedJobs, fetchApplications, fetchUserProfile]);

  const primeAuthToken = useCallback((value) => {
    if (value) {
      api.defaults.headers.common.Authorization = `Token ${value}`;
      localStorage.setItem(TOKEN_STORAGE_KEY, value);
    } else {
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    setToken(value);
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const { data } = await api.post("/auth/login/", credentials);
      toast.success("Welcome back!");
      primeAuthToken(data.token);
      setUser(data.user);
      userRef.current = data.user;
      await Promise.all([
        fetchJobs(),
        fetchApplications({ user: data.user }),
        fetchPostedJobs({ user: data.user }),
        fetchUserProfile({ user: data.user }),
      ]);
      return data.user;
    } catch (error) {
      const message = error.response?.data?.detail || "Login failed.";
      toast.error(message);
      throw error;
    }
  }, [primeAuthToken, fetchJobs, fetchApplications, fetchPostedJobs, fetchUserProfile]);

  const register = useCallback(async (payload) => {
    try {
      const { data } = await api.post("/auth/register/", payload);
      toast.success("Account created successfully!");
      primeAuthToken(data.token);
      setUser(data.user);
      userRef.current = data.user;
      await Promise.all([
        fetchJobs(),
        fetchApplications({ user: data.user }),
        fetchPostedJobs({ user: data.user }),
        fetchUserProfile({ user: data.user }),
      ]);
      return data.user;
    } catch (error) {
      const message = error.response?.data?.detail || "Registration failed.";
      toast.error(message);
      throw error;
    }
  }, [primeAuthToken, fetchJobs, fetchApplications, fetchPostedJobs, fetchUserProfile]);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout/");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setToken(null);
      setUser(null);
      setApplications([]);
      setPostedJobs([]);
      setUserProfile(null);
      toast.success("Signed out.");
      fetchJobs();
    }
  }, [fetchJobs]);

  const postJob = useCallback(
    async (jobData) => {
      const currentUser = userRef.current;
      if (!currentUser || currentUser.role !== "recruiter") {
        toast.error("Only recruiters can post jobs.");
        return;
      }
      try {
        const formData = new FormData();
        Object.entries(jobData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });
        const { data } = await api.post("/jobs/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Job posted!");
        setPostedJobs((prev) => [data, ...prev]);
        await Promise.all([fetchJobs(), fetchPostedJobs()]);
        return data;
      } catch (error) {
        console.error("Failed to post job", error);
        const message = error.response?.data?.detail || "Unable to post job.";
        toast.error(message);
        throw error;
      }
    },
    [fetchJobs, fetchPostedJobs]
  );

  const fetchApplicants = useCallback(
    async (jobId, page = 1) => {
      const currentUser = userRef.current;
      if (!currentUser || currentUser.role !== "recruiter") {
        toast.error("Access denied.");
        return null;
      }
      try {
        const { data } = await api.get(`/jobs/${jobId}/applicants/`, {
          params: { page },
        });
        return data;
      } catch (error) {
        console.error("Failed to fetch applicants", error);
        const message = error.response?.data?.detail || "Unable to load applicants.";
        if (![401, 403].includes(error.response?.status)) {
          toast.error(message);
        }
        throw error;
      }
    },
    []
  );

  const updateApplicantStatus = useCallback(
    async (applicationId, statusValue) => {
      try {
        const { data } = await api.patch(`/applications/${applicationId}/`, {
          status: statusValue,
        });
        toast.success("Status updated.");
        return data;
      } catch (error) {
        console.error("Failed to update status", error);
        const message = error.response?.data?.detail || "Unable to update status.";
        toast.error(message);
        throw error;
      }
    },
    []
  );

  const uploadResume = useCallback(async (file) => {
    if (!file) {
      toast.error("Please select a resume file.");
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await api.put("/user/profile/update-resume/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserProfile(data);
      return data;
    } catch (error) {
      console.error("Failed to upload resume", error);
      throw error;
    }
  }, []);

  const updateProfilePhoto = useCallback(async (file) => {
    if (!file) {
      toast.error("Please choose a profile photo.");
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const { data } = await api.put("/user/profile/update-photo/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUserProfile(data);
      return data;
    } catch (error) {
      console.error("Failed to update profile photo", error);
      throw error;
    }
  }, []);

  const applyToJob = useCallback(
    async (jobId) => {
      try {
        const { data } = await api.post(`/jobs/${jobId}/apply/`);
        toast.success("Application submitted.");
        setApplications((prev) => {
          const exists = prev.find((item) => item.id === data.id);
          if (exists) {
            return prev.map((item) => (item.id === data.id ? data : item));
          }
          return [data, ...prev];
        });
        return data;
      } catch (error) {
        const message =
          error.response?.data?.detail || "Unable to submit application.";
        toast.error(message);
        throw error;
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      initializing,
      user,
      token,
      jobs,
      jobsLoading,
      applications,
      applicationsLoading,
      postedJobs,
      postedJobsLoading,
      userProfile,
      userProfileLoading,
      login,
      register,
      logout,
      fetchJobs,
      fetchApplicants,
      updateApplicantStatus,
      postJob,
      uploadResume,
      applyToJob,
      fetchApplications,
      fetchPostedJobs,
      fetchUserProfile,
      updateProfilePhoto,
    }),
    [
      initializing,
      user,
      token,
      jobs,
      jobsLoading,
      applications,
      applicationsLoading,
      postedJobs,
      postedJobsLoading,
      userProfile,
      userProfileLoading,
      login,
      register,
      logout,
      fetchJobs,
      fetchApplicants,
      updateApplicantStatus,
      postJob,
      uploadResume,
      applyToJob,
      fetchApplications,
      fetchPostedJobs,
      fetchUserProfile,
      updateProfilePhoto,
    ]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
