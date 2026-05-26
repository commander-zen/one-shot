const ADVENTURE_CACHE = {};

const ADVENTURE_URL = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/adventure/adventure-pabtso.json';
const ADVENTURES_INDEX_URL = 'https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/adventures.json';

export async function loadAdventure(){
  if(ADVENTURE_CACHE.data) return ADVENTURE_CACHE;
  try{
    const [adventureRes, indexRes] = await Promise.all([
      fetch(ADVENTURE_URL),
      fetch(ADVENTURES_INDEX_URL),
    ]);
    if(adventureRes.ok){
      ADVENTURE_CACHE.data = await adventureRes.json();
      // Log structure so we can confirm the correct chapter path
      const adv = ADVENTURE_CACHE.data;
      console.log('[adventure] top-level keys:', Object.keys(adv));
      console.log('[adventure] chapter list:', (adv.adventure || []).map((c,i)=>({i, name:c.name, entryCount:(c.entries||[]).length})));
    }
    if(indexRes.ok) ADVENTURE_CACHE.index = await indexRes.json();
  }catch(e){ console.warn('Failed to load adventure data:', e); }
  return ADVENTURE_CACHE;
}

export function getChapter(n){
  const adv = ADVENTURE_CACHE.data;
  if(!adv) return null;
  const chapters = adv.adventure || [];

  // Search by chapter number in name first (most reliable)
  let chapter = chapters.find(c => {
    const name = (c.name || '').toLowerCase();
    return name.includes(`chapter ${n}`) || name.includes(`ch. ${n}`);
  });
  // Fall back to positional index
  if(!chapter) chapter = chapters[n - 1] ?? chapters[n] ?? null;
  if(!chapter) return null;

  // 5etools uses 'entries' not 'sections' — normalize for callers
  if(!chapter.sections) chapter.sections = chapter.entries || [];
  return chapter;
}

export function getArea(areaId){
  const adv = ADVENTURE_CACHE.data;
  if(!adv) return null;
  for(const chapter of (adv.adventure || [])){
    const sections = chapter.sections || chapter.entries || [];
    for(const section of sections){
      if(section.id === areaId) return section;
      // Check one level of sub-entries
      for(const sub of (section.entries || [])){
        if(sub?.id === areaId) return sub;
      }
    }
  }
  return null;
}

export function getAllAreas(){
  const adv = ADVENTURE_CACHE.data;
  if(!adv) return [];
  const areas = [];
  for(const chapter of (adv.adventure || [])){
    const sections = chapter.sections || chapter.entries || [];
    for(const section of sections){
      areas.push(section);
    }
  }
  return areas;
}

export function getAdventureTitle(){
  const adv = ADVENTURE_CACHE.data;
  return adv?.name ?? 'Phandelver and Below: The Shattered Obelisk';
}
