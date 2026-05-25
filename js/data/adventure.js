const ADVENTURE_CACHE = {};

const ADVENTURE_URL = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-2014-src/main/data/adventure/adventure-lmop.json';
const ADVENTURES_INDEX_URL = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-2014-src/main/data/adventures.json';

export async function loadAdventure(){
  if(ADVENTURE_CACHE.data) return ADVENTURE_CACHE;
  try{
    const [adventureRes, indexRes] = await Promise.all([
      fetch(ADVENTURE_URL),
      fetch(ADVENTURES_INDEX_URL),
    ]);
    if(adventureRes.ok) ADVENTURE_CACHE.data = await adventureRes.json();
    if(indexRes.ok) ADVENTURE_CACHE.index = await indexRes.json();
  }catch(e){ console.warn('Failed to load adventure data:', e); }
  return ADVENTURE_CACHE;
}

export function getChapter(n){
  const adv = ADVENTURE_CACHE.data;
  if(!adv) return null;
  return adv.adventure?.[0]?.adventure?.[n-1] ?? null;
}

export function getArea(areaId){
  const adv = ADVENTURE_CACHE.data;
  if(!adv) return null;
  for(const chapter of (adv.adventure?.[0]?.adventure || [])){
    for(const section of (chapter.sections || [])){
      if(section.id === areaId) return section;
    }
  }
  return null;
}

export function getAllAreas(){
  const adv = ADVENTURE_CACHE.data;
  if(!adv) return [];
  const areas = [];
  for(const chapter of (adv.adventure?.[0]?.adventure || [])){
    for(const section of (chapter.sections || [])){
      areas.push(section);
    }
  }
  return areas;
}

export function getAdventureTitle(){
  const adv = ADVENTURE_CACHE.data;
  return adv?.adventure?.[0]?.name ?? 'Lost Mine of Phandelver';
}
