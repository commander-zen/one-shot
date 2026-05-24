import { initApp } from './data/loader.js';
import { renderDots, goStep, initPowerGamer, togglePowerGamer } from './builder/builder.js';
import { step1Next } from './builder/step-name.js';
import { step2Next } from './builder/step-species.js';
import { step3Next } from './builder/step-class.js';
import { setMethod, rollStats, step4Next } from './builder/step-scores.js';
import { step5Next } from './builder/step-spells.js';
import { reviewBack, beginAdventure } from './builder/step-review.js';
import { selectMod, handleUpload, enterDungeon, sendCustom, restartGame } from './play/play.js';
import { closeOvl } from './shared/overlay.js';

// Expose functions needed by inline onclick handlers
window.goStep            = goStep;
window.togglePowerGamer  = togglePowerGamer;
window.step1Next     = step1Next;
window.step2Next     = step2Next;
window.step3Next     = step3Next;
window.setMethod     = setMethod;
window.rollStats     = rollStats;
window.step4Next     = step4Next;
window.step5Next     = step5Next;
window.reviewBack    = reviewBack;
window.beginAdventure = beginAdventure;
window.selectMod     = selectMod;
window.enterDungeon  = enterDungeon;
window.sendCustom    = sendCustom;
window.closeOvl      = closeOvl;
window.restartGame   = restartGame;

// keydown for custom action input
document.addEventListener('keydown', e => {
  if(e.key==='Enter' && document.getElementById('custom-row').style.display!=='none') sendCustom();
});

function init(){
  renderDots();
  selectMod('lmop');
  initPowerGamer();
  initApp();
}

init();
