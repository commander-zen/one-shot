import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveClasses } from '../data/schema.js';
import { getRating, applyTier } from '../data/ratings.js';
import { buildBackground } from './step-background.js';
import { buildSpellPicker } from './step-spells.js';
import { buildReview } from './step-review.js';

const CLASS_VIBES = {
  Artificer: "Gadgets, gizmos, and magical engineering",
  Barbarian: "Rage first, questions never",
  Bard: "Charm your way through everything",
  Cleric: "Divine power with an agenda",
  Druid: "Nature's wrath in living form",
  Fighter: "Reliable, relentless, always effective",
  Monk: "Discipline turned into devastation",
  Paladin: "Holy warrior with unbreakable conviction",
  Ranger: "Hunter who thrives where others fear",
  Rogue: "Strike once, strike hard, vanish",
  Sorcerer: "Raw magic in human skin",
  Warlock: "Power borrowed from something ancient",
  Wizard: "Every answer is in a book"
};

const CLASS_WHY = {
  Artificer: "S-tier for utility. Infusions give your party passive upgrades no other class can match. Battle Smith and Armorer both bring built-in combat companions or heavy armor proficiency.",
  Barbarian: "A-tier bruiser. Rage damage resistance and Reckless Attack make you nearly unkillable early. Path of the Beast adds natural weapons that scale well.",
  Bard: "S-tier support. Full spellcaster with Expertise, Bardic Inspiration, and Magical Secrets. College of Eloquence removes failure conditions entirely.",
  Cleric: "S-tier. Heavy armor, healing, battlefield control, and nukes depending on subclass. Life and War are both strong picks.",
  Druid: "A-tier. Wild Shape is a free HP pool early. Circle of Spores adds poison damage and reanimation. Moon Druid is one of the strongest early-game options.",
  Fighter: "A-tier. Action Surge alone makes this class. Extra Attack stacks fast. Champion and Battle Master both perform consistently.",
  Monk: "B-tier. Strong mobility and Stunning Strike are real tools but Ki economy is tight. Warrior of Shadow and Warrior of Mercy are the standout subclasses.",
  Paladin: "S-tier. Auras, Divine Smite, and Charisma synergy make this one of the strongest melee classes. Oath of Conquest adds fear control on top of elite damage.",
  Ranger: "B-tier. Improved in 2024. Hunter and Gloom Stalker are solid picks. Outpaced by Paladin and Fighter in pure damage but brings strong utility.",
  Rogue: "A-tier. Sneak Attack scales fast, Cunning Action is always relevant, Expertise stacks skill checks to near-automatic. Reliable Talent makes failure nearly impossible.",
  Sorcerer: "A-tier. Metamagic is the best spell modification system in the game. Subtle Spell and Quickened Spell are both broken in the right hands.",
  Warlock: "A-tier. Short-rest spell recovery and Eldritch Blast as a permanent cantrip make this reliable at any level. Invocations let you customize your kit deeply.",
  Wizard: "S-tier. Largest spell list in the game, Arcane Recovery, and the ability to learn any spell from a scroll. Evocation and Abjuration are both strong schools."
};

const SKILL_DESC = {
  Acrobatics:       "Flip, dodge, and keep your balance",
  'Animal Handling':"Calm, control, and read animals",
  Arcana:           "Know spells, magic items, and mystical lore",
  Athletics:        "Climb, swim, jump, and grapple",
  Deception:        "Lie convincingly and disguise your intentions",
  History:          "Recall events, lore, and important facts",
  Insight:          "Read people — sense lies and hidden motives",
  Intimidation:     "Frighten or pressure others into compliance",
  Investigation:    "Search scenes and solve problems logically",
  Medicine:         "Stabilize the dying and diagnose illness",
  Nature:           "Know terrain, plants, animals, and weather",
  Perception:       "Notice things — spot danger before it spots you",
  Performance:      "Entertain, distract, and command attention",
  Persuasion:       "Win people over through charm and reason",
  Religion:         "Know gods, rituals, undead, and holy magic",
  'Sleight of Hand':"Pick pockets, plant objects, do tricks",
  Stealth:          "Move without being seen or heard",
  Survival:         "Track, forage, navigate, and endure the wild",
};

const SKILL_PRIORITY = {
  Artificer: ['Investigation','Perception'],
  Barbarian: ['Athletics','Perception'],
  Bard:      ['Persuasion','Perception','Deception'],
  Cleric:    ['Insight','Persuasion'],
  Druid:     ['Perception','Insight'],
  Fighter:   ['Athletics','Perception'],
  Monk:      ['Acrobatics','Insight'],
  Paladin:   ['Persuasion','Athletics'],
  Ranger:    ['Perception','Stealth','Survival'],
  Rogue:     ['Stealth','Perception','Deception','Sleight of Hand'],
  Sorcerer:  ['Persuasion','Arcana'],
  Warlock:   ['Deception','Arcana'],
  Wizard:    ['Arcana','Investigation'],
};

function getSkillDesc(name){
  const key=Object.keys(SKILL_DESC).find(k=>k.toLowerCase()===name.trim().toLowerCase());
  return key?SKILL_DESC[key]:'';
}

let selSkills = [];
export { selSkills };

let isRespec = false;
export function setRespec(v){ isRespec = v; }

export function buildClassGrid(){
  const g=document.getElementById('class-grid');
  g.innerHTML='';

  const classes=getActiveClasses();
  let entries=Object.entries(classes);
  entries.sort(([a],[b])=>a.localeCompare(b));
  entries.forEach(([name,cls])=>{
    const mechText=`Hit Die: d${cls.hitDie} · Armor: ${cls.ac} · Saves: ${cls.saves.join(', ')} · Choose ${cls.sc} from: ${cls.skills.join(', ')}`;
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${name}</h4><p class="card-tagline">${CLASS_VIBES[name]||''}</p>`;
    const infoBtn=document.createElement('span');
    infoBtn.className='card-info-btn';
    infoBtn.textContent='ⓘ';
    infoBtn.onclick=e=>{
      e.stopPropagation();
      const body=`<p>${CLASS_VIBES[name]||''}</p><p style="margin-top:10px">${CLASS_WHY[name]||''}</p><p style="margin-top:10px;color:#aaa">${mechText}</p>`;
      openInfoOverlay(name,body,`https://rpgbot.net/2024-dnd/classes/${name.toLowerCase()}/`);
    };
    c.appendChild(infoBtn);
    c.onclick=()=>selectClass(name,c);
    g.appendChild(c);
  });
}

export function selectClass(name,el){
  document.querySelectorAll('#class-grid .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  G.char.cls=name;

  const cls=getActiveClasses()[name];
  document.getElementById('class-detail').style.display='block';
  document.getElementById('class-info-text').textContent=
    `Hit Die: d${cls.hitDie} · Saving throws: ${cls.saves.join(', ')} · Equipment: ${cls.equip}`;

  // auto-select top recommended skills available in this class's list
  const priority=SKILL_PRIORITY[name]||[];
  const autoSelected=[];
  for(const sk of priority){
    if(autoSelected.length>=cls.sc) break;
    const match=cls.skills.find(s=>s.trim().toLowerCase()===sk.trim().toLowerCase());
    if(match) autoSelected.push(match);
  }
  selSkills=[...autoSelected];

  document.getElementById('skill-label').textContent=`Choose ${cls.sc} skill proficiencie${cls.sc>1?'s':'y'}:`;

  // hint line — inserted once, updated on each class switch
  let hint=document.getElementById('skill-hint');
  if(!hint){
    hint=document.createElement('div');
    hint.id='skill-hint';
    hint.className='skill-hint';
    hint.style.cssText='margin:4px 0 8px;';
    document.getElementById('skill-label').insertAdjacentElement('afterend',hint);
  }
  if(autoSelected.length>0){
    hint.textContent="We’ve selected the best starting skills for your class — change them if you know what you’re doing.";
    hint.style.display='block';
  } else {
    hint.style.display='none';
  }

  const list=document.getElementById('skill-list');
  list.innerHTML='';
  cls.skills.forEach(sk=>{
    const chip=document.createElement('div');
    chip.className='skill-chip'+(autoSelected.includes(sk)?' sel':'');
    chip.innerHTML=`<span>${sk}</span><span class="chip-desc">${getSkillDesc(sk)}</span>`;
    applyTier(chip, getRating(name, 'skills', sk));
    chip.onclick=()=>toggleSkill(sk,chip,cls.sc);
    list.appendChild(chip);
  });

  document.getElementById('class-next').disabled=selSkills.length<cls.sc;
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

export function step2Next(){
  const cls=getActiveClasses()[G.char.cls];
  if(!G.char.cls){toast('Select a class.');return;}
  if(selSkills.length<cls.sc){toast(`Select ${cls.sc} skills.`);return;}
  G.char.skills=[...selSkills];
  if(isRespec){
    isRespec=false;
    if(cls.sp){ goStep(7); buildSpellPicker(); }
    else { G.char.cantrips=[]; G.char.spells=[]; goStep(8); buildReview(); }
    return;
  }
  goStep(3);
  buildBackground();
}
