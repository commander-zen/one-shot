import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveRaces } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { buildStatAssign } from './step-scores.js';

const SPECIES_VIBES = {
  Aasimar:'Touched by celestial light',
  Dragonborn:'Dragon blood runs hot in your veins',
  Dwarf:'Tough as stone, loyal as iron',
  Elf:'Ancient grace, keen senses, long memory',
  Gnome:'Curious, clever, and full of ideas',
  Goliath:'Mountain-born. Built like one too.',
  Halfling:'Small, lucky, and surprisingly hard to kill',
  Human:'Adaptable, ambitious, and everywhere',
  Orc:'Fierce, fast, and built to endure.',
  Tiefling:'Your bloodline turns heads — and raises suspicions',
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

export function buildRaceGrid(){
  const g=document.getElementById('race-grid');
  g.innerHTML='';
  const races=getActiveRaces();
  const isPG=document.body.classList.contains('powergamer-on');
  let entries=Object.entries(races);
  if(isPG){
    entries.sort(([a],[b])=>{
      const ra=RATING_ORDER[getRating(G.char.cls,'species',a)]??4;
      const rb=RATING_ORDER[getRating(G.char.cls,'species',b)]??4;
      return ra!==rb?ra-rb:a.localeCompare(b);
    });
  } else {
    entries.sort(([a],[b])=>a.localeCompare(b));
  }
  entries.forEach(([name,data])=>{
    const rating=getRating(G.char.cls,'species',name);
    const mechText=`${data.desc} · Speed ${data.speed}ft`;
    const c=document.createElement('div');
    c.className='opt-card';
    c.dataset.rating=rating||'';
    c.innerHTML=`<h4>${name}</h4><p class="card-tagline">${SPECIES_VIBES[name]||data.desc}</p><p class="card-mech">${mechText}</p>`;
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    infoBtn.onclick=e=>{e.stopPropagation();openInfoOverlay(name,mechText,`https://rpgbot.net/2024-dnd/species/${name.toLowerCase()}/`);};
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
