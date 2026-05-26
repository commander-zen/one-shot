// Returns a Promise<string|null>. Resolves with the entered email or null if cancelled.
export function promptEmail(msg) {
  return new Promise(resolve => {
    const el = document.createElement('div');
    el.className = 'overlay';
    el.style.cssText = 'z-index:400;align-items:center';
    el.innerHTML = `
      <div class="ovl-box" style="max-width:360px;width:100%;text-align:center">
        <p style="color:var(--dim);font-size:.88rem;margin-bottom:16px;font-family:'Noto Serif',serif">${msg}</p>
        <div class="field" style="text-align:left">
          <label for="_prompt-email">Email</label>
          <input type="email" id="_prompt-email" placeholder="your@email.com" autocomplete="email">
        </div>
        <button class="btn btn-pri btn-full" id="_prompt-submit">Confirm Sign-In</button>
        <button class="btn btn-full" id="_prompt-cancel" style="margin-top:8px">Cancel</button>
      </div>`;
    document.body.appendChild(el);

    const cleanup = val => { document.body.removeChild(el); resolve(val); };

    el.querySelector('#_prompt-submit').addEventListener('click', () => {
      const v = el.querySelector('#_prompt-email').value.trim();
      if (v && v.includes('@')) cleanup(v);
    });
    el.querySelector('#_prompt-cancel').addEventListener('click', () => cleanup(null));
    el.querySelector('#_prompt-email').addEventListener('keydown', e => {
      if (e.key === 'Enter') el.querySelector('#_prompt-submit').click();
    });
  });
}

export function toast(msg, dur=3000){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),dur);
}

export function closeOvl(id){ document.getElementById(id).classList.add('hidden'); }

export function openInfoOverlay(name, bodyHtml, url){
  document.getElementById('info-ovl-name').textContent=name;
  document.getElementById('info-ovl-mech').innerHTML=bodyHtml;
  document.getElementById('info-ovl-link').href=url;
  document.getElementById('info-overlay').classList.remove('hidden');
}
