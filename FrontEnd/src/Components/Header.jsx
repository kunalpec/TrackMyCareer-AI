import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaCircleUser } from "react-icons/fa6";
import reactLogo from "../assets/reactlogo.png";
import { useAppContext } from "../Context/AppContext";

const HeaderComp = () => {
  const { user, logout } = useAppContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.Logo}>
        <img src={reactLogo} alt="React Logo" />
      </div>

      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/providejobs"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              PostJobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/applyjobs"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              FindJobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className={styles.userSection}>
          {user ? (
            <>
              <div className={styles.userInfo}>
                <FaCircleUser className={styles.userIcon} />
                <div>
                  <p className={styles.userName}>
                    {user.full_name || user.username}
                  </p>
                  <p className={styles.userRole}>
                    {user.role === "recruiter" ? "Recruiter" : "Candidate"}
                  </p>
                </div>
              </div>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <FaCircleUser className={styles.userIcon} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderComp;
