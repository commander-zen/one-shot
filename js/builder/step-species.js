import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveRaces } from '../data/schema.js';
import { getRating, applyTier, tierLegendHTML } from '../data/ratings.js';
import { buildStatAssign } from './step-scores.js';

const SPECIES_VIBES = {
  Aasimar:    "Celestial radiance heals nearby allies and eventually lets you fly",
  Dragonborn: "Draconic ancestry gives you a breath weapon and resistance to that damage type",
  Dwarf:      "Resistant to poison, built tough — your HP stays higher than most",
  Elf:        "Keen senses, can't be put to sleep by magic, and never need to fully rest",
  Gnome:      "Resistant to mental magic — illusions and charms barely touch you",
  Goliath:    "Giant ancestry lets you reduce a big hit once per combat — staying in the fight when others would go down",
  Halfling:   "Once per turn you can reroll a 1 — luck keeps you alive when others would fall",
  Human:      "Naturally gifted — you get an extra feat at level 1 that other species don't",
  Orc:        "When you'd drop to zero HP, you stay at 1 instead — you just don't go down",
  Tiefling:   "Hellish resistance to fire and a set of innate spells that cost no spell slots",
};

const SPECIES_WHY = {
  Aasimar:    "Healing Hands provides free healing, Celestial Revelation adds a damage or healing aura, and eventual flight — strong at every tier",
  Dragonborn: "Breath weapon gives a reliable area attack option that scales with level, and the paired damage resistance is useful for frontline classes",
  Dwarf:      "Stonecunning provides Tremorsense and Dwarven Resilience adds poison resistance and advantage on poison saves — consistently useful for martials",
  Elf:        "Darkvision, Fey Ancestry (can't be put to sleep by magic), and Keen Senses combine into a consistently useful package for any class",
  Gnome:      "Gnomish Cunning gives advantage on all INT/WIS/CHA saves against magic, making you dramatically harder to control with spells",
  Goliath:    "Stone's Endurance lets you reduce significant damage once per short rest, keeping you in fights longer than most other species",
  Halfling:   "Lucky — rerolling 1s on attack rolls, saves, and ability checks — provides a subtle but consistent statistical advantage every session",
  Human:      "Ranked highly across most classes because an extra feat at level 1 provides a significant power boost unavailable to any other species",
  Orc:        "Relentless Endurance prevents you from dropping to 0 HP once per long rest — particularly strong for frontline characters",
  Tiefling:   "Hellish Resistance to fire damage and free spells (Hellish Rebuke, Darkness) that never consume your spell slots",
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

export function buildRaceGrid(){
  const g=document.getElementById('race-grid');
  g.innerHTML='';

  // Tier legend
  let legend=document.getElementById('species-tier-legend');
  if(!legend){
    legend=document.createElement('div');
    legend.id='species-tier-legend';
    legend.innerHTML=tierLegendHTML();
    g.insertAdjacentElement('beforebegin',legend);
  }

  const races=getActiveRaces();
  let entries=Object.entries(races);
  entries.sort(([a],[b])=>{
    const ra=RATING_ORDER[getRating(G.char.cls,'species',a)]??4;
    const rb=RATING_ORDER[getRating(G.char.cls,'species',b)]??4;
    return ra!==rb?ra-rb:a.localeCompare(b);
  });
  entries.forEach(([name,data])=>{
    const mechText=`${data.desc} · Speed ${data.speed}ft`;
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${name}</h4><p class="card-tagline">${SPECIES_VIBES[name]||data.desc}</p>`;
    applyTier(c, getRating(G.char.cls, 'species', name));
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    infoBtn.onclick=e=>{
      e.stopPropagation();
      const body=`<p>${SPECIES_VIBES[name]||data.desc}</p><p style="margin-top:10px">${SPECIES_WHY[name]||''}</p><p style="margin-top:10px;color:#aaa">${mechText}</p>`;
      openInfoOverlay(name,body,`https://rpgbot.net/2024-dnd/species/${name.toLowerCase()}/`);
    };
    c.appendChild(infoBtn);
    c.onclick=()=>selectRace(name,c);
    g.appendChild(c);
  });
}

export function selectRace(name,el){
  document.querySelectorAll('#race-grid .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  G.char.race=name;
  const raceData=getActiveRaces()[name];
  G.char.speed=raceData.speed;
  document.getElementById('race-note').textContent=`${name}: ${raceData.desc} · Speed ${raceData.speed}ft`;
  document.getElementById('race-next').disabled=false;
}

export function step4Next(){
  if(!G.char.race){toast('Select a race.');return;}
  goStep(5);
  buildStatAssign();
}
