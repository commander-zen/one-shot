import { G, campaignState } from '../shared/state.js';
import { toast, closeOvl } from '../shared/overlay.js';
import { clearChar, saveCampaignState, getCampaignState, getCharacter } from '../shared/storage.js';
import { modStr } from '../shared/dice.js';
import { updateSlots, processMechEvents, setActionsDisabled } from './combat.js';
import { loadAdventure, getChapter } from '../data/adventure.js';

let uploadedContent = '';

// ── Scene state for active play session ──────────────────────────────────────
const COMPANION_MAX = { will: 28, seamus: 51, krag: 58 };
const sceneState = { currentHp: 0, slotsUsed: 0, conditions: [], willhp: 0, seamushp: 0, kraghp: 0 };
const conversationHistory = [];

function calcMaxHp(char) {
  const HIT_DIE_MAP = { Fighter:10, Paladin:12, Ranger:10, Barbarian:12 };
  const die = char.hitDie || HIT_DIE_MAP[char.cls] || 8;
  const con = char.final?.CON ?? char.CON ?? 10;
  return die + Math.floor((con - 10) / 2);
}

function dotColor(hp, max) {
  if (hp <= 0) return '#555';
  const pct = hp / max;
  if (pct > 0.5) return '#2ecc71';
  if (pct > 0.25) return '#f39c12';
  return '#e74c3c';
}

function buildCompanionStatus() {
  const companions = [
    { id: 'will',  name: 'Williwaw', max: COMPANION_MAX.will,  hp: sceneState.willhp  },
    { id: 'seamus',name: 'Seamus',   max: COMPANION_MAX.seamus, hp: sceneState.seamushp },
    { id: 'krag',  name: 'Kraghor',  max: COMPANION_MAX.krag,   hp: sceneState.kraghp  },
  ];
  return companions.map(c =>
    `<div class="companion-row">
      <span class="companion-dot" id="dot-${c.id}" style="background:${dotColor(c.hp, c.max)}"></span>
      <span class="companion-name">${c.name}</span>
      <span class="companion-hp" id="chp-${c.id}">${Math.max(0, c.hp)}/${c.max}</span>
    </div>`
  ).join('');
}

function updateCompanionHud() {
  const companions = [
    { id: 'will',  max: COMPANION_MAX.will,  hp: sceneState.willhp  },
    { id: 'seamus',max: COMPANION_MAX.seamus, hp: sceneState.seamushp },
    { id: 'krag',  max: COMPANION_MAX.krag,   hp: sceneState.kraghp  },
  ];
  companions.forEach(c => {
    const dot = document.getElementById('dot-' + c.id);
    const label = document.getElementById('chp-' + c.id);
    if (dot)   dot.style.background = dotColor(c.hp, c.max);
    if (label) label.textContent = `${Math.max(0, c.hp)}/${c.max}`;
  });
}

function buildPips(total, used) {
  let html = '';
  for (let i = 0; i < total; i++) html += `<span class="spell-pip${i < used ? ' used' : ''}"></span>`;
  return html;
}

function buildCharDrawer(char) {
  if (!char) return '<p>No character loaded.</p>';
  const s = char.final || {};
  const STAT_KEYS = ['STR','DEX','CON','INT','WIS','CHA'];
  const statRow = STAT_KEYS.map(st => {
    const v = s[st] || 10;
    const mod = Math.floor((v - 10) / 2);
    return `<div class="drawer-stat"><span>${st}</span><span>${v} (${mod>=0?'+':''}${mod})</span></div>`;
  }).join('');
  return `
    <div class="drawer-header">
      <h3>${char.name}</h3>
      <div class="drawer-sub">${char.race} ${char.cls} · Level 1</div>
    </div>
    <div class="drawer-stats">${statRow}</div>
    <div class="drawer-section"><strong>Saves:</strong> ${(char.saves||[]).join(', ')||'—'}</div>
    <div class="drawer-section"><strong>Skills:</strong> ${(char.skills||[]).join(', ')||'—'}</div>
    <div class="drawer-section"><strong>Equipment:</strong> ${char.equip||'—'}</div>
    ${char.sp?`<div class="drawer-section"><strong>Cantrips:</strong> ${(char.cantrips||[]).join(', ')||'—'}</div>
    <div class="drawer-section"><strong>Spells:</strong> ${(char.spells||[]).join(', ')||'—'}</div>`:''}
    ${char.backstory?`<div class="drawer-section"><strong>Backstory:</strong> ${char.backstory}</div>`:''}
  `;
}

function updateHud() {
  const char = getCharacter();
  if (!char) return;
  const maxHp = calcMaxHp(char);
  const pct = Math.max(0, Math.round((sceneState.currentHp / maxHp) * 100));
  const fill = document.getElementById('hp-fill');
  if (fill) fill.style.width = `${pct}%`;
  const label = document.getElementById('hud-hp-label');
  if (label) label.textContent = `${sceneState.currentHp} / ${maxHp} HP`;
  const pips = document.getElementById('spell-pips');
  if (pips && char.maxSlots) pips.innerHTML = buildPips(char.maxSlots, sceneState.slotsUsed);
  updateCompanionHud();
}

function renderActionButtons(actions) {
  const container = document.getElementById('action-btns');
  if (!container) return;
  container.innerHTML = actions.map(a =>
    `<button class="action-btn" data-action="${a.replace(/"/g,'&quot;')}">${a}</button>`
  ).join('');
  container.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => handleAction(btn.dataset.action));
  });
}

// ── New campaign flow ─────────────────────────────────────────────────────────

export async function startCampaign(resumeFromSavedState = false) {
  sceneState.currentHp = 0;
  sceneState.slotsUsed = 0;
  sceneState.conditions = [];
  const saved = getCampaignState() || {};
  sceneState.willhp   = saved.willhp   ?? COMPANION_MAX.will;
  sceneState.seamushp = saved.seamushp ?? COMPANION_MAX.seamus;
  sceneState.kraghp   = saved.kraghp   ?? COMPANION_MAX.krag;
  await loadAdventure();
  const chapter = getChapter(1);
  if(!chapter?.sections?.length) console.error('[adventure] Chapter 1 sections not found — check console log for correct path');
  const firstArea = chapter?.sections?.[0] ?? { name: 'Chapter 1', id: 'ch1-s0', entries: [] };
  let area = firstArea;
  if(resumeFromSavedState && campaignState.areaId){
    area = chapter?.sections?.find(s => s.id === campaignState.areaId) ?? firstArea;
  } else {
    campaignState.areaId = firstArea.id || 'ch1-s0';
    campaignState.willhp   = sceneState.willhp;
    campaignState.seamushp = sceneState.seamushp;
    campaignState.kraghp   = sceneState.kraghp;
    campaignState.kraghorExhaustion = false;
  }
  saveCampaignState(campaignState);
  document.getElementById('phase1').classList.add('hidden');
  renderScene(area);
}

export function renderScene(area) {
  const char = getCharacter();
  const maxHp = calcMaxHp(char);
  if (!sceneState.currentHp) sceneState.currentHp = maxHp;

  let readAloud = null;
  for (const e of (area.entries || [])) {
    if (typeof e === 'string') { readAloud = e; break; }
    if (e?.type === 'entries' && Array.isArray(e.entries)) {
      for (const sub of e.entries) {
        if (typeof sub === 'string') { readAloud = sub; break; }
      }
      if (readAloud) break;
    }
  }
  if (!readAloud) readAloud = `You arrive at ${area.name}.`;
  if (!campaignState.visitedAreas?.length) {
    readAloud += ' Williwaw Icefang Amarok stands at your side — a towering Goliath druid, blue-grey skin marked with frost-tribe tattoos, already watching the tree line. Behind him, Seamus Muckbuckle checks his handaxes with practiced efficiency, eyes flat and unreadable. And Kraghor — a Minotaur large enough to make the wagon creak — grins at the thought of what lies ahead.';
  }

  const play = document.getElementById('play');
  play.style.display = 'block';
  play.innerHTML = `
    <div id="scene-header">
      <h2 id="area-name">${area.name}</h2>
    </div>
    <div id="chat-log">
      <blockquote class="scene-narration">${readAloud}</blockquote>
    </div>
    <div id="action-menu">
      <div id="action-btns"></div>
      <div id="dm-thinking" style="display:none;font-size:.8rem;color:var(--dim);font-style:italic;text-align:center;padding:6px 0">The DM is thinking…</div>
    </div>
    <div id="character-hud">
      <div class="hud-row">
        <div class="hud-name">${char.name} · ${char.cls}</div>
        <button class="hud-char-btn" id="hud-char-btn">Character</button>
      </div>
      <div class="hp-bar-track"><div class="hp-bar-fill" id="hp-fill" style="width:100%"></div></div>
      <div class="hud-hp-label" id="hud-hp-label">${sceneState.currentHp} / ${maxHp} HP</div>
      ${char.sp && char.maxSlots ? `<div class="spell-pips" id="spell-pips">${buildPips(char.maxSlots, sceneState.slotsUsed)}</div>` : ''}
      <div id="companion-status">${buildCompanionStatus()}</div>
    </div>
    <div id="character-drawer" class="hidden">
      <div class="drawer-inner">
        ${buildCharDrawer(char)}
        <button class="btn btn-full drawer-close-btn">Close</button>
      </div>
    </div>
    <div id="drawer-backdrop" class="hidden"></div>
  `;

  const closeDrawer = () => {
    document.getElementById('character-drawer').classList.add('hidden');
    document.getElementById('drawer-backdrop').classList.add('hidden');
  };
  document.getElementById('hud-char-btn').addEventListener('click', () => {
    document.getElementById('character-drawer').classList.remove('hidden');
    document.getElementById('drawer-backdrop').classList.remove('hidden');
  });
  document.querySelector('.drawer-close-btn').addEventListener('click', closeDrawer);
  document.getElementById('drawer-backdrop').addEventListener('click', closeDrawer);

  renderActionButtons(['Look Around', 'Move On', 'Check Character', 'Rest']);
}

export async function handleAction(label) {
  document.querySelectorAll('.action-btn').forEach(b => { b.disabled = true; });
  const thinking = document.getElementById('dm-thinking');
  if (thinking) thinking.style.display = 'block';
  try {
    const response = await askDM(label);
    renderDMResponse(response);
  } catch(e) {
    console.error('DM call failed:', e);
    renderDMResponse({
      narration: 'The DM is unreachable. Check your connection and try again.',
      mechanicalEvents: [],
      newCharacterState: null,
      newCampaignState: null,
      availableActions: ['Look Around', 'Move On', 'Check Character', 'Rest'],
    });
  } finally {
    if (thinking) thinking.style.display = 'none';
  }
}

export async function askDM(playerAction) {
  const char = getCharacter();
  const state = getCampaignState() || campaignState;
  const chapter = getChapter(1);
  const area = chapter?.sections?.find(s => s.id === state.areaId)
    ?? chapter?.sections?.[0]
    ?? { name: 'Chapter 1', entries: [] };

  const res = await fetch('/api/dm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      playerAction,
      area,
      character: { ...char, currentHp: sceneState.currentHp },
      campaignState: { ...state, willhp: sceneState.willhp, seamushp: sceneState.seamushp, kraghp: sceneState.kraghp },
      history: conversationHistory.slice(-6),
    }),
  });
  if (!res.ok) throw new Error('DM API error');
  return await res.json();
}

export function renderDMResponse(response) {
  const { narration='', mechanicalEvents=[], newCharacterState, newCampaignState, availableActions=[] } = response;

  const log = document.getElementById('chat-log');
  if (log) {
    const entry = document.createElement('div');
    entry.className = 'chat-entry';

    const narEl = document.createElement('blockquote');
    narEl.className = 'scene-narration';
    narEl.innerHTML = narration.replace(/\n/g, '<br>');
    entry.appendChild(narEl);

    if (mechanicalEvents.length) {
      const chips = document.createElement('div');
      chips.className = 'mech-chips';
      chips.innerHTML = mechanicalEvents.map(ev =>
        `<span class="mechanical-chip chip-${ev.type||'status'}">${ev.description||''}${ev.value!=null?` (${ev.value})`:''}</span>`
      ).join('');
      entry.appendChild(chips);
    }

    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }

  if (newCharacterState) {
    if (newCharacterState.currentHp != null) sceneState.currentHp = newCharacterState.currentHp;
    if (newCharacterState.spellSlotsUsed != null) {
      sceneState.slotsUsed = typeof newCharacterState.spellSlotsUsed === 'number'
        ? newCharacterState.spellSlotsUsed
        : Object.values(newCharacterState.spellSlotsUsed).reduce((a,b)=>a+b, 0);
    }
    if (newCharacterState.conditions != null) sceneState.conditions = newCharacterState.conditions;
    updateHud();
  }

  if (newCampaignState) {
    Object.assign(campaignState, newCampaignState);
    saveCampaignState(campaignState);
    if (newCampaignState.willhp   != null) sceneState.willhp   = newCampaignState.willhp;
    if (newCampaignState.seamushp != null) sceneState.seamushp = newCampaignState.seamushp;
    if (newCampaignState.kraghp   != null) sceneState.kraghp   = newCampaignState.kraghp;
    updateCompanionHud();
  }

  const nextActions = availableActions.length
    ? availableActions
    : ['Look Around', 'Move On', 'Check Character', 'Rest'];
  renderActionButtons(nextActions);

  conversationHistory.push({ role: 'assistant', content: narration });
}

// ── Legacy phase3 functions (orphaned from builder flow) ──────────────────────

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
