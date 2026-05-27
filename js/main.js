import { initApp } from './data/loader.js';
import { renderDots, goStep } from './builder/builder.js';
import { step1Next, sendIt, onBackstoryInput } from './builder/step-name.js';
import { G } from './shared/state.js';
import { step2Next, setRespec, buildClassGrid } from './builder/step-class.js';
import { getCampaignState, saveRespecState } from './shared/storage.js';
import { step3Next } from './builder/step-background.js';
import { step4Next } from './builder/step-species.js';
import { setMethod, rollStats, step5Next } from './builder/step-scores.js';
import { step6Next, toggleLanguage } from './builder/step-languages.js';
import { step7Next } from './builder/step-spells.js';
import { reviewBack, beginAdventure } from './builder/step-review.js';
import { selectMod, handleUpload, enterDungeon, sendCustom, restartGame } from './play/play.js';
import { closeOvl, openInfoOverlay } from './shared/overlay.js';
import { sendMagicLink, confirmMagicLink, onAuthReady, loadStateFromDb, wireFirebaseSaves, signInWithGoogle } from './shared/auth.js';

// ── Auth gate helpers ─────────────────────────────────────────────────────────

function showAuthView(name) {
  ['auth-form-view', 'auth-sent-view', 'auth-loading-view'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== name);
  });
}

function setAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (!el) return;
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}

async function handleGoogleSignIn() {
  const btn = document.getElementById('auth-google-btn');
  btn.disabled    = true;
  btn.textContent = 'Signing in…';
  setAuthError('');

  try {
    const uid = await signInWithGoogle();
    showAuthView('auth-loading-view');
    await loadStateFromDb(uid);
    wireFirebaseSaves(uid);
    document.getElementById('auth-gate').classList.add('hidden');
    init();
  } catch (e) {
    btn.disabled    = false;
    btn.textContent = 'Sign in with Google';
    if (e.code !== 'auth/popup-closed-by-user') {
      setAuthError('Google sign-in failed. Please try again.');
    }
  }
}

async function handleSendLink() {
  const emailEl = document.getElementById('auth-email');
  const btn     = document.getElementById('auth-send-btn');
  const email   = emailEl?.value.trim() ?? '';

  setAuthError('');

  if (!email || !email.includes('@')) {
    setAuthError('Please enter a valid email address.');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  try {
    await sendMagicLink(email);
    showAuthView('auth-sent-view');
  } catch (e) {
    btn.disabled    = false;
    btn.textContent = 'Send Magic Link';
    setAuthError('Failed to send link. Check your email and try again.');
  }
}

// ── App init (runs only after auth) ──────────────────────────────────────────

function init() {
  renderDots();
  selectMod('lmop');
  initApp();
}

// ── Expose functions needed by inline onclick handlers ────────────────────────

window.goStep           = goStep;
window.step1Next        = step1Next;
window.sendIt           = sendIt;
window.onBackstoryInput = onBackstoryInput;
window.sendItAgain      = function(){ sendIt(G.char.backstory); };
window.step2Next        = step2Next;
window.step3Next        = step3Next;
window.step4Next        = step4Next;
window.setMethod        = setMethod;
window.rollStats        = rollStats;
window.step5Next        = step5Next;
window.step6Next        = step6Next;
window.toggleLanguage   = toggleLanguage;
window.step7Next        = step7Next;
window.reviewBack       = reviewBack;
window.beginAdventure   = beginAdventure;
window.selectMod        = selectMod;
window.enterDungeon     = enterDungeon;
window.sendCustom       = sendCustom;
window.closeOvl         = closeOvl;
window.openInfoOverlay  = openInfoOverlay;
window.restartGame      = restartGame;
window.doRespec = function(){
  const cs = getCampaignState() || {};
  saveRespecState(cs);
  document.getElementById('play').style.display = 'none';
  document.getElementById('phase1').classList.remove('hidden');
  setRespec(true);
  goStep(2);
  buildClassGrid();
};

// keydown for custom action input
document.addEventListener('keydown', e => {
  if(e.key==='Enter' && document.getElementById('custom-row').style.display!=='none') sendCustom();
});

// ── Auth gate wiring ──────────────────────────────────────────────────────────

document.getElementById('auth-google-btn')?.addEventListener('click', handleGoogleSignIn);
document.getElementById('auth-send-btn')?.addEventListener('click', handleSendLink);
document.getElementById('auth-email')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSendLink();
});

// ── Boot sequence ─────────────────────────────────────────────────────────────

(async () => {
  // Check if this page load is a magic link return
  let isMagicLink = false;
  try {
    isMagicLink = await confirmMagicLink();
  } catch (e) {
    // Link expired or already used — stay on form, show error
    setAuthError('Sign-in link is invalid or has expired. Please try again.');
  }

  if (isMagicLink) {
    showAuthView('auth-loading-view');
  }

  // Wait for Firebase auth state to resolve (fires once)
  onAuthReady(async uid => {
    if (uid) {
      // Pull Firebase state into localStorage before the game reads anything
      await loadStateFromDb(uid);
      // Wire all future saves to also go to Firebase
      wireFirebaseSaves(uid);
      // Dismiss gate and start the game
      document.getElementById('auth-gate').classList.add('hidden');
      init();
    }
    // uid === null: gate stays visible, user sees the form
  });
})();
