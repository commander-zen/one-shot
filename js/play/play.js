import { G } from '../shared/state.js';
import { toast, closeOvl } from '../shared/overlay.js';
import { clearChar } from '../shared/storage.js';
import { modStr } from '../shared/dice.js';
import { updateSlots, processMechEvents, setActionsDisabled } from './combat.js';

let uploadedContent = '';

export function selectMod(type){
  G.mod.type=type;
  ['lmop','paste','upload'].forEach(t=>{
    document.getElementById('mod-'+t).classList.toggle('sel',t===type);
  });
  document.getElementById('paste-text').style.display=type==='paste'?'block':'none';
  document.getElementById('upload-area').style.display=type==='upload'?'block':'none';
  if(type==='upload') document.getElementById('file-upload').onchange=handleUpload;
}

export function handleUpload(e){
  const file=e.target.files[0];
  if(!file) return;
  const status=document.getElementById('upload-status');
  status.textContent='Reading file…';
  const reader=new FileReader();
  reader.onload=ev=>{
    uploadedContent=ev.target.result.substring(0,8000);
    G.mod.content=uploadedContent;
    status.textContent=`✓ Loaded: ${file.name} (${Math.round(ev.target.result.length/1000)}k chars)`;
  };
  reader.onerror=()=>{status.textContent='Error reading file.';};
  reader.readAsText(file);
}

export function enterDungeon(){
  if(G.mod.type==='paste'){
    const txt=document.getElementById('paste-text').value.trim();
    if(!txt){toast('Paste your adventure text first.');return;}
    G.mod.content=txt;
  }
  if(G.mod.type==='upload'&&!G.mod.content){toast('Upload a file first.');return;}

  document.getElementById('phase2').classList.add('hidden');
  const p3=document.getElementById('phase3');
  p3.classList.add('active');
  initPlay();
}

export function buildSystemPrompt(){
  const c=G.char;
  const s=c.final;

  let modCtx='';
  if(G.mod.type==='lmop'){
    modCtx=`RUN LOST MINES OF PHANDELVER from start to finish using your training knowledge of the adventure.
OPENING SCENE: The player character has been hired by dwarf merchant Gundren Rockseeker to escort a wagon of supplies to Phandalin. Gundren and his escort Sildar Hallwinter have ridden ahead on horseback. As the player travels the Triboar Trail, they discover two dead horses blocking the road — goblin arrows in the bodies. Goblins ambush from the treeline. This is the start of the Cragmaw Hideout chapter.
Continue through: Phandalin (town), Tresendar Manor (Redbrands), Cragmaw Castle, Wave Echo Cave, and the Black Spider as the final villain.`;
  } else {
    modCtx=G.mod.content||'Run a classic D&D 5e adventure in a generic fantasy setting. Create interesting encounters, NPCs, and locations.';
  }

  const spellLine=c.sp
    ? `\nSPELLS — Cantrips (never cost a slot): ${c.cantrips.join(', ')}. 1st-level spells (cost one slot each): ${c.spells.join(', ')}. Current spell slots: ${c.slots} of ${c.maxSlots}.`
    :'';

  return `You are the Dungeon Master for a solo D&D 5e adventure. One player, no others.

PLAYER CHARACTER:
Name: ${c.name}  |  Race: ${c.race}  |  Class: ${c.cls}  |  Level 1
HP: ${c.hp}/${c.maxHp}  |  AC: ${c.ac}  |  Speed: ${c.speed}ft  |  Proficiency: +${c.profBonus}
STR ${s.STR}(${modStr(s.STR)})  DEX ${s.DEX}(${modStr(s.DEX)})  CON ${s.CON}(${modStr(s.CON)})  INT ${s.INT}(${modStr(s.INT)})  WIS ${s.WIS}(${modStr(s.WIS)})  CHA ${s.CHA}(${modStr(s.CHA)})
Saving throw proficiencies: ${c.saves.join(', ')}
Skill proficiencies: ${c.skills.join(', ')}
Equipment: ${c.equip}${spellLine}
${c.backstory?`Character backstory: ${c.backstory}`:''}

ADVENTURE:
${modCtx}

DM RULES — OBEY EXACTLY:
1. Write 2-3 sentences of vivid narration only. Describe the world, enemies, and events. Never write the player character's dialogue, thoughts, or actions.
2. Address the player character by name (${c.name}) to make them feel heroic.
3. Handle ALL dice rolls yourself — announce results in narration. Never say "roll for X."
4. CANTRIPS NEVER COST SPELL SLOTS. Only leveled spells consume slots.
5. After EVERY response output a JSON block — no exceptions:
\`\`\`json
{"combatActive":false,"enemies":[],"mechanicalEvents":[]}
\`\`\`
- combatActive: true if in an active fight
- enemies: array of {name, hp, maxHp} for all living enemies in the current fight
- mechanicalEvents: array of {type, amount, description} where type is "hp_change" (amount negative for damage, positive for healing), "slot_used" (decrement one spell slot), or "status" (conditions, info). Always include HP changes from enemy attacks or healing.
6. If ${c.name} reaches 0 HP, set hp_change to bring HP to 0 and note it in narration.`;
}

export function initPlay(){
  const c=G.char;
  document.getElementById('play-char-name').textContent=`${c.name} — ${c.race} ${c.cls}`;
  document.getElementById('hp-cur').textContent=c.hp;
  document.getElementById('hp-max-disp').textContent=`/ ${c.maxHp}`;

  if(c.sp&&c.maxSlots>0){
    updateSlots();
    document.getElementById('slots-row').style.display='flex';
  }

  renderActions();
  callDM('Begin the adventure. Set the scene vividly and start the opening encounter.',true);
}

export function renderActions(){
  const bar=document.getElementById('act-btns');
  const cr=document.getElementById('custom-row');
  bar.innerHTML='';
  cr.style.display='none';

  const mkBtn=(label,fn)=>{
    const b=document.createElement('button');
    b.className='act-btn'; b.textContent=label;
    b.onclick=fn;
    bar.appendChild(b);
  };

  if(G.combat){
    mkBtn('Attack',startAttack);
    if(G.char.sp) mkBtn('Cast Spell',openSpellPicker);
    mkBtn('Dodge',()=>sendAction('I take the Dodge action, focusing entirely on avoiding attacks.'));
    mkBtn('Dash',()=>sendAction('I use the Dash action to reposition.'));
    mkBtn('Hide',()=>sendAction('I attempt to hide from my enemies.'));
    mkBtn('Help',()=>sendAction('I use the Help action.'));
    mkBtn('End Turn',()=>sendAction('I end my turn.'));
  } else {
    mkBtn('Explore',()=>sendAction('I explore my surroundings carefully.'));
    mkBtn('Talk',()=>sendAction('I attempt to speak with whoever is nearby.'));
    if(G.char.sp) mkBtn('Cast Spell',openSpellPicker);
    mkBtn('Rest',()=>sendAction('I take a short rest to recover.'));
    mkBtn('Use Item',()=>sendAction('I check my pack and use an item.'));
    mkBtn('Custom',showCustom);
  }
}

export function showCustom(){
  document.getElementById('custom-row').style.display='flex';
  document.getElementById('custom-input').focus();
}

export function sendCustom(){
  const inp=document.getElementById('custom-input');
  const txt=inp.value.trim();
  if(!txt) return;
  inp.value='';
  document.getElementById('custom-row').style.display='none';
  sendAction(txt);
}

export function startAttack(){
  if(!G.enemies.length){sendAction('I attack the nearest enemy.');return;}
  const list=document.getElementById('target-list');
  list.innerHTML='';
  G.enemies.forEach(en=>{
    const item=document.createElement('div');
    item.className='tgt';
    item.innerHTML=`<span class="tgt-name">${en.name}</span><span class="tgt-hp">♥ ${en.hp}</span>`;
    item.onclick=()=>{closeOvl('target-overlay');sendAction(`I attack the ${en.name}.`);};
    list.appendChild(item);
  });
  document.getElementById('target-overlay').classList.remove('hidden');
}

export function openSpellPicker(){
  const c=G.char;

  const cList=document.getElementById('cantrip-pick');
  cList.innerHTML='';
  c.cantrips.forEach(sp=>{
    const item=document.createElement('div');
    item.className='spi';
    item.innerHTML=`<span class="sn">${sp}</span><span class="sl">Cantrip</span>`;
    item.onclick=()=>{closeOvl('spell-overlay');sendAction(`I cast ${sp} (cantrip — no slot cost).`);};
    cList.appendChild(item);
  });

  const lList=document.getElementById('leveled-pick');
  lList.innerHTML='';
  const lSection=document.getElementById('leveled-ovl');
  lSection.style.display=c.spells.length?'block':'none';

  document.getElementById('slot-label').textContent=
    `1ST LEVEL SPELLS — ${c.slots} slot${c.slots!==1?'s':''} remaining`;

  c.spells.forEach(sp=>{
    const item=document.createElement('div');
    const noSlot=c.slots<=0;
    item.className='spi'+(noSlot?' disabled':'');
    item.innerHTML=`<span class="sn" style="${noSlot?'opacity:.4':''}">${sp}</span><span class="sl">${noSlot?'No slots left':'1st Level'}</span>`;
    if(!noSlot) item.onclick=()=>{closeOvl('spell-overlay');sendAction(`I cast ${sp} using a 1st-level spell slot.`);};
    lList.appendChild(item);
  });

  document.getElementById('spell-overlay').classList.remove('hidden');
}

export function sendAction(text){
  addPlayerMsg(text);
  G.conv.push({role:'user',content:text});
  callDM(null,false);
}

export async function callDM(openingPrompt,isOpening){
  setActionsDisabled(true);

  const messages=isOpening
    ?[{role:'user',content:openingPrompt}]
    :G.conv;

  const typingEl=addTyping();

  try{
    const res=await fetch('/api/dm',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({messages,systemPrompt:buildSystemPrompt()}),
    });
    if(!res.ok) throw new Error('API error');
    const data=await res.json();
    const reply=data.reply||'';

    removeTyping(typingEl);

    const jMatch=reply.match(/```json\s*([\s\S]*?)```/);
    let gd={combatActive:false,enemies:[],mechanicalEvents:[]};
    if(jMatch){try{gd=JSON.parse(jMatch[1].trim());}catch(e){}}

    const narration=reply.replace(/```json[\s\S]*?```/g,'').trim();

    addDMMsg(narration,gd.mechanicalEvents||[]);

    if(isOpening){
      G.conv=[{role:'user',content:openingPrompt},{role:'assistant',content:reply}];
    } else {
      G.conv.push({role:'assistant',content:reply});
    }

    processMechEvents(gd.mechanicalEvents||[]);
    G.combat=!!gd.combatActive;
    G.enemies=gd.enemies||[];
    renderActions();

    if(G.char.hp<=0) setTimeout(showGameOver,1500);

  } catch(err){
    removeTyping(typingEl);
    addDMMsg('The DM is unreachable. Check your connection and try again.',[]);
  }

  setActionsDisabled(false);
}

export function addDMMsg(narration,events){
  const log=document.getElementById('chat-log');
  const evHtml=events.map(ev=>{
    let cls='status', txt=ev.description||'';
    if(ev.type==='hp_change'){
      cls=ev.amount<0?'hp-loss':'hp-gain';
      if(!txt) txt=ev.amount<0?`${Math.abs(ev.amount)} damage`:`+${ev.amount} HP restored`;
    } else if(ev.type==='slot_used'){
      cls='slot-used';
      if(!txt) txt='Spell slot used';
    }
    return `<div class="mev ${cls}">${txt}</div>`;
  }).join('');

  const el=document.createElement('div');
  el.className='dm-msg';
  el.innerHTML=`<div class="dm-text">${narration.replace(/\n/g,'<br>')}</div>`
    +(evHtml?`<div class="mech-events">${evHtml}</div>`:'');
  log.appendChild(el);
  log.scrollTop=log.scrollHeight;
}

export function addPlayerMsg(text){
  const log=document.getElementById('chat-log');
  const el=document.createElement('div');
  el.className='player-msg';
  el.innerHTML=`<div class="player-bubble">${text}</div>`;
  log.appendChild(el);
  log.scrollTop=log.scrollHeight;
}

export function addTyping(){
  const log=document.getElementById('chat-log');
  const el=document.createElement('div');
  el.className='typing-ind';
  el.innerHTML=`<span>The DM ponders…</span><div class="dot-pulse"><span></span><span></span><span></span></div>`;
  log.appendChild(el);
  log.scrollTop=log.scrollHeight;
  return el;
}

export function removeTyping(el){ if(el?.parentNode) el.parentNode.removeChild(el); }

export function showGameOver(){ document.getElementById('game-over').classList.remove('hidden'); }

export function restartGame(){
  clearChar();
  location.reload();
}
