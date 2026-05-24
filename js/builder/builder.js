import { G } from '../shared/state.js';
import { getPowerGamer, setPowerGamer } from '../shared/storage.js';

let curStep = 1;

export function goStep(n){
  document.getElementById('step'+curStep).classList.add('hidden');
  document.getElementById('step'+n).classList.remove('hidden');
  curStep=n;
  renderDots();
}

export function renderDots(){
  const c=document.getElementById('step-dots');
  c.innerHTML='';
  for(let i=1;i<=8;i++){
    const d=document.createElement('div');
    d.className='dot'+(i===curStep?' active':i<curStep?' done':'');
    c.appendChild(d);
  }
}

export function pgBadge(color){
  const s=document.createElement('span');
  s.className='pg-badge pg-'+(color||'neutral');
  return s;
}

export function initPowerGamer(){
  if(getPowerGamer()){
    document.body.classList.add('powergamer-on');
    document.getElementById('pg-toggle').classList.add('active');
  }
}

export function togglePowerGamer(){
  const on=document.body.classList.toggle('powergamer-on');
  setPowerGamer(on);
  document.getElementById('pg-toggle').classList.toggle('active',on);
}
