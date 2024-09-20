import React, { useEffect } from 'react';
import styles from './PageStyles.module.css';

const Chatbot = () => {

    useEffect(() => {
        // Dynamically load the Landbot script
        const script = document.createElement('script');
        script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
        script.async = true;

        document.head.appendChild(script);

        script.onload = () => {
            if (window.Landbot) {
                const myLandbot = new window.Landbot.Container({
                    container: '#myLandbot',
                    configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2611963-1E0UI0DZTV3HRADA/index.json',
                });
            }
        };

        return () => {
            document.head.removeChild(script);
        };
        
    }, []);

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Welcome to Chatbot</h2>
            <p>This is the Chatbot page. Here you can ask any question and will get a AI-response.</p>
            
            <div className={styles.chatbotContainer}>
                <div id="myLandbot" className={styles.landbotFrame}></div>
            </div>
        
        </div>
    );
};

export default Chatbot;
