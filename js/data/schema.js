import { DATA_CACHE } from './loader.js';
import { RACES, CLASSES } from '../shared/state.js';

export const XPHB_SPECIES = ['Aasimar','Dragonborn','Dwarf','Elf','Gnome','Goliath','Halfling','Human','Orc','Tiefling'];

export function getActiveRaces(){
  const cached=DATA_CACHE['5.5e'];
  if(!cached?.races?.race) return RACES;
  const STAT_MAP={str:'STR',dex:'DEX',con:'CON',int:'INT',wis:'WIS',cha:'CHA'};
  const entries=cached.races.race.filter(r=>XPHB_SPECIES.includes(r.name));
  if(entries.length<5){
    console.warn('getActiveRaces: expected 10 XPHB species, got', entries.length);
    return RACES;
  }
  const result={};
  entries.forEach(r=>{
    const bonuses={};
    const speed=typeof r.speed==='number'?r.speed:(r.speed?.walk||30);
    if(r.ability?.length){
      Object.entries(r.ability[0]).forEach(([k,v])=>{
        if(STAT_MAP[k]&&typeof v==='number') bonuses[STAT_MAP[k]]=v;
      });
    }
    const bonusStr=Object.entries(bonuses).map(([s,v])=>`+${v} ${s}`).join(', ')||'Flexible ASI';
    result[r.name]={bonuses,speed,desc:bonusStr};
  });
  return result;
}

export function getActiveClasses(){
  const cached=DATA_CACHE['5.5e'];
  if(!cached?.classes) return CLASSES;
  const STAT_MAP={str:'STR',dex:'DEX',con:'CON',int:'INT',wis:'WIS',cha:'CHA'};
  const result={};
  Object.entries(CLASSES).forEach(([name,fb])=>{
    const clsData=cached.classes[name.toLowerCase()]?.class?.[0];
    if(!clsData){result[name]=fb;return;}
    const hitDie=clsData.hd?.faces||fb.hitDie;
    const saves=(clsData.proficiency||[]).map(s=>STAT_MAP[s]||s.toUpperCase()).filter(s=>s);
    let skills=fb.skills,sc=fb.sc;
    const pick=clsData.startingProficiencies?.skills?.[0];
    if(pick?.choose){
      sc=pick.choose.count||sc;
      skills=(pick.choose.from||[]).map(s=>s.charAt(0).toUpperCase()+s.slice(1).replace(/_/g,' '));
    }
    result[name]={...fb,hitDie,saves:saves.length?saves:fb.saves,skills,sc};
  });
  return Object.keys(result).length?result:CLASSES;
}

export function applyRacialBonuses(base, race){
  const b=getActiveRaces()[race]?.bonuses||{};
  const f={...base};
  const STATS=['STR','DEX','CON','INT','WIS','CHA'];
  STATS.forEach(s=>{ f[s]=(base[s]||10)+(b[s]||0); });
  return f;
}

export function inClass(spell, className){
  const name=className.toLowerCase();
  const primary=(spell.classes?.fromClassList||[]).map(c=>c.name.toLowerCase());
  const variant=(spell.classes?.fromClassListVariant||[]).map(c=>c.name.toLowerCase());
  const all=[...new Set([...primary,...variant])];
  return all.includes(name);
}

export const SCHOOL_NAMES={A:'Abjuration',C:'Conjuration',D:'Divination',E:'Enchantment',I:'Illusion',N:'Necromancy',T:'Transmutation',V:'Evocation'};

export function spellMeta(sp){
  const school=SCHOOL_NAMES[sp.school]||sp.school||'';
  let time='';
  if(sp.time?.length){const t=sp.time[0];time=`${t.number} ${t.unit}`;}
  let range='';
  const r=sp.range;
  if(r){
    if(r.type==='point'){
      const d=r.distance;
      if(d?.type==='feet') range=`${d.amount} ft.`;
      else if(d?.type) range=d.type.charAt(0).toUpperCase()+d.type.slice(1);
    } else { range=r.type.charAt(0).toUpperCase()+r.type.slice(1); }
  }
  return [school,time,range].filter(Boolean).join(' · ');
}

export function spellDesc(sp){
  const entries=sp.entries||[];
  const first=entries.find(e=>typeof e==='string')||'';
  const clean=first.replace(/\{@\w+\s+([^}]+)\}/g,'$1').replace(/\{@\w+\}/g,'');
  const dot=clean.indexOf('.');
  return dot>-1?clean.slice(0,dot+1):clean.slice(0,120);
}
