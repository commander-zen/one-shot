# SESSION STATE — one-shot (horrid-wake commander-zen)

## Completed
- ✅ 2026-05-21: Fixed ability score assignment validation to track by roll index instead of numeric value. Duplicate rolled values (e.g. two 14s) now assign correctly to separate stats. Changes in `index.html`: `buildStatAssign` uses `idx-N` as option values, `refreshMods` reads numeric value from option text, `step4Next` validates by index and parses value from option text.
- ✅ 2026-05-22: Added Phase 0 ruleset toggle (5e / 5.5e) before character builder. Parallel fetch for races, 12 class files, 3 spell files; cached in DATA_CACHE.
- ✅ 2026-05-22: Wired spell step to live 5etools data.
- ✅ 2026-05-24: Wired race and class builder steps to DATA_CACHE via `getActiveRaces()` / `getActiveClasses()` helpers. Falls back to hardcoded RACES/CLASSES on cache miss. Hit die, saves, and skill list/count pulled live from class JSON; race bonuses and speed pulled live from races.json.
- ✅ 2026-05-24: Fixed spell class filter — extracted `inClass(spell, className)` that merges `fromClassList` and `fromClassListVariant` before checking, so subclass-origin spells now appear correctly. Merges PHB/XGE/TCE, filters level 0/1 by class, deduped + sorted alpha. Each spell shows school, cast time, range, first sentence. Falls back to hardcoded on cache miss. Stores selection in `localStorage('oneshot_ruleset')`, switching clears character data. Fetches races.json, 12 class files, 3 spell files in parallel via Promise.all; results cached in `DATA_CACHE` keyed by edition. Phase 1 hidden until fetch resolves. Builder steps still use hardcoded fallback data — wiring live data is next.

## Known Issues
- 5.5e races use flexible ASI (no fixed bonuses) — racial bonuses are empty for 5.5e races; `applyRacialBonuses` correctly applies nothing.
- Class spellcasting fields (cantrips count, slots, pick, ac type, equip) remain hardcoded in CLASSES — only hitDie, saves, and skill list/count are pulled live.

## Cold Start Prompt
Next unresolved: No critical blocking issues. Optional: wire `fromClassListVariant` spells, or start wiring play phase / AI DM integration.
