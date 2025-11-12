import React from 'react';
import { Book, RotateCcw, Library, Settings } from 'lucide-react';
import styles from './Dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User" className={styles.userAvatar} />
            <div>
              <h4>Ahmed Mohammed</h4>
              <p>User</p>
            </div>
          </div>
          <div className={styles.dateTime}>
            <strong>12:29 PM</strong>
            <span>Sep 27, 2025</span>
            <Settings />
          </div>
        </header>

        {/* Dashboard Body */}
        <section className={styles.dashboardBody}>
          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.iconBox}><Book /></div>
              <h3>Your Borrowed Book List</h3>
            </div>

            <div className={styles.card}>
              <div className={styles.iconBox}><RotateCcw /></div>
              <h3>Your Returned Book List</h3>
            </div>

            <div className={`${styles.card} ${styles.wide}`}>
              <div className={styles.iconBox}><Library /></div>
              <h3>Let's browse available book inventory</h3>
            </div>
          </div>

          <div className={styles.middleSection}>
            <div className={styles.chartContainer}>
              <div className={styles.chart}>
                <div className={styles.pie}></div>
              </div>
              <div className={styles.legend}>
                {/* Chart logo */}
                <img src="../images/2c03929c-cfc1-4e2a-9fc4-bfd771994993.png" alt="BookHive Logo" />
                <p><span className={styles.grayDot}></span> Total Borrowed Books</p>
                <p><span className={styles.blueDot}></span> Total Returned Books</p>
              </div>
            </div>

            <div className={styles.quote}>
              <p>
                "Embarking on the journey of reading fosters personal growth, nurturing a path towards
                excellence and the refinement of character."
              </p>
              <span>~ BookHive Team</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
