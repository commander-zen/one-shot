import { G } from '../shared/state.js';

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
