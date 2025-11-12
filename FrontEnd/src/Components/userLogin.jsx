import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginAdmin.module.css";
import { useAppContext } from "../Context/AppContext";

const UserLogin = () => {
  const { UserformData, setUserFormData, setApplyUser, setUser } = useAppContext();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUserFormData({ ...UserformData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (UserformData.email && UserformData.password && UserformData.name) {
      console.log("✅ User Login Successful:", UserformData);

      // Save user globally
      setUser({
        name: UserformData.name,
        email: UserformData.email,
      });

      // Set user as logged in
      setApplyUser(true);

      // Redirect to Apply Jobs page
      navigate("/applyjobs");
    } else {
      alert("⚠️ Please fill all fields before logging in!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>User Login</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Full Name */}
        <label className={styles.label}>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={UserformData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />

        {/* Email */}
        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={UserformData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        {/* Password */}
        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={UserformData.password}
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

export default UserLogin;
