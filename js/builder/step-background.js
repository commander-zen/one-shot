import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveBackgrounds } from '../data/schema.js';
import { getRating, applyTier, tierLegendHTML } from '../data/ratings.js';
import { saveBackground } from '../shared/storage.js';
import { buildRaceGrid } from './step-species.js';

const BACKGROUND_VIBES = {
  Acolyte: "Raised by faith, driven by purpose",
  Artisan: "Built things, knows how they break",
  Charlatan: "Every face is the right face",
  Criminal: "Rules were made for other people",
  Entertainer: "The crowd is always watching",
  Farmer: "Humble roots, surprising resilience",
  Guard: "Seen enough to stop being surprised",
  Guide: "Knows the land better than the map",
  Hermit: "Silence taught them what people couldn't",
  Merchant: "Everything has a price, including loyalty",
  Noble: "Born expecting the world to move for them",
  Sage: "Questions are more valuable than answers",
  Sailor: "Survived things that don't have names",
  Scribe: "Words are the sharpest weapon",
  Soldier: "Trained to win, conditioned to endure",
  Wayfarer: "Home is wherever the road ends tonight"
};

const BACKGROUND_WHY = {
  Acolyte: "Insight and Religion proficiencies plus two free languages. Shelter of the Faithful gives free lodging and support from your faith network.",
  Artisan: "Persuasion and one Artisan tool. Guild Membership gives access to a network of merchants and craftspeople. Strong for social-heavy campaigns.",
  Charlatan: "Deception and Sleight of Hand. False Identity gives you a pre-built cover story. Best pick for Bards and Rogues leaning into con-artist fantasy.",
  Criminal: "Stealth and Thieves' Tools. Criminal Contact gives you an underworld connection from session one. Pairs best with Rogues.",
  Entertainer: "Acrobatics and Performance. By Popular Demand gives free lodging at performance venues. Solid for Bards, weak for most other classes.",
  Farmer: "Animal Handling and Nature. Consistent utility for wilderness campaigns. Humble background with surprising staying power.",
  Guard: "Athletics and Perception. Civic Sentry gives official recognition in most cities. Solid defensive background with roleplay hooks.",
  Guide: "Stealth and Survival. Wanderer gives perfect recall of geography and the ability to always find food and water. Best wilderness background.",
  Hermit: "Medicine and Religion plus one language. Discovery gives you a unique secret. High roleplay ceiling but mechanically average.",
  Merchant: "Persuasion and one Artisan tool or language. Strong for social-focused parties and trade-heavy campaigns.",
  Noble: "History and Persuasion. Position of Privilege opens doors and gets you audiences with the powerful. One of the strongest social backgrounds.",
  Sage: "Arcana and History. Researcher lets you always know where to find information even if you don't have it. Best background for Wizards.",
  Sailor: "Athletics and Perception. Ship's Passage gives free water travel. Strong utility background for coastal or island campaigns.",
  Scribe: "Investigation and one language. Scribe's Insight lets you copy magical text accurately. Strong for Wizards and INT-based characters.",
  Soldier: "Athletics and Intimidation. Military Rank gets you deference from soldiers and access to military resources. Excellent for Fighters and Paladins.",
  Wayfarer: "Insight and Stealth. Drifter gives you the ability to always find a place to hide and sleep. Strong for any character who moves in the margins."
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

export function buildBackground(){
  const g=document.getElementById('background-grid');
  g.innerHTML='';

  // Tier legend
  let legend=document.getElementById('bg-tier-legend');
  if(!legend){
    legend=document.createElement('div');
    legend.id='bg-tier-legend';
    legend.innerHTML=tierLegendHTML();
    g.insertAdjacentElement('beforebegin',legend);
  }

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
    applyTier(c, getRating(G.char.cls, 'backgrounds', bg.name));
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
