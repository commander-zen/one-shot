import { G } from '../shared/state.js';
import { goStep, pgBadge } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveClasses } from '../data/schema.js';
import { getRating } from '../data/ratings.js';
import { buildBackground } from './step-background.js';

const CLASS_VIBES = {
  Artificer:'Gadgets, gizmos, and magic items. You built that.',
  Barbarian:'Get mad. Hit harder.',
  Bard:'Charm, wit, and magic — usually in that order.',
  Cleric:"Divine power. You decide if that's a blessing or a threat.",
  Druid:"The wilderness doesn't scare you. You are the wilderness.",
  Fighter:'No magic required. Just skill, steel, and discipline.',
  Monk:'Fists, focus, and superhuman speed. No weapon needed.',
  Paladin:'Armored, righteous, and absolutely done with evil.',
  Ranger:'Hunter, tracker, survivor. The wilds are home.',
  Rogue:'Strike fast, disappear faster. Work smarter, not harder.',
  Sorcerer:"Magic runs in your blood. Try not to explode.",
  Warlock:'You made a deal. The power was worth it. Probably.',
  Wizard:'You studied. Now you rewrite reality.',
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
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${name}</h4><p class="card-tagline">${CLASS_VIBES[name]||''}</p>`;
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    const mechText=`Hit Die: d${cls.hitDie} · Armor: ${cls.ac} · Saves: ${cls.saves.join(', ')} · Choose ${cls.sc} from: ${cls.skills.join(', ')}`;
    infoBtn.onclick=e=>{e.stopPropagation();openInfoOverlay(name,mechText,`https://rpgbot.net/2024-dnd/classes/${name.toLowerCase()}/`);};
    c.appendChild(infoBtn);
    c.appendChild(pgBadge(getRating(G.char.cls,'classes',name)));
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
