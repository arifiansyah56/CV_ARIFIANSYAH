import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "innate-treat-cmbw7",
  appId: "1:602364000136:web:627ff35ed8305036edec3d",
  apiKey: "AIzaSyB8-g8nC2WxWcKYgCbYlv52KnPUaT3mBw8",
  authDomain: "innate-treat-cmbw7.firebaseapp.com",
  storageBucket: "innate-treat-cmbw7.firebasestorage.app",
  messagingSenderId: "602364000136",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-muhammadarifians-2aa7ced7-71e2-4af1-80c5-239919b8e38b");
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

