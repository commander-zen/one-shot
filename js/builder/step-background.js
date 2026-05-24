import { G } from '../shared/state.js';
import { goStep, pgBadge } from './builder.js';
import { toast } from '../shared/overlay.js';
import { getActiveBackgrounds } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { saveBackground } from '../shared/storage.js';
import { buildRaceGrid } from './step-species.js';

export function buildBackground(){
  const g=document.getElementById('background-grid');
  g.innerHTML='';
  getActiveBackgrounds().forEach(bg=>{
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${bg.name}</h4><p>${bg.skills.join(', ')}</p>${bg.feat?`<p style="font-size:.75rem;color:var(--dim);margin-top:3px">Feat: ${bg.feat}</p>`:''}`;
    c.appendChild(pgBadge(getRating(G.char.cls,'backgrounds',bg.name)));
    c.onclick=()=>selectBackground(bg,c);
    g.appendChild(c);
  });
  document.getElementById('background-next').disabled=true;
}

function selectBackground(bg,el){
  document.querySelectorAll('#background-grid .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  G.char.background=bg.name;
  G.char.bgSkills=bg.skills;
  G.char.bgFeat=bg.feat;
  document.getElementById('background-next').disabled=false;
}

export function step3Next(){
  if(!G.char.background){toast('Select a background.');return;}
  saveBackground({name:G.char.background,skills:G.char.bgSkills,feat:G.char.bgFeat});
  goStep(4);
  buildRaceGrid();
}
