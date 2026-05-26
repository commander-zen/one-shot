import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { saveLanguages } from '../shared/storage.js';
import { buildSpellPicker } from './step-spells.js';
import { buildReview } from './step-review.js';

const DEFAULT_EXTRA = ['Goblin', 'Dwarvish'];
const SUBSTITUTIONS = { Goblin: 'Orc', Dwarvish: 'Elvish' };

let _autoAdvanceTimer = null;

function pickLanguages(){
  // Determine any languages the species already grants (stub — 5.5e flexible ASI means most species don't)
  const speciesLangs = [];
  const extras = [];
  for(const lang of DEFAULT_EXTRA){
    if(speciesLangs.includes(lang)){
      extras.push(SUBSTITUTIONS[lang]);
    } else {
      extras.push(lang);
    }
  }
  return ['Common', ...extras];
}

export function buildLanguages(){
  if(_autoAdvanceTimer) clearTimeout(_autoAdvanceTimer);

  const langs = pickLanguages();
  G.char.languages = langs;
  saveLanguages(langs);

  const container = document.getElementById('step6');
  if(!container) return;

  // Remove old lang-guidance and lang-list content — replaced by auto-assign message
  const oldGuide = document.getElementById('lang-guidance');
  if(oldGuide) oldGuide.remove();

  const list = document.getElementById('lang-list');
  if(list) list.innerHTML = '';

  const count = document.getElementById('lang-count');
  if(count) count.style.display = 'none';

  // Show the auto-assign message
  let msgEl = document.getElementById('lang-auto-msg');
  if(!msgEl){
    msgEl = document.createElement('div');
    msgEl.id = 'lang-auto-msg';
    msgEl.style.cssText = 'font-family:"Noto Serif",serif;font-size:16px;color:#d4b896;line-height:1.7;padding:16px 0 8px;';
    if(list) list.insertAdjacentElement('beforebegin', msgEl);
  }
  msgEl.textContent = `You speak ${langs.join(', ')} — useful for the road ahead.`;

  // Enable Continue immediately
  const nextBtn = document.getElementById('lang-next');
  if(nextBtn){ nextBtn.disabled = false; nextBtn.textContent = 'Continue →'; }

  // Auto-advance after 1.5 s
  _autoAdvanceTimer = setTimeout(() => step6Next(), 1500);
}

export function step6Next(){
  if(_autoAdvanceTimer){ clearTimeout(_autoAdvanceTimer); _autoAdvanceTimer = null; }

  const langs = G.char.languages?.length ? G.char.languages : pickLanguages();
  G.char.languages = langs;
  saveLanguages(langs);

  if(G.char.sp){
    goStep(7);
    buildSpellPicker();
  } else {
    G.char.cantrips = [];
    G.char.spells = [];
    goStep(8);
    buildReview();
  }
}

// Stub — kept for backwards compat (no-op, UI no longer has chips to toggle)
export function toggleLanguage(){}
