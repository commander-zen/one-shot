const PREFIX = 'oneshot_';

export const clearChar     = ()    => localStorage.removeItem(PREFIX+'character');
export const saveChar      = char  => localStorage.setItem(PREFIX+'character', JSON.stringify(char));
export const getPowerGamer   = ()    => localStorage.getItem(PREFIX+'powergamer') === 'true';
export const setPowerGamer   = val   => localStorage.setItem(PREFIX+'powergamer', String(val));
export const saveLanguages   = langs => localStorage.setItem(PREFIX+'languages', JSON.stringify(langs));
export const getLanguages    = ()    => JSON.parse(localStorage.getItem(PREFIX+'languages')||'[]');
export const saveBackground    = bg    => localStorage.setItem(PREFIX+'background', JSON.stringify(bg));
export const getBackground     = ()    => JSON.parse(localStorage.getItem(PREFIX+'background')||'null');
export const saveCharacter     = char  => localStorage.setItem(PREFIX+'character', JSON.stringify(char));
export const getCharacter      = ()    => JSON.parse(localStorage.getItem(PREFIX+'character')||'null');
export const saveCampaignState = state => localStorage.setItem(PREFIX+'campaign_state', JSON.stringify(state));
export const getCampaignState  = ()    => JSON.parse(localStorage.getItem(PREFIX+'campaign_state')||'null');
export const setCampaignActive = val   => localStorage.setItem(PREFIX+'campaign_active', String(val));
export const getCampaignActive = ()    => localStorage.getItem(PREFIX+'campaign_active')==='true';
export const saveRespecState   = state => localStorage.setItem(PREFIX+'respec_state', JSON.stringify(state));
export const getRespecState    = ()    => JSON.parse(localStorage.getItem(PREFIX+'respec_state')||'null');
export const clearRespecState  = ()    => localStorage.removeItem(PREFIX+'respec_state');
