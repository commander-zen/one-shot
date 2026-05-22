# SESSION STATE — one-shot (horrid-wake commander-zen)

## Completed
- ✅ 2026-05-21: Fixed ability score assignment validation to track by roll index instead of numeric value. Duplicate rolled values (e.g. two 14s) now assign correctly to separate stats. Changes in `index.html`: `buildStatAssign` uses `idx-N` as option values, `refreshMods` reads numeric value from option text, `step4Next` validates by index and parses value from option text.
- ✅ 2026-05-22: Added Phase 0 ruleset toggle (5e / 5.5e) before character builder. Stores selection in `localStorage('oneshot_ruleset')`, switching clears character data. Fetches races.json, 12 class files, 3 spell files in parallel via Promise.all; results cached in `DATA_CACHE` keyed by edition. Phase 1 hidden until fetch resolves. Builder steps still use hardcoded fallback data — wiring live data is next.

## Known Issues
- DATA_CACHE is populated but character builder steps still use hardcoded RACES/CLASSES/SPELLS — wiring live data into each step is next.

## Cold Start Prompt
Next unresolved: Wire DATA_CACHE into race/class/spell steps so fetched 5etools data is actually used in the builder UI.
