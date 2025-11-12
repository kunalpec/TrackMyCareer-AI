import React, { createContext, useContext, useState } from "react";
import image4 from "../assets/softwareperson.jpg"; // ✅ Import before usage

// ✅ Create Context
const AppContext = createContext();

const Job1 = [
  {
    role: "Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$90k - $120k",
    experience: "2+ Years",
    jobType: "Full-Time",
    logo: image4,
    description:
      "We’re looking for a skilled React developer to join our dynamic team.",
    lastDate: "2025-12-30",
  },
  {
    role: "Backend Developer",
    company: "Amazon",
    location: "Hyderabad",
    salary: "$100k - $130k",
    experience: "3+ Years",
    jobType: "Full-Time",
    logo: image4,
    description:
      "Seeking a backend developer skilled in Node.js and cloud technologies.",
    lastDate: "2025-12-15",
  },
];

export const AppProvider = ({ children }) => {
  
  // Tracks whether admin is logged in
  const [adminRef, setAdminRef] = useState(false);

  // Tracks whether user (job applicant) is logged in
  const [applyuser, setApplyUser] = useState(false);

  // Admin login/signup data
  const [AdminformData, setAdminFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // User login/signup data
  const [UserformData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Stores all posted jobs
  const [PostedJob, SetPostedJob] = useState(Job1);

  // Stores current logged-in user info
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        // Admin
        adminRef,
        setAdminRef,
        AdminformData,
        setAdminFormData,

        // User
        applyuser,
        setApplyUser,
        UserformData,
        setUserFormData,

        // Current user info
        user,
        setUser,

        // Posted Jobs
        PostedJob,
        SetPostedJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom Hook for easy access
export const useAppContext = () => useContext(AppContext);
