const BESTIARY_CACHE = { lmop: [], mm: [] };

const LMOP_URL = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-2014-src/main/data/bestiary/bestiary-lmop.json';
const MM_URL   = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/bestiary/bestiary-mm.json';

export async function loadBestiary(){
  try{
    const [lmopRes, mmRes] = await Promise.all([
      fetch(LMOP_URL),
      fetch(MM_URL),
    ]);
    if(lmopRes.ok){ const d = await lmopRes.json(); BESTIARY_CACHE.lmop = d.monster || []; }
    if(mmRes.ok)  { const d = await mmRes.json();   BESTIARY_CACHE.mm   = d.monster || []; }
  }catch(e){ console.warn('Failed to load bestiary data:', e); }
  return BESTIARY_CACHE;
}

export function getMonster(name){
  const key = name.toLowerCase();
  const fromMM   = BESTIARY_CACHE.mm.find(m => m.name.toLowerCase() === key);
  if(fromMM) return fromMM;
  const fromLmop = BESTIARY_CACHE.lmop.find(m => m.name.toLowerCase() === key);
  return fromLmop ?? null;
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
  const combined = [...BESTIARY_CACHE.mm, ...BESTIARY_CACHE.lmop];
  return combined.filter(m => crToNum(m.cr) <= max);
}
