export const d = n => Math.floor(Math.random()*n)+1;
export const mod = s => Math.floor((s-10)/2);
export const modStr = s => { const m=mod(s); return (m>=0?'+':'')+m; };

export function roll4d6(){
  const r=[d(6),d(6),d(6),d(6)];
  r.sort((a,b)=>b-a);
  return {total:r[0]+r[1]+r[2], rolls:r};
}

export function calcAC(cls,scores){
  const dex=mod(scores.DEX);
  if(cls==='Barbarian') return 10+dex+mod(scores.CON);
  if(cls==='Monk')      return 10+dex+mod(scores.WIS);
  if(cls==='Sorcerer'||cls==='Wizard') return 10+dex;
  if(cls==='Cleric'||cls==='Paladin'||cls==='Fighter') return 16;
  return 11+dex;
}
