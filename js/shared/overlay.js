export function toast(msg, dur=3000){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),dur);
}

export function closeOvl(id){ document.getElementById(id).classList.add('hidden'); }
