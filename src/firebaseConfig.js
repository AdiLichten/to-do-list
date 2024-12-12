import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc , deleteDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, GoogleAuthProvider, signInWithPopup, signOut, db, collection, addDoc, getDocs, doc, setDoc, getDoc, deleteDoc };