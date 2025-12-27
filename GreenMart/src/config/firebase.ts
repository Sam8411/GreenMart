import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwhiQ87dQE4zgoFccYOej6J-ICOaNt-Ak",
  authDomain: "greenmart-6cb76.firebaseapp.com",
  projectId: "greenmart-6cb76",
  storageBucket: "greenmart-6cb76.firebasestorage.app",
  messagingSenderId: "304678607392",
  appId: "1:304678607392:web:4ad1c2d0997ef800b47a45",
  measurementId: "G-JBLX4XV8SB"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence for Firestore
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support all of the features required to enable persistence');
    }
  });
}

// Connect to emulators if in development
/*
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8081);
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.warn('Could not connect to emulators:', error);
  }
}
*/
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



export default app;