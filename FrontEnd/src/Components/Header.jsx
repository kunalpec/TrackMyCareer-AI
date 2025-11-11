import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaCircleUser } from "react-icons/fa6";
import reactLogo from "../assets/reactlogo.png";

const HeaderComp = () => {
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

        <ul className={styles.userSection}>
          <li className={styles.userIconContainer}>
            <FaCircleUser className={styles.userIcon} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComp;
