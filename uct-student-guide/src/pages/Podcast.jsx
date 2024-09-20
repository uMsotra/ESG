import React, { useState, useEffect, useContext } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import styles from './Podcast.module.css';

const Podcast = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, 'podcasts'), orderBy('chapterNumber'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const podcastsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPodcasts(podcastsData);
    }, (error) => {
      console.error("Error fetching podcasts: ", error);
      setError("Failed to load podcasts. Please try again later.");
    });

    return () => unsubscribe();
  }, []);

  const handlePodcastSelect = (podcast) => {
    setCurrentPodcast(podcast);
  };

  const handlePodcastComplete = async () => {
    if (!user || !currentPodcast) return;

    try {
      const podcastRef = doc(db, 'podcasts', currentPodcast.id);
      await updateDoc(podcastRef, {
        [`completedBy.${user.uid}`]: true
      });
      setError('');
    } catch (error) {
      console.error("Error marking podcast as complete: ", error);
      setError("Failed to update progress. Please try again.");
    }
  };

  return (
    <div className={styles.podcastContainer}>
      <h2 className={styles.podcastTitle}>Science is Tough - Chapter Podcasts</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.podcastGrid}>
        <div className={styles.podcastList}>
          {podcasts.map((podcast) => (
            <div 
              key={podcast.id} 
              className={`${styles.podcastItem} ${currentPodcast && currentPodcast.id === podcast.id ? styles.activePodcast : ''}`}
              onClick={() => handlePodcastSelect(podcast)}
            >
              <h3>{podcast.title}</h3>
              <p>Chapter {podcast.chapterNumber}</p>
              {user && podcast.completedBy && podcast.completedBy[user.uid] && (
                <span className={styles.completedBadge}>Completed</span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.podcastPlayer}>
          {currentPodcast ? (
            <>
              <h3>{currentPodcast.title}</h3>
              <audio controls src={currentPodcast.audioUrl} className={styles.audioPlayer}>
                Your browser does not support the audio element.
              </audio>
              <button onClick={handlePodcastComplete} className={styles.completeButton}>
                Mark as Complete
              </button>
            </>
          ) : (
            <p>Select a podcast to start listening</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Podcast;