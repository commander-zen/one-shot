// Firebase Auth + Realtime DB sync.
// Lazily initializes Firebase on first use — no SDK loaded until auth functions are called.

import { registerSaveHook } from './storage.js';
import { promptEmail } from './overlay.js';

const FB_VERSION = '10.14.1';
const FB_CDN = `https://www.gstatic.com/firebasejs/${FB_VERSION}`;
const ACTION_URL = 'https://one-shot-taupe.vercel.app';

let _app, _auth, _db;
let _authMod, _dbMod;
let _uid = null;

async function initFirebase() {
  if (_app) return;
  const cfg = await fetch('/api/firebase-config').then(r => r.json());
  if (!cfg.apiKey) throw new Error('Firebase config missing — set FIREBASE_API_KEY in Vercel env vars');

  const { initializeApp } = await import(`${FB_CDN}/firebase-app.js`);
  _authMod = await import(`${FB_CDN}/firebase-auth.js`);
  _dbMod   = await import(`${FB_CDN}/firebase-database.js`);

  _app  = initializeApp(cfg);
  _auth = _authMod.getAuth(_app);
  _db   = _dbMod.getDatabase(_app);
}

// Sends a magic link email. Stores email in localStorage for the return trip.
export async function sendMagicLink(email) {
  await initFirebase();
  await _authMod.sendSignInLinkToEmail(_auth, email, {
    url: ACTION_URL,
    handleCodeInApp: true,
  });
  localStorage.setItem('emailForSignIn', email);
}

// Called on every page load. If the URL is a magic link, completes sign-in and cleans the URL.
// Returns true if a sign-in was attempted, false if the URL is not a magic link.
export async function confirmMagicLink() {
  await initFirebase();
  if (!_authMod.isSignInWithEmailLink(_auth, window.location.href)) return false;

  let email = localStorage.getItem('emailForSignIn');
  if (!email) {
    // Cross-device case: user opened link on a different device
    email = await promptEmail('Enter the email address you used to request the sign-in link.');
    if (!email) return false;
  }

  try {
    await _authMod.signInWithEmailLink(_auth, email, window.location.href);
    localStorage.removeItem('emailForSignIn');
    window.history.replaceState({}, document.title, window.location.pathname);
    return true;
  } catch (e) {
    console.error('Magic link sign-in failed:', e.message);
    localStorage.removeItem('emailForSignIn');
    window.history.replaceState({}, document.title, window.location.pathname);
    throw e;
  }
}

// Returns the current Firebase user or null.
export function getCurrentUser() {
  return _auth?.currentUser ?? null;
}

// Calls callback(uid) when auth state is resolved. uid is null if not signed in.
// Only fires once — use for initialization gating.
export function onAuthReady(callback) {
  initFirebase().then(() => {
    if (!_auth) {
      console.error('Auth init error: _auth is null after initFirebase');
      callback(null);
      return;
    }
    try {
      const unsub = _authMod.onAuthStateChanged(_auth, user => {
        _uid = user?.uid ?? null;
        unsub(); // fire once only
        callback(_uid);
      });
    } catch (err) {
      console.error('Auth init error:', err);
      callback(null);
    }
  }).catch(err => {
    console.error('Auth init error:', err);
    callback(null);
  });
}

// Loads all oneshot_ keys from Firebase into localStorage.
// Called on sign-in so the local game state is up-to-date before init runs.
export async function loadStateFromDb(uid) {
  if (!_db || !uid) return;
  try {
    const snap = await _dbMod.get(_dbMod.ref(_db, `users/${uid}`));
    if (!snap.exists()) return;
    const data = snap.val();
    Object.entries(data).forEach(([k, v]) => {
      if (k.startsWith('oneshot_')) {
        localStorage.setItem(k, JSON.stringify(v));
      }
    });
  } catch (e) {
    console.warn('Firebase state load failed, using localStorage:', e.message);
  }
}

// Signs in via Google OAuth popup. Returns uid on success, throws on failure.
export async function signInWithGoogle() {
  await initFirebase();
  const provider = new _authMod.GoogleAuthProvider();
  const result = await _authMod.signInWithPopup(_auth, provider);
  _uid = result.user.uid;
  return _uid;
}

// Registers a save hook so every storage write also syncs to Firebase.
// Call this after auth resolves so the uid is available.
export function wireFirebaseSaves(uid) {
  if (!_db || !uid) return;
  registerSaveHook((key, val) => {
    // key is already prefixed: 'oneshot_character', 'oneshot_campaign_state', etc.
    _dbMod.set(_dbMod.ref(_db, `users/${uid}/${key}`), val).catch(() => {});
  });
}
