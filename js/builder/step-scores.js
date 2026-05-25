import { G, STATS, STD_ARR } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast } from '../shared/overlay.js';
import { mod, modStr, roll4d6, calcAC } from '../shared/dice.js';
import { getActiveRaces, applyRacialBonuses, getActiveClasses } from '../data/schema.js';
import { buildLanguages } from './step-languages.js';

const STAT_PRIORITY = {
  Artificer:  ['INT','CON','DEX','WIS','CHA','STR'],
  Barbarian:  ['STR','CON','DEX','WIS','CHA','INT'],
  Bard:       ['CHA','DEX','CON','WIS','INT','STR'],
  Cleric:     ['WIS','CON','STR','CHA','DEX','INT'],
  Druid:      ['WIS','CON','DEX','CHA','INT','STR'],
  Fighter:    ['STR','CON','DEX','WIS','CHA','INT'],
  Monk:       ['DEX','WIS','CON','STR','CHA','INT'],
  Paladin:    ['STR','CHA','CON','DEX','WIS','INT'],
  Ranger:     ['DEX','WIS','CON','STR','CHA','INT'],
  Rogue:      ['DEX','CHA','CON','WIS','INT','STR'],
  Sorcerer:   ['CHA','CON','DEX','WIS','INT','STR'],
  Warlock:    ['CHA','CON','DEX','WIS','INT','STR'],
  Wizard:     ['INT','CON','DEX','WIS','CHA','STR'],
};

let scoreMethod = 'std';
let rolledVals = [];
let assignedScores = {};

export function setMethod(m){
  scoreMethod=m;
  document.getElementById('meth-std').classList.toggle('active',m==='std');
  document.getElementById('meth-roll').classList.toggle('active',m==='roll');
  document.getElementById('roll-area').style.display=m==='roll'?'block':'none';
  rolledVals=[];
  document.getElementById('roll-results').classList.add('hidden');
  buildStatAssign();
}

export function rollStats(){
  rolledVals=[];
  let html='';
  for(let i=0;i<6;i++){
    const r=roll4d6();
    rolledVals.push(r.total);
    html+=`<div><strong>${r.total}</strong> — rolled ${r.rolls.join(', ')}</div>`;
  }
  const el=document.getElementById('roll-results');
  el.innerHTML=html;
  el.classList.remove('hidden');
  buildStatAssign();
}

function autoAssign(){
  const priority=STAT_PRIORITY[G.char.cls];
  if(!priority) return;
  priority.forEach((stat,i)=>{
    const sel=document.getElementById('asgn-'+stat);
    if(!sel) return;
    sel.value='idx-'+i;
    sel.dispatchEvent(new Event('change'));
  });
  let hint=document.getElementById('std-assign-hint');
  if(!hint){
    hint=document.createElement('div');
    hint.id='std-assign-hint';
    hint.style.cssText='font-size:13px;font-style:italic;color:#999;margin-top:8px;';
    document.getElementById('stat-assign-grid').insertAdjacentElement('afterend',hint);
  }
  hint.textContent=`Optimized for ${G.char.cls} — change any value if you want`;
  hint.style.display='block';
}

export function buildStatAssign(){
  const vals=(scoreMethod==='roll'&&rolledVals.length===6)
    ? [...rolledVals].sort((a,b)=>b-a)
    : [...STD_ARR];

  const g=document.getElementById('stat-assign-grid');
  g.innerHTML='';
  assignedScores={};

  const existingHint=document.getElementById('std-assign-hint');
  if(existingHint) existingHint.style.display='none';

  STATS.forEach(stat=>{
    const box=document.createElement('div');
    box.className='stat-box';

    const lbl=document.createElement('label');
    lbl.textContent=stat;

    const sel=document.createElement('select');
    sel.id='asgn-'+stat;
    const ph=document.createElement('option');
    ph.value=''; ph.textContent='—';
    sel.appendChild(ph);
    vals.forEach((v,i)=>{
      const o=document.createElement('option');
      o.value='idx-'+i; o.textContent=v;
      sel.appendChild(o);
    });

    const modDiv=document.createElement('div');
    modDiv.className='smod';
    modDiv.id='smod-'+stat;
    modDiv.textContent='—';

    sel.onchange=refreshMods;
    box.appendChild(lbl);
    box.appendChild(sel);
    box.appendChild(modDiv);
    g.appendChild(box);
  });

  const b=getActiveRaces()[G.char.race]?.bonuses||{};
  const bText=Object.entries(b).map(([s,v])=>`+${v} ${s}`).join(', ');
  document.getElementById('racial-note').textContent=`Racial bonuses applied after assignment: ${bText}`;

  if(scoreMethod==='std') autoAssign();
}

export function refreshMods(){
  const b=getActiveRaces()[G.char.race]?.bonuses||{};
  STATS.forEach(stat=>{
    const sel=document.getElementById('asgn-'+stat);
    const modDiv=document.getElementById('smod-'+stat);
    if(!sel||!sel.value){modDiv.textContent='—';return;}
    const base=parseInt(sel.options[sel.selectedIndex].textContent);
    const bonus=b[stat]||0;
    const final=base+bonus;
    modDiv.textContent=modStr(final)+(bonus?` (${base}+${bonus})`:'');
  });
}

export function step5Next(){
  const usedIdx={};
  assignedScores={};
  for(const stat of STATS){
    const sel=document.getElementById('asgn-'+stat);
    if(!sel||!sel.value){toast(`Assign a value to ${stat}.`);return;}
    const idx=sel.value;
    if(usedIdx[idx]!==undefined){toast(`That roll is already assigned to ${usedIdx[idx]}.`);return;}
    usedIdx[idx]=stat;
    assignedScores[stat]=parseInt(sel.options[sel.selectedIndex].textContent);
  }

  G.char.base={...assignedScores};
  G.char.final=applyRacialBonuses(assignedScores,G.char.race);

  const cls=getActiveClasses()[G.char.cls];
  const conM=mod(G.char.final.CON);
  G.char.maxHp=Math.max(1, cls.hitDie+conM);
  G.char.hp=G.char.maxHp;
  G.char.ac=calcAC(G.char.cls,G.char.final);
  G.char.saves=cls.saves;
  G.char.sp=cls.sp;
  G.char.maxSlots=cls.slots;
  G.char.slots=cls.slots;
  G.char.equip=cls.equip;
  G.char.hitDie=cls.hitDie;

  goStep(6);
  buildLanguages();
}
