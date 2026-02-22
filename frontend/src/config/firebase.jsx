// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpl0pWaNX5h-34KstRpMfgKGPWJB1Fo7o",
  authDomain: "raktsarthi-40fc9.firebaseapp.com",
  projectId: "raktsarthi-40fc9",
  storageBucket: "raktsarthi-40fc9.firebasestorage.app",
  messagingSenderId: "1062777284248",
  appId: "1:1062777284248:web:dff70ed62d47fb28ad52ed",
  measurementId: "G-RJTK3CK8SY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Configure Google Provider
// Note: Cross-Origin-Opener-Policy warnings in console are expected and harmless
// They occur because Firebase uses popups for authentication
// These warnings do not affect functionality
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always show account selection
});

export { app, analytics };