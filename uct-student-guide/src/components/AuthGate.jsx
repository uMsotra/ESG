import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import styles from '../pages/PageStyles.module.css';
import uctLogo from '../assets/uct.jpg';



const AuthGate = () => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageSection}>
        <div className={styles.logoWrapper}>
        <img src={uctLogo} alt="UCT Logo" className={styles.logoImage} />

        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.authContent}>
          {showRegister ? (
            <>
              <Register onRegisterSuccess={onLoginSuccess} />
              <p className={styles.authSwitch}>
                Already have an account?{' '}
                <button onClick={() => setShowRegister(false)}>
                  Log in
                </button>
              </p>
            </>
          ) : (
            <>
              <Login onLoginSuccess={onLoginSuccess} />
              <p className={styles.authSwitch}>
                Don't have an account?{' '}
                <button onClick={() => setShowRegister(true)}>
                  Register
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthGate;