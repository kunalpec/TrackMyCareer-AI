import React from 'react';

import AboutusImage2 from "../assets/Aboutus1.jpg"; 
import styles from "./About.module.css"; 

const About = () => {
  return (
    <div className={styles.aboutPageContainer}>
      {/* Main Content and Second Image Section */}
      <div className={styles.mainContentLayout}>
        {/* Content Section */}
        <div className={styles.contentSection}>
          <h1 className={styles.mainTitle}>Our Story, Vision, and Values</h1>

          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.paragraph}>
              At <strong>NextWorrk</strong>, we are redefining how talent meets opportunity. We operate as the crucial bridge connecting <strong>ambitious job applicants</strong> with the <strong>right job providers</strong>.
            </p>
            <p className={styles.paragraph}>
              In today's fast-paced job market, efficiency is everything. We utilize a powerful matching engine to cut through the noise, ensuring applicants find roles that truly align with their skills and career goals, while employers quickly access a curated pool of top-tier talent ready to contribute. We don't just list jobs—we create successful connections.
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Our Vision: The Future of Work, Powered by AI</h2>
            <p className={styles.paragraph}>
              Our vision is to build the most intelligent and personalized career platform on the planet.
            </p>
            <p className={styles.paragraph}>
              In the future, we will integrate an advanced <strong>AI Chatbot feature</strong> directly into the NextWorrk ecosystem. This feature will go beyond simple Q&A by offering:
            </p>
            <ul className={styles.visionList}>
              <li><strong>Personalized Career Coaching:</strong> Real-time advice on skill gaps, market trends, and interview preparation based on your profile.</li>
              <li><strong>Intelligent Application Assistance:</strong> AI-guided optimization of resumes and cover letters for specific job listings.</li>
              <li><strong>Seamless Employer Support:</strong> Instant, 24/7 support for job providers in refining job descriptions and screening candidates.</li>
            </ul>
            <p className={styles.paragraph}>
              We aim to make the job application and hiring processes so intuitive and smart that they feel effortless, allowing everyone to focus on what matters most: <strong>achieving meaningful work.</strong>
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <ul className={styles.valuesList}>
              <li><strong>Connection:</strong> We believe the right match changes everything.</li>
              <li><strong>Innovation:</strong> We continuously evolve our platform to leverage the best technology, including AI.</li>
              <li><strong>Empowerment:</strong> We equip both job seekers and companies with the tools they need to succeed.</li>
            </ul>
          </div>
        </div>
        
        {/* Second Image - placed alongside the main content for better flow */}
        <div className={styles.secondImageContainer}>
            <img src={AboutusImage2} alt="Additional About Us Visual" className={styles.aboutsecondImage}/>
        </div>
      </div>
    </div>
  );
}

export default About;