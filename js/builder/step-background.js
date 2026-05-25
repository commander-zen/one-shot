import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveBackgrounds } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { saveBackground } from '../shared/storage.js';
import { buildRaceGrid } from './step-species.js';

const BACKGROUND_VIBES = {
  Acolyte:'You served a temple, learning faith and ritual',
  Artisan:'You built things with your hands and your mind',
  Charlatan:"You've never met a mark you couldn't fool",
  Criminal:'You lived outside the law — and thrived',
  Entertainer:'The crowd lives and dies by your performance',
  Farmer:'The land shaped you. Hard work is in your bones.',
  Guard:'You stood watch so others could sleep safely',
  Guide:'You know every trail, pass, and shortcut',
  Hermit:'Solitude taught you things others will never know',
  Merchant:"You've made deals in a dozen cities",
  Noble:'Born to wealth and expectation',
  Sage:"You've spent your life chasing knowledge",
  Sailor:'The sea is home. Everywhere else is just a stop.',
  Scribe:"You've copied a thousand documents — and read them all",
  Soldier:"War is all you've ever known",
  Wayfarer:'The road is your home',
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

export function buildBackground(){
  const g=document.getElementById('background-grid');
  g.innerHTML='';
  const isPG=document.body.classList.contains('powergamer-on');
  let bgs=getActiveBackgrounds();
  const seen=new Set();
  bgs=bgs.filter(b=>seen.has(b.name)?false:seen.add(b.name));
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
    const rating=getRating(G.char.cls,'backgrounds',bg.name);
    const mechText=`Skills: ${bg.skills.join(', ')}${bg.feat?' · Origin Feat: '+bg.feat:''}`;
    const c=document.createElement('div');
    c.className='opt-card';
    c.dataset.rating=rating||'';
    c.innerHTML=`<h4>${bg.name}</h4><p class="card-tagline">${BACKGROUND_VIBES[bg.name]||''}</p><p class="card-mech">${mechText}</p>`;
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    infoBtn.onclick=e=>{e.stopPropagation();openInfoOverlay(bg.name,mechText,`https://rpgbot.net/2024-dnd/backgrounds/${bg.name.toLowerCase()}/`);};
    c.appendChild(infoBtn);
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
