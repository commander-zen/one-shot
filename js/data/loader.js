import { getRuleset, setRuleset, clearChar } from '../shared/storage.js';

export const DATA_CACHE = {};
export const rulesetRef = { value: '5e' };  // mutable ref instead of reassignable export

export const BASE_URLS = {
  '5e':   'https://raw.githubusercontent.com/5etools-mirror-3/5etools-2014-src/master/data/',
  '5.5e': 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/master/data/',
};

export const CLASS_FILES = ['barbarian','bard','cleric','druid','fighter','monk','paladin','ranger','rogue','sorcerer','warlock','wizard'];

export async function safeFetch(url, optional=false){
  try{
    const res = await fetch(url);
    if(!res.ok){ if(!optional) console.warn('Failed to fetch:', url); return null; }
    return await res.json();
  }catch(e){ console.warn('Fetch error:', url, e); return null; }
}

export async function fetchGameData(edition){
  if(DATA_CACHE[edition]) return;
  const base = BASE_URLS[edition];
  const results = await Promise.all([
    safeFetch(base + 'races.json'),
    safeFetch(base + 'spells/spells-phb.json'),
    safeFetch(base + 'spells/spells-xge.json', true),
    safeFetch(base + 'spells/spells-tce.json', true),
    ...CLASS_FILES.map(n => safeFetch(base + `class/class-${n}.json`)),
  ]);
  const [races, spellsPhb, spellsXge, spellsTce, ...classResults] = results;
  const cache = { races, spells: [spellsPhb, spellsXge, spellsTce].filter(Boolean), classes: {} };
  CLASS_FILES.forEach((n,i) => { cache.classes[n] = classResults[i]; });
  DATA_CACHE[edition] = cache;
}

export async function chooseRuleset(edition){
  const prev = getRuleset();
  if(prev && prev !== edition) clearChar();
  setRuleset(edition);
  rulesetRef.value = edition;

  document.getElementById('rs-5e').classList.toggle('active', edition==='5e');
  document.getElementById('rs-5-5e').classList.toggle('active', edition==='5.5e');
  document.getElementById('phase0').classList.add('hidden');
  document.getElementById('phase-loading').classList.remove('hidden');
  document.getElementById('loading-title').textContent = `Loading ${edition} rulebook…`;

  await fetchGameData(edition);

  document.getElementById('phase-loading').classList.add('hidden');
  document.getElementById('phase1').classList.remove('hidden');
}

export function initRuleset(){
  const stored = getRuleset() || '5e';
  rulesetRef.value = stored;
  document.getElementById('rs-5e').classList.toggle('active', stored==='5e');
  document.getElementById('rs-5-5e').classList.toggle('active', stored==='5.5e');
}
