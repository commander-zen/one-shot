import { G, CLASSES, SPELLS } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast } from '../shared/overlay.js';
import { mod, calcAC } from '../shared/dice.js';
import { buildClassGrid } from './step-class.js';
import { buildReview } from './step-review.js';

export function step1Next(){
  const name=document.getElementById('char-name').value.trim();
  if(!name){toast('Enter your character\'s name.');return;}
  G.char.name=name;
  G.char.backstory=document.getElementById('char-backstory').value.trim();
  goStep(2);
  buildClassGrid();
}

export function onBackstoryInput(){
  const val = document.getElementById('char-backstory').value.trim();
  const btn = document.getElementById('send-it-btn');
  if(btn){
    btn.disabled = !val;
    btn.textContent = val
      ? '✨ Send It — Build My Character'
      : '✨ Send It (describe your vibe first)';
  }
}

export async function sendIt(vibeOverride){
  const nameVal = document.getElementById('char-name').value.trim();
  const vibe = vibeOverride || document.getElementById('char-backstory')?.value.trim();
  if(!vibe){ toast('Enter a backstory or vibe first.'); return; }

  const btn = document.getElementById('send-it-btn');
  const btnAgain = document.getElementById('send-it-again-btn');
  const statusEl = document.getElementById('send-it-status');
  const statusAgainEl = document.getElementById('send-it-again-status');

  if(btn){ btn.disabled = true; btn.textContent = 'Summoning your hero…'; }
  if(btnAgain){ btnAgain.disabled = true; btnAgain.textContent = 'Summoning your hero…'; }
  if(statusEl){ statusEl.style.display = 'none'; statusEl.textContent = ''; }
  if(statusAgainEl){ statusAgainEl.style.display = 'none'; statusAgainEl.textContent = ''; }

  try {
    const res = await fetch('/api/character', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vibe }),
    });

    const data = await res.json();
    if(!res.ok || data.error) throw new Error(data.error || 'Unknown error');

    const cls = data.class || 'Fighter';
    const classData = CLASSES[cls] || CLASSES.Fighter;
    const scores = data.scores || { STR:10, DEX:10, CON:10, INT:10, WIS:10, CHA:10 };
    const conMod = mod(scores.CON);

    G.char.name = data.name || nameVal || 'Hero';
    G.char.backstory = vibe;
    G.char.cls = cls;
    G.char.race = data.species || 'Human';
    G.char.base = { ...scores };
    G.char.final = { ...scores };
    G.char.hitDie = classData.hitDie || 8;
    G.char.maxHp = Math.max(1, G.char.hitDie + conMod);
    G.char.hp = G.char.maxHp;
    G.char.ac = calcAC(cls, scores);
    G.char.speed = 30;
    G.char.profBonus = 2;
    G.char.saves = classData.saves || [];
    G.char.skills = data.skills || [];
    G.char.sp = classData.sp || false;
    G.char.maxSlots = classData.slots || 0;
    G.char.slots = classData.slots || 0;
    G.char.equip = classData.equip || '';

    if(classData.sp && SPELLS[cls]){
      G.char.cantrips = (SPELLS[cls].cantrips || []).slice(0, classData.cantrips || 0);
    } else {
      G.char.cantrips = [];
    }
    G.char.spells = data.spells || [];

    G.char.vibeTagline = data.vibeTagline || '';
    G.char.whyThisWorks = data.whyThisWorks || '';
    G.char.fromSendIt = true;

    // Reset both buttons on success
    if(btn){ btn.textContent = '✨ Send It — Build My Character'; btn.disabled = !document.getElementById('char-backstory')?.value.trim(); }
    if(btnAgain){ btnAgain.textContent = '✨ Send It Again'; btnAgain.disabled = false; }

    goStep(8);
    buildReview();

  } catch(err) {
    const msg = err.message || 'Could not generate character. Try again.';
    // Show error near whichever button was used
    if(statusAgainEl && btnAgain && !btnAgain.style.display.includes('none')){
      statusAgainEl.textContent = msg;
      statusAgainEl.style.display = 'block';
    } else if(statusEl){
      statusEl.textContent = `Error: ${msg}`;
      statusEl.style.display = 'block';
    } else {
      toast(msg);
    }
    if(btn){ btn.textContent = '✨ Send It — Build My Character'; btn.disabled = !document.getElementById('char-backstory')?.value.trim(); }
    if(btnAgain){ btnAgain.textContent = '✨ Send It Again'; btnAgain.disabled = false; }
  }
}
