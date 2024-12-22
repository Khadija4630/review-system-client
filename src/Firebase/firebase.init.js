// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSaJq4lZFYUgaWWZaKwXwpYCgRcd1bSxs",
  authDomain: "review-system-client-11.firebaseapp.com",
  projectId: "review-system-client-11",
  storageBucket: "review-system-client-11.firebasestorage.app",
  messagingSenderId: "710874078121",
  appId: "1:710874078121:web:f087b4e926f573efa202b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth,googleProvider};