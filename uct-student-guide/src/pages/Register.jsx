import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './PageStyles.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      console.log('User registered successfully');
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Register</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;