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

// Enable/disable the Send It button based on backstory content
export function onBackstoryInput(){
  const val = document.getElementById('char-backstory').value.trim();
  const btn = document.getElementById('send-it-btn');
  if(btn) btn.disabled = !val;
}

export async function sendIt(vibeOverride){
  const nameVal = document.getElementById('char-name').value.trim();
  const vibe = vibeOverride || document.getElementById('char-backstory').value.trim();
  if(!vibe){ toast('Enter a backstory or vibe first.'); return; }

  const btn = document.getElementById('send-it-btn');
  const btnAgain = document.getElementById('send-it-again-btn');
  const statusEl = document.getElementById('send-it-status');
  if(btn){ btn.disabled = true; btn.textContent = 'Summoning your hero…'; }
  if(btnAgain){ btnAgain.disabled = true; btnAgain.textContent = 'Summoning…'; }
  if(statusEl){ statusEl.style.display = 'none'; statusEl.textContent = ''; }

  try {
    const res = await fetch('/api/character', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vibe }),
    });

    const data = await res.json();
    if(!res.ok || data.error) throw new Error(data.error || 'Unknown error');

    // Populate G.char from the response
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

    // Cantrips from fallback list; spells from response
    if(classData.sp && SPELLS[cls]){
      G.char.cantrips = (SPELLS[cls].cantrips || []).slice(0, classData.cantrips || 0);
    } else {
      G.char.cantrips = [];
    }
    G.char.spells = data.spells || [];

    // Send It metadata for review display
    G.char.vibeTagline = data.vibeTagline || '';
    G.char.whyThisWorks = data.whyThisWorks || '';
    G.char.fromSendIt = true;

    // Reset button states
    if(btn){ btn.textContent = '✨ Send It'; btn.disabled = !vibe; }

    // Jump directly to review
    goStep(8);
    buildReview();

  } catch(err) {
    if(statusEl){ statusEl.textContent = `Error: ${err.message || 'Could not generate character. Try again.'}`; statusEl.style.display = 'block'; }
    else toast(err.message || 'Could not generate character. Try again.');
    if(btn){ btn.textContent = '✨ Send It'; btn.disabled = !vibe; }
    if(btnAgain){ btnAgain.textContent = '✨ Send It Again'; btnAgain.disabled = false; }
  }
}
