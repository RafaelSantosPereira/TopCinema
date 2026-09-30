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
        const displayName = user.displayName || user.email || '';
        content.innerHTML = `
          <p id="user-display-name"></p>
          <a href="#" id="logout-btn" data-i18n="sign_out">${getTranslation('sign_out')}</a>
        `;
        const nameEl = content.querySelector('#user-display-name');
        if (nameEl) {
          nameEl.textContent = ` ${displayName}`;
        }
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

/**
 * Cria a playlist padrão (ex: "Ver mais tarde" / "Watch Later") para o utilizador no Cloud Firestore.
 * 
 * @param {Object} user Instância do utilizador Firebase Auth
 * @param {string|null} [customTitle=null] Título opcional personalizado
 * @returns {Promise<string|null>} ID da playlist criada ou null em caso de erro
 */
export async function createDefaultPlaylist(user, customTitle = null) {
  try {
    if (!user) return null;
    const title = customTitle || getTranslation('default_playlist_name') || 'Watch Later';
    const token = await user.getIdToken();
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/playlists`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: {
            title: { stringValue: title },
            userId: { stringValue: user.uid },
            createdAt: { timestampValue: new Date().toISOString() }
          }
        })
      }
    );

    if (!response.ok) {
      console.warn("Failed to create default playlist:", await response.text());
      return null;
    }

    const createdDoc = await response.json();
    return createdDoc.name ? createdDoc.name.split("/").pop() : null;
  } catch (error) {
    console.warn("Error creating default playlist:", error);
    return null;
  }
}

/**
 * Verifica se o utilizador já tem pelo menos uma playlist. Se não tiver, cria a playlist padrão.
 * 
 * @param {Object} user Instância do utilizador Firebase Auth
 * @returns {Promise<string|null>} ID da playlist padrão se criada, ou null
 */
export async function ensureUserHasDefaultPlaylist(user) {
  try {
    if (!user) return null;
    const token = await user.getIdToken();
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:runQuery`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "playlists" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "userId" },
                op: "EQUAL",
                value: { stringValue: user.uid }
              }
            },
            limit: 1
          }
        })
      }
    );

    if (response.ok) {
      const result = await response.json();
      const hasPlaylists = Array.isArray(result) && result.some(doc => doc && doc.document);
      if (!hasPlaylists) {
        return await createDefaultPlaylist(user);
      }
    }
    return null;
  } catch (error) {
    console.warn("Error ensuring default playlist:", error);
    return null;
  }
}

export { firebaseConfig, auth, googleProvider };
