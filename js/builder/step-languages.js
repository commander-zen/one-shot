import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { saveLanguages } from '../shared/storage.js';
import { buildSpellPicker } from './step-spells.js';
import { buildReview } from './step-review.js';

const SPECIES_LANGUAGES = {
  'Human':      ['Common', 'Goblin'],
  'Elf':        ['Common', 'Elvish'],
  'Dwarf':      ['Common', 'Dwarvish'],
  'Halfling':   ['Common', 'Halfling'],
  'Orc':        ['Common', 'Orc'],
  'Tiefling':   ['Common', 'Infernal'],
  'Dragonborn': ['Common', 'Draconic'],
  'Gnome':      ['Common', 'Gnomish'],
  'Aasimar':    ['Common', 'Celestial'],
  'Goliath':    ['Common', 'Giant'],
};

const ALL_STANDARD_LANGUAGES = ['Dwarvish','Elvish','Giant','Gnomish','Goblin','Halfling','Orc','Abyssal','Celestial','Draconic','Deep Speech','Infernal','Primordial','Sylvan','Undercommon'];

function pickLanguages(){
  return SPECIES_LANGUAGES[G.char.race] ?? ['Common', 'Goblin'];
}

function updateLangMsg(){
  const langs = G.char.languages || [];
  const msgEl = document.getElementById('lang-auto-msg');
  if(msgEl) msgEl.textContent = `You speak ${langs.join(', ')} — useful for the road ahead.`;
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

  // Swap section
  let swapEl = document.getElementById('lang-swap');
  if(!swapEl){
    swapEl = document.createElement('div');
    swapEl.id = 'lang-swap';
    if(list) list.insertAdjacentElement('beforebegin', swapEl);
    else msgEl.insertAdjacentElement('afterend', swapEl);
  }

  const currentExtra = langs.find(l => l !== 'Common') || null;
  swapEl.innerHTML = `
    <p style="font-family:'Noto Serif',serif;font-size:14px;color:#b8956a;margin:14px 0 10px;line-height:1.5">Want to swap your second language?</p>
    <div class="skill-picks lang-swap-grid" id="lang-chip-grid"></div>
  `;

  const grid = swapEl.querySelector('#lang-chip-grid');
  ALL_STANDARD_LANGUAGES.forEach(lang => {
    const chip = document.createElement('div');
    chip.className = 'skill-chip' + (lang === currentExtra ? ' sel' : '');
    chip.style.minHeight = '44px';
    chip.dataset.lang = lang;
    chip.textContent = lang;
    chip.addEventListener('click', () => toggleLanguage(lang));
    grid.appendChild(chip);
  });

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

export function toggleLanguage(lang){
  const langs = G.char.languages || ['Common'];
  const newLangs = ['Common', lang];
  G.char.languages = newLangs;
  saveLanguages(newLangs);
  updateLangMsg();

  document.querySelectorAll('#lang-chip-grid .skill-chip').forEach(chip => {
    chip.classList.toggle('sel', chip.dataset.lang === lang);
  });
}
