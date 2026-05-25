import { G } from '../shared/state.js';
import { goStep, pgBadge } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveClasses } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { buildBackground } from './step-background.js';

const CLASS_VIBES = {
  Artificer:'Guns, gadgets, and a little bit of magic',
  Barbarian:'Get mad and hit things. Hard.',
  Bard:'Charm your way out of anything',
  Cleric:'Holy power, divine purpose',
  Druid:'The wild answers to you',
  Fighter:'The best at one thing: winning fights',
  Monk:'Your body is the weapon',
  Paladin:'Smite evil, protect the weak',
  Ranger:'Hunter of the wilderness',
  Rogue:'Strike fast, vanish, repeat',
  Sorcerer:'Magic runs in your blood',
  Warlock:'Power borrowed from something ancient',
  Wizard:"You've read every spell ever written",
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

let selSkills = [];
export { selSkills };

export function buildClassGrid(){
  const g=document.getElementById('class-grid');
  g.innerHTML='';
  const classes=getActiveClasses();
  const isPG=document.body.classList.contains('powergamer-on');
  let entries=Object.entries(classes);
  if(isPG){
    entries.sort(([a],[b])=>{
      const ra=RATING_ORDER[getRating(G.char.cls,'classes',a)]??4;
      const rb=RATING_ORDER[getRating(G.char.cls,'classes',b)]??4;
      return ra!==rb?ra-rb:a.localeCompare(b);
    });
  } else {
    entries.sort(([a],[b])=>a.localeCompare(b));
  }
  entries.forEach(([name,cls])=>{
    const rating=getRating(G.char.cls,'classes',name);
    const mechText=`Hit Die: d${cls.hitDie} · Armor: ${cls.ac} · Saves: ${cls.saves.join(', ')} · Choose ${cls.sc} from: ${cls.skills.join(', ')}`;
    const c=document.createElement('div');
    c.className='opt-card';
    c.dataset.rating=rating||'';
    c.innerHTML=`<h4>${name}</h4><p class="card-tagline">${CLASS_VIBES[name]||''}</p><p class="card-mech">${mechText}</p>`;
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    infoBtn.onclick=e=>{e.stopPropagation();openInfoOverlay(name,mechText,`https://rpgbot.net/2024-dnd/classes/${name.toLowerCase()}/`);};
    c.appendChild(infoBtn);
    c.onclick=()=>selectClass(name,c);
    g.appendChild(c);
  });
}

export function selectClass(name,el){
  document.querySelectorAll('#class-grid .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  G.char.cls=name;
  selSkills=[];

  const cls=getActiveClasses()[name];
  document.getElementById('class-detail').style.display='block';
  document.getElementById('class-info-text').textContent=
    `Hit Die: d${cls.hitDie} · Saving throws: ${cls.saves.join(', ')} · Equipment: ${cls.equip}`;

  document.getElementById('skill-label').textContent=`Choose ${cls.sc} skill proficiencie${cls.sc>1?'s':'y'}:`;

  const list=document.getElementById('skill-list');
  list.innerHTML='';
  cls.skills.forEach(sk=>{
    const chip=document.createElement('div');
    chip.className='skill-chip';
    chip.textContent=sk;
    chip.appendChild(pgBadge(getRating(name,'skills',sk)));
    chip.onclick=()=>toggleSkill(sk,chip,cls.sc);
    list.appendChild(chip);
  });

  document.getElementById('class-next').disabled=true;
}

export function toggleSkill(sk,el,max){
  if(selSkills.includes(sk)){
    selSkills=selSkills.filter(s=>s!==sk);
    el.classList.remove('sel');
  } else {
    if(selSkills.length>=max){toast(`Choose only ${max} skills.`);return;}
    selSkills.push(sk);
    el.classList.add('sel');
  }
  document.getElementById('class-next').disabled=selSkills.length<getActiveClasses()[G.char.cls].sc;
}

export function step2Next(){
  const cls=getActiveClasses()[G.char.cls];
  if(!G.char.cls){toast('Select a class.');return;}
  if(selSkills.length<cls.sc){toast(`Select ${cls.sc} skills.`);return;}
  G.char.skills=[...selSkills];
  goStep(3);
  buildBackground();
}
