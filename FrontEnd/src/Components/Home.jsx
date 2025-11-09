import { useRef } from "react";
import styles from "./Home.module.css";
import ApplicationCard from "./ApplicationCard";
import image1 from "../assets/softwareperson.jpg";
import image2 from "../assets/UX UI.jpg";
import image3 from "../assets/Data Science.jpg";
import image4 from "../assets/Data Science1.jpg";
import image5 from "../assets/hero-image.jpg";
// import image1 from "../assets/softwareperson.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const jobs = [
    {
      id: 1,
      Role: "Senior Software Engineer",
      companyName: "Tech Solutions Inc.",
      location: "New York, NY",
      applicants: 120,
      logoUrl: image1,
    },
    {
      id: 2,
      Role: "UX Designer",
      companyName: "Creative Minds Co.",
      location: "San Francisco, CA",
      applicants: 85,
      logoUrl: image2,
    },
    {
      id: 3,
      Role: "Data Scientist",
      companyName: "Data Insights Ltd.",
      location: "Boston, MA",
      applicants: 210,
      logoUrl: image3,
    },
    {
      id: 4,
      Role: "Data Scientist",
      companyName: "Data Insights Ltd.",
      location: "Boston, MA",
      applicants: 210,
      logoUrl: image4,
    },

  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // px to scroll
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>Unlock Your Next</h1>
          <h1 className={styles.heroHeading}>Opportunity</h1>
          <div className={styles.heroButtons}>
            <button className={styles.findJobBtn}>Find Jobs</button>
            <button className={styles.postJobBtn}>Post Job</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContentArea}>
        <div className={styles.empowerTeamSection}>
          <h2 className={styles.sectionTitle}>Empower Your Team</h2>
          <p className={styles.empowerTeamText}>
            Connect with top talent. Post your job openings and find the perfect
            candidates quickly and efficiently.
          </p>
          <button className={styles.postJobNowBtn}>Post a Job Now</button>
        </div>

        {/* Job Cards Carousel */}
        <div className={styles.carouselWrapper}>
          <button
            className={`${styles.scrollBtn} ${styles.leftBtn}`}
            onClick={() => scroll("left")}
          >
            <FaChevronLeft />
          </button>

          <div className={styles.jobCardsArea} ref={scrollRef}>
            {jobs.map((job) => (
              <ApplicationCard key={job.id} jobinfo={job} />
            ))}
          </div>

          <button
            className={`${styles.scrollBtn} ${styles.rightBtn}`}
            onClick={() => scroll("right")}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>NextWorrrk</div>
          <nav className={styles.footerNav}>
            <a href="#" className={styles.footerLink}>About Us</a>
            <a href="#" className={styles.footerLink}>Services</a>
            <a href="#" className={styles.footerLink}>Legal</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </nav>
          <div className={styles.footerMeta}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
          </div>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
