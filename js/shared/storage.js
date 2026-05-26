const PREFIX = 'oneshot_';

export const SCHEMA_VERSION = 2;

export const DEFAULT_CAMPAIGN_STATE = {
  _schemaVersion: SCHEMA_VERSION,
  adventureId: 'pabtso',
  chapter: 1,
  currentChapter: 1,
  areaId: null,
  currentArea: null,
  questFlags: {},
  visitedAreas: [],
  playerLevel: 1,
  willhp: 14,
  seamushp: 12,
  kraghp: 15,
  kraghorExhaustion: false,
  sildarMet: false,
  conversationHistory: [],
  round: 0,
  inCombat: false,
  enemies: [],
};

export const DEFAULT_CHARACTER_STATE = {
  _schemaVersion: SCHEMA_VERSION,
  name: '',
  backstory: '',
  race: '',
  cls: '',
  base: { STR:10, DEX:10, CON:10, INT:10, WIS:10, CHA:10 },
  final: { STR:10, DEX:10, CON:10, INT:10, WIS:10, CHA:10 },
  hp: 0,
  maxHp: 0,
  ac: 10,
  speed: 30,
  profBonus: 2,
  saves: [],
  skills: [],
  languages: ['Common'],
  sp: false,
  cantrips: [],
  spells: [],
  slots: 0,
  maxSlots: 0,
  equip: '',
  hitDie: 8,
  vibeTagline: '',
  whyThisWorks: '',
  fromSendIt: false,
};

// Fills any key present in defaults but missing from saved. Never removes existing keys.
function migrateState(saved, defaults) {
  if (!saved || typeof saved !== 'object') return { ...defaults };
  const savedVersion = saved._schemaVersion ?? 0;
  if (savedVersion === SCHEMA_VERSION) return saved;
  const migrated = { ...saved };
  for (const [key, val] of Object.entries(defaults)) {
    if (!(key in migrated)) migrated[key] = val;
  }
  migrated._schemaVersion = SCHEMA_VERSION;
  return migrated;
}

const PREFIX_KEY = k => PREFIX + k;

// Optional Firebase sync hook — set by auth.js after sign-in.
// Called with (fullKey, rawValue) on every save. Fire-and-forget; failures are silent.
let _saveHook = null;
export function registerSaveHook(fn) { _saveHook = fn; }

const save = (k, v) => {
  localStorage.setItem(PREFIX_KEY(k), JSON.stringify(v));
  if (_saveHook) _saveHook(PREFIX_KEY(k), v);
};
const load = (k, fallback) => { try { return JSON.parse(localStorage.getItem(PREFIX_KEY(k)) ?? 'null') ?? fallback; } catch { return fallback; } };

// ── Character ──────────────────────────────────────────────────────────────────
export const clearChar       = ()    => localStorage.removeItem(PREFIX_KEY('character'));
export const saveCharacter   = char  => save('character', char);
export const getCharacter    = ()    => {
  const raw = load('character', null);
  if (!raw) return null;
  const migrated = migrateState(raw, DEFAULT_CHARACTER_STATE);
  if ((migrated._schemaVersion ?? 0) !== (raw._schemaVersion ?? 0)) save('character', migrated);
  return migrated;
};

// ── Campaign state ─────────────────────────────────────────────────────────────
export const saveCampaignState = state => save('campaign_state', state);
export const getCampaignState  = ()    => {
  const raw = load('campaign_state', null);
  if (!raw) return { ...DEFAULT_CAMPAIGN_STATE };
  const migrated = migrateState(raw, DEFAULT_CAMPAIGN_STATE);
  if ((migrated._schemaVersion ?? 0) !== (raw._schemaVersion ?? 0)) save('campaign_state', migrated);
  return migrated;
};

// ── Campaign active flag ───────────────────────────────────────────────────────
export const setCampaignActive = val => localStorage.setItem(PREFIX_KEY('campaign_active'), String(val));
export const getCampaignActive = ()  => localStorage.getItem(PREFIX_KEY('campaign_active')) === 'true';

// ── Respec state ───────────────────────────────────────────────────────────────
export const saveRespecState = state => save('respec_state', state);
export const getRespecState  = ()    => load('respec_state', null);
export const clearRespecState = ()   => localStorage.removeItem(PREFIX_KEY('respec_state'));

// ── Languages ─────────────────────────────────────────────────────────────────
export const saveLanguages = langs => save('languages', langs);
export const getLanguages  = ()    => load('languages', []);

// ── Background ────────────────────────────────────────────────────────────────
export const saveBackground = bg => save('background', bg);
export const getBackground  = ()  => load('background', null);

// ── Legacy aliases ─────────────────────────────────────────────────────────────
export const saveChar      = saveCharacter;
export const getPowerGamer = () => localStorage.getItem(PREFIX_KEY('powergamer')) === 'true';
export const setPowerGamer = val => localStorage.setItem(PREFIX_KEY('powergamer'), String(val));
