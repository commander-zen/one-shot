import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveBackgrounds } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { saveBackground } from '../shared/storage.js';
import { buildRaceGrid } from './step-species.js';

const BACKGROUND_VIBES = {
  Acolyte:    "Temple life made you sharp at reading people and deciphering ancient knowledge",
  Artisan:    "Crafting and commerce taught you to persuade, investigate, and get things done",
  Charlatan:  "A lifetime of cons means you can deceive anyone and slip out of any situation",
  Criminal:   "Working outside the law sharpened your talent for stealth and deception",
  Entertainer:"The stage built your charm — you're persuasive, acrobatic, and hard to ignore",
  Farmer:     "Hard land and harder work left you tough, perceptive, and good with animals",
  Guard:      "Years on watch gave you sharp eyes, strong arms, and quick threat assessment",
  Guide:      "The wilderness is your map — you move unseen and always find the path",
  Hermit:     "Solitude bred insight — you notice what others miss and know things they don't",
  Merchant:   "Trade routes and negotiations made you persuasive and good at reading people",
  Noble:      "Wealth and politics gave you presence, persuasion, and connections that matter",
  Sage:       "A life of study means you know a little about everything — and a lot about magic",
  Sailor:     "The sea hardened you — strong, perceptive, and handy with a blade when needed",
  Scribe:     "You've read everything — history, law, magic — and you remember all of it",
  Soldier:    "Military discipline made you dangerous in a fight and reliable under pressure",
  Wayfarer:   "Life on the road gave you survival instincts, light fingers, and street smarts",
};

const BACKGROUND_WHY = {
  Acolyte:    "Insight and Religion are useful social and knowledge skills; mid-tier for most builds because neither is essential for combat",
  Artisan:    "Investigation and Persuasion cover two of the most commonly rolled skills — strong for any character who talks and explores",
  Charlatan:  "Deception and Sleight of Hand are the core trickery skill set, top-rated for Rogues and social-focused builds",
  Criminal:   "Stealth and Deception are the two defining skills of a sneaky build — consistently high-value for Rogues and Rangers",
  Entertainer:"Acrobatics and Performance are niche; shines in roleplay-heavy campaigns more than pure optimization",
  Farmer:     "Animal Handling and Nature are situational, but the origin feat (often Tough or Magic Initiate) can justify the pick for durable martials",
  Guard:      "Athletics and Perception together are broadly useful; Perception especially is one of the most-rolled skills in the game",
  Guide:      "Stealth and Survival cover wilderness and infiltration — strong for Rangers and Rogues who operate in natural environments",
  Hermit:     "Medicine and Religion are niche, but the origin feat (Healer or Magic Initiate) can significantly boost your party utility",
  Merchant:   "Insight and Persuasion cover two crucial social pillars — excellent for any character who serves as the party's face",
  Noble:      "Persuasion and History provide reliable social leverage; the origin feat (often Skilled) makes Noble one of the more flexible picks",
  Sage:       "Arcana and History are the most relevant knowledge skills for spellcasters — a strong default for any magic-using class",
  Sailor:     "Athletics and Perception are broadly useful in combat and exploration — well-suited to martial builds and seafaring campaigns",
  Scribe:     "Investigation and Perception together cover exploration and puzzle scenarios well — solid utility across campaign types",
  Soldier:    "Athletics and Intimidation plus a martial origin feat make Soldier a reliable choice for Fighter, Barbarian, and Paladin builds",
  Wayfarer:   "Insight and Stealth provide both social and infiltration coverage — a flexible pick for many class combinations",
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

export function buildBackground(){
  const g=document.getElementById('background-grid');
  g.innerHTML='';
  let bgs=getActiveBackgrounds();
  const seen=new Set();
  bgs=bgs.filter(b=>seen.has(b.name)?false:seen.add(b.name));
  bgs.sort((a,b)=>{
    const ra=RATING_ORDER[getRating(G.char.cls,'backgrounds',a.name)]??4;
    const rb=RATING_ORDER[getRating(G.char.cls,'backgrounds',b.name)]??4;
    return ra!==rb?ra-rb:a.name.localeCompare(b.name);
  });
  bgs.forEach(bg=>{
    const mechText=`Skills: ${bg.skills.join(', ')}${bg.feat?' · Origin Feat: '+bg.feat:''}`;
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${bg.name}</h4><p class="card-tagline">${BACKGROUND_VIBES[bg.name]||''}</p>`;
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    infoBtn.onclick=e=>{
      e.stopPropagation();
      const body=`<p>${BACKGROUND_VIBES[bg.name]||''}</p><p style="margin-top:10px">${BACKGROUND_WHY[bg.name]||''}</p><p style="margin-top:10px;color:#aaa">${mechText}</p>`;
      openInfoOverlay(bg.name,body,`https://rpgbot.net/2024-dnd/backgrounds/${bg.name.toLowerCase()}/`);
    };
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
