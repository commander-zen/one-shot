export const STATS = ['STR','DEX','CON','INT','WIS','CHA'];
export const STD_ARR = [15,14,13,12,10,8];

export const RACES = {
  Human:      {bonuses:{STR:1,DEX:1,CON:1,INT:1,WIS:1,CHA:1}, speed:30, desc:'+1 to all ability scores'},
  Elf:        {bonuses:{DEX:2,INT:1}, speed:30, desc:'+2 DEX, +1 INT · Darkvision'},
  Dwarf:      {bonuses:{CON:2,WIS:1}, speed:25, desc:'+2 CON, +1 WIS · Darkvision'},
  Halfling:   {bonuses:{DEX:2,CHA:1}, speed:25, desc:'+2 DEX, +1 CHA · Lucky'},
  Orc:        {bonuses:{STR:2,CON:1}, speed:30, desc:'+2 STR, +1 CON · Relentless Endurance'},
  Tiefling:   {bonuses:{CHA:2,INT:1}, speed:30, desc:'+2 CHA, +1 INT · Hellish Resistance'},
  Dragonborn: {bonuses:{STR:2,CHA:1}, speed:30, desc:'+2 STR, +1 CHA · Breath Weapon'},
  Gnome:      {bonuses:{INT:2,DEX:1}, speed:25, desc:'+2 INT, +1 DEX · Gnome Cunning'},
};

export const CLASSES = {
  Artificer:{hitDie:8,saves:['CON','INT'],sp:true,cantrips:2,slots:2,pick:2,
    ac:'scale',equip:'Studded leather armor, two simple weapons, light crossbow & 20 bolts, thieves\' tools',
    skills:['Arcana','History','Investigation','Medicine','Nature','Perception','Sleight of Hand'],sc:2},
  Barbarian:{hitDie:12,saves:['STR','CON'],sp:false,cantrips:0,slots:0,pick:0,
    ac:'barb',equip:'Greataxe, 2 handaxes, explorer\'s pack',
    skills:['Animal Handling','Athletics','Intimidation','Nature','Perception','Survival'],sc:2},
  Bard:{hitDie:8,saves:['DEX','CHA'],sp:true,cantrips:2,slots:2,pick:4,
    ac:'leather',equip:'Rapier, diplomat\'s pack, lute, leather armor',
    skills:['Acrobatics','Animal Handling','Arcana','Athletics','Deception','History','Insight','Intimidation','Investigation','Medicine','Nature','Perception','Performance','Persuasion','Religion','Sleight of Hand','Stealth','Survival'],sc:3},
  Cleric:{hitDie:8,saves:['WIS','CHA'],sp:true,cantrips:3,slots:2,pick:2,
    ac:'scale',equip:'Mace, scale mail, shield, holy symbol',
    skills:['History','Insight','Medicine','Persuasion','Religion'],sc:2},
  Druid:{hitDie:8,saves:['INT','WIS'],sp:true,cantrips:2,slots:2,pick:2,
    ac:'leather',equip:'Wooden shield, scimitar, leather armor, druidic focus',
    skills:['Arcana','Animal Handling','Insight','Medicine','Nature','Perception','Religion','Survival'],sc:2},
  Fighter:{hitDie:10,saves:['STR','CON'],sp:false,cantrips:0,slots:0,pick:0,
    ac:'chain',equip:'Longsword, shield, chain mail, light crossbow & 20 bolts',
    skills:['Acrobatics','Animal Handling','Athletics','History','Insight','Intimidation','Perception','Survival'],sc:2},
  Monk:{hitDie:8,saves:['STR','DEX'],sp:false,cantrips:0,slots:0,pick:0,
    ac:'monk',equip:'Shortsword, 10 darts, explorer\'s pack',
    skills:['Acrobatics','Athletics','History','Insight','Religion','Stealth'],sc:2},
  Paladin:{hitDie:10,saves:['WIS','CHA'],sp:false,cantrips:0,slots:0,pick:0,
    ac:'chain',equip:'Longsword, shield, chain mail, holy symbol',
    skills:['Athletics','Insight','Intimidation','Medicine','Persuasion','Religion'],sc:2},
  Ranger:{hitDie:10,saves:['STR','DEX'],sp:false,cantrips:0,slots:0,pick:0,
    ac:'leather',equip:'Two shortswords, scale mail, explorer\'s pack, longbow & 20 arrows',
    skills:['Animal Handling','Athletics','Insight','Investigation','Nature','Perception','Stealth','Survival'],sc:3},
  Rogue:{hitDie:8,saves:['DEX','INT'],sp:false,cantrips:0,slots:0,pick:0,
    ac:'leather',equip:'Rapier, shortbow & 20 arrows, burglar\'s pack, leather armor, thieves\' tools',
    skills:['Acrobatics','Athletics','Deception','Insight','Intimidation','Investigation','Perception','Performance','Persuasion','Sleight of Hand','Stealth'],sc:4},
  Sorcerer:{hitDie:6,saves:['CON','CHA'],sp:true,cantrips:4,slots:2,pick:2,
    ac:'none',equip:'Light crossbow & 20 bolts, component pouch, arcane focus, explorer\'s pack',
    skills:['Arcana','Deception','Insight','Intimidation','Persuasion','Religion'],sc:2},
  Warlock:{hitDie:8,saves:['WIS','CHA'],sp:true,cantrips:2,slots:1,pick:2,
    ac:'leather',equip:'Light crossbow & 20 bolts, component pouch, leather armor, arcane focus',
    skills:['Arcana','Deception','History','Intimidation','Investigation','Nature','Religion'],sc:2},
  Wizard:{hitDie:6,saves:['INT','WIS'],sp:true,cantrips:3,slots:2,pick:6,
    ac:'none',equip:'Quarterstaff, spellbook, component pouch, scholar\'s pack',
    skills:['Arcana','History','Insight','Investigation','Medicine','Religion'],sc:2},
};

export const SPELLS = {
  Bard:{
    cantrips:['Vicious Mockery','Prestidigitation','Mage Hand','Minor Illusion','Light','Blade Ward','True Strike','Thunderclap'],
    lvl1:['Healing Word','Charm Person','Sleep','Thunderwave','Tasha\'s Hideous Laughter','Dissonant Whispers','Faerie Fire','Detect Magic','Identify','Cure Wounds','Longstrider','Silent Image','Heroism','Bane','Disguise Self'],
  },
  Cleric:{
    cantrips:['Guidance','Sacred Flame','Thaumaturgy','Light','Spare the Dying','Toll the Dead','Mending','Resistance','Word of Radiance'],
    lvl1:['Cure Wounds','Healing Word','Bless','Sanctuary','Guiding Bolt','Command','Detect Magic','Inflict Wounds','Shield of Faith','Thunderwave','Divine Favor','Heroism','Bane','Protection from Evil and Good','Absorb Elements'],
  },
  Druid:{
    cantrips:['Druidcraft','Shillelagh','Thorn Whip','Guidance','Poison Spray','Resistance','Produce Flame','Mending'],
    lvl1:['Cure Wounds','Healing Word','Entangle','Goodberry','Speak with Animals','Thunderwave','Fog Cloud','Faerie Fire','Animal Friendship','Charm Person','Detect Magic','Longstrider','Absorb Elements','Ice Knife','Snare'],
  },
  Sorcerer:{
    cantrips:['Fire Bolt','Ray of Frost','Shocking Grasp','Mage Hand','Minor Illusion','Light','Prestidigitation','Acid Splash','Chill Touch','True Strike','Sorcerous Burst'],
    lvl1:['Magic Missile','Burning Hands','Sleep','Charm Person','Shield','Mage Armor','Thunderwave','Detect Magic','Fog Cloud','Expeditious Retreat','Chromatic Orb','Disguise Self','Feather Fall','Jump','Absorb Elements'],
  },
  Warlock:{
    cantrips:['Eldritch Blast','Mage Hand','Minor Illusion','Prestidigitation','Chill Touch','Blade Ward','True Strike','Poison Spray'],
    lvl1:['Hex','Charm Person','Sleep','Detect Magic','Hellish Rebuke','Burning Hands','Disguise Self','Arms of Hadar','Expeditious Retreat','Witch Bolt','Armor of Agathys','Unseen Servant','Protection from Evil and Good'],
  },
  Wizard:{
    cantrips:['Fire Bolt','Mage Hand','Prestidigitation','Ray of Frost','Shocking Grasp','Light','Minor Illusion','Acid Splash','Blade Ward','True Strike'],
    lvl1:['Magic Missile','Sleep','Charm Person','Detect Magic','Identify','Mage Armor','Shield','Thunderwave','Burning Hands','Fog Cloud','Grease','Longstrider','Disguise Self','Feather Fall','Jump'],
  },
};

// Companion stats by player level (1–5). Level 5 matches the handoff doc stat blocks.
export const COMPANION_LEVELS = {
  will: [
    null,
    { hp: 14, ac: 13, atkBonus: 3, meleeDmg: '1d6+1', flameDmg: '1d4',  spellDC: 11, healBonus: 3, healDmg: '1d4+1' }, // L1
    { hp: 18, ac: 13, atkBonus: 3, meleeDmg: '1d6+1', flameDmg: '1d4',  spellDC: 11, healBonus: 3, healDmg: '1d4+1' }, // L2
    { hp: 22, ac: 13, atkBonus: 4, meleeDmg: '1d6+2', flameDmg: '1d6',  spellDC: 12, healBonus: 4, healDmg: '1d4+2' }, // L3
    { hp: 25, ac: 13, atkBonus: 4, meleeDmg: '1d6+2', flameDmg: '1d6',  spellDC: 12, healBonus: 4, healDmg: '1d4+2' }, // L4
    { hp: 28, ac: 13, atkBonus: 5, meleeDmg: '1d6+3', flameDmg: '1d8',  spellDC: 13, healBonus: 5, healDmg: '1d4+3' }, // L5
  ],
  seamus: [
    null,
    { hp: 12, ac: 15, atkBonus: 4, dmg: '1d6+2', superiority: null,  multiattack: false }, // L1
    { hp: 22, ac: 15, atkBonus: 4, dmg: '1d6+2', superiority: '4d6', multiattack: false }, // L2
    { hp: 32, ac: 16, atkBonus: 5, dmg: '1d6+3', superiority: '4d6', multiattack: false }, // L3
    { hp: 41, ac: 16, atkBonus: 6, dmg: '1d6+4', superiority: '4d8', multiattack: false }, // L4
    { hp: 51, ac: 17, atkBonus: 8, dmg: '1d6+5', superiority: '4d8', multiattack: true  }, // L5
  ],
  krag: [
    null,
    { hp: 15, ac: 13, atkBonus: 4, dmg: '1d12+3', frenzy: false }, // L1
    { hp: 25, ac: 13, atkBonus: 4, dmg: '1d12+3', frenzy: false }, // L2
    { hp: 36, ac: 14, atkBonus: 5, dmg: '1d12+4', frenzy: false }, // L3
    { hp: 47, ac: 14, atkBonus: 6, dmg: '1d12+4', frenzy: false }, // L4
    { hp: 58, ac: 14, atkBonus: 7, dmg: '1d12+5', frenzy: true  }, // L5
  ],
};

export function companionMaxHp(level) {
  const lvl = Math.min(Math.max(level || 1, 1), 5);
  return {
    will:   COMPANION_LEVELS.will[lvl].hp,
    seamus: COMPANION_LEVELS.seamus[lvl].hp,
    krag:   COMPANION_LEVELS.krag[lvl].hp,
  };
}

export const G = {
  char:{
    name:'',backstory:'',race:'',cls:'',
    base:{STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10},
    final:{STR:10,DEX:10,CON:10,INT:10,WIS:10,CHA:10},
    hp:0,maxHp:0,ac:0,speed:30,profBonus:2,saves:[],skills:[],
    sp:false,cantrips:[],spells:[],slots:0,maxSlots:0,equip:'',hitDie:8,
  },
  mod:{type:'lmop',content:''},
  conv:[],
  combat:false,
  enemies:[],
};

export const campaignState = {
  adventureId: 'lmop',
  chapter: 1,
  areaId: null,
  questFlags: {},
  visitedAreas: [],
  characterId: 'oneshot_character',
};
