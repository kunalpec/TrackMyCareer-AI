import React from 'react';
import styles from './Contact.module.css';

const ContactInfoList = () => {
  return (
    <div className={styles.contactInfoList}>
      <h2>Contact the NextWorrk Team</h2>
      <p className={styles.contactDescription}>
        For quick assistance, please reach out to the appropriate contact below.
      </p>

      {/* General Inquiries */}
      <div className={styles.contactItem}>
        <h3 className={`${styles.contactCategory} ${styles.generalInquiries}`}>General Inquiries</h3>
        <p className={styles.contactDescription}>For all non-specific questions about our platform or services.</p>
        <p className={styles.contactEmail}>
          Email: <a href="mailto:kunal.bt2cseds@pec.edu.in" className={styles.emailLink}>kunal.bt2cseds@pec.edu.in</a>
        </p>
        <p className={styles.contactEmail}>
          Mobile Number:+91 9592951721
        </p>
      </div>

      {/* Paarth */}
      <div className={styles.contactItem}>
        <h3 className={styles.contactCategory}>Paarth</h3>
        <p className={styles.contactDescription}>Reach out for technical support or platform assistance.</p>
        <p className={styles.contactEmail}>
          Email: <a href="mailto:paarth.bt2cseds@pec.edu.in" className={styles.emailLink}>paarth.bt2cseds@pec.edu.in</a>
        </p>
      </div>

      {/* Vivek */}
      <div className={styles.contactItem}>
        <h3 className={styles.contactCategory}>Vivek</h3>
        <p className={styles.contactDescription}>Contact for partnership and collaboration opportunities.</p>
        <p className={styles.contactEmail}>
          Email: <a href="mailto:vivek.bt2cseds@pec.edu.in" className={styles.emailLink}>vivek.bt2cseds@pec.edu.in</a>
        </p>
      </div>

      {/* Daksh */}
      <div className={styles.contactItem}>
        <h3 className={styles.contactCategory}>Daksh</h3>
        <p className={styles.contactDescription}>Reach out for account and billing related queries.</p>
        <p className={styles.contactEmail}>
          Email: <a href="mailto:daksh.bt2cseds@pec.edu.in" className={styles.emailLink}>daksh.bt2cseds@pec.edu.in</a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfoList;