# SESSION STATE — one-shot (horrid-wake commander-zen)

## Completed
- ✅ 2026-05-21: Fixed ability score assignment validation to track by roll index instead of numeric value. Duplicate rolled values (e.g. two 14s) now assign correctly to separate stats. Changes in `index.html`: `buildStatAssign` uses `idx-N` as option values, `refreshMods` reads numeric value from option text, `step4Next` validates by index and parses value from option text.
- ✅ 2026-05-22: Added Phase 0 ruleset toggle (5e / 5.5e) before character builder. Parallel fetch for races, 12 class files, 3 spell files; cached in DATA_CACHE.
- ✅ 2026-05-22: Wired spell step to live 5etools data. Merges PHB/XGE/TCE, filters level 0/1 by class, deduped + sorted alpha. Each spell shows school, cast time, range, first sentence. Falls back to hardcoded on cache miss. Stores selection in `localStorage('oneshot_ruleset')`, switching clears character data. Fetches races.json, 12 class files, 3 spell files in parallel via Promise.all; results cached in `DATA_CACHE` keyed by edition. Phase 1 hidden until fetch resolves. Builder steps still use hardcoded fallback data — wiring live data is next.

## Known Issues
- Race and class builder steps still use hardcoded RACES/CLASSES objects — DATA_CACHE has race/class data but it's not wired yet.
- Spell class filter uses `fromClassList` only; some 5etools spells use `fromClassListVariant` (subclass-only spells) and won't appear.

## Cold Start Prompt
Next unresolved: Wire DATA_CACHE race/class data into the race and class builder steps.
