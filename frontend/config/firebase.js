import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBBDq4yNgInsOZNhRiHFM1A2-kVko4HW3U",
  authDomain: "moonbrew-database.firebaseapp.com",
  projectId: "moonbrew-database",
  storageBucket: "moonbrew-database.firebasestorage.app",
  messagingSenderId: "396520705277",
  appId: "1:396520705277:web:66b767444ef49adf210294",
  measurementId: "G-K26XT02KMM"
};

// Initialize Firebase only if an instance doesn't exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics }; 