import { G, SPELLS } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast } from '../shared/overlay.js';
import { getActiveClasses, inClass, SCHOOL_NAMES, spellMeta, spellDesc } from '../data/schema.js';
import { DATA_CACHE, rulesetRef } from '../data/loader.js';
import { buildReview } from './step-review.js';

let selCantrips = [];
let selSpells = [];

export function buildSpellList(containerId,spells,max,toggleFn){
  const container=document.getElementById(containerId);
  if(spells.length&&!spells[0]._fb) container.classList.add('col');
  spells.forEach(sp=>{
    const name=sp.name||sp;
    const el=document.createElement('div');
    if(sp._fb){
      el.className='spell-chip'; el.textContent=name;
    } else {
      el.className='spell-entry';
      el.innerHTML=`<div class="se-name">${name}</div>
        <div class="se-meta">${spellMeta(sp)}</div>
        <div class="se-desc">${spellDesc(sp)}</div>`;
    }
    el.onclick=()=>toggleFn(name,el,max);
    container.appendChild(el);
  });
}

export function buildSpellPicker(){
  const cls=getActiveClasses()[G.char.cls];
  selCantrips=[]; selSpells=[];
  let cantrips=[],lvl1=[];
  const cached=DATA_CACHE[rulesetRef.value];

  if(cached?.spells?.length){
    const allSpells=cached.spells.flatMap(s=>s.spell||[]);
    const clsName=G.char.cls;
    const seenC=new Set(),seenL=new Set();
    allSpells.forEach(sp=>{
      if(!inClass(sp,clsName)) return;
      if(sp.level===0&&!seenC.has(sp.name)){seenC.add(sp.name);cantrips.push(sp);}
      if(sp.level===1&&!seenL.has(sp.name)){seenL.add(sp.name);lvl1.push(sp);}
    });
    cantrips.sort((a,b)=>a.name.localeCompare(b.name));
    lvl1.sort((a,b)=>a.name.localeCompare(b.name));
  }

  const fb=SPELLS[G.char.cls];
  if(!cantrips.length&&fb) cantrips=fb.cantrips.map(n=>({name:n,_fb:true}));
  if(!lvl1.length&&fb)     lvl1=fb.lvl1.map(n=>({name:n,_fb:true}));

  const cs=document.getElementById('cantrip-section');
  cs.innerHTML=`<h4>Cantrips — choose ${cls.cantrips}</h4>
    <div class="spell-count" id="cnt-count">0 of ${cls.cantrips} selected</div>
    <div class="spell-list" id="cantrip-list"></div>`;
  buildSpellList('cantrip-list',cantrips,cls.cantrips,toggleCantrip);

  const ls=document.getElementById('lvl1-section');
  ls.innerHTML=`<h4>1st-Level Spells — choose ${cls.pick}</h4>
    <div class="spell-count" id="sp-count">0 of ${cls.pick} selected</div>
    <div class="spell-list" id="spell-list"></div>`;
  buildSpellList('spell-list',lvl1,cls.pick,toggleSpell);

  checkSpellBtn();
}

export function toggleCantrip(sp,el,max){
  if(selCantrips.includes(sp)){selCantrips=selCantrips.filter(s=>s!==sp);el.classList.remove('sel');}
  else{if(selCantrips.length>=max){toast(`Choose only ${max} cantrips.`);return;}selCantrips.push(sp);el.classList.add('sel');}
  document.getElementById('cnt-count').textContent=`${selCantrips.length} of ${max} selected`;
  checkSpellBtn();
}

export function toggleSpell(sp,el,max){
  if(selSpells.includes(sp)){selSpells=selSpells.filter(s=>s!==sp);el.classList.remove('sel');}
  else{if(selSpells.length>=max){toast(`Choose only ${max} spells.`);return;}selSpells.push(sp);el.classList.add('sel');}
  document.getElementById('sp-count').textContent=`${selSpells.length} of ${max} selected`;
  checkSpellBtn();
}

export function checkSpellBtn(){
  const cls=getActiveClasses()[G.char.cls];
  document.getElementById('spells-next').disabled=
    selCantrips.length!==cls.cantrips||selSpells.length!==cls.pick;
}

export function step5Next(){
  G.char.cantrips=[...selCantrips];
  G.char.spells=[...selSpells];
  goStep(6);
  buildReview();
}
