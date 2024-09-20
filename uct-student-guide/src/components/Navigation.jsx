import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import styles from './Navigation.module.css';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/" className={styles.navLink}>Home</Link></li>
        <li className={styles.navItem}><Link to="/quiz" className={styles.navLink}>Quizzes</Link></li>
        <li className={styles.navItem}><Link to="/podcast" className={styles.navLink}>Podcast</Link></li>
        <li className={styles.navItem}><Link to="/chatbot" className={styles.navLink}>Chatbot</Link></li>
        <li className={styles.navItem}>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;