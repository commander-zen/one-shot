import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveRaces } from '../data/schema.js';
import { getRating, applyTier, tierLegendHTML } from '../data/ratings.js';
import { buildStatAssign } from './step-scores.js';

const SPECIES_VIBES = {
  Aasimar: "Touched by celestial fire from birth",
  Dragonborn: "Ancient draconic blood runs hot",
  Dwarf: "Stubborn, sturdy, and built to last",
  Elf: "Older than memory, sharper than steel",
  Gnome: "Curiosity with a dangerous imagination",
  Goliath: "Mountain-born and made for extremes",
  Halfling: "Luck bends for them. Always.",
  Orc: "Tough as nails and impossible to put down",
  Human: "Adaptable, ambitious, and everywhere",
  Tiefling: "Infernal heritage, entirely their own story"
};

const SPECIES_WHY = {
  Aasimar: "A-tier. Healing Hands, Darkvision, and Radiant Resistance are all useful. Celestial Revelation gives a powerful transformation with flight. Strong for Paladins and Clerics.",
  Dragonborn: "B-tier. Breath Weapon now scales with proficiency bonus. Draconic ancestry gives damage resistance. Solid pick but outpaced by Aasimar and Tiefling for spellcasters.",
  Dwarf: "A-tier. Poison resistance, Darkvision, and free tool proficiency. Dwarven Resilience gives advantage on poison saves. Excellent for martial classes.",
  Elf: "A-tier. Fey Ancestry, Trance, and Darkvision are all passive value. High Elf gets a free cantrip. Wood Elf gets speed and stealth. Consistently strong.",
  Gnome: "B-tier. Gnomish Cunning gives advantage on INT/WIS/CHA saves against magic — surprisingly powerful. Forest Gnome gets Minor Illusion free.",
  Goliath: "A-tier. Giant Ancestry powers are strong utility options. Stone's Endurance gives a free damage reduction reaction. Excellent for Barbarians and Fighters.",
  Halfling: "A-tier. Lucky is one of the best racial features in the game — reroll any 1 on attack, ability check, or save. Brave gives advantage against fear.",
  Orc: "A-tier for martials. Relentless Endurance lets you survive a killing blow once per long rest. Adrenaline Rush gives you a free Dash plus temp HP — great for melee fighters who want to stay in the fight.",
  Human: "S-tier. Heroic Inspiration once per long rest and proficiency in any skill of choice. Best pick for any class that benefits from flexible stat distribution.",
  Tiefling: "A-tier. Infernal Legacy gives Hellish Rebuke and Darkness free. Darkvision and fire resistance are always useful. Especially strong for Warlocks and Rogues."
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
