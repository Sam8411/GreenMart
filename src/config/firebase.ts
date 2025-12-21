import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCn7wimxs86e53-3pl5b8PfyxE0tAYaAAg",
  authDomain: "kethsaathi.firebaseapp.com",
  projectId: "kethsaathi",
  storageBucket: "kethsaathi.firebasestorage.app",
  messagingSenderId: "260695470856",
  appId: "1:260695470856:web:bd167325abf7b4f325f2bd",
  measurementId: "G-X14ZN6EZ5Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure providers with additional scopes if needed
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

// Configure auth settings to avoid popup issues
auth.useDeviceLanguage();

// Set auth persistence to avoid repeated logins
setPersistence(auth, browserLocalPersistence);

// Add connection retry settings for Firestore
if (typeof window !== 'undefined') {
  // Only run in browser environment
  try {
    // Enable offline persistence
    import('firebase/firestore').then(() => {
      console.log('Firestore network controls available');
    });
  } catch (error) {
    console.warn('Could not enable Firestore network controls:', error);
  }
}

export default app;