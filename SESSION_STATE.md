# SESSION STATE — one-shot (horrid-wake commander-zen)

## Completed
- ✅ 2026-05-21: Fixed ability score assignment validation to track by roll index instead of numeric value. Duplicate rolled values (e.g. two 14s) now assign correctly to separate stats. Changes in `index.html`: `buildStatAssign` uses `idx-N` as option values, `refreshMods` reads numeric value from option text, `step4Next` validates by index and parses value from option text.
- ✅ 2026-05-22: Added Phase 0 ruleset toggle (5e / 5.5e) before character builder. Parallel fetch for races, 12 class files, 3 spell files; cached in DATA_CACHE.
- ✅ 2026-05-22: Wired spell step to live 5etools data.
- ✅ 2026-05-24: Wired race and class builder steps to DATA_CACHE via `getActiveRaces()` / `getActiveClasses()` helpers. Falls back to hardcoded RACES/CLASSES on cache miss. Hit die, saves, and skill list/count pulled live from class JSON; race bonuses and speed pulled live from races.json.
- ✅ 2026-05-24: Fixed spell class filter — extracted `inClass(spell, className)` that merges `fromClassList` and `fromClassListVariant` before checking, so subclass-origin spells now appear correctly.
- ✅ 2026-05-24: Refactored index.html into modular file structure. index.html is now a shell only. CSS split into css/{base,layout,components,builder,play}.css. JS split into 17 ES modules across js/shared/, js/data/, js/builder/, js/play/, and js/main.js. All localStorage centralized in storage.js, all fetch in loader.js, all overlays in overlay.js. Window globals wired in main.js for onclick compatibility.
- ✅ 2026-05-24: Fixed species list to show exactly 10 entries. Replaced source-based filter (was silently failing) with `XPHB_SPECIES` name allowlist in `getActiveRaces()`. Exported `XPHB_SPECIES` constant from schema.js as single source of truth.
- ✅ 2026-05-24: Removed ruleset toggle entirely. App is hardcoded to 5.5e (2024 rules). Phase 0 picker screen deleted from index.html and CSS. loader.js now exports `initApp()` instead of `chooseRuleset`/`initRuleset`. BASE_URL hardcoded to 5etools-src/main. storage.js no longer stores ruleset key. schema.js reads `DATA_CACHE['5.5e']` directly.

- ✅ 2026-05-24: Added Power Gamer mode — ⚡ toggle in builder header, persisted in localStorage. Adds `.powergamer-on` to body. Rating badges (10×10 colored dots) appear top-right of species cards, skill chips, and stat boxes when active. Ratings data in `js/data/ratings.js` with Barbarian and Artificer fully rated; all other classes return null → neutral badge. `pgBadge()` helper in `builder.js`, `getRating()` in `ratings.js`.

- ✅ 2026-05-24: Reordered builder steps to match 2024 PHB order: 1-Name, 2-Class, 3-Background, 4-Species, 5-Scores, 6-Languages, 7-Spells, 8-Review. Progress dots updated to 8. Import chain re-threaded: each step imports the next step's build function. step-languages.js created new — shows locked Common chip + 9 selectable standard languages, requires 2 selections, saves to oneshot_languages in localStorage. step-background.js updated from stub to pass-through (full implementation deferred). All stepXNext functions renamed and goStep targets updated throughout.
- ✅ 2026-05-24: Applied XPHB_CLASSES name allowlist to class step. `XPHB_CLASSES` exported from loader.js, added 'artificer' to CLASS_FILES fetch list. `getActiveClasses()` now iterates XPHB_CLASSES instead of hardcoded CLASSES object; falls back to CLASSES[name] for equip/sp/ac fields, uses DEFAULT_FB sentinel for Artificer (not in CLASSES). Class grid now shows all 13 2024-legal classes from live 5etools data.

## Known Issues
- 5.5e races use flexible ASI (no fixed bonuses) — racial bonuses are empty for 5.5e races; `applyRacialBonuses` correctly applies nothing.
- Class spellcasting fields (cantrips count, slots, pick, ac type, equip) remain hardcoded in CLASSES — only hitDie, saves, and skill list/count are pulled live. Artificer uses DEFAULT_FB fallback for these fields (equip shows "Basic adventuring gear").

- ✅ 2026-05-24: Populated ratings.js with all 10 remaining class entries (Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard). All five sections rated per class: species (10 entries), abilityScores (6), skills (class-accessible only), backgrounds (empty placeholder), subclasses (empty placeholder). getRating now returns non-null for all 13 classes.

- ✅ 2026-05-24: Implemented background step (step 3) fully. Fetches backgrounds.json from 5etools, filters to 16 XPHB_BACKGROUNDS by name allowlist (exported from loader.js). getActiveBackgrounds() in schema.js extracts skills (from skillProficiencies[0]) and origin feat (from feats[0] key, strips source suffix and title-cases). Cards show name, 2 skills, feat name. Power Gamer badges use getRating(cls,'backgrounds',name). Selection saves to oneshot_background via storage.js saveBackground(). G.char gains background/bgSkills/bgFeat fields at selection time.

## Cold Start Prompt
Next unresolved: Add Artificer equip/sp/slots/cantrips/pick to CLASSES in state.js so its class card and review display correctly. Then: show background in the review step (step-review.js).
