import React, { useState } from "react";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here (API call or validation)
    setMessage(`✅ Admin ${form.username} registered successfully!`);
    setForm({ username: "", email: "", password: "" });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.pageTitle}>Admin Signup</h2>

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

        <button type="submit" className={styles.signupBtn}>
          Sign Up
        </button>
        {message && <p className={styles.successMsg}>{message}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
