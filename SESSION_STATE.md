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

## Known Issues
- 5.5e races use flexible ASI (no fixed bonuses) — racial bonuses are empty for 5.5e races; `applyRacialBonuses` correctly applies nothing.
- Class spellcasting fields (cantrips count, slots, pick, ac type, equip) remain hardcoded in CLASSES — only hitDie, saves, and skill list/count are pulled live.

## Cold Start Prompt
Next unresolved: Browser smoke-test the modular structure (UI testing not possible in CLI). Then: add background step, or start play phase / AI DM integration.
