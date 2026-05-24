import { G } from '../shared/state.js';
import { goStep } from './builder.js';
import { toast } from '../shared/overlay.js';
import { buildRaceGrid } from './step-species.js';

export function step1Next(){
  const name=document.getElementById('char-name').value.trim();
  if(!name){toast('Enter your character\'s name.');return;}
  G.char.name=name;
  G.char.backstory=document.getElementById('char-backstory').value.trim();
  goStep(2);
  buildRaceGrid();
}
