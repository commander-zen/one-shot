import { G } from '../shared/state.js';

export function updateSlots(){
  const c=G.char;
  const row=document.getElementById('slots-row');
  row.innerHTML='';
  for(let i=0;i<c.maxSlots;i++){
    const pip=document.createElement('div');
    pip.className='slot-pip'+(i<c.slots?'':' empty');
    row.appendChild(pip);
  }
}

export function processMechEvents(events){
  events.forEach(ev=>{
    if(ev.type==='hp_change'){
      G.char.hp=Math.max(0,Math.min(G.char.maxHp,G.char.hp+(ev.amount||0)));
      document.getElementById('hp-cur').textContent=G.char.hp;
    } else if(ev.type==='slot_used'){
      G.char.slots=Math.max(0,G.char.slots-1);
      if(G.char.sp) updateSlots();
    }
  });
}

export function setActionsDisabled(dis){
  document.querySelectorAll('.act-btn').forEach(b=>b.disabled=dis);
}
