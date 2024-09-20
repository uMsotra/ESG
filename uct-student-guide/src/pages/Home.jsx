import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageStyles.module.css';
import image from '../assets/imagesit.png';

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Introduction Section */}
      <section className={styles.introSection}>
        <h2 className={styles.pageTitle}>Welcome to the UCT Interactive Student Guide</h2>
        <p className={styles.introText}>
          This guide is designed to help UCT science students engage with the 'Science is Tough' book content interactively
          through podcasts, quizzes, and an intelligent chatbot. Learn better and faster while making the content
          easier to digest!
        </p>
      </section>

      {/* Visual Section with the Actual Image */}
      <section className={styles.visualSection}>
        <div className={styles.imageWrapper}>
          <img src={image} alt="UCT Banner" className={styles.bannerImage} />
        </div>
      </section>

      {/* Call-to-Action Links */}
      <section className={styles.ctaSection}>
        <Link to="/quiz" className={styles.ctaLink}>Start Quiz</Link>
        <Link to="/podcast" className={styles.ctaLink}>Listen to Podcast</Link>
        <Link to="/chatbot" className={styles.ctaLink}>Ask the Chatbot</Link>
      </section>

      {/* User Testimonials */}
      <section className={styles.testimonialSection}>
        <h3 className={styles.testimonialTitle}>What Students Say</h3>
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            "The UCT Student Guide made it so much easier to understand the toughest topics. The quizzes helped me
            track my progress, and the chatbot was a lifesaver for last-minute questions!"
          </p>
          <p className={styles.testimonialAuthor}>- Bonolo Mankgaba</p>
        </div>
      </section>
    </div>
  );
};

export default Home;