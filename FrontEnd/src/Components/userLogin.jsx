import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginAdmin.module.css";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const UserLogin = () => {
  const navigate = useNavigate();
  const { login, register, logout } = useAppContext();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const action = isRegistering ? register : login;
      const payload = {
        email: formState.email,
        password: formState.password,
      };
      if (isRegistering) {
        payload.username = formState.email.split("@")[0];
        payload.role = "candidate";
      }
      const user = await action(payload);
      if (user.role !== "candidate") {
        toast.error("Please use a candidate account to continue.");
        await logout();
        return;
      }
      navigate("/applyjobs");
    } catch {
      // toast handled in context
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{isRegistering ? "Create Candidate Account" : "Candidate Login"}</h2>

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
          {submitting ? "Processing..." : isRegistering ? "Sign Up" : "Login"}
        </button>
      </form>

      <button
        type="button"
        className={styles.secondaryButton}
        onClick={() => setIsRegistering((prev) => !prev)}
      >
        {isRegistering ? "Already have an account? Login" : "Need an account? Sign Up"}
      </button>
    </div>
  );
};

export default UserLogin;
