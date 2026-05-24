import { G, STATS } from '../shared/state.js';
import { goStep } from './builder.js';
import { modStr } from '../shared/dice.js';
import { getActiveClasses } from '../data/schema.js';
import { saveChar, getBackground } from '../shared/storage.js';
import { selectMod } from '../play/play.js';

export function buildReview(){
  const c=G.char;
  const s=c.final;
  const cls=getActiveClasses()[c.cls];

  let h='';

  h+=`<div class="sheet-sec">
    <h4>Identity</h4>
    <div style="font-size:1.15rem;color:var(--gold2);font-family:'Cinzel',serif;margin-bottom:3px">${c.name}</div>
    <div style="color:var(--dim);font-size:.85rem">${c.race} ${c.cls} · Level 1</div>
    ${c.backstory?`<div style="margin-top:8px;font-size:.84rem;font-style:italic;color:var(--dim)">${c.backstory}</div>`:''}
  </div>`;

  h+=`<div class="sheet-sec"><h4>Combat Stats</h4><div class="stat-row">
    <div class="stat-pill"><span>HP</span><span>${c.maxHp}</span></div>
    <div class="stat-pill"><span>AC</span><span>${c.ac}</span></div>
    <div class="stat-pill"><span>Speed</span><span>${c.speed}ft</span></div>
    <div class="stat-pill"><span>Prof</span><span>+${c.profBonus}</span></div>
    <div class="stat-pill"><span>Hit Die</span><span>d${cls.hitDie}</span></div>
    ${c.sp?`<div class="stat-pill"><span>Spell Slots</span><span>${c.maxSlots}</span></div>`:''}
  </div></div>`;

  h+=`<div class="sheet-sec"><h4>Ability Scores</h4><div class="stat-row">`;
  STATS.forEach(stat=>{
    const v=s[stat]; const base=c.base[stat]; const bonus=v-base;
    h+=`<div class="stat-pill"><span>${stat}</span><span>${v} (${modStr(v)})${bonus?` <small style="color:var(--gold);opacity:.7">+${bonus}racial</small>`:''}</span></div>`;
  });
  h+=`</div></div>`;

  h+=`<div class="sheet-sec"><h4>Saving Throws</h4>
    <div style="font-size:.84rem;color:var(--dim)">${c.saves.join(', ')} (proficient) · Others at base modifier</div></div>`;

  h+=`<div class="sheet-sec"><h4>Skill Proficiencies</h4>
    <div style="font-size:.84rem;color:var(--dim)">${c.skills.join(', ')}</div></div>`;

  const bg=getBackground();
  if(bg){
    h+=`<div class="sheet-sec"><h4>Background</h4>
      <div style="color:var(--gold2);font-size:.9rem;margin-bottom:4px">${bg.name}</div>
      <div style="font-size:.84rem;color:var(--dim);margin-bottom:3px">Skills: ${bg.skills.join(', ')}</div>
      ${bg.feat?`<div style="font-size:.84rem;color:var(--dim)">Origin Feat: ${bg.feat}</div>`:''}
    </div>`;
  }

  h+=`<div class="sheet-sec"><h4>Starting Equipment</h4>
    <div style="font-size:.84rem;color:var(--dim)">${c.equip}</div></div>`;

  if(c.sp){
    h+=`<div class="sheet-sec"><h4>Spells</h4>
      <div style="margin-bottom:8px"><div style="color:var(--dim);font-size:.76rem;font-family:'Cinzel',serif">CANTRIPS (no slot cost)</div>
        <div style="font-size:.84rem;margin-top:3px">${c.cantrips.join(', ')}</div></div>
      <div><div style="color:var(--dim);font-size:.76rem;font-family:'Cinzel',serif">1ST LEVEL (${c.maxSlots} slot${c.maxSlots>1?'s':''})</div>
        <div style="font-size:.84rem;margin-top:3px">${c.spells.join(', ')}</div></div>
    </div>`;
  }

  document.getElementById('review-content').innerHTML=h;
}

export function reviewBack(){
  goStep(G.char.sp?7:6);
}

export function beginAdventure(){
  saveChar(G.char);
  document.getElementById('phase1').classList.add('hidden');
  document.getElementById('phase2').classList.remove('hidden');
  selectMod('lmop');
}
