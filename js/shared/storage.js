const PREFIX = 'oneshot_';

export const getRuleset  = ()        => localStorage.getItem(PREFIX+'ruleset');
export const setRuleset  = edition   => localStorage.setItem(PREFIX+'ruleset', edition);
export const clearChar   = ()        => localStorage.removeItem(PREFIX+'character');
export const saveChar    = char      => localStorage.setItem(PREFIX+'character', JSON.stringify(char));
