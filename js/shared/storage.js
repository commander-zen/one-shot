const PREFIX = 'oneshot_';

export const clearChar     = ()    => localStorage.removeItem(PREFIX+'character');
export const saveChar      = char  => localStorage.setItem(PREFIX+'character', JSON.stringify(char));
export const getPowerGamer   = ()    => localStorage.getItem(PREFIX+'powergamer') === 'true';
export const setPowerGamer   = val   => localStorage.setItem(PREFIX+'powergamer', String(val));
export const saveLanguages   = langs => localStorage.setItem(PREFIX+'languages', JSON.stringify(langs));
export const getLanguages    = ()    => JSON.parse(localStorage.getItem(PREFIX+'languages')||'[]');
export const saveBackground  = bg   => localStorage.setItem(PREFIX+'background', JSON.stringify(bg));
export const getBackground   = ()   => JSON.parse(localStorage.getItem(PREFIX+'background')||'null');
