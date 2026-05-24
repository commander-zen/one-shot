import { G } from '../shared/state.js';
import { goStep, pgBadge } from './builder.js';
import { toast } from '../shared/overlay.js';
import { getActiveRaces } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { buildStatAssign } from './step-scores.js';

export function buildRaceGrid(){
  const g=document.getElementById('race-grid');
  g.innerHTML='';
  Object.entries(getActiveRaces()).forEach(([name,data])=>{
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${name}</h4><p>${data.desc}</p>`;
    c.appendChild(pgBadge(getRating(G.char.cls,'species',name)));
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
