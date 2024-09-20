import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './PageStyles.module.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error) {
      console.error('Error logging in:', error.code, error.message);
      
      if (error.code.includes('auth/invalid-email')) {
        setError('Invalid email address. Please check and try again.');
      } else if (error.code.includes('auth/user-not-found') || error.code.includes('auth/wrong-password')) {
        setError('Incorrect email or password. Please try again.');
      } else if (error.code.includes('auth/too-many-requests')) {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    }
  };

  return (
    <>
      <h2 className={styles.authTitle}>Login</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </>
  );
};

export default Login;