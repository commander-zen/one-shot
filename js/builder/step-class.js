import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast } from '../shared/overlay.js';
import { getActiveClasses } from '../data/schema.js';
import { buildStatAssign } from './step-scores.js';

let selSkills = [];
export { selSkills };

export function buildClassGrid(){
  const g=document.getElementById('class-grid');
  g.innerHTML='';
  Object.entries(getActiveClasses()).forEach(([name,cls])=>{
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${name}</h4><p>d${cls.hitDie} · ${cls.sp?'Spellcaster':'Martial'}</p>`;
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

export function step3Next(){
  const cls=getActiveClasses()[G.char.cls];
  if(!G.char.cls){toast('Select a class.');return;}
  if(selSkills.length<cls.sc){toast(`Select ${cls.sc} skills.`);return;}
  G.char.skills=[...selSkills];
  goStep(4);
  buildStatAssign();
}
