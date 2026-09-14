// shared/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
/**
 * Firebase Web Client Configuration
 *
 * NOTE ON SECURITY & PUBLIC VISIBILITY:
 * In client-side Firebase web applications, `firebaseConfig` properties (including `apiKey`)
 * serve as public project identifiers rather than private backend secrets. They are
 * inherently exposed to and required by the client's browser to connect to Firebase services.
 *
 * Data security and access control are NOT enforced by hiding this configuration, but rather
 * guaranteed server-side on Google's infrastructure via:
 * 1. Cloud Firestore Security Rules (ensuring users can only access their own documents: `request.auth.uid == resource.data.userId`).
 * 2. Google Cloud Console API Key Restrictions (limiting allowed HTTP referrers/domains).
 * 3. Firebase Authentication session verification and signup controls.
 */
const firebaseConfig = {
  apiKey: "AIzaSyC0_jTfxwKbJ9_ncqCC2gFnm14Qwcek6X4",
  authDomain: "topcinema-tw.firebaseapp.com",
  projectId: "topcinema-tw",
  storageBucket: "topcinema-tw.firebasestorage.app",
  messagingSenderId: "756477789103",
  appId: "1:756477789103:web:6cda61b9a704273d5be55a",
  measurementId: "G-SMS3YSL43V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { firebaseConfig, auth };

