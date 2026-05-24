export const RATINGS = {
  barbarian: {
    species: { Aasimar: 'blue', Orc: 'blue', Goliath: 'blue', Dwarf: 'green', Dragonborn: 'green', Gnome: 'green', Elf: 'green', Human: 'green', Halfling: 'orange', Tiefling: 'orange' },
    backgrounds: { 'Flaming Fist Mercenary': 'blue', Farmer: 'green', 'Rashemi Wanderer': 'green', Guard: 'green', 'Chondathan Freebooter': 'green', 'Ice Fisher': 'green', 'Zhentarim Mercenary': 'green', Soldier: 'orange', Sailor: 'orange', 'Purple Dragon Squire': 'orange', 'Dead Magic Dweller': 'orange', Artisan: 'orange', "Lords' Alliance Vassal": 'orange', Noble: 'orange', 'House Agent': 'orange', 'Vampire Devotee': 'orange', 'Knight of the Gauntlet': 'orange', 'Dragon Cultist': 'orange', Acolyte: 'red', Archaeologist: 'red', 'Vampire Survivor': 'red' },
    abilityScores: { str: 'blue', con: 'blue', dex: 'green', wis: 'orange', int: 'red', cha: 'red' },
    skills: { Perception: 'blue', Intimidation: 'green', Survival: 'green', Athletics: 'orange', Nature: 'orange', 'Animal Handling': 'red' },
    subclasses: { 'Path of the Berserker': 'blue', 'Path of the Wild Heart': 'blue', 'Path of the World Tree': 'green', 'Path of the Zealot': 'orange' }
  },
  artificer: {
    species: { Gnome: 'blue', Aasimar: 'green', Dragonborn: 'green', Dwarf: 'green', Elf: 'green', Goliath: 'green', Human: 'green', Orc: 'green', Tiefling: 'green', Halfling: 'orange' },
    backgrounds: { 'Mulhorandi Tomb Raider': 'blue', Criminal: 'blue', Guide: 'blue', Archaeologist: 'green', Sage: 'green', Scribe: 'green', Inquisitive: 'green', 'House Thuranni Heir': 'green', Acolyte: 'orange', Carouser: 'orange', 'House Agent': 'orange', Noble: 'orange', Merchant: 'orange', 'Spellfire Initiate': 'orange', 'Dragon Cultist': 'orange', 'Shadowmasters Exile': 'orange', Artisan: 'red', Charlatan: 'red', Entertainer: 'red', Farmer: 'red', Hermit: 'red', Sailor: 'red', Wayfarer: 'red' },
    abilityScores: { int: 'blue', con: 'blue', dex: 'green', wis: 'orange', str: 'red', cha: 'red' },
    skills: { Arcana: 'blue', Investigation: 'blue', History: 'green', Nature: 'green', Religion: 'green', 'Sleight of Hand': 'green', Insight: 'orange', Perception: 'orange', Acrobatics: 'red', 'Animal Handling': 'red', Athletics: 'red', Deception: 'red', Intimidation: 'red', Medicine: 'red', Performance: 'red', Persuasion: 'red', Stealth: 'red', Survival: 'red' },
    subclasses: { Armorer: 'blue', 'Battle Smith': 'blue', Artillerist: 'green', Alchemist: 'orange', Cartographer: 'orange' }
  }
,
  bard: {
    species: { Human: 'blue', Tiefling: 'blue', Aasimar: 'blue', Halfling: 'green', Elf: 'green', Gnome: 'green', Dragonborn: 'green', Orc: 'orange', Dwarf: 'orange', Goliath: 'red' },
    backgrounds: {},
    abilityScores: { cha: 'blue', dex: 'blue', con: 'green', int: 'orange', wis: 'orange', str: 'red' },
    skills: { Perception: 'blue', Persuasion: 'blue', Deception: 'blue', Insight: 'green', Performance: 'green', Acrobatics: 'green', Sleight: 'green', Stealth: 'orange', Athletics: 'orange', Intimidation: 'orange', Arcana: 'orange', History: 'orange', Investigation: 'orange', Medicine: 'orange', Nature: 'orange', Religion: 'orange', 'Animal Handling': 'orange', Survival: 'red' },
    subclasses: {}
  },
  cleric: {
    species: { Aasimar: 'blue', Human: 'blue', Dwarf: 'green', Halfling: 'green', Elf: 'green', Gnome: 'green', Tiefling: 'green', Dragonborn: 'orange', Goliath: 'orange', Orc: 'red' },
    backgrounds: {},
    abilityScores: { wis: 'blue', con: 'blue', str: 'green', dex: 'green', int: 'orange', cha: 'orange' },
    skills: { Insight: 'blue', Perception: 'blue', History: 'green', Medicine: 'green', Persuasion: 'green', Religion: 'orange' },
    subclasses: {}
  },
  druid: {
    species: { Elf: 'blue', Aasimar: 'blue', Gnome: 'green', Human: 'green', Halfling: 'green', Tiefling: 'green', Dwarf: 'green', Orc: 'orange', Dragonborn: 'orange', Goliath: 'red' },
    backgrounds: {},
    abilityScores: { wis: 'blue', con: 'blue', dex: 'green', int: 'orange', cha: 'orange', str: 'red' },
    skills: { Perception: 'blue', Insight: 'blue', Nature: 'green', Survival: 'green', Arcana: 'green', Medicine: 'orange', 'Animal Handling': 'orange', Religion: 'orange' },
    subclasses: {}
  },
  fighter: {
    species: { Goliath: 'blue', Orc: 'blue', Dwarf: 'blue', Human: 'green', Dragonborn: 'green', Aasimar: 'green', Elf: 'green', Halfling: 'orange', Gnome: 'orange', Tiefling: 'red' },
    backgrounds: {},
    abilityScores: { str: 'blue', con: 'blue', dex: 'green', wis: 'orange', int: 'orange', cha: 'red' },
    skills: { Perception: 'blue', Athletics: 'blue', Intimidation: 'green', Survival: 'green', Insight: 'green', Acrobatics: 'green', History: 'orange', 'Animal Handling': 'orange' },
    subclasses: {}
  },
  monk: {
    species: { Elf: 'blue', Halfling: 'blue', Human: 'green', Aasimar: 'green', Gnome: 'green', Dwarf: 'green', Orc: 'orange', Dragonborn: 'orange', Tiefling: 'orange', Goliath: 'red' },
    backgrounds: {},
    abilityScores: { dex: 'blue', wis: 'blue', con: 'green', str: 'orange', int: 'red', cha: 'red' },
    skills: { Perception: 'blue', Acrobatics: 'blue', Stealth: 'green', Insight: 'green', Athletics: 'orange', Religion: 'orange', History: 'red' },
    subclasses: {}
  },
  paladin: {
    species: { Aasimar: 'blue', Human: 'blue', Dragonborn: 'blue', Dwarf: 'green', Goliath: 'green', Orc: 'green', Elf: 'orange', Tiefling: 'orange', Halfling: 'orange', Gnome: 'red' },
    backgrounds: {},
    abilityScores: { str: 'blue', cha: 'blue', con: 'green', wis: 'orange', dex: 'orange', int: 'red' },
    skills: { Perception: 'blue', Insight: 'blue', Persuasion: 'green', Athletics: 'green', Intimidation: 'green', Religion: 'orange', Medicine: 'orange' },
    subclasses: {}
  },
  ranger: {
    species: { Elf: 'blue', Human: 'blue', Halfling: 'green', Orc: 'green', Goliath: 'green', Dwarf: 'green', Aasimar: 'green', Gnome: 'orange', Dragonborn: 'orange', Tiefling: 'red' },
    backgrounds: {},
    abilityScores: { dex: 'blue', wis: 'blue', con: 'green', str: 'orange', int: 'red', cha: 'red' },
    skills: { Perception: 'blue', Survival: 'blue', Stealth: 'green', Nature: 'green', Investigation: 'green', Insight: 'green', Athletics: 'orange', 'Animal Handling': 'orange' },
    subclasses: {}
  },
  rogue: {
    species: { Elf: 'blue', Halfling: 'blue', Human: 'green', Gnome: 'green', Tiefling: 'green', Aasimar: 'green', Orc: 'orange', Dragonborn: 'orange', Dwarf: 'orange', Goliath: 'red' },
    backgrounds: {},
    abilityScores: { dex: 'blue', int: 'green', con: 'green', wis: 'orange', cha: 'orange', str: 'red' },
    skills: { Perception: 'blue', Stealth: 'blue', Deception: 'blue', Sleight: 'blue', Acrobatics: 'green', Investigation: 'green', Insight: 'green', Athletics: 'green', Persuasion: 'orange', Performance: 'orange', Intimidation: 'orange' },
    subclasses: {}
  },
  sorcerer: {
    species: { Tiefling: 'blue', Dragonborn: 'blue', Aasimar: 'blue', Human: 'green', Elf: 'green', Gnome: 'green', Halfling: 'green', Orc: 'orange', Dwarf: 'orange', Goliath: 'red' },
    backgrounds: {},
    abilityScores: { cha: 'blue', con: 'blue', dex: 'green', int: 'orange', wis: 'orange', str: 'red' },
    skills: { Arcana: 'blue', Persuasion: 'blue', Deception: 'green', Insight: 'green', Intimidation: 'green', Religion: 'orange' },
    subclasses: {}
  },
  warlock: {
    species: { Tiefling: 'blue', Aasimar: 'blue', Human: 'green', Elf: 'green', Gnome: 'green', Halfling: 'green', Dragonborn: 'orange', Orc: 'orange', Dwarf: 'orange', Goliath: 'red' },
    backgrounds: {},
    abilityScores: { cha: 'blue', con: 'blue', dex: 'green', int: 'orange', wis: 'orange', str: 'red' },
    skills: { Arcana: 'blue', Deception: 'blue', Intimidation: 'green', Investigation: 'green', History: 'green', Nature: 'orange', Religion: 'orange' },
    subclasses: {}
  },
  wizard: {
    species: { Gnome: 'blue', Elf: 'blue', Aasimar: 'green', Human: 'green', Tiefling: 'green', Halfling: 'green', Dwarf: 'orange', Dragonborn: 'orange', Orc: 'orange', Goliath: 'red' },
    backgrounds: {},
    abilityScores: { int: 'blue', con: 'blue', dex: 'green', wis: 'orange', cha: 'red', str: 'red' },
    skills: { Arcana: 'blue', Investigation: 'blue', History: 'green', Insight: 'green', Medicine: 'orange', Religion: 'orange' },
    subclasses: {}
  }
};

export function getRating(className, section, optionName){
  const classData = RATINGS[className?.toLowerCase()];
  if(!classData) return null;
  const sectionData = classData[section];
  if(!sectionData) return null;
  return sectionData[optionName] || null;
}
