import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast, openInfoOverlay } from '../shared/overlay.js';
import { getActiveClasses } from '../data/schema.js';
import { getRating, applyTier, CLASS_OVERALL, tierLegendHTML } from '../data/ratings.js';
import { buildBackground } from './step-background.js';
import { buildSpellPicker } from './step-spells.js';
import { buildReview } from './step-review.js';

const CLASS_VIBES = {
  Artificer:  "You fix, build, and invent — and your gadgets hit harder than most swords",
  Barbarian:  "Rage makes you nearly unstoppable — the toughest, hardest-hitting fighter alive",
  Bard:       "Your words open doors, win allies, and get you out of fights before they start",
  Cleric:     "Divine power heals your friends and destroys your enemies — the backbone of any party",
  Druid:      "You speak the language of nature — and nature listens when things get dangerous",
  Fighter:    "More attacks, more options, more damage — the most reliable weapon in the group",
  Monk:       "Faster than anyone, your fists hit like weapons and you never need one",
  Paladin:    "A heavily armored warrior who can heal allies and smite enemies with holy power",
  Ranger:     "You track, hunt, and survive — deadliest in terrain you know",
  Rogue:      "One big hit at exactly the right moment — sneaky, fast, and precise",
  Sorcerer:   "Raw magical power in your blood — fewer spells, but they hit harder",
  Warlock:    "Dark patron magic that recharges every rest — fewer slots, always ready",
  Wizard:     "The widest spell list in the game — a solution for every situation",
};

const CLASS_WHY = {
  Artificer:  "Ranked mid-tier because it takes more system knowledge to use well, but a well-built Artificer is uniquely durable and versatile",
  Barbarian:  "Ranked highly because Rage gives consistent damage reduction and bonus damage — nearly unkillable at low levels for new players",
  Bard:       "Ranked highly because Bardic Inspiration and full skill proficiencies make you effective in combat, social, and exploration situations",
  Cleric:     "Ranked highly because healing, offensive spells, and solid armor make Clerics valuable and effective in almost any party",
  Druid:      "Ranked highly because Wild Shape and powerful concentration spells give you more flexibility than nearly any other class",
  Fighter:    "Ranked highly because Action Surge doubles your action economy and Extra Attack provides the most reliable consistent damage",
  Monk:       "Ranked mid-tier because high-level Monks are powerful but require careful ki management and scale less well without magical items",
  Paladin:    "Ranked highly because Divine Smite adds massive burst damage, and heavy armor plus healing makes this class strong for new players",
  Ranger:     "Ranked mid-tier because many features are situational — very strong in the right environment but inconsistent across all campaigns",
  Rogue:      "Ranked highly because Sneak Attack provides reliable bonus damage every round with very few resources consumed",
  Sorcerer:   "Ranked mid-tier because Metamagic makes individual spells more powerful, but a smaller spell list limits flexibility versus Wizards",
  Warlock:    "Ranked mid-tier because Eldritch Blast is reliably strong, but limited spell slots require careful management between rests",
  Wizard:     "Ranked highly because the broadest spell list in the game gives you a prepared answer for nearly every situation your party faces",
};

const RATING_ORDER = {blue:0,green:1,orange:2,red:3};

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

  // Tier legend — insert/update above the grid
  let legend=document.getElementById('class-tier-legend');
  if(!legend){
    legend=document.createElement('div');
    legend.id='class-tier-legend';
    legend.innerHTML=tierLegendHTML();
    g.insertAdjacentElement('beforebegin',legend);
  }

  const classes=getActiveClasses();
  let entries=Object.entries(classes);
  // Sort by class overall RPGBOT tier
  entries.sort(([a],[b])=>{
    const ra=RATING_ORDER[CLASS_OVERALL[a]]??4;
    const rb=RATING_ORDER[CLASS_OVERALL[b]]??4;
    return ra!==rb?ra-rb:a.localeCompare(b);
  });
  entries.forEach(([name,cls])=>{
    const mechText=`Hit Die: d${cls.hitDie} · Armor: ${cls.ac} · Saves: ${cls.saves.join(', ')} · Choose ${cls.sc} from: ${cls.skills.join(', ')}`;
    const c=document.createElement('div');
    c.className='opt-card';
    c.innerHTML=`<h4>${name}</h4><p class="card-tagline">${CLASS_VIBES[name]||''}</p>`;
    applyTier(c, CLASS_OVERALL[name] || null);
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
