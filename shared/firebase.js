import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { applyI18n, getTranslation } from "./i18n.js";

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

/**
 * Initializes the user account popup across pages.
 * Toggles popup visibility, displays user email + logout when authenticated,
 * or Login / Sign Up links when unauthenticated.
 * 
 * @param {string} authDir Relative path to the auth directory (default: '../auth')
 */
export function initUserAccountPopup(authDir = "../auth") {
  const init = () => {
    const accountBtn = document.querySelector('.user-btn');
    const popup = document.getElementById('account-popup');
    const content = document.getElementById('account-content');

    if (!accountBtn || !popup || !content) return;

    accountBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('hidden');
    });

    window.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && !accountBtn.contains(e.target)) {
        popup.classList.add('hidden');
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName || user.email;
        content.innerHTML = `
          <p> ${displayName}</p>
          <a href="#" id="logout-btn" data-i18n="sign_out">${getTranslation('sign_out')}</a>
        `;
        applyI18n();
        setTimeout(() => {
          const logoutBtn = document.getElementById('logout-btn');
          if (logoutBtn) {
            logoutBtn.addEventListener('click', async (e) => {
              e.preventDefault();
              await signOut(auth);
              alert(getTranslation('session_ended'));
              location.reload();
            });
          }
        }, 0);
      } else {
        content.innerHTML = `
          <a href="${authDir}/login.html" data-i18n="login_btn">${getTranslation('login_btn')}</a>
          <a href="${authDir}/create.html" data-i18n="sign_up">${getTranslation('sign_up')}</a>
        `;
        applyI18n();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Initiates Google Sign-In via popup.
 * @returns {Promise<Object>}
 */
export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export { firebaseConfig, auth, googleProvider };
