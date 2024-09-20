import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCuS6CuubPS2AEu0o9qMuY3KuhdXZrwx3Q",
    authDomain: "uct-student-guide.firebaseapp.com",
    projectId: "uct-student-guide",
    storageBucket: "uct-student-guide.appspot.com",
    messagingSenderId: "963722213654",
    appId: "1:963722213654:web:faa7c3eeee026acaadf837"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);