import { initApp } from './data/loader.js';
import { renderDots, goStep } from './builder/builder.js';
import { step1Next } from './builder/step-name.js';
import { step2Next } from './builder/step-class.js';
import { step3Next } from './builder/step-background.js';
import { step4Next } from './builder/step-species.js';
import { setMethod, rollStats, step5Next } from './builder/step-scores.js';
import { step6Next, toggleLanguage } from './builder/step-languages.js';
import { step7Next } from './builder/step-spells.js';
import { reviewBack, beginAdventure } from './builder/step-review.js';
import { selectMod, handleUpload, enterDungeon, sendCustom, restartGame } from './play/play.js';
import { closeOvl, openInfoOverlay } from './shared/overlay.js';

// Expose functions needed by inline onclick handlers
window.goStep           = goStep;
window.step1Next        = step1Next;
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

// keydown for custom action input
document.addEventListener('keydown', e => {
  if(e.key==='Enter' && document.getElementById('custom-row').style.display!=='none') sendCustom();
});

function init(){
  renderDots();
  selectMod('lmop');
  initApp();
}

init();
