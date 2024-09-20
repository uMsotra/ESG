import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import AuthGate from './components/AuthGate';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Chatbot from './pages/Chatbot';
import Podcast from './pages/Podcast';
import styles from './App.module.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {!user ? (
        <AuthGate />
      ) : (
        <div className={styles.app}>
          <header className={styles.header}>
            <h1>UCT Student Guide</h1>
          </header>
          <Navigation />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;