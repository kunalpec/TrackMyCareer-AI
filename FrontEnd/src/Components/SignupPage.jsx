import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import { useAppContext } from "../Context/AppContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useAppContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "recruiter",
      });
      navigate("/providejobs");
    } catch {
      // toast handled inside register
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.pageTitle}>Recruiter Signup</h2>

      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.signupBtn} disabled={submitting}>
          {submitting ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
