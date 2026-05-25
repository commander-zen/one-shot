export function toast(msg, dur=3000){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),dur);
}

export function closeOvl(id){ document.getElementById(id).classList.add('hidden'); }

export function openInfoOverlay(name, mechText, url){
  document.getElementById('info-ovl-name').textContent=name;
  document.getElementById('info-ovl-mech').textContent=mechText;
  document.getElementById('info-ovl-link').href=url;
  document.getElementById('info-overlay').classList.remove('hidden');
}
