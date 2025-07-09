import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDiqLqmiZDc_kIgHoC3JKEq2V31BNBaR_k",
  authDomain: "webdev-d1a20.firebaseapp.com",
  projectId: "webdev-d1a20",
  storageBucket: "webdev-d1a20.firebasestorage.app",
  messagingSenderId: "23584087197",
  appId: "1:23584087197:web:7360271f071da38b324874",
  measurementId: "G-6YHRMQ16E8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export network functions if needed elsewhere
export { enableNetwork, disableNetwork };

// Set auth language to device language
auth.useDeviceLanguage();

export default app;