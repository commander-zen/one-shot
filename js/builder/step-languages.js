import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { saveLanguages } from '../shared/storage.js';
import { buildSpellPicker } from './step-spells.js';
import { buildReview } from './step-review.js';

const DEFAULT_EXTRA = ['Goblin', 'Dwarvish'];
const SUBSTITUTIONS = { Goblin: 'Orc', Dwarvish: 'Elvish' };

function pickLanguages(){
  const speciesLangs = [];
  const extras = [];
  for(const lang of DEFAULT_EXTRA){
    extras.push(speciesLangs.includes(lang) ? SUBSTITUTIONS[lang] : lang);
  }
  return ['Common', ...extras];
}

export function buildLanguages(){
  const langs = pickLanguages();
  G.char.languages = langs;
  saveLanguages(langs);

  const list = document.getElementById('lang-list');
  const count = document.getElementById('lang-count');
  if(count) count.style.display = 'none';

  const oldGuide = document.getElementById('lang-guidance');
  if(oldGuide) oldGuide.remove();

  if(list) list.innerHTML = '';

  let msgEl = document.getElementById('lang-auto-msg');
  if(!msgEl){
    msgEl = document.createElement('div');
    msgEl.id = 'lang-auto-msg';
    msgEl.style.cssText = 'font-family:"Noto Serif",serif;font-size:16px;color:#d4b896;line-height:1.7;padding:16px 0 8px;';
    if(list) list.insertAdjacentElement('beforebegin', msgEl);
  }
  msgEl.textContent = `You speak ${langs.join(', ')} — useful for the road ahead.`;

  const nextBtn = document.getElementById('lang-next');
  if(nextBtn){ nextBtn.disabled = false; nextBtn.textContent = 'Continue →'; }
}

export function step6Next(){
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

export function toggleLanguage(){}
