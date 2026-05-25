import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast } from '../shared/overlay.js';
import { saveLanguages } from '../shared/storage.js';
import { buildSpellPicker } from './step-spells.js';
import { buildReview } from './step-review.js';

const STANDARD_LANGUAGES = [
  'Common Sign Language','Draconic','Dwarvish','Elvish',
  'Giant','Gnomish','Goblin','Halfling','Orc',
];

let selLanguages = [];

export function buildLanguages(){
  selLanguages = [];
  const list = document.getElementById('lang-list');
  list.innerHTML = '';

  const common = document.createElement('div');
  common.className = 'skill-chip sel locked';
  common.textContent = 'Common';
  common.title = 'You always know Common';
  list.appendChild(common);

  STANDARD_LANGUAGES.forEach(lang => {
    const chip = document.createElement('div');
    chip.className = 'skill-chip';
    chip.textContent = lang;

    chip.onclick = () => toggleLanguage(lang, chip);
    list.appendChild(chip);
  });

  document.getElementById('lang-count').textContent = '0 of 2 selected';
  document.getElementById('lang-next').disabled = true;
}

export function toggleLanguage(lang, el){
  if(selLanguages.includes(lang)){
    selLanguages = selLanguages.filter(l => l !== lang);
    el.classList.remove('sel');
  } else {
    if(selLanguages.length >= 2){ toast('Choose only 2 languages.'); return; }
    selLanguages.push(lang);
    el.classList.add('sel');
  }
  document.getElementById('lang-count').textContent = `${selLanguages.length} of 2 selected`;
  document.getElementById('lang-next').disabled = selLanguages.length < 2;
}

export function step6Next(){
  if(selLanguages.length < 2){ toast('Choose 2 languages.'); return; }
  const all = ['Common', ...selLanguages];
  G.char.languages = all;
  saveLanguages(all);

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
