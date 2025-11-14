import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginAdmin.module.css";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, logout } = useAppContext();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const user = await login({
        email: formState.email,
        password: formState.password,
      });
      if (user.role !== "recruiter") {
        toast.error("Please use a recruiter account to access this area.");
        await logout();
        return;
      }
      navigate("/providejobs");
    } catch {
      // toast handled inside login
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Recruiter Login</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formState.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formState.password}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className={styles.signupText}>
        Need an account?{" "}
        <Link to="/admin-signup" className={styles.signupLink}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default AdminLogin;
