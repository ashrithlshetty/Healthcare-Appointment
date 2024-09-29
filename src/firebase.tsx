// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'appoitment-auth.firebaseapp.com',
  projectId: 'appoitment-auth',
  storageBucket: 'appoitment-auth.appspot.com',
  messagingSenderId: '883416175898',
  appId: '1:883416175898:web:72b0055b58e2be1f5888a3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
