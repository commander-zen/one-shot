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
  // remaining classes — will be populated in subsequent sessions; getRating returns null → neutral badge
};

export function getRating(className, section, optionName){
  const classData = RATINGS[className?.toLowerCase()];
  if(!classData) return null;
  const sectionData = classData[section];
  if(!sectionData) return null;
  return sectionData[optionName] || null;
}
