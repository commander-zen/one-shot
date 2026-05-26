const BESTIARY_CACHE = { pabtso: [], mm: [] };

const PABTSO_URL = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/bestiary/bestiary-pabtso.json';
const MM_URL     = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/bestiary/bestiary-mm.json';

export async function loadBestiary(){
  try{
    const [pabtsoRes, mmRes] = await Promise.all([
      fetch(PABTSO_URL),
      fetch(MM_URL),
    ]);
    if(pabtsoRes.ok){ const d = await pabtsoRes.json(); BESTIARY_CACHE.pabtso = d.monster || []; }
    if(mmRes.ok)    { const d = await mmRes.json();     BESTIARY_CACHE.mm     = d.monster || []; }
  }catch(e){ console.warn('Failed to load bestiary data:', e); }
  return BESTIARY_CACHE;
}

export function getMonster(name){
  const key = name.toLowerCase();
  const fromMM   = BESTIARY_CACHE.mm.find(m => m.name.toLowerCase() === key);
  if(fromMM) return fromMM;
  const fromPabtso = BESTIARY_CACHE.pabtso.find(m => m.name.toLowerCase() === key);
  return fromPabtso ?? null;
}

function crToNum(cr){
  if(cr == null) return 0;
  if(typeof cr === 'object') cr = cr.cr;
  if(cr === '1/8') return 0.125;
  if(cr === '1/4') return 0.25;
  if(cr === '1/2') return 0.5;
  return parseFloat(cr) || 0;
}

export function getMonstersByChallenge(cr){
  const max = crToNum(cr);
  const combined = [...BESTIARY_CACHE.mm, ...BESTIARY_CACHE.pabtso];
  return combined.filter(m => crToNum(m.cr) <= max);
}
