import { G, STATS, campaignState } from '../shared/state.js';
import { goStep } from './builder.js';
import { modStr } from '../shared/dice.js';
import { getActiveClasses } from '../data/schema.js';
import { saveCharacter, setCampaignActive, getBackground, getRespecState, clearRespecState, saveCampaignState } from '../shared/storage.js';
import { startCampaign } from '../play/play.js';

export function buildReview(){
  const c=G.char;
  const s=c.final;
  const cls=getActiveClasses()[c.cls];

  let h='';

  // Send It vibe hero block
  if(c.fromSendIt && c.vibeTagline){
    h+=`<div class="sheet-sec" style="border:1px solid var(--gold);border-radius:6px;padding:14px 16px;background:var(--parch-bg);margin-bottom:20px">
      <div style="font-family:'Noto Serif',serif;font-size:17px;color:var(--gold2);margin-bottom:8px">"${c.vibeTagline}"</div>
      ${c.whyThisWorks?`<div style="font-family:'Noto Serif',serif;font-size:15px;color:#c8a97a;line-height:1.6">${c.whyThisWorks}</div>`:''}
    </div>`;
  }

  h+=`<div class="sheet-sec">
    <h4>Identity</h4>
    <div style="font-size:1.15rem;color:var(--gold2);font-family:'Cinzel',serif;margin-bottom:3px">${c.name}</div>
    <div style="color:#c8a97a;font-size:15px">${c.race} ${c.cls} · Level 1</div>
    ${c.backstory?`<div style="margin-top:8px;font-family:'Noto Serif',serif;font-size:15px;color:#c8a97a;line-height:1.6">${c.backstory}</div>`:''}
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
    <div style="font-size:15px;color:#c8a97a">${c.saves.join(', ')} (proficient) · Others at base modifier</div></div>`;

  h+=`<div class="sheet-sec"><h4>Skill Proficiencies</h4>
    <div style="font-size:15px;color:#c8a97a">${c.skills.join(', ')}</div></div>`;

  const bg=getBackground();
  if(bg){
    h+=`<div class="sheet-sec"><h4>Background</h4>
      <div style="color:var(--gold2);font-size:.9rem;margin-bottom:4px">${bg.name}</div>
      <div style="font-size:.84rem;color:var(--dim);margin-bottom:3px">Skills: ${bg.skills.join(', ')}</div>
      ${bg.feat?`<div style="font-size:.84rem;color:var(--dim)">Origin Feat: ${bg.feat}</div>`:''}
    </div>`;
  }

  h+=`<div class="sheet-sec"><h4>Starting Equipment</h4>
    <div style="font-size:15px;color:#c8a97a">${c.equip}</div></div>`;

  if(c.sp && (c.cantrips?.length || c.spells?.length)){
    h+=`<div class="sheet-sec"><h4>Spells</h4>`;
    if(c.cantrips?.length){
      h+=`<div style="margin-bottom:10px">
        <div style="color:var(--dim);font-size:.8rem;font-family:'Noto Serif',serif;margin-bottom:3px">Cantrips</div>
        <div style="font-size:.84rem;color:#c8a97a">${c.cantrips.join(', ')}</div>
      </div>`;
    }
    if(c.spells?.length){
      h+=`<div>
        <div style="color:var(--dim);font-size:.8rem;font-family:'Noto Serif',serif;margin-bottom:3px">1st Level Spells (${c.maxSlots} slot${c.maxSlots>1?'s':''})</div>
        <div style="font-size:.84rem;color:#c8a97a">${c.spells.join(', ')}</div>
      </div>`;
    }
    h+=`</div>`;
  }

  document.getElementById('review-content').innerHTML=h;

  // Show/hide Send It Again button
  const againBtn = document.getElementById('send-it-again-btn');
  if(againBtn) againBtn.style.display = c.fromSendIt ? 'block' : 'none';
}

export function reviewBack(){
  goStep(G.char.sp?7:6);
}

export function beginAdventure(){
  saveCharacter(G.char);
  setCampaignActive(true);
  const respecState = getRespecState();
  if(respecState){
    clearRespecState();
    Object.assign(campaignState, respecState);
    saveCampaignState(campaignState);
    startCampaign(true);
  } else {
    startCampaign();
  }
}
