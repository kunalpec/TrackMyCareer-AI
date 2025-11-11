import React, { useState } from "react";
import styles from "./LoginAdmin.module.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Logged In:", formData);
    alert(`Welcome, ${formData.name || "Admin"}!`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
