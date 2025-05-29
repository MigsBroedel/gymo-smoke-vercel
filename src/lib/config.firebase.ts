import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

// Sua config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtyFS6YAIugRC3p94rxE9W4lBYJ1F3bDQ",
  authDomain: "gymo-bf693.firebaseapp.com",
  projectId: "gymo-bf693",
  storageBucket: "gymo-bf693.firebasestorage.app",
  messagingSenderId: "52467557146",
  appId: "1:52467557146:web:6b600447c34902e500c2a3",
  measurementId: "G-8TN6T2CS1V"
};

const app = initializeApp(firebaseConfig);

// Analytics só funciona no navegador (não SSR)
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
  console.log("✅ Analytics inicializado:", analytics);
} else {
  console.log("⚠️ Ambiente fora do navegador, analytics não inicializado.");
}

export { analytics, logEvent };