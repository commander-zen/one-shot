export const DATA_CACHE = {};
export const rulesetRef = { value: '5.5e' };

const BASE_URL = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/';

export const CLASS_FILES = ['barbarian','bard','cleric','druid','fighter','monk','paladin','ranger','rogue','sorcerer','warlock','wizard'];

export async function safeFetch(url, optional=false){
  try{
    const res = await fetch(url);
    if(!res.ok){ if(!optional) console.warn('Failed to fetch:', url); return null; }
    return await res.json();
  }catch(e){ console.warn('Fetch error:', url, e); return null; }
}

export async function fetchGameData(){
  if(DATA_CACHE['5.5e']) return;
  const results = await Promise.all([
    safeFetch(BASE_URL + 'races.json'),
    safeFetch(BASE_URL + 'spells/spells-phb.json'),
    safeFetch(BASE_URL + 'spells/spells-xge.json', true),
    safeFetch(BASE_URL + 'spells/spells-tce.json', true),
    ...CLASS_FILES.map(n => safeFetch(BASE_URL + `class/class-${n}.json`)),
  ]);
  const [races, spellsPhb, spellsXge, spellsTce, ...classResults] = results;
  const cache = { races, spells: [spellsPhb, spellsXge, spellsTce].filter(Boolean), classes: {} };
  CLASS_FILES.forEach((n,i) => { cache.classes[n] = classResults[i]; });
  DATA_CACHE['5.5e'] = cache;
}

export async function initApp(){
  document.getElementById('phase-loading').classList.remove('hidden');

  await fetchGameData();

  document.getElementById('phase-loading').classList.add('hidden');
  document.getElementById('phase1').classList.remove('hidden');
}
