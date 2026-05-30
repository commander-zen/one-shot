import { G, campaignState, companionMaxHp } from '../shared/state.js';
import { toast, closeOvl } from '../shared/overlay.js';
import { clearChar, saveCampaignState, getCampaignState, getCharacter } from '../shared/storage.js';
import { modStr } from '../shared/dice.js';
import { updateSlots, processMechEvents, setActionsDisabled } from './combat.js';
import { loadAdventure, getChapter } from '../data/adventure.js';

let uploadedContent = '';

// ── Scene state for active play session ──────────────────────────────────────
let COMPANION_MAX = { will: 14, seamus: 12, krag: 15 }; // updated from playerLevel at init
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
  COMPANION_MAX = companionMaxHp(saved.playerLevel || 1);
  sceneState.willhp   = Math.min(saved.willhp   ?? COMPANION_MAX.will,   COMPANION_MAX.will);
  sceneState.seamushp = Math.min(saved.seamushp ?? COMPANION_MAX.seamus, COMPANION_MAX.seamus);
  sceneState.kraghp   = Math.min(saved.kraghp   ?? COMPANION_MAX.krag,   COMPANION_MAX.krag);
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
      <div id="companion-toggle">▲ companions</div>
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
  document.getElementById('companion-toggle').addEventListener('click', () => {
    const hud = document.getElementById('character-hud');
    const expanded = hud.classList.toggle('hud-expanded');
    document.getElementById('companion-toggle').textContent = expanded ? '▼ companions' : '▲ companions';
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
      companionMaxHp: COMPANION_MAX,
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
    // IMPORTANT: Never use innerHTML for AI/user content (XSS risk).
    narEl.textContent = narration;
    entry.appendChild(narEl);

    if (mechanicalEvents.length) {
      const chips = document.createElement('div');
      chips.className = 'mech-chips';
      mechanicalEvents.forEach(ev => {
        const type = (ev?.type || 'status');
        const desc = (ev?.description || '');
        const val = ev?.value;
        const chip = document.createElement('span');
        chip.className = `mechanical-chip chip-${type}`;
        chip.textContent = `${desc}${val != null ? ` (${val})` : ''}`;
        chips.appendChild(chip);
      });
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
    if (newCampaignState.willhp   != null) sceneState.willhp   = newCampaignState.willhp;
    if (newCampaignState.seamushp != null) sceneState.seamushp = newCampaignState.seamushp;
    if (newCampaignState.kraghp   != null) sceneState.kraghp   = newCampaignState.kraghp;
  }

  if (response.levelUp) {
    const newLevel = Math.min((campaignState.playerLevel || 1) + 1, 5);
    campaignState.playerLevel = newLevel;
    COMPANION_MAX = companionMaxHp(newLevel);
    sceneState.willhp   = COMPANION_MAX.will;
    sceneState.seamushp = COMPANION_MAX.seamus;
    sceneState.kraghp   = COMPANION_MAX.krag;
    campaignState.willhp   = sceneState.willhp;
    campaignState.seamushp = sceneState.seamushp;
    campaignState.kraghp   = sceneState.kraghp;
  }

  if (newCampaignState || response.levelUp) {
    saveCampaignState(campaignState);
    updateCompanionHud();
  }

  const nextActions = availableActions.length
    ? availableActions
    : ['Look Around', 'Move On', 'Check Character', 'Rest'];
  renderActionButtons(nextActions);

  conversationHistory.push({ role: 'assistant', content: narration });
}

// ── Legacy phase3 functions (removed) ─────────────────────────────────────────
// The old module-select + phase3 DM flow was replaced by the new campaign play
// screen (#play) and /api/dm JSON schema. Keep this file focused on the new flow.

export function restartGame(){
  clearChar();
  location.reload();
}
