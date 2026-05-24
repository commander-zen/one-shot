import { goStep } from './builder.js';
import { buildRaceGrid } from './step-species.js';

export function buildBackground(){
  // stub — background selection not yet implemented
}

export function step3Next(){
  goStep(4);
  buildRaceGrid();
}
