// ============================================================
// ratings.js — Full RPGBOT 2024 DnD 5.5 data
// Tier colors: blue=S, green=A, orange=B, red=C
// Each entry: tier string OR { tier, vibe, why } object
// ============================================================

export const RATINGS = {

  // ─── BARBARIAN ───────────────────────────────────────────
  barbarian: {
    species: {
      Aasimar:    { tier: 'blue',   why: 'Two damage resistances, Darkvision, once-per-day flight or crowd control. Celestial Revelation is strong and the resistances are relevant all game.' },
      Orc:        { tier: 'blue',   why: 'Adrenaline Rush pads hit points and improves mobility. Relentless Endurance is great insurance. Darkvision. THP from Adrenaline Rush is effectively doubled by Rage resistance.' },
      Goliath:    { tier: 'blue',   why: 'Giant Heritage options like Hill\'s Topple, Stone\'s Endurance, and on-hit damage bonuses all complement Barbarian core tactics.' },
      Dwarf:      { tier: 'green',  why: 'Darkvision, Poison Resistance, and extra hit points. Tremorsense handles invisible enemies. Great durability package for front-line builds.' },
      Dragonborn: { tier: 'green',  why: 'Damage resistance, Darkvision, once-per-day flight. Breath weapon extends Rage (forces saves). Good all-around martial pick.' },
      Gnome:      { tier: 'green',  why: 'Gnomish Cunning protects mental saves — the Barbarian\'s biggest weakness. Even with low Wisdom, Advantage on saves helps.' },
      Elf:        { tier: 'green',  why: 'Darkvision, extra skill, Fey Ancestry. Wood Elf innate spellcasting is non-Concentration and doesn\'t conflict with Rage.' },
      Human:      { tier: 'green',  why: 'Extra Origin Feat and skill. Flexible and always solid — grab Tough or Tavern Brawler to compound Barbarian strengths.' },
      Halfling:   { tier: 'orange', why: 'Brave and Lucky are both nice. Nimbleness rarely matters. Lucky triggers less often for Barbarians than for classes making more d20 rolls.' },
      Tiefling:   { tier: 'orange', why: 'Darkvision and damage resistance are fine but Dragonborn is a more direct comparison and usually better for Barbarians.' },
    },
    backgrounds: {
      'Flaming Fist Mercenary': { tier: 'blue',   why: 'Perfect ability scores (Str + Con), Tough feat, two decent combat skills. RPGBOT\'s easy go-to for Barbarian front-line builds.' },
      Farmer:                   { tier: 'green',  why: 'Str + Con with Tough. Skills aren\'t exciting but the stats and feat are exactly what a melee Barbarian wants.' },
      'Rashemi Wanderer':       { tier: 'green',  why: 'Str + Con with Tough and decent Wisdom skills. Nearly identical value to Flaming Fist Mercenary.' },
      Guard:                    { tier: 'green',  why: 'Good ability scores, Perception, and Alert — which lets you trade initiative with an ally to protect squishy party members.' },
      'Chondathan Freebooter':  { tier: 'green',  why: 'Excellent for a Barbarian who wants to be useful outside combat. Str + Dex, decent skills, and Skilled to pick up Thieves\' Tools.' },
      'Ice Fisher':             { tier: 'green',  why: 'Perfect ability scores and Alert. Skills are terrible but the stat+feat combo is strong.' },
      'Zhentarim Mercenary':    { tier: 'green',  why: 'Str bump, Zhentarim Ruffian is great for melee builds, and one good skill. Sets up Zhentarim Tactics well.' },
      Soldier:                  { tier: 'orange', why: 'Good ability scores and Savage Attacker is decent since Barbarians make few attacks. Skills are poor and Charisma is a dump stat.' },
      Sailor:                   { tier: 'orange', why: 'Decent ability scores and one good skill. Tavern Brawler is minimal value once Brutal Strikes come online at level 9.' },
      'Purple Dragon Squire':   { tier: 'orange', why: 'Good ability scores and Purple Dragon Rook lets you hand out party-wide Heroic Inspiration. One mediocre skill.' },
      'Dead Magic Dweller':     { tier: 'orange', why: 'Perfect ability scores but the feat and skills are bad. Only if you really need Str + Con with nothing else to offer.' },
      Artisan:                  { tier: 'orange', why: 'Gets the Str increase but that\'s all. Crafter is a weak feat and skills don\'t help.' },
      "Lords' Alliance Vassal": { tier: 'orange', why: 'Almost good. Str increase available, Lords\' Alliance Agent is decent, and one passable skill. Nothing quite fits perfectly.' },
      Noble:                    { tier: 'orange', why: 'Str and Skilled are fine but that\'s the only appeal. Skills are based on dump stats for Barbarian.' },
      'House Agent':            { tier: 'orange', why: 'Str increase and Lucky. Everything else is a bad fit for Barbarian.' },
      'Vampire Devotee':        { tier: 'orange', why: 'Good ability scores and Vampire\'s Plaything is decent. Skills are bad but the feat has combat value.' },
      'Knight of the Gauntlet': { tier: 'orange', why: 'Workable ability scores but Tyro of the Gauntlet is situational and skills are terrible.' },
      'Dragon Cultist':         { tier: 'orange', why: 'The fear effect from the feat can extend Rage (forces a save), but everything else is a bad fit.' },
      Acolyte:                  { tier: 'red',    why: 'Bad all around for Barbarian. No Str increase and the feat doesn\'t help.' },
      Archaeologist:            { tier: 'red',    why: 'Bad ability scores for Barbarian.' },
      'Vampire Survivor':       { tier: 'red',    why: 'Bad ability scores, bad feat, only one good skill.' },
    },
    skills: {
      Perception:        { tier: 'blue',   why: 'One of the most rolled skills in the game. Barbarians have decent Wisdom and should always cover Perception.' },
      Intimidation:      { tier: 'green',  why: 'Useful social skill while Raging (becomes a Strength check). Likely your only viable Face skill.' },
      Survival:          { tier: 'green',  why: 'Adventuring involves a lot of wilderness. Wisdom-based and situationally very useful.' },
      Athletics:         { tier: 'orange', why: 'Borderline useless in 2024 rules for most purposes. Binding creatures in chains is the one appealing use for Strength builds.' },
      Nature:            { tier: 'orange', why: 'Intelligence is a dump stat for Barbarians. Only if no one else in the party covers it.' },
      'Animal Handling': { tier: 'red',    why: 'Not helpful for the function of the Barbarian.' },
    },
    subclasses: {
      'Path of the Berserker':   { tier: 'blue',   vibe: 'Pure rage, pure damage — the iconic berserker', why: 'Simple and effective. Frenzy adds consistent extra d6 damage on Reckless Attack hits. Mindless Rage blocks charm and fear. Retaliation is excellent — you can Unarmed Strike as a reaction on any hit. Intimidating Presence handles groups.' },
      'Path of the Wild Heart':  { tier: 'blue',   vibe: 'Channel animal spirits — adapt to any fight', why: 'Deeply customizable. Bear gives resistance to most damage types including Force and Psychic. Wolf grants Advantage to all allies\' attacks. Eagle enables exceptional mobility for repositioning. You choose each time you Rage, so you can adapt to the encounter.' },
      'Path of the World Tree':  { tier: 'green',  vibe: 'Roots and reach — control the battlefield', why: 'Branches of the Tree teleports enemies adjacent to you and reduces their speed to 0. Battering Roots extends your reach to 20 feet with heavy weapons. Travel Along the Tree provides 60-foot teleportation. Excellent Defender toolkit.' },
      'Path of the Zealot':      { tier: 'orange', vibe: 'Divine fury — nearly impossible to kill', why: 'Divine Fury is consistent damage and good damage types. Fanatical Focus helps save-or-suck effects. But it does less damage than Berserker, isn\'t significantly more durable than other Barbarians, and the best features (Zealous Presence, Rage of the Gods) come very late.' },
    },
  },

  // ─── ARTIFICER ────────────────────────────────────────────
  artificer: {
    species: {
      Gnome:      { tier: 'blue',   why: 'Gnomish Cunning pairs with Flash of Genius and defensive items to make you nearly impervious to spells. Either variety provides useful cantrips too.' },
      Aasimar:    { tier: 'green',  why: 'Two damage resistances, a heal, and Celestial Revelation. Works especially well for subclasses that don\'t lean heavily on Bonus Action.' },
      Dragonborn: { tier: 'green',  why: 'Damage resistance and breath weapon help Armorer and Battle Smith melee builds. Draconic Flight provides brief flight without item slots.' },
      Dwarf:      { tier: 'green',  why: 'Poison resistance and extra HP are great for melee builds. Good defensive package.' },
      Elf:        { tier: 'green',  why: 'Darkvision, extra skill, and innate spellcasting that complements limited prepared spells. All subtypes offer something useful.' },
      Goliath:    { tier: 'green',  why: 'Giant Heritage options fit weapon-using Artificers well. Large Size helps Juggernaut Armorer specifically.' },
      Human:      { tier: 'green',  why: 'Extra Origin Feat and skill. Always reliable — grab Alert or Lucky.' },
      Orc:        { tier: 'green',  why: 'Adrenaline Rush helps Armorer builds rush into melee. Relentless Endurance is good insurance on a d8 hit die class.' },
      Tiefling:   { tier: 'green',  why: 'Darkvision, damage resistance, and innate spellcasting. Infernal subtype is most consistently useful.' },
      Halfling:   { tier: 'orange', why: 'Nothing specifically useful for Artificer function. Lucky is always fine.' },
    },
    backgrounds: {
      'Mulhorandi Tomb Raider': { tier: 'blue',   why: 'Perfect ability scores (Int + Dex/Con), Lucky, and two Intelligence-based skills. RPGBOT\'s top Artificer pick.' },
      Criminal:                 { tier: 'blue',   why: 'Perfect ability scores, decent skills, and an easy go-to feat. Thieves\' Tools proficiency is redundant but otherwise excellent.' },
      Guide:                    { tier: 'blue',   why: 'Perfect ability scores, Magic Initiate (Druid) gets Guidance and Healing Word, decent skills.' },
      Archaeologist:            { tier: 'green',  why: 'Fantastic for Infiltrator Armorer. Dex + Int + Skilled covers Scout proficiencies to replace a Rogue.' },
      Sage:                     { tier: 'green',  why: 'Good ability scores, perfect skills, Magic Initiate (Wizard) expands spellcasting. Spell list overlaps heavily but still useful.' },
      Scribe:                   { tier: 'green',  why: 'Good ability scores, Skilled, and decent skills. Flexible and broadly useful.' },
      Inquisitive:              { tier: 'green',  why: 'Good ability scores, Alert, and decent skills. Works on any Artificer build.' },
      'House Thuranni Heir':    { tier: 'green',  why: 'Great ability scores for Infiltrator Armorer, Mark of Shadow is strong for stealth builds.' },
      Acolyte:                  { tier: 'orange', why: 'Gets the crucial Int increase and Magic Initiate (Cleric). Skills aren\'t great though.' },
      Carouser:                 { tier: 'orange', why: 'Good ability scores and a strong feat, but skills are wasted on Artificer.' },
      'House Agent':            { tier: 'orange', why: 'Int increase, Lucky, and Investigation. A lot of this background is wasted but the core pieces are there.' },
      Noble:                    { tier: 'orange', why: 'Int increase, Skilled, and one Intelligence skill. Not bad but better options exist.' },
      Merchant:                 { tier: 'orange', why: 'Good ability scores and Lucky. Proficiencies are mostly useless but Lucky is good on anyone.' },
      'Spellfire Initiate':     { tier: 'orange', why: 'Good ability scores and a decent feat, but Spellfire Spark\'s Bonus Action use is hard to fit into most Artificer builds.' },
      'Dragon Cultist':         { tier: 'orange', why: 'Great ability scores but the feat wants Wisdom and the skills aren\'t great.' },
      'Shadowmasters Exile':    { tier: 'orange', why: 'Good ability scores and decent skills for an Infiltrator Armorer build. Savage Attacker is fine.' },
      Artisan:                  { tier: 'red',    why: 'Crafter is an awful feat. Otherwise workable but outclassed.' },
      Charlatan:                { tier: 'red',    why: 'No Intelligence increase. Archaeologist or Scribe are better if you want Skilled.' },
      Entertainer:              { tier: 'red',    why: 'No Intelligence increase and terrible skills.' },
      Farmer:                   { tier: 'red',    why: 'No Intelligence increase. Tough is tempting but not enough.' },
      Hermit:                   { tier: 'red',    why: 'Bad ability scores and you don\'t need Healer.' },
      Sailor:                   { tier: 'red',    why: 'Bad ability scores, bad feat, bad skills.' },
      Wayfarer:                 { tier: 'red',    why: 'Bad ability scores. If you want Lucky, Merchant is a much better choice.' },
    },
    skills: {
      Arcana:           { tier: 'blue',   why: 'Most important knowledge skill. You have the Intelligence to back it up.' },
      Investigation:    { tier: 'blue',   why: 'Not as broadly useful as Perception but you\'re much better at it than most. Intelligence-based and very useful for Scouts.' },
      History:          { tier: 'green',  why: 'Good knowledge skill. Useful in many campaigns.' },
      Nature:           { tier: 'green',  why: 'Good knowledge skill.' },
      Religion:         { tier: 'green',  why: 'Good knowledge skill.' },
      'Sleight of Hand': { tier: 'green', why: 'Combined with Thieves\' Tools proficiency you get Advantage on locks and traps. Easy Rogue replacement.' },
      Insight:          { tier: 'orange', why: 'Useful but not worth a lot of effort since it\'s Wisdom-based and you\'re Intelligence-focused.' },
      Perception:       { tier: 'orange', why: 'Always useful but ideally someone with better Wisdom handles this.' },
      Acrobatics:       { tier: 'red',    why: 'Too situational.' },
      'Animal Handling': { tier: 'red',   why: 'Too situational.' },
      Athletics:        { tier: 'red',    why: 'Completely useless in 2024 rules.' },
      Deception:        { tier: 'red',    why: 'Charisma is a dump stat.' },
      Intimidation:     { tier: 'red',    why: 'Charisma is a dump stat.' },
      Medicine:         { tier: 'red',    why: 'Useless. Medicine is best done magically.' },
      Performance:      { tier: 'red',    why: 'Bad.' },
      Persuasion:       { tier: 'red',    why: 'Charisma is a dump stat.' },
      Stealth:          { tier: 'red',    why: 'Only for Infiltrator Armorer builds.' },
      Survival:         { tier: 'red',    why: 'Bad.' },
    },
    subclasses: {
      Armorer:        { tier: 'blue',   vibe: 'Magic armor with three combat modes — Defender, Scout, or tank', why: 'All about your suit of magic armor. Guardian is a fantastic front-line Defender with built-in taunt and THP. Infiltrator is an excellent Scout with Advantage on Stealth and a ranged lightning weapon. Dreadnaught has reach and push effects but depends on size differences. Extra Attack makes the armor weapon a real threat.' },
      'Battle Smith':  { tier: 'blue',   vibe: 'You and your robot dog make an unstoppable duo', why: 'Built around the Steel Defender — a durable combat pet that protects adjacent allies with Deflect Attack. Battle Ready lets you use Intelligence for weapon attacks. You can donate one attack to command your Defender and vice versa. Arcane Jolt adds damage or emergency healing to attacks.' },
      Artillerist:    { tier: 'green',  vibe: 'Your pet cannon does the heavy lifting', why: 'Stunningly powerful and easy to play. Eldritch Cannons provide damage output, an extra body on the field, and bottomless Temporary Hit Points for your whole party via Protector mode. Arcane Firearm boosts all spell damage. Fireball on the spell list fills the AOE gap.' },
      Alchemist:      { tier: 'orange', vibe: 'Experimental elixirs and support potions', why: 'Back-row support with random elixirs and solid healing spells. Faces three problems: resource management, few qualifying damage spells, and few published potions for the capstone. Experimental Elixir is hard to rely on. Alchemical Savant helps damage but qualifying spells are scarce.' },
      Cartographer:   { tier: 'orange', vibe: 'Teleportation and battlefield awareness', why: 'Support build with party teleportation and awareness features. Adventurer\'s Atlas is powerful (lets allies target each other through cover). Portal Jump provides free movement. But very few combat action options — you\'ll spend most turns casting low-level spells.' },
    },
  },

  // ─── BARD ────────────────────────────────────────────────
  bard: {
    species: {
      Changeling:  { tier: 'blue',   why: 'Permanent Advantage on Charisma checks via Shape-Shifter plus two extra skills. The ideal Face character. Play a Changeling Bard if you want to be the party\'s social powerhouse.' },
      Human:       { tier: 'green',  why: 'Extra Origin Feat and skill. Always reliable for filling gaps in your build.' },
      Tiefling:    { tier: 'green',  why: 'Darkvision, damage resistance, and innate spellcasting mostly from outside the Bard list. Fire Bolt adds a damage option Bards normally lack.' },
      Aasimar:     { tier: 'green',  why: 'Two damage resistances, Darkvision, heal, and Celestial Revelation. Valor Bards especially benefit from the combat transformation.' },
      Elf:         { tier: 'green',  why: 'Darkvision and extra skill are great. Wood Elf gets Pass Without Trace for the whole party. High Elf cantrip gets Wizard options like Blade Ward.' },
      Gnome:       { tier: 'green',  why: 'Darkvision, Gnomish Cunning, and cantrips. Paired with good Wisdom and proficiency in Wisdom saves, failing mental saves becomes extremely rare.' },
      Orc:         { tier: 'green',  why: 'Adrenaline Rush helps escape dangerous positions without a spell. Great for melee Bards who get caught in combat.' },
      Halfling:    { tier: 'orange', why: 'Brave and Lucky are both helpful. Nimbleness helps reposition but won\'t prevent Opportunity Attacks.' },
      Dragonborn:  { tier: 'orange', why: 'Darkvision, resistance, and once-per-day flight. Rarely use the breath weapon beyond low levels.' },
      Dwarf:       { tier: 'orange', why: 'Durability is largely wasted on back-row Bards. Good for Valor if you\'re in melee.' },
      Goliath:     { tier: 'orange', why: 'Cloud Jaunt is great non-spell teleportation. Stone\'s Endurance helps frail spellcasters. Large Form rarely useful.' },
    },
    backgrounds: {
      Charlatan:            { tier: 'blue',   why: 'Perfect ability scores (Dex + Con) and easy way to cover all Face skills while leaving room for other proficiencies. RPGBOT\'s top Bard pick.' },
      Carouser:             { tier: 'blue',   why: 'Good ability scores, excellent feat, and fantastic Face skills. An easy go-to option for social Bards.' },
      Wayfarer:             { tier: 'green',  why: 'Great ability scores and skills for a Bard replacing a Rogue. Lucky is a strong default feat.' },
      'Genie Touched':      { tier: 'green',  why: 'Good ability scores and skills. Magic Initiate (Wizard) gets options like Shield or Absorb Elements that aren\'t on the Bard list.' },
      'Purple Dragon Squire': { tier: 'green', why: 'Good ability scores, Purple Dragon Rook is great for a support Bard, and one good skill.' },
      Merchant:             { tier: 'green',  why: 'Good ability scores and Lucky. The only low point is Animal Handling as a skill.' },
      'Vampire Devotee':    { tier: 'green',  why: 'Good ability scores, Face skills, and Vampire\'s Plaything provides mobility to escape melee without a spell slot.' },
      Entertainer:          { tier: 'orange', why: 'Conceptually the default Bard background but the skills are awful. Good ability scores and Musician are the only real draws.' },
      Noble:                { tier: 'orange', why: 'Fine but Charlatan is a much easier choice with better skill coverage.' },
      'Shadowmoor Expert':  { tier: 'orange', why: 'Useful for martial Bards planning to fight in melee. Hex and retaliatory damage can compensate for relative frailty.' },
      'Spellfire Initiate': { tier: 'orange', why: 'Good but not great. Ability scores work and the feat has some value.' },
      Sage:                 { tier: 'red',    why: 'Another way to get Magic Initiate but without a Charisma increase. Poor fit for Bard.' },
      Acolyte:              { tier: 'red',    why: 'Magic Initiate (Cleric) is good but not enough to make up for mediocre skills and one useful ability score.' },
      Criminal:             { tier: 'red',    why: 'Decent if you\'re replacing a Rogue but no Charisma increase.' },
      Farmer:               { tier: 'red',    why: 'Bad all around for Bard.' },
      Guard:                { tier: 'red',    why: 'Bad all around for Bard.' },
      Sailor:               { tier: 'red',    why: 'Bad all around for Bard.' },
    },
    skills: {
      Persuasion:        { tier: 'blue',   why: 'The king of Face skills. Essential for any Bard serving as the party Face.' },
      Perception:        { tier: 'blue',   why: 'The most rolled skill in the game. Always valuable.' },
      Deception:         { tier: 'green',  why: 'Core Face skill. Useful constantly in social situations.' },
      Intimidation:      { tier: 'green',  why: 'Important Face skill.' },
      Insight:           { tier: 'green',  why: 'Helpful for a Face and you have decent Wisdom.' },
      Stealth:           { tier: 'green',  why: 'Essential if your party lacks a dedicated Scout. High Dexterity supports it.' },
      Arcana:            { tier: 'orange', why: 'One of the most important knowledge skills but your Intelligence may not back it up.' },
      History:           { tier: 'orange', why: 'Useful knowledge skill.' },
      Religion:          { tier: 'orange', why: 'Useful knowledge skill.' },
      Investigation:     { tier: 'orange', why: 'Very useful but you need someone with better Intelligence for this ideally.' },
      Acrobatics:        { tier: 'orange', why: 'Situational. Useful for melee Bards to escape grapples.' },
      Performance:       { tier: 'orange', why: 'Thematically appropriate but you don\'t actually need it mechanically.' },
      'Animal Handling': { tier: 'red',    why: 'Bards are not Druids.' },
      Athletics:         { tier: 'red',    why: 'Functionally useless. Strength is a dump stat.' },
      Medicine:          { tier: 'red',    why: 'Useless. Medicine is best done magically.' },
      Survival:          { tier: 'red',    why: 'Too situational.' },
    },
    subclasses: {
      'College of Dance':     { tier: 'blue',   vibe: 'Dance as a martial art — strike and spin away', why: 'Both thematically and mechanically fantastic. Dazzling Footwork gives Charisma to AC, Bardic Damage for unarmed strikes, and Agile Strikes. Inspiring Movement lets you attack and reposition an ally as a bonus. Tandem Footwork gives your whole party an initiative bonus. Leading Evasion extends Evasion to nearby allies.' },
      'College of Lore':      { tier: 'blue',   vibe: 'Master of knowledge and expanded magic', why: 'Three extra skills, Cutting Words to protect allies as a Reaction, Magical Discoveries for early access to any spell list, and Peerless Skill to rescue failed checks. Emphasizes and expands everything the Bard already does well.' },
      'College of Glamour':   { tier: 'green',  vibe: 'Charm, dominate, command — the fey enchanter', why: 'Beguiling Music charms or frightens when you cast enchantment/illusion spells. Mantle of Inspiration provides THP and repositioning. Mantle of Majesty lets you Command as a Bonus Action for an entire encounter — great for burning Legendary Resistances. Suffers from resource starvation.' },
      'College of the Moon':  { tier: 'green',  vibe: 'Druidic magic and lunar power meet bardic charm', why: 'Brings Druid flavor including Moonbeam access. Inspired Eclipse is essentially free Misty Step with invisibility. Moon\'s Inspiration adds useful Bardic Inspiration improvements. Simple to play with almost no extra resource management.' },
      'College of Valor':     { tier: 'orange', vibe: 'Front-line warrior bard — sword and song', why: 'Medium armor and martial weapons improve survivability. Extra Attack is best used for casting a Cantrip plus a weapon attack. Battle Magic uses your Bonus Action after spellcasting. Faces three problems: makes Bard MAD, existing features are better, and one Fighter level gives everything you really need.' },
    },
  },

  // ─── CLERIC ───────────────────────────────────────────────
  cleric: {
    species: {
      Aasimar:    { tier: 'green',  why: 'Two damage resistances, Darkvision, heal, and Celestial Revelation. Works well with Spirit Guardians and melee builds.' },
      Human:      { tier: 'green',  why: 'Extra Origin Feat and skill. Always reliable.' },
      Elf:        { tier: 'green',  why: 'Darkvision, extra skill, and innate spellcasting. Drow gets Faerie Fire, High Elf gets a Wizard cantrip, Wood Elf gets Pass Without Trace.' },
      Gnome:      { tier: 'green',  why: 'Gnomish Cunning paired with Wisdom proficiency makes mental saves nearly unbeatable.' },
      Orc:        { tier: 'green',  why: 'Adrenaline Rush helps Spirit Guardians positioning and pads hit points. Relentless Endurance is crucial for the party healer.' },
      Khoravar:   { tier: 'green',  why: 'Versatile. Free Cantrip removes need for Magic Initiate in some builds. Extra proficiency adapts to upcoming challenges.' },
      Dwarf:      { tier: 'orange', why: 'Darkvision, Poison Resistance, extra hit points. Good for melee builds but durability is wasted on back-row Clerics.' },
      Goliath:    { tier: 'orange', why: 'Cloud Jaunt is great non-spell teleportation for melee builds. Stone\'s Endurance helps. Large Form makes Spirit Guardians 5 feet wider.' },
      Halfling:   { tier: 'orange', why: 'Lucky and Brave are helpful but mostly redundant with high Wisdom saves.' },
      Tiefling:   { tier: 'orange', why: 'Darkvision, resistance, and some innate spellcasting. Not many spells outside the Cleric list though.' },
      Dragonborn: { tier: 'orange', why: 'Darkvision, resistance, and once-per-day flight. Breath weapon rarely useful beyond low levels.' },
      Changeling: { tier: 'orange', why: 'Not built for Charisma but Shapechanger\'s Advantage on Charisma checks plus two Face skills can make you a passable social character.' },
    },
    backgrounds: {
      Guide:                  { tier: 'blue',   why: 'Perfect ability scores (Con + Wis) and Magic Initiate (Druid) gets Shillelagh for melee builds. Decent skills.' },
      Farmer:                 { tier: 'green',  why: 'Excellent ability scores (Str + Con or Wis). Tough is an easy go-to feat. Skills aren\'t exciting.' },
      Sage:                   { tier: 'green',  why: 'Good ability scores, perfect skills for a scholar Cleric, and Magic Initiate (Wizard) for True Strike or Find Familiar.' },
      'Purple Dragon Squire': { tier: 'green',  why: 'Decent ability scores, one good skill, and Purple Dragon Rook gives party-wide Heroic Inspiration.' },
      'Moonwell Pilgrim':     { tier: 'green',  why: 'Good ability scores and Magic Initiate (Druid). One decent skill.' },
      'Genie Touched':        { tier: 'green',  why: 'Good ability scores, workable skills, and Magic Initiate (Wizard) fills spell gaps.' },
      'House Deneith Heir':   { tier: 'green',  why: 'Perfect ability scores for War Cleric, two Wisdom-based skills, and a strong feat.' },
      'Chondathan Freebooter': { tier: 'green', why: 'Easy choice for Trickery Clerics. Dex + Wis with Skilled to fill Rogue proficiencies.' },
      Wayfarer:               { tier: 'green',  why: 'Good choice for Trickery Domain. Decent skills and ability scores.' },
      Scribe:                 { tier: 'orange', why: 'Good choice for Trickery Domain. Dex + Int with Skilled.' },
      'Dead Magic Dweller':   { tier: 'orange', why: 'Good ability scores but you don\'t need Healer and the skills are bad.' },
      Hermit:                 { tier: 'orange', why: 'Decent ability scores but middling skills and Healer is redundant when you have Healing Word.' },
      'Vampire Survivor':     { tier: 'orange', why: 'Decent but Vampire Hunter isn\'t a good feat.' },
      Acolyte:                { tier: 'orange', why: 'Gets the Wis increase and Magic Initiate (Cleric) but Sage\'s ability scores are better and the skills are better.' },
      Artisan:                { tier: 'red',    why: 'Crafter is an awful feat.' },
      Carouser:               { tier: 'red',    why: 'Bad ability scores and Charisma-based skills are hard for most Clerics.' },
      Charlatan:              { tier: 'red',    why: 'Maybe for Trickery Clerics but lacking a Wisdom increase is hard to justify.' },
      Entertainer:            { tier: 'red',    why: 'Musician is great but it\'s not enough to justify this.' },
      Noble:                  { tier: 'red',    why: 'No Wisdom increase and both skills are based on dump stats.' },
      Sailor:                 { tier: 'red',    why: 'Decent ability scores for a melee build plus one good skill but Tavern Brawler is useless here.' },
    },
    skills: {
      Insight:    { tier: 'blue',   why: 'The closest Face skill you get. High Wisdom backs it up strongly. Even non-Face Clerics should pick this up.' },
      Religion:   { tier: 'green',  why: 'The Cleric\'s best knowledge skill and thematically central. Thaumaturge Clerics add Wisdom to Intelligence (Religion) checks.' },
      History:    { tier: 'green',  why: 'Good knowledge skill. Useful in many campaigns.' },
      Perception:  { tier: 'orange', why: 'Always useful but ideally someone with better Wisdom handles it. Still worth having.' },
      Persuasion: { tier: 'orange', why: 'Crucial for a Face but skip it if someone in the party has more Charisma.' },
      Medicine:   { tier: 'red',    why: 'Useless. Medicine is best done magically.' },
    },
    subclasses: {
      'Life Domain':      { tier: 'blue',   vibe: 'The best healer in the game — your allies don\'t stay down', why: 'Disciple of Life adds extra healing to every healing spell. Preserve Life via Channel Divinity provides massive emergency healing. Blessed Healer heals you when you heal others. Supreme Healing maximizes all healing dice at level 17. No one keeps a party alive better.' },
      'Light Domain':     { tier: 'blue',   vibe: 'Fireball priest — blasting with divine radiance', why: 'Closes the gap between Cleric and Wizard for offensive spellcasting. Fireball, Wall of Fire, and Scorching Ray expand your damage options dramatically. Warding Flare and Improved Flare protect you and allies. Corona of Light supercharges all Fire and Radiant spells.' },
      'War Domain':       { tier: 'green',  vibe: 'Divine warrior — hit things and help allies hit harder', why: 'Guided Strike turns a missed attack into a guaranteed hit using Channel Divinity. War Priest adds Bonus Action attacks. War God\'s Blessing provides Shield of Faith or Spiritual Weapon without a spell slot. Avatar of Battle gives permanent resistance to B/P/S damage.' },
      'Trickery Domain':  { tier: 'green',  vibe: 'Sneaky Cleric — illusions, invisibility, and misdirection', why: 'Blessing of the Trickster gives perpetual Advantage on Stealth without Concentration. Invoke Duplicity creates an illusory double to deliver spells from safety and grant Advantage. Great stealth spell list. Best Cleric subclass for replacing a Rogue.' },
      'Knowledge Domain': { tier: 'green',  vibe: 'Scholar-priest — information is the deadliest weapon', why: 'Expertise in two knowledge skills. Mind Magic lets you cast divination spells like Scrying as an Action without spell slots or components. Divine Foreknowledge is essentially Foresight with a 1-hour duration. Rewards careful scouting and planning over brute force.' },
    },
  },

  // ─── DRUID ────────────────────────────────────────────────
  druid: {
    species: {
      Elf:        { tier: 'blue',   why: 'Darkvision, extra skill, and innate spellcasting. Wood Elf gets Pass Without Trace — the best stealth spell in the game — prepared for free.' },
      Aasimar:    { tier: 'blue',   why: 'Two damage resistances, a heal, and Celestial Revelation. Works well alongside Wild Shape for combat-focused builds.' },
      Gnome:      { tier: 'green',  why: 'Gnomish Cunning protects mental saves. Cantrips from Gnomish Lineage complement limited prepared spells.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Consistently strong across every build.' },
      Halfling:   { tier: 'green',  why: 'Lucky is great for a class making many d20 rolls. Brave helps against the frequent fear effects at higher levels.' },
      Tiefling:   { tier: 'green',  why: 'Darkvision, resistance, and innate spellcasting from outside the Druid list.' },
      Dwarf:      { tier: 'green',  why: 'Darkvision, Poison Resistance, extra hit points. Good for Wild Shape melee builds.' },
      Orc:        { tier: 'orange', why: 'Adrenaline Rush helps reposition when running Spirit Guardians. Relentless Endurance is good insurance.' },
      Dragonborn: { tier: 'orange', why: 'Darkvision, resistance, once-per-day flight. Decent but not specifically strong for Druid.' },
      Goliath:    { tier: 'orange', why: 'Giant Heritage offers some options but none specifically enhance Druid class features.' },
    },
    backgrounds: {
      Guide:           { tier: 'blue',   why: 'Perfect ability scores (Dex + Wis) and Magic Initiate (Druid) adds spells without spending your Fighting Style. RPGBOT\'s top pick.' },
      'Genie Touched': { tier: 'green',  why: 'Good ability scores and Magic Initiate options. Works well for arcane-flavored builds.' },
      'Moonwell Pilgrim': { tier: 'green', why: 'Good ability scores and Magic Initiate (Druid) for extra spellcasting.' },
      Hermit:          { tier: 'green',  why: 'Decent ability scores and Healer may be worthwhile if you\'re the party\'s only healer.' },
      Sage:            { tier: 'green',  why: 'Good ability scores, decent skills, and Magic Initiate (Wizard) fills gaps.' },
      Farmer:          { tier: 'orange', why: 'Con + Wis with Tough is decent. Skills aren\'t great but the stats work.' },
      Acolyte:         { tier: 'orange', why: 'Wis bump and Magic Initiate (Cleric). Decent for casters who want healing support.' },
      Scribe:          { tier: 'orange', why: 'Dex + Int with Skilled. Fine for skill-focused builds.' },
      Noble:           { tier: 'orange', why: 'Wis increase and Skilled are decent but better options exist.' },
      Criminal:        { tier: 'red',    why: 'No Wisdom increase. Hard to justify.' },
      Artisan:         { tier: 'red',    why: 'Crafter is an awful feat.' },
      Entertainer:     { tier: 'red',    why: 'Bad ability scores and terrible skills for Druid.' },
      Sailor:          { tier: 'red',    why: 'Tavern Brawler is useless here. Bad overall.' },
    },
    skills: {
      Perception:        { tier: 'blue',   why: 'The most rolled skill in the game. High Wisdom makes you excellent at this.' },
      Insight:           { tier: 'green',  why: 'Good Wisdom-based skill. Useful for social encounters.' },
      Nature:            { tier: 'green',  why: 'Thematically appropriate and Wisdom-based. One of your best knowledge skill options.' },
      Survival:          { tier: 'green',  why: 'Wisdom-based and useful in wilderness exploration campaigns.' },
      Arcana:            { tier: 'green',  why: 'Important knowledge skill. Intelligence-based but worth having.' },
      Medicine:          { tier: 'orange', why: 'Wisdom-based but the skill itself is largely useless. Magic heals better.' },
      'Animal Handling': { tier: 'orange', why: 'Situationally useful. More relevant for Beast-focused builds.' },
      Religion:          { tier: 'orange', why: 'Decent knowledge skill but Intelligence-based.' },
    },
    subclasses: {
      'Circle of the Moon':  { tier: 'blue',   vibe: 'Become the beast — Wild Shape as a combat weapon', why: 'The combat Wild Shape subclass. Combat Wild Shape lets you shift as a Bonus Action and use Healing Word in beast form. Elemental Forms at level 10 add powerful elemental shapes. Strongest at low-to-mid levels where beast CR keeps up with enemy HP.' },
      'Circle of the Land':  { tier: 'green',  vibe: 'Terrain-based magic — expanded spells and recovery', why: 'Natural Recovery lets you regain spell slots on a Short Rest. Each terrain type gives you extra prepared spells. Tireless lets you regenerate THP. Best for back-row casters who want more spell slots and terrain-appropriate flavor.' },
      'Circle of the Sea':   { tier: 'green',  vibe: 'Ocean power — lightning, storms, and rushing water', why: 'Wrath of the Sea creates an Emanation of cold and lightning damage. Aquatic Affinity and Stormborn provide utility. Good blaster option for elemental damage builds.' },
      'Circle of Stars':     { tier: 'green',  vibe: 'Constellation forms — healing, guidance, and radiance', why: 'Starry Form activates as a Bonus Action and lasts 10 minutes. Archer form adds reliable Radiant damage every turn. Chalice form adds healing to healing spells. Cosmos form at level 10 adds Concentration protection. Consistent and low-maintenance.' },
      'Circle of Spores':    { tier: 'orange', vibe: 'Death and decay — symbiotic fungal power', why: 'Symbiotic Entity replaces Wild Shape with a combat buff adding necrotic damage to attacks and THP. Halo of Spores deals small reaction damage. Fungal Infestation raises simple undead. Thematically interesting but mechanically weaker than other options.' },
    },
  },

  // ─── FIGHTER ──────────────────────────────────────────────
  fighter: {
    species: {
      Goliath:    { tier: 'blue',   why: 'Giant Heritage is excellent for Fighters. Hill\'s Topple, Stone\'s Endurance, and on-hit damage options all complement combat. Large Form has tactical uses.' },
      Orc:        { tier: 'blue',   why: 'Adrenaline Rush pads hit points and improves positioning. Relentless Endurance provides insurance for a class that draws many attacks.' },
      Dwarf:      { tier: 'blue',   why: 'Darkvision, Poison Resistance, and extra hit points. Tremorsense handles invisible enemies. One of the best durability packages for front-line Fighters.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Grab Alert, Lucky, or a combat feat. Always strong.' },
      Dragonborn: { tier: 'green',  why: 'Damage resistance, Darkvision, and once-per-day flight. Breath weapon is decent crowd control at low levels.' },
      Aasimar:    { tier: 'green',  why: 'Two damage resistances and Celestial Revelation. Once-per-day flight or crowd control is useful.' },
      Elf:        { tier: 'green',  why: 'Darkvision and extra skill. Fey Ancestry protects against common debuffs. Wood Elf gets Pass Without Trace for stealth Fighters.' },
      Halfling:   { tier: 'orange', why: 'Lucky is great for Fighters making many attack rolls. Brave helps. Nimbleness is rarely impactful for a front-liner.' },
      Gnome:      { tier: 'orange', why: 'Gnomish Cunning helps mental saves. Not a primary draw for Fighters but solid overall.' },
      Tiefling:   { tier: 'red',    why: 'Darkvision and resistance are fine but Dragonborn is a much better fit for martial Fighters.' },
    },
    backgrounds: {
      'Flaming Fist Mercenary': { tier: 'blue',   why: 'Str + Con with Tough and two decent combat skills. Strong default for front-line Fighters.' },
      Soldier:                  { tier: 'blue',   why: 'Good ability scores, Savage Attacker is decent for Fighters who make fewer attacks, and one Face skill.' },
      Farmer:                   { tier: 'green',  why: 'Str + Con with Tough. Simple and effective for melee Fighters.' },
      Guard:                    { tier: 'green',  why: 'Good ability scores, Perception, and Alert. Alert is strong for Fighters who want to act first.' },
      Criminal:                 { tier: 'green',  why: 'Perfect ability scores for Dexterity builds, decent skills, and an easy feat choice.' },
      Sailor:                   { tier: 'green',  why: 'Decent ability scores and Tavern Brawler can be useful for grapple Fighters.' },
      'Rashemi Wanderer':       { tier: 'green',  why: 'Str + Con with Tough. Good skills for the Barbarian equivalent on Fighter.' },
      Scribe:                   { tier: 'green',  why: 'Good ability scores, Skilled, and decent skills for covering utility roles.' },
      Noble:                    { tier: 'orange', why: 'Str and Skilled are fine. History is wasted but the Face skill is useful.' },
      Artisan:                  { tier: 'orange', why: 'Can get Str + Dex but Crafter is a weak feat.' },
      Charlatan:                { tier: 'orange', why: 'Works for Dexterity builds who want Face skills.' },
      Hermit:                   { tier: 'orange', why: 'Passable ability scores and Healer is nice on a class that can\'t heal.' },
      Acolyte:                  { tier: 'red',    why: 'Bad ability scores for Fighters.' },
      Entertainer:              { tier: 'red',    why: 'Musician is great but the skills are terrible for Fighter.' },
      Sage:                     { tier: 'red',    why: 'No Str or Con increase. Intelligence-based skills are wasted.' },
    },
    skills: {
      Perception:        { tier: 'blue',   why: 'The most important skill in the game. At least one or two people in any party should have it.' },
      Athletics:         { tier: 'green',  why: 'The only Strength skill. Great for binding creatures in chains — an extremely powerful 2024 rules tactic.' },
      Intimidation:      { tier: 'green',  why: 'Good social skill for a martial character. Charisma-based but worth having.' },
      Survival:          { tier: 'green',  why: 'Useful in wilderness exploration. Wisdom-based.' },
      Insight:           { tier: 'green',  why: 'Useful for social situations. Wisdom-based.' },
      Acrobatics:        { tier: 'orange', why: 'Situational. Useful for escaping grapples if you\'re Dexterity-based.' },
      History:           { tier: 'orange', why: 'Good knowledge skill. Intelligence-based but worth having if you have decent Int.' },
      'Animal Handling': { tier: 'orange', why: 'Not specifically helpful for Fighter function.' },
    },
    subclasses: {
      'Battle Master':    { tier: 'blue',   vibe: 'Tactical genius — maneuvers that control every fight', why: 'Superiority Dice fuel powerful maneuvers like Trip Attack, Disarming Strike, and Precision Attack. More flexible than any other Fighter subclass. Known Maneuvers can be changed on level-up. Combat Superiority covers nearly any tactical situation you can imagine.' },
      'Eldritch Knight':  { tier: 'blue',   vibe: 'Spell-sword — magic and martial power combined', why: 'Adds spellcasting to your Fighter toolkit. War Magic lets you attack after casting a Cantrip as a Bonus Action. Improved War Magic extends this to any spell. Arcane Charge teleports you when using Action Surge. Best spellcasting option for a martial character.' },
      Champion:           { tier: 'green',  vibe: 'Simple, brutal, relentless — extra crits, always', why: 'Expanded Critical Hit range means you crit on 19-20 (eventually 18-20). Remarkable Athlete adds PB to Strength, Dexterity, and Constitution checks. Additional Fighting Style at level 10. Simple and effective — no resource management beyond Action Surge.' },
      'Psi Warrior':      { tier: 'green',  vibe: 'Psychic fighter — telekinesis and mental fortitude', why: 'Psionic Power Dice fuel telekinetic shoves, psychic blades damage, and mental defenses. Telekinetic Adept at level 7 adds flight and psionic thrust. Mind-focused and unique playstyle. Slightly more complex than Champion but powerful in the right hands.' },
    },
  },

  // ─── MONK ─────────────────────────────────────────────────
  monk: {
    species: {
      Elf:        { tier: 'blue',   why: 'Darkvision and an extra skill are great. Fey Ancestry protects against charm/sleep. High Elf\'s Blade Ward Cantrip is useful as a combat option.' },
      Halfling:   { tier: 'blue',   why: 'Lucky works great with the Monk\'s high number of attacks — more rolls means more chances to reroll 1s. Brave and Nimbleness are both useful.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Grab Tavern Brawler or Grappler to dramatically enhance Monk grappling tactics.' },
      Aasimar:    { tier: 'green',  why: 'Two damage resistances and Celestial Revelation. The transformation\'s Bonus Action cost conflicts with Rage but works fine once per day.' },
      Gnome:      { tier: 'green',  why: 'Gnomish Cunning protects mental saves. The Monk\'s high Wisdom compounds this into very reliable mental save defense.' },
      Dwarf:      { tier: 'green',  why: 'Darkvision, Poison Resistance, extra hit points. Tremorsense helps locate hidden enemies. Great durability for a d8 hit die class.' },
      Orc:        { tier: 'orange', why: 'Adrenaline Rush competes for your Bonus Action but the THP help. Relentless Endurance provides insurance.' },
      Dragonborn: { tier: 'orange', why: 'Darkvision, damage resistance, once-per-day flight. Flight is excellent for a melee class.' },
      Tiefling:   { tier: 'orange', why: 'Darkvision, resistance, and some innate spellcasting. Infernal is the most consistent.' },
      Goliath:    { tier: 'orange', why: 'Giant Heritage offers some options but many overlap with existing Monk features like Disengage.' },
    },
    backgrounds: {
      Sailor:                  { tier: 'blue',   why: 'Excellent ability scores (Dex + Con or Wis), one good skill, and Tavern Brawler is absolutely amazing on Monk. Reroll worst damage rolls and push enemies.' },
      Scribe:                  { tier: 'blue',   why: 'Good ability scores, good skills, and Skilled can close the skill gap between Monk and Rogue.' },
      Charlatan:               { tier: 'green',  why: 'Dex + Con + Skilled. Great combination for a Monk filling in for a Rogue. No Thieves\' Tools though.' },
      'Chondathan Freebooter': { tier: 'green',  why: 'Good ability scores and Skilled. Very close to Charlatan in value.' },
      Criminal:                { tier: 'green',  why: 'Good choice if there isn\'t a Rogue in the party. Dex + Con with relevant tools.' },
      Wayfarer:                { tier: 'green',  why: 'Good ability scores, decent skills, and Lucky. Thieves\' Tools without the Charlatan trade-offs.' },
      Guide:                   { tier: 'green',  why: 'Perfect ability scores (Dex + Wis) and decent skills. Magic Initiate (Druid) works for Shillelagh builds though that hurts Bonus Action attacks.' },
      'Genie Touched':         { tier: 'green',  why: 'Good ability scores and skills. Blade Ward Cantrip is useful as a combat defense option.' },
      'Ice Fisher':            { tier: 'green',  why: 'Perfect ability scores and Alert. Terrible skills but the stat+feat combo is worth it.' },
      Hermit:                  { tier: 'orange', why: 'Decent ability scores and Healer is nice on a class that can\'t normally heal.' },
      'Rashemi Wanderer':      { tier: 'orange', why: 'Good ability scores, Tough, and decent skills.' },
      Guard:                   { tier: 'orange', why: 'Wis bump and one good skill. Alert is decent but not essential for Monks.' },
      Farmer:                  { tier: 'orange', why: 'Con + Wis is fine but Dexterity is more important. Tough is always easy.' },
      Entertainer:             { tier: 'orange', why: 'Musician is great and the ability scores work but skills are borderline useless.' },
      Acolyte:                 { tier: 'red',    why: 'Bad ability scores. One good skill. Magic Initiate (Cleric) isn\'t a great fit.' },
      Artisan:                 { tier: 'red',    why: 'Crafter is an awful feat.' },
      Noble:                   { tier: 'red',    why: 'Awful ability scores and poor skills.' },
      Sage:                    { tier: 'red',    why: 'Workable ability scores without a Dex increase. Genie Touched is an easier fit.' },
    },
    skills: {
      Stealth:    { tier: 'blue',   why: 'With high Dexterity, Stealth is an obvious priority. Monks work well as Scouts.' },
      Perception: { tier: 'green',  why: 'The most important skill in the game. High Wisdom makes you excellent here.' },
      Insight:    { tier: 'green',  why: 'The closest to a Face skill Monks get. High Wisdom supports it well.' },
      Acrobatics: { tier: 'orange', why: 'Functionally useful for escaping grapples, though Dexterous Attacks already gives you great grapple options.' },
      Religion:   { tier: 'orange', why: 'A decent knowledge skill thematically appropriate for Monks.' },
      History:    { tier: 'orange', why: 'Good knowledge skill but Intelligence is often dumped.' },
      Athletics:  { tier: 'red',    why: 'Functionally useless. You can use Athletics to bind creatures in chains but Sleight of Hand is better for that.' },
    },
    subclasses: {
      'Warrior of the Open Hand': { tier: 'blue',   vibe: 'Peak martial artist — the classic monk perfected', why: 'Open Hand Technique dramatically improves Flurry of Blows. Push launches enemies into the air for falling damage. Topple knocks prone. Addle prevents Reactions for safe escape. Fleet Step gives effectively a free Dash. Quivering Palm delivers massive burst damage. The iconic Monk fantasy.' },
      'Warrior of Shadow':        { tier: 'blue',   vibe: 'Darkness and teleportation — strike from shadow', why: 'Cast Darkness for 1 Focus Point and see perfectly inside it. Shadow Step teleports you between dark areas. Cloak of Shadows turns you invisible for multiple free Flurries. Consistent Advantage on all attacks is a massive mathematical boost that defines encounters.' },
      'Warrior of the Elements':  { tier: 'green',  vibe: 'Elemental strikes and flight — bend air and fire', why: 'Elemental Attunement adds reach, pushes/pulls, and damage type switching for 1 FP. Elemental Burst provides AOE damage — unusual for Monks. Stride of the Elements gives flight. Elemental Epitome adds damage resistance and a damaging Step of the Wind.' },
      'Warrior of Mercy':         { tier: 'green',  vibe: 'Strike and heal — life and death in the same hands', why: 'Hand of Harm deals extra Necrotic damage and eventually poisons with no save. Hand of Healing works during Flurry of Blows at no extra cost. Physician\'s Touch adds Lesser Restoration effects. Flurry of Healing and Harm triples your healing output. Hand of Ultimate Mercy raises the dead.' },
    },
  },

  // ─── PALADIN ──────────────────────────────────────────────
  paladin: {
    species: {
      Aasimar:    { tier: 'green',  why: 'Iconic pairing. Two damage resistances, a heal, and Celestial Revelation. Flight or crowd control once per day. Paladins can already do most of this but the stacking is good.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Grab Lucky or Purple Dragon Rook for party support.' },
      Dragonborn: { tier: 'green',  why: 'Damage resistance, Darkvision, and once-per-day flight. Breath weapon provides crowd control at low levels.' },
      Orc:        { tier: 'green',  why: 'Adrenaline Rush helps front-line mobility. Relentless Endurance provides insurance on a class that already has Lay on Hands.' },
      Goliath:    { tier: 'green',  why: 'Giant Heritage is excellent. Cloud\'s Jaunt, Hill\'s Topple, and Stone\'s Endurance all fit melee Paladin tactics.' },
      Dwarf:      { tier: 'green',  why: 'Darkvision, Poison Resistance, extra hit points. Tremorsense locates hidden enemies. Strong durability for a Defender.' },
      Elf:        { tier: 'orange', why: 'Darkvision and extra skill. Innate spellcasting complements Blessed Warrior builds. Dex builds enjoy Wood Elf for Pass Without Trace.' },
      Gnome:      { tier: 'orange', why: 'Gnomish Cunning combined with Aura of Protection makes mental saves nearly unbeatable.' },
      Halfling:   { tier: 'orange', why: 'Lucky is nice. Brave becomes obsolete at level 10 with Aura of Courage.' },
      Tiefling:   { tier: 'orange', why: 'Darkvision, resistance, and innate spellcasting. Good for Blessed Warrior builds that want magical options.' },
    },
    backgrounds: {
      'Zhentarim Mercenary':    { tier: 'blue',   why: 'Good ability scores, great skills, excellent feat — sets up a strong melee build. RPGBOT\'s top Paladin pick for Strength or Charisma builds.' },
      'Flaming Fist Mercenary': { tier: 'blue',   why: 'Perfect ability scores (Str + Con), good feat, good skills. Easy default for front-line Paladin.' },
      Charlatan:                { tier: 'green',  why: 'Perfect ability scores for Dexterity or Blessed Warrior builds and covers all Face skills.' },
      Carouser:                 { tier: 'green',  why: 'Good ability scores for Dex or Cha builds, excellent feat, fantastic Face skills.' },
      'Rashemi Wanderer':       { tier: 'green',  why: 'Perfect ability scores, easy go-to feat, and good skills. Excellent default if you don\'t need a specific Origin Feat.' },
      "Lords' Alliance Vassal": { tier: 'green',  why: 'Good ability scores, decent feat for martial characters, good Face skills.' },
      'House Agent':            { tier: 'green',  why: 'Good ability scores, one good skill, and Lucky. Best option to get Lucky on Strength builds.' },
      Noble:                    { tier: 'green',  why: 'Good ability scores and you can get all the Face skills you need.' },
      'Vampire Devotee':        { tier: 'green',  why: 'Perfect ability scores for Cha builds. Vampire\'s Plaything lets you Dash or Disengage as a Bonus Action. Good skills for Cha builds.' },
      Wayfarer:                 { tier: 'green',  why: 'Good ability scores for Dex builds, skills and Thieves\' Tools for Rogue replacement, Lucky.' },
      Farmer:                   { tier: 'orange', why: 'Great ability scores for front-line. Tough is an easy feat. Skills aren\'t great.' },
      Soldier:                  { tier: 'orange', why: 'Good ability scores, Savage Attacker is decent since you\'ll never have more than 2 attacks, and one Face skill.' },
      'Shadowmasters Exile':    { tier: 'orange', why: 'Good ability scores for Dex or Cha builds. Skills and Thieves\' Tools are good for Dex Paladins.' },
      Entertainer:              { tier: 'orange', why: 'Good ability scores and Musician is welcome but skills are borderline useless.' },
      Criminal:                 { tier: 'orange', why: 'Good for Dex builds especially without a Rogue in the party.' },
      Hermit:                   { tier: 'orange', why: 'Okay for Blessed Warrior builds. Skills are middling.' },
      Artisan:                  { tier: 'orange', why: 'Can get Str + Dex and one Charisma skill. Crafter is a weak feat. Meets the bare minimum.' },
      Sage:                     { tier: 'red',    why: 'No Charisma increase. Doesn\'t work even for Blessed Warrior.' },
      Archaeologist:            { tier: 'red',    why: 'Decent for Dexterity builds but better options exist.' },
      'Mulhorandi Tomb Raider': { tier: 'red',    why: 'Bad all around for Paladin.' },
    },
    skills: {
      Persuasion:  { tier: 'blue',   why: 'The king of Face skills and you have the Charisma to back it up. Essential.' },
      Intimidation: { tier: 'green', why: 'Important Face skill. Charisma-based and well-suited to Paladins.' },
      Insight:     { tier: 'orange', why: 'Helpful for a Face but your Wisdom may not be high enough to back it up.' },
      Athletics:   { tier: 'orange', why: 'The only Strength skill. Good for binding creatures in chains — extremely powerful in 2024 rules.' },
      Religion:    { tier: 'red',    why: 'One of the most important knowledge skills but you probably dumped Intelligence.' },
      Medicine:    { tier: 'red',    why: 'Useless. You have Lay on Hands.' },
    },
    subclasses: {
      'Oath of Noble Genies':  { tier: 'blue',   vibe: 'Elemental pact — Dao\'s Crush locks down anything', why: 'Elemental Smite is game-breakingly powerful. Dao\'s Crush Grapples and Restrains a target with no save — they must use their Action to attempt escape while you can immediately reapply it. Genie\'s Splendor provides 10+Dex+Cha AC unarmored. Aura of Elemental Shielding shares adaptable damage resistance with the whole party.' },
      'Oath of Vengeance':     { tier: 'blue',   vibe: 'Hunting down the wicked — Advantage and relentless pursuit', why: 'Vow of Enmity gives easy Advantage without setup. Relentless Avenger prevents enemies from escaping after Opportunity Attacks. Soul of Vengeance grants a free attack whenever your Vow target attacks. Excellent offensive subclass that hunts down single high-priority targets.' },
      'Oath of Devotion':      { tier: 'green',  vibe: 'Holy warrior — Sacred Weapon and radiant smites', why: 'Sacred Weapon adds Charisma to attack rolls and changes damage to Radiant — great for bypassing resistances while keeping offense high. Aura of Devotion blocks charm effects. Smite of Protection grants +2 AC and Dex saves to the whole party for one round. Clean, thematic, effective.' },
      'Oath of Glory':         { tier: 'green',  vibe: 'Inspiring champion — buffs, THP, and battlefield glory', why: 'Inspiring Smite creates shareable Temporary Hit Points after Divine Smite. Peerless Athlete gives Advantage on Athletics/Acrobatics for exploration challenges. Aura of Alacrity boosts party movement speed. Glorious Defense combines Shield-like AC boost with a free counterattack.' },
      'Oath of the Ancients': { tier: 'green',  vibe: 'Nature\'s warden — Misty Step and protective auras', why: 'Aura of Warding provides rare resistance to Necrotic, Psychic, and Radiant damage — shared with the whole party. Nature\'s Wrath is an AOE Restrain effect usable multiple times per rest. Misty Step and Ensnaring Strike are both excellent spell additions. Undying Sentinel provides crucial insurance.' },
    },
  },

  // ─── RANGER ───────────────────────────────────────────────
  ranger: {
    species: {
      Elf:        { tier: 'blue',   why: 'Darkvision, extra skill, and innate spellcasting. Wood Elf gets Pass Without Trace and Longstrider free. High Elf gets an offensive Cantrip. Both help Druidic Warrior builds.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Grab Skilled for Rogue replacement or Lucky as a safe default.' },
      Halfling:   { tier: 'green',  why: 'Brave covers one of the Ranger\'s weaker saves. Lucky is always strong. Naturally Stealthy helps with scouting.' },
      Orc:        { tier: 'green',  why: 'Adrenaline Rush provides Rogue-like mobility for melee builds. Relentless Endurance is good insurance for builds drawing more attacks.' },
      Goliath:    { tier: 'green',  why: 'Cloud\'s Jaunt, Hill\'s Topple, and Stone\'s Endurance all fit Ranger combat well.' },
      Dwarf:      { tier: 'green',  why: 'Darkvision, Poison Resistance, extra hit points. Tremorsense handles hidden enemies.' },
      Aasimar:    { tier: 'green',  why: 'Two damage resistances, heal, and Celestial Revelation. Heavenly Wings is great for ranged builds.' },
      Gnome:      { tier: 'orange', why: 'Darkvision and Gnomish Cunning protect mental saves. Cantrips add utility.' },
      Dragonborn: { tier: 'orange', why: 'Damage resistance, Darkvision, once-per-day flight. Good for melee builds.' },
      Tiefling:   { tier: 'orange', why: 'Darkvision, resistance, and some spellcasting. Better for Druidic Warrior builds.' },
    },
    backgrounds: {
      Scribe:                  { tier: 'blue',   why: 'Good ability scores, good skills, and Skilled closes the Rogue proficiency gap. RPGBOT\'s top Ranger pick.' },
      Wayfarer:                { tier: 'blue',   why: 'Good ability scores, skills and Thieves\' Tools for Rogue replacement, and Lucky.' },
      Guide:                   { tier: 'green',  why: 'Perfect ability scores (Dex + Wis) and Magic Initiate (Druid) without sacrificing Fighting Style. RPGBOT\'s default for Ranger.' },
      Criminal:                { tier: 'green',  why: 'Perfect for stealthy characters. Dex + Con with relevant tools.' },
      Charlatan:               { tier: 'green',  why: 'Dex + Con + Skilled. Great combination but no Thieves\' Tools.' },
      'Chondathan Freebooter': { tier: 'green',  why: 'Good ability scores, one good skill, and Skilled. Very close to Charlatan.' },
      'Ice Fisher':            { tier: 'green',  why: 'Good ability scores and Alert. Skills are terrible but the stats work.' },
      'Mulhorandi Tomb Raider': { tier: 'green', why: 'Good ability scores and Lucky. Skills are a hard choice for Rangers.' },
      'Shadowmasters Exile':   { tier: 'orange', why: 'Workable ability scores, decent skills, and a passable feat.' },
      Sailor:                  { tier: 'orange', why: 'Decent melee-build ability scores and one good skill.' },
      Soldier:                 { tier: 'orange', why: 'Good ability scores and Savage Attacker is decent since you\'ll never have more than 2 attacks. Skills are bad.' },
      Farmer:                  { tier: 'orange', why: 'Good for Druidic Warrior builds. Tough is always fine.' },
      Hermit:                  { tier: 'orange', why: 'Okay for Druidic Warrior builds. Healer may be worthwhile if you\'re short on party healing.' },
      Artisan:                 { tier: 'red',    why: 'Only the Dexterity increase is appealing. Crafter is weak.' },
      Entertainer:             { tier: 'red',    why: 'One good ability score and Musician is great but skills are horrible.' },
      Merchant:                { tier: 'red',    why: 'Bad ability scores and skills. Get Lucky somewhere else.' },
    },
    skills: {
      Perception:        { tier: 'blue',   why: 'The most important skill in the game. High Wisdom makes you excellent here. Take it.' },
      Stealth:           { tier: 'green',  why: 'Rangers don\'t strictly need stealth but with high Dexterity it\'s a strong Scout skill.' },
      Survival:          { tier: 'green',  why: 'Thematically core and Wisdom-based. Actual Survival checks are rare but having it is appropriate.' },
      Investigation:     { tier: 'orange', why: 'Very useful for Scouts but Intelligence isn\'t a Ranger strength.' },
      Nature:            { tier: 'orange', why: 'Your only knowledge skill. Worth having but Intelligence is hard for Rangers.' },
      Insight:           { tier: 'orange', why: 'Rangers need some Wisdom so this backs up your party\'s Face.' },
      Athletics:         { tier: 'red',    why: 'Functionally useless in 2024 rules for most purposes. Strength builds are not recommended.' },
      'Animal Handling': { tier: 'red',    why: 'Even for Beast Master this is still largely worthless.' },
    },
    subclasses: {
      'Gloom Stalker':   { tier: 'blue',   vibe: 'Darkness is your home — invisible to anyone using Darkvision', why: 'Umbral Sight makes you invisible to any creature relying on Darkvision — one of the best class features in the game in the right conditions. Iron Mind adds a saving throw proficiency. Dread Ambusher provides initiative and burst damage on turn 1. Stalker\'s Flurry adds recovery attacks.' },
      'Fey Wanderer':    { tier: 'blue',   vibe: 'Charisma and fey magic — the Ranger who talks and bites', why: 'Dreadful Strikes adds free Psychic damage to every attack. Otherworldly Glamour makes you a credible Face using Wisdom for Charisma checks. Beguiling Twist redirects charm/fear effects back at enemies. Works best as a Wisdom-based Druidic Warrior build.' },
      'Beast Master':    { tier: 'green',  vibe: 'Your bonded beast fights alongside you', why: 'The Primal Companion is effectively disposable — rebuild it for any spell slot and choose from Land, Sea, or Sky variants. It scales with your Wisdom modifier. Exceptional Training upgrades attacks to Force damage bypassing resistance. Bestial Fury doubles the companion\'s attacks.' },
      Hunter:            { tier: 'green',  vibe: 'Pure martial Ranger — adaptive combat tools', why: 'The iconic Ranger — adds almost no complexity. Colossus Slayer provides consistent 1d8 damage whenever a target is below full HP. Multiattack Defense adds +4 AC against any creature with Multiattack. Superior Hunter\'s Defense provides resistance to one damage type per turn.' },
      'Winter Walker':   { tier: 'orange', vibe: 'Cold mastery and icy vengeance', why: 'Polar Strikes adds consistent cold damage. Biting Cold ignores cold resistance. Chilling Retribution incapacitates attackers on a failed save. Works best as a Wisdom-based Shillelagh build taking Cold Caster. Spell list arrives too late to be exciting relative to full casters.' },
    },
  },

  // ─── ROGUE ────────────────────────────────────────────────
  rogue: {
    species: {
      Changeling:  { tier: 'blue',   why: 'Two extra skills, permanent Advantage on Charisma checks, and built-in disguises. The ideal Face Rogue.' },
      Halfling:    { tier: 'blue',   why: 'Brave covers a key weakness. Lucky triggers frequently with the Rogue\'s many attack rolls. Naturally Stealthy is genuinely useful for ranged snipers.' },
      Elf:         { tier: 'green',  why: 'Darkvision and extra skill. Innate spellcasting is useful for Arcane Tricksters. Consistently strong.' },
      Human:       { tier: 'green',  why: 'Extra feat and skill. Grab Skulker for ranged builds or Lucky as a safe default.' },
      Gnome:       { tier: 'green',  why: 'Darkvision, Gnomish Cunning, and cantrips. Cunning provides broad mental save protection.' },
      Tiefling:    { tier: 'green',  why: 'Darkvision, resistance, and innate spellcasting. Most useful for Arcane Tricksters.' },
      Dhampir:     { tier: 'green',  why: 'Spider Climb helps Scout positioning. Darkvision is great. Vampiric Bite boosts important skill checks.' },
      Orc:         { tier: 'orange', why: 'Adrenaline Rush is excellent for getting out of dangerous positions. Cunning Action makes it less appealing but it still helps.' },
      Dragonborn:  { tier: 'orange', why: 'Darkvision, resistance, and once-per-day flight. Fine but durability is mostly wasted on Rogues.' },
      Dwarf:       { tier: 'orange', why: 'Darkvision and Poison Resistance are fine but durability is largely wasted.' },
      Goliath:     { tier: 'orange', why: 'Giant Heritage options are either redundant with Cunning Action or unimpressive for Rogues.' },
    },
    backgrounds: {
      Charlatan:               { tier: 'blue',   why: 'Perfect ability scores and Face skill coverage. RPGBOT\'s top Rogue pick.' },
      Scribe:                  { tier: 'blue',   why: 'Good ability scores, good skills, and Skilled closes proficiency gaps. Easy go-to.' },
      Wayfarer:                { tier: 'green',  why: 'Good ability scores, skills, and Lucky. Thieves\' Tools proficiency is redundant though.' },
      Carouser:                { tier: 'green',  why: 'Good ability scores, excellent feat, fantastic Face skills.' },
      Criminal:                { tier: 'green',  why: 'Perfect for stealthy Rogues. Dex + Con with Thieves\' Tools and Stealth.' },
      'Mulhorandi Tomb Raider': { tier: 'green', why: 'Good ability scores for Int-focused builds and Lucky.' },
      'Zhentarim Mercenary':   { tier: 'green',  why: 'Good for Charisma-investing Rogues. Zhentarim Ruffian is excellent for melee builds.' },
      Entertainer:             { tier: 'orange', why: 'Good ability scores and Musician. Skills are borderline useless.' },
      'Shadowmasters Exile':   { tier: 'orange', why: 'Decent ability scores and skills. Savage Attacker is weak but the stats work.' },
      Sailor:                  { tier: 'orange', why: 'Decent ability scores and one good skill. Tavern Brawler is useless here.' },
      Archaeologist:           { tier: 'orange', why: 'Good for skill coverage. Basically identical to Scribe with different skills.' },
      Soldier:                 { tier: 'orange', why: 'Good ability scores but Savage Attacker is wasted on Rogues.' },
      'Vampire Survivor':      { tier: 'orange', why: 'Good ability scores, decent skills, bad feat.' },
      Acolyte:                 { tier: 'red',    why: 'Could build around True Strike for Int attacks but better options exist.' },
      Farmer:                  { tier: 'red',    why: 'Bad ability scores, bad skills.' },
      Noble:                   { tier: 'red',    why: 'Could work for Int-based Arcane Trickster but Scribe is better.' },
      Sage:                    { tier: 'red',    why: 'Int + Con for Arcane Trickster but you still want Dexterity for AC and skills.' },
    },
    skills: {
      Stealth:           { tier: 'blue',   why: 'A Rogue without Stealth is a strange Rogue. Essential for sniping and scouting.' },
      Perception:        { tier: 'blue',   why: 'Most rolled skill in the game. Take it.' },
      'Sleight of Hand': { tier: 'green',  why: 'Now used to pick locks. Combined with Thieves\' Tools proficiency you roll with Advantage on locks and traps.' },
      Investigation:     { tier: 'green',  why: 'Very useful for Scouts. Intelligence-based but worth having.' },
      Deception:         { tier: 'green',  why: 'Core Face skill.' },
      Insight:           { tier: 'green',  why: 'Useful Face skill.' },
      Persuasion:        { tier: 'green',  why: 'Essential Face skill.' },
      Intimidation:      { tier: 'orange', why: 'Useful Face skill but competing with higher-priority options.' },
      Acrobatics:        { tier: 'orange', why: 'Situational. Useful for escaping grapples if you don\'t have Misty Step.' },
      Athletics:         { tier: 'red',    why: 'Functionally useless. Strength is a dump stat.' },
      Performance:       { tier: 'red',    why: 'Functionally useless.' },
      Medicine:          { tier: 'red',    why: 'Useless. Medicine is best done magically.' },
    },
    subclasses: {
      Thief:             { tier: 'blue',   vibe: 'Fast hands, faster moves — use anything as a weapon', why: 'Fast Hands lets you use items, pick locks, and activate magic items as a Bonus Action. Supreme Sneak allows attacking from stealth without needing to re-hide. Use Magic Device at level 13 lets you use any magic item regardless of class requirements. Thief\'s Reflexes at level 17 gives two full turns on round 1.' },
      'Arcane Trickster': { tier: 'blue',  vibe: 'Magic and misdirection — Sneak Attack from the shadows', why: 'Adds Wizard spellcasting. Mage Hand Legerdemain controls the hand as a Bonus Action invisibly. Magical Ambush imposes Disadvantage on saves when you\'re invisible. True Strike builds allow full Intelligence focus. Versatile Trickster grants Advantage to allies.' },
      Assassin:          { tier: 'green',  vibe: 'First strike devastation — act first, act once', why: 'Assassinate gives Advantage and bonus damage on enemies who haven\'t acted. Initiative bonus makes acting first more reliable. Envenom Weapons free-applies Cunning Strike poison. Death Strike doubles Sneak Attack damage on a Constitution save. Heavily dependent on acting early in initiative.' },
      Soulknife:         { tier: 'green',  vibe: 'Psychic blades — no weapons needed, ever', why: 'Psychic Blades deal d6 Psychic damage — rarely resisted — in melee or at 60-foot range. Homing Strikes lets you reroll a missed attack for a Focus Die (no cost on miss). Psychic Teleportation escapes grapples. Rend Mind Stuns a target on hit. Psi-Bolstered Knack rescues failed skill checks at no cost.' },
      'Scion of the Three': { tier: 'orange', vibe: 'Dark gods grant you terror and resilience', why: 'Bloodthirst provides an extra Sneak Attack outside your turn when you Bloody an enemy. Dread Allegiance lets you choose a deity daily for different benefits (Bhaal for weapon resistance + Cantrip, Bane for damage resistance). Terrify applies Frightened via Cunning Action for Advantage on future attacks. Straightforward but limited build options.' },
    },
  },

  // ─── SORCERER ─────────────────────────────────────────────
  sorcerer: {
    species: {
      Tiefling:   { tier: 'green',  why: 'Darkvision, Fire Resistance, and innate spellcasting. Most Tiefling spells are already on the Sorcerer list making it less impactful but still fine.' },
      Dragonborn: { tier: 'green',  why: 'Darkvision, resistance, and once-per-day flight. Good for martial builds who need non-spell flight.' },
      Aasimar:    { tier: 'green',  why: 'Two damage resistances, heal, and Celestial Revelation. Heavenly Wings provides non-spell flight. Necrotic Shroud deters melee.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Grab Alert for acting first or Lucky as a safe default.' },
      Elf:        { tier: 'green',  why: 'Darkvision, extra skill, and innate spellcasting from outside your list. Complements your limited known spells.' },
      Gnome:      { tier: 'green',  why: 'Gnomish Cunning combined with Constitution proficiency and good stats makes saves extremely reliable.' },
      Halfling:   { tier: 'green',  why: 'Lucky and Brave are helpful. Nimbleness aids positioning.' },
      Orc:        { tier: 'orange', why: 'Adrenaline Rush helps escape dangerous melee positions. Relentless Endurance provides insurance for a d6 hit die class.' },
      Dwarf:      { tier: 'orange', why: 'Darkvision and Poison Resistance are fine but durability is largely wasted on a back-row caster.' },
      Goliath:    { tier: 'orange', why: 'Cloud Jaunt is fantastic non-spell teleportation. Stone\'s Endurance helps fragile spellcasters.' },
    },
    backgrounds: {
      Charlatan:            { tier: 'blue',   why: 'Perfect ability scores (Dex + Con) and all Face skills covered. RPGBOT\'s top Sorcerer pick.' },
      Carouser:             { tier: 'blue',   why: 'Good ability scores, excellent feat, fantastic Face skills.' },
      Wayfarer:             { tier: 'green',  why: 'Good ability scores, decent skills, and Lucky.' },
      Merchant:             { tier: 'green',  why: 'Good ability scores and Lucky. Only low point is Animal Handling.' },
      'Vampire Devotee':    { tier: 'green',  why: 'Good ability scores, good Face skills, and Vampire\'s Plaything provides non-spell escape.' },
      'Spellfire Initiate': { tier: 'green',  why: 'Good ability scores and feat. Spellfire Spark\'s Bonus Action use saves Sorcery Points.' },
      'Flaming Fist Mercenary': { tier: 'orange', why: 'If you want Tough this is the way. Good ability scores but skills are wasted.' },
      Hermit:               { tier: 'orange', why: 'Good ability scores and Healer may be worthwhile in parties lacking healing.' },
      Entertainer:          { tier: 'orange', why: 'Good ability scores and Musician is great but skills are bad.' },
      'Purple Dragon Squire': { tier: 'orange', why: 'Workable ability scores, good feat, terrible skills.' },
      Sage:                 { tier: 'red',    why: 'Magic Initiate (Wizard) is good but the Sorcerer list already overlaps heavily with Wizard.' },
      Guide:                { tier: 'red',    why: 'Bad ability scores and skills for Sorcerer.' },
      Criminal:             { tier: 'red',    why: 'Bad ability scores for Sorcerer.' },
      Farmer:               { tier: 'red',    why: 'Bad ability scores and skills.' },
      Sailor:               { tier: 'red',    why: 'Bad all around.' },
    },
    skills: {
      Persuasion:   { tier: 'blue',   why: 'The king of Face skills and you have the Charisma to excel at it.' },
      Intimidation: { tier: 'green',  why: 'Important Face skill.' },
      Deception:    { tier: 'green',  why: 'Core Face skill.' },
      Arcana:       { tier: 'orange', why: 'One of the most important knowledge skills but you may not have enough Intelligence.' },
      Insight:      { tier: 'orange', why: 'Helpful Face skill but Wisdom-based.' },
      Religion:     { tier: 'orange', why: 'Good knowledge skill but Intelligence-based.' },
    },
    subclasses: {
      'Draconic Sorcery':   { tier: 'blue',   vibe: 'Dragon heritage — tougher, more elemental, more powerful', why: 'The iconic and most versatile Sorcerer subclass. Draconic Resilience adds 1 HP per level and +3 base AC unarmored. Elemental Affinity adds Charisma to one damage type of spells and lets you spend a point for an hour of resistance. Closes the gap between Sorcerer durability and other classes. Strong generalist choice.' },
      'Aberrant Sorcery':   { tier: 'green',  why: 'Psionic Spells include Mind Sliver (fantastic cantrip) and Hunger of Hadar (excellent AOE). Psionic Sorcery removes V/S components from subclass spells saving Sorcery Points. Psychic Defenses blocks charm and fear. Revelation in Flesh gives flight, swim, or other movement for just 1 point. Warping Implosion teleports enemies.' },
      'Clockwork Sorcery':  { tier: 'green',  why: 'Restore Balance negates Advantage/Disadvantage — solves many frustrating encounter scenarios. Bastion of Law provides THP-like protection. Spell list includes Wizard exclusives like Wall of Force and Summon Construct. Trance of Order guarantees minimum 10 on d20 rolls for 1 minute. Methodical and effective.' },
      'Wild Magic Sorcery': { tier: 'orange', why: 'Tides of Chaos provides easy Advantage once per encounter. Bend Luck spends 2 points to add or subtract 1d4 from any roll — very efficient use. Controlled Chaos reduces dangerous outcomes. Lacks a subclass spell list unlike every other 2024 Sorcerer subclass — a significant cost.' },
      'Spellfire Sorcery':  { tier: 'orange', why: 'Gets Cleric healing spells without playing Divine Soul. Bolstering Flames grants THP when spending Sorcery Points. Absorb Spells converts countered spells to Sorcery Points. Crown of Spellfire provides flight and spell avoidance at the cost of Hit Point Dice. RPGBOT recommends Divine Soul over this if healing is the goal.' },
    },
  },

  // ─── WARLOCK ──────────────────────────────────────────────
  warlock: {
    species: {
      Tiefling:   { tier: 'green',  why: 'Darkvision, Fire Resistance, and innate spellcasting that complements very limited spell slots. Best for non-Blade builds.' },
      Aasimar:    { tier: 'green',  why: 'Two damage resistances and Celestial Revelation. Heavenly Wings lets you fly without Concentration or a spell slot.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Grab Alert, Eldritch Adept, or Lucky.' },
      Elf:        { tier: 'green',  why: 'Darkvision, extra skill, and innate spellcasting from outside your list — great complement to limited Pact Magic.' },
      Gnome:      { tier: 'green',  why: 'Gnomish Cunning protects mental saves. Warlocks don\'t need much Wisdom so this compensates effectively.' },
      Orc:        { tier: 'green',  why: 'Adrenaline Rush and Relentless Endurance are especially useful for Pact of the Blade melee builds drawing many attacks.' },
      Halfling:   { tier: 'orange', why: 'Lucky and Brave are both helpful. Good safety net for any build.' },
      Dragonborn: { tier: 'orange', why: 'Darkvision, resistance, and once-per-day flight. Fine but not specifically strong.' },
      Dwarf:      { tier: 'orange', why: 'Darkvision and resistance are fine. Extra hit points help melee Blade builds.' },
      Goliath:    { tier: 'orange', why: 'Cloud Jaunt is basically Misty Step. Stone\'s Endurance works like Shield for a resource.' },
    },
    backgrounds: {
      Charlatan:                { tier: 'blue',   why: 'Perfect ability scores (Dex + Con) and all Face skills covered.' },
      Carouser:                 { tier: 'blue',   why: 'Good ability scores, excellent feat, fantastic Face skills.' },
      'Zhentarim Mercenary':    { tier: 'green',  why: 'Good for melee Pact of the Blade builds. Zhentarim Ruffian is excellent.' },
      'Flaming Fist Mercenary': { tier: 'green',  why: 'Good ability scores and Tough for melee builds.' },
      Merchant:                 { tier: 'green',  why: 'Good ability scores and Lucky.' },
      'Vampire Devotee':        { tier: 'green',  why: 'Good ability scores, good Face skills, and Vampire\'s Plaything provides non-spell escape.' },
      Wayfarer:                 { tier: 'green',  why: 'Good ability scores, decent skills, and Lucky.' },
      'Genie Touched':          { tier: 'green',  why: 'Good ability scores and Magic Initiate (Wizard) fills gaps in the Warlock\'s limited list.' },
      'House Ghallanda Heir':   { tier: 'green',  why: 'Excellent ability scores, skills, and a decent feat.' },
      Entertainer:              { tier: 'orange', why: 'Good ability scores and Musician. Skills are wasted.' },
      Hermit:                   { tier: 'orange', why: 'Good ability scores and Healer may help a Celestial Warlock.' },
      'Purple Dragon Squire':   { tier: 'orange', why: 'Workable ability scores, good feat, terrible skills.' },
      'Rashemi Wanderer':       { tier: 'orange', why: 'Great for melee Pact of the Blade builds. Str + Con with Tough.' },
      'Spellfire Initiate':     { tier: 'orange', why: 'Good ability scores and Spellfire Spark has niche Bonus Action value.' },
      Noble:                    { tier: 'orange', why: 'Fine but Charlatan is much easier.' },
      Sage:                     { tier: 'red',    why: 'Magic Initiate (Wizard) is good but ability scores are wrong for Warlock.' },
      Acolyte:                  { tier: 'red',    why: 'Magic Initiate (Cleric) is decent but not enough.' },
      Criminal:                 { tier: 'red',    why: 'Works for Dex-based Blade builds but the Cha increase is too important to skip.' },
      Artisan:                  { tier: 'red',    why: 'Crafter is an awful feat.' },
      Sailor:                   { tier: 'red',    why: 'Bad all around.' },
    },
    skills: {
      Arcana:       { tier: 'blue',   why: 'One of the most important knowledge skills. Take it.' },
      Deception:    { tier: 'blue',   why: 'Core Face skill. Charisma-based and excellent.' },
      Intimidation: { tier: 'green',  why: 'Important Face skill.' },
      History:      { tier: 'green',  why: 'Good knowledge skill.' },
      Investigation: { tier: 'green', why: 'Helpful but you probably don\'t have enough Intelligence or skill choices to justify it.' },
      Religion:     { tier: 'orange', why: 'One of the most important knowledge skills but you may not have room for it.' },
      Nature:       { tier: 'orange', why: 'Good knowledge skill but Intelligence-based.' },
    },
    subclasses: {
      'Fiend Patron':       { tier: 'blue',   vibe: 'Dark pact for power — fire, luck, and hellish resilience', why: 'Dark One\'s Blessing provides Temporary Hit Points on kill — stacks beautifully with Armor of Agathys. Fiend spell list adds AOE options Warlocks normally lack (Fireball, Stinking Cloud, Wall of Fire). Dark One\'s Own Luck adds average 5.5 to an ability check or save before rolling. Fiendish Resilience gives adaptable damage resistance. Hurl Through Hell is a powerful once-per-rest nuke.' },
      'Great Old One Patron': { tier: 'green', vibe: 'Mind-bending patron — psychic power and mental dominance', why: 'Good generalist with a strong mix of control and utility. Psychic Spells include Phantasmal Force and Hunger of Hadar. Clairvoyant Combatant grants Advantage on attacks against one creature. Eldritch Hex imposes Disadvantage on saving throws. Create Thrall converts Summon Aberration to a permanent no-Concentration thrall.' },
      'Celestial Patron':   { tier: 'green',  vibe: 'Holy power — healing Warlock with radiant strikes', why: 'Healing Light provides emergency healing without spell slots — essentially free Healing Word. Radiant Soul adds Charisma to Radiant/Fire damage (including Sacred Flame and Eldritch Blast). Celestial Resilience gives your whole party THP every Short/Long Rest. Searing Vengeance lets you stand up for free and blast nearby enemies when making a death save.' },
      'Archfey Patron':     { tier: 'orange', vibe: 'Fey teleportation — Misty Step with flair', why: 'Built around free castings of Misty Step with rider effects (THP via Refreshing Step or Disadvantage via Taunting Step). Misty Escape uses Misty Step as a Reaction. Bewitching Magic eventually lets you cast a Bonus Action spell on the same turn as a leveled spell. Severely resource-constrained — you\'ll run dry quickly.' },
    },
  },

  // ─── WIZARD ───────────────────────────────────────────────
  wizard: {
    species: {
      Gnome:      { tier: 'blue',   why: 'Gnomish Cunning gives Advantage on all Intelligence, Wisdom, and Charisma saves against magic — extraordinary for a Wizard who relies on Concentration. Darkvision and useful cantrips complete the package.' },
      Elf:        { tier: 'blue',   why: 'Darkvision, extra skill, and innate spellcasting that complements your limited known spells. High Elf gets a second Cantrip from the Wizard list.' },
      Aasimar:    { tier: 'green',  why: 'Two damage resistances and Celestial Revelation. Heavenly Wings provides non-Concentration flight once per day.' },
      Human:      { tier: 'green',  why: 'Extra feat and skill. Grab Alert for acting before enemies or Lucky as a safe default.' },
      Tiefling:   { tier: 'green',  why: 'Darkvision, resistance, and innate spellcasting. Spells are already on your list so the main value is the passive benefits.' },
      Halfling:   { tier: 'green',  why: 'Lucky and Brave are both helpful. Nimbleness helps escape dangerous melee positions.' },
      Orc:        { tier: 'green',  why: 'Adrenaline Rush helps escape melee. Relentless Endurance is excellent insurance for a d6 hit die class.' },
      Dwarf:      { tier: 'orange', why: 'Darkvision and resistance are fine but durability is largely wasted on a back-row caster.' },
      Dragonborn: { tier: 'orange', why: 'Darkvision, resistance, and once-per-day flight. Fine but not specifically strong for Wizard.' },
      Goliath:    { tier: 'orange', why: 'Cloud Jaunt is great non-spell teleportation. Stone\'s Endurance helps the fragile Wizard.' },
    },
    backgrounds: {
      'Mulhorandi Tomb Raider': { tier: 'blue',   why: 'Perfect ability scores (Int + Dex), Lucky, and two Intelligence-based skills. RPGBOT\'s top Wizard pick.' },
      Sage:                     { tier: 'blue',   why: 'Excellent ability scores, perfect skills (Arcana + History), and Magic Initiate (Wizard) expands your spellbook.' },
      Inquisitive:              { tier: 'green',  why: 'Good ability scores (Int + Dex), decent skills, and Alert. Works on any Wizard build.' },
      Criminal:                 { tier: 'green',  why: 'Excellent ability scores (Int + Dex) and Alert is great for full casters who want to act first.' },
      Scribe:                   { tier: 'green',  why: 'Good ability scores, Skilled, and decent skills. Flexible and broadly useful.' },
      Archaeologist:            { tier: 'green',  why: 'Easy go-to if you want more skill coverage. Same value as Scribe with different skills.' },
      'Spellfire Initiate':     { tier: 'green',  why: 'Good ability scores, decent feat, and good skills.' },
      'Dragon Cultist':         { tier: 'orange', why: 'Perfect ability scores (Int + Dex/Con) but the feat wants Wisdom and skills aren\'t ideal.' },
      Guard:                    { tier: 'orange', why: 'Int + Wis can work. Alert is great for full casters. Skills aren\'t exciting.' },
      Merchant:                 { tier: 'orange', why: 'Good ability scores and Lucky. Skills are a bad match for Wizard.' },
      Noble:                    { tier: 'orange', why: 'Int increase, Skilled, and one Intelligence skill. Not bad but better options exist.' },
      Acolyte:                  { tier: 'orange', why: 'Gets Int increase and Magic Initiate (Cleric) for Healing Word. Skills are better from Sage.' },
      Artisan:                  { tier: 'orange', why: 'Int + Dex is fine. Crafter is weak but the stats are right.' },
      Hermit:                   { tier: 'red',    why: 'Bad all around for Wizard.' },
      Farmer:                   { tier: 'red',    why: 'Bad ability scores and skills.' },
      Entertainer:              { tier: 'red',    why: 'Bad ability scores and terrible skills.' },
      Sailor:                   { tier: 'red',    why: 'Bad all around.' },
    },
    skills: {
      Arcana:       { tier: 'blue',   why: 'Wizards are all about Arcana. Take it.' },
      Investigation: { tier: 'blue',  why: 'Intelligence-based and you\'re much better at it than most. Crucial for Scouts.' },
      History:      { tier: 'green',  why: 'Good knowledge skill. Especially valuable in history-heavy campaigns.' },
      Insight:      { tier: 'green',  why: 'You probably don\'t have enough Wisdom but it can be helpful if your party\'s Face doesn\'t have it.' },
      Nature:       { tier: 'orange', why: 'Good knowledge skill. Intelligence-based.' },
      Religion:     { tier: 'orange', why: 'One of the most important knowledge skills.' },
      Medicine:     { tier: 'red',    why: 'Useless. Medicine is best done magically.' },
    },
    subclasses: {
      Diviner:      { tier: 'blue',   vibe: 'See the future — Portent dice control fate itself', why: 'Portent lets you pre-roll two dice and substitute them for any d20 roll in the game — friend or foe. Expert Divination recovers spell slots when you cast divinations. The Third Eye adds ongoing utility like See Invisibility at will. Greater Portent adds a third Portent die. Mastering Portent\'s tactical use defines encounters.' },
      Evoker:       { tier: 'blue',   vibe: 'Fireball specialist — maximum damage, minimal fuss', why: 'Sculpt Spells lets allies safely stand inside your Fireballs and Spirit Guardians without taking damage. Potent Cantrip ensures you always deal half damage even on saves. Empowered Evocation adds Intelligence to one damage roll per spell — significant scaling. Overchannel maximizes damage on low-level spells at cost of HP.' },
      Abjurer:      { tier: 'green',  vibe: 'Magical ward absorbs hits for you and your allies', why: 'Arcane Ward creates a pool of extra HP that absorbs damage before your real HP. Scales with Abjuration spells. Projected Ward shares the ward\'s protection with adjacent allies. Spell Breaker lets you counter/dispel as a Bonus Action and never waste spell slots if you fail. Purely reactive playstyle.' },
      Illusionist:  { tier: 'green',  vibe: 'Illusions made real — fool anyone, shape everything', why: 'Improved Illusions adds both sound AND visual effects to Minor Illusion, with Bonus Action casting. Phantasmal Creatures provides two free summons per day without Concentration at half HP. Illusory Self blocks one attack per Short/Long Rest. Illusory Reality briefly makes one element of your illusion spell physically real.' },
      Bladesinger:  { tier: 'green',  vibe: 'Spell-sword — the most mobile and evasive Wizard', why: 'Bladesong adds Intelligence to AC, Concentration saves, and Acrobatics checks while increasing movement speed. Extra Attack lets you replace one attack with a Cantrip like Booming Blade. Song of Defense spends spell slots to reduce damage. Achieves the highest AC in the game via stacking. Best used defensively — your spell list is still your biggest weapon.' },
    },
  },

};

// Overall class tier — NOT from RPGBOT (they don't rate classes overall)
// Removed to avoid false attribution. Tier borders only appear on options within classes.

const TIER_COLORS = { blue: '#4a9eff', green: '#4caf50', orange: '#ff9800', red: '#ef5350' };
const TIER_LETTER = { blue: 'S', green: 'A', orange: 'B', red: 'C' };

export function getRating(className, section, optionName){
  const classData = RATINGS[className?.toLowerCase()];
  if(!classData) return null;
  const sectionData = classData[section];
  if(!sectionData) return null;
  const entry = sectionData[optionName];
  if(!entry) return null;
  // Support both legacy string format and new object format
  return typeof entry === 'string' ? entry : entry.tier;
}

export function getRatingNote(className, section, optionName){
  const classData = RATINGS[className?.toLowerCase()];
  if(!classData) return null;
  const sectionData = classData[section];
  if(!sectionData) return null;
  const entry = sectionData[optionName];
  if(!entry || typeof entry === 'string') return null;
  return entry.why || entry.vibe || null;
}

export function getSubclassVibe(className, subclassName){
  const entry = RATINGS[className?.toLowerCase()]?.subclasses?.[subclassName];
  if(!entry || typeof entry === 'string') return null;
  return entry.vibe || null;
}

// Sets data-tier attribute on an element
export function applyTier(el, rating){
  if(rating && TIER_COLORS[rating]){
    el.dataset.tier = TIER_LETTER[rating];
  } else {
    delete el.dataset.tier;
  }
}

// Returns the tier legend HTML row
export function tierLegendHTML(){
  return `<div class="tier-legend">
    <span class="tier-swatch" style="border-color:${TIER_COLORS.blue}">S</span>
    <span class="tier-swatch" style="border-color:${TIER_COLORS.green}">A</span>
    <span class="tier-swatch" style="border-color:${TIER_COLORS.orange}">B</span>
    <span class="tier-swatch" style="border-color:${TIER_COLORS.red}">C</span>
    <span class="tier-legend-label">Ranked by RPGBOT — tap ⓘ for details</span>
  </div>`;
}
