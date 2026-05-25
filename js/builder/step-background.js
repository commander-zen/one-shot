import { G } from '../shared/state.js';
import { goStep, pgBadge } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveBackgrounds } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { saveBackground } from '../shared/storage.js';
import { buildRaceGrid } from './step-species.js';

const BACKGROUND_VIBES = {
  Acolyte:'Faith was your foundation.',
  Artisan:'You built things. Good things.',
  Charlatan:'The truth is whatever you need it to be.',
  Criminal:'You know how the other half lives. You were it.',
  Entertainer:'The crowd loved you. Still does.',
  Farmer:'Hard work, honest living, calloused hands.',
  Guard:"You kept watch so others didn't have to.",
  Guide:'You know the way. Every way.',
  Hermit:"Solitude taught you things people can't.",
  Merchant:'Every deal is an opportunity. You never miss one.',
  Noble:'Born to privilege. Expected to lead.',
  Sage:'You read everything. Then read it again.',
  Sailor:'The sea was home. The horizon, a dare.',
  Scribe:"Words have power. You've recorded all of them.",
  Soldier:'Trained, disciplined, battle-tested.',
  Wayfarer:'The road is home. Everywhere else is temporary.',
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

export function buildBackground(){
  const g=document.getElementById('background-grid');
  g.innerHTML='';
  const isPG=document.body.classList.contains('powergamer-on');
  let bgs=getActiveBackgrounds();
  if(isPG){
    bgs.sort((a,b)=>{
      const ra=RATING_ORDER[getRating(G.char.cls,'backgrounds',a.name)]??4;
      const rb=RATING_ORDER[getRating(G.char.cls,'backgrounds',b.name)]??4;
      return ra!==rb?ra-rb:a.name.localeCompare(b.name);
    });
  } else {
    bgs.sort((a,b)=>a.name.localeCompare(b.name));
  }
  bgs.forEach(bg=>{
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${bg.name}</h4><p class="card-tagline">${BACKGROUND_VIBES[bg.name]||''}</p>`;
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    const mechText=`Skills: ${bg.skills.join(', ')}${bg.feat?' · Origin Feat: '+bg.feat:''}`;
    infoBtn.onclick=e=>{e.stopPropagation();openInfoOverlay(bg.name,mechText,`https://rpgbot.net/2024-dnd/backgrounds/${bg.name.toLowerCase()}/`);};
    c.appendChild(infoBtn);
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
