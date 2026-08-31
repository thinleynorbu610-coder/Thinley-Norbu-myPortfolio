/* ══════════════════════════════════════════════════════════
   RENDER + BEHAVIOUR — reads content from js/data.js and
   builds the page. You shouldn't need to edit this file to
   add content or images; edit js/data.js instead.
   ══════════════════════════════════════════════════════════ */
const $ = s => document.querySelector(s);
const $$ = s => Array.prototype.slice.call(document.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

/* ══════════════════════════════════════════════════════════
   CLICK-TO-UPLOAD IMAGES
   Click a project screenshot or certificate tile to pick a
   file from your computer. It's resized in the browser and
   saved to localStorage — no server needed — so it shows up
   instantly, but only in the browser/device you uploaded it
   from. To ship a photo to every visitor, put the file in
   images/projects/ or images/certificates/ and set its
   "image" path in js/data.js instead (see that file's header).
   ══════════════════════════════════════════════════════════ */
const IMG_PREFIX = 'portfolioImg:';
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const getStoredImage = key => { try{ return localStorage.getItem(IMG_PREFIX+key); }catch(e){ return null; } };
const setStoredImage = (key,url) => { try{ localStorage.setItem(IMG_PREFIX+key,url); return true; }catch(e){ return false; } };
const removeStoredImage = key => { try{ localStorage.removeItem(IMG_PREFIX+key); }catch(e){} };

function resizeImage(file, maxDim, quality){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode image'));
      img.onload = () => {
        let w = img.naturalWidth, h = img.naturalHeight;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
          else { w = Math.round(w * maxDim / h); h = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* markup for one image tile: shows the stored/custom image if present,
   else the given fallback path (from data.js), else an "Add …" placeholder */
function uploadSlot(key, fallbackSrc, alt, placeholderText){
  const stored = getStoredImage(key);
  const src = stored || fallbackSrc;
  const inner = src
    ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`
    : `<span class="ph">${esc(placeholderText)}</span>`;
  const remove = stored ? `<button class="img-remove" type="button" aria-label="Remove image">✕</button>` : '';
  return { attr: ` data-imgkey="${esc(key)}"`, html: `<label class="upload-slot" title="Click to add an image">${inner}<input type="file" accept="image/*" hidden></label>${remove}` };
}

/* wires click-to-upload + remove for every image tile inside a container;
   re-renders via `reapply` after a change so the new image shows immediately */
function wireImageUploads(containerSel, reapply){
  const container = $(containerSel);
  container.addEventListener('change', async e => {
    const input = e.target;
    if (!input.matches('input[type=file]')) return;
    const slot = input.closest('[data-imgkey]');
    const file = input.files[0];
    input.value = '';
    if (!slot || !file) return;
    const key = slot.dataset.imgkey;
    try {
      const dataUrl = await resizeImage(file, 1200, .82);
      if (!setStoredImage(key, dataUrl)) { alert("Couldn't save that image — your browser storage may be full."); return; }
      reapply();
    } catch (err) {
      alert("Couldn't load that image. Try a different file.");
    }
  });
  container.addEventListener('click', e => {
    const btn = e.target.closest('.img-remove');
    if (!btn) return;
    e.preventDefault();
    const slot = btn.closest('[data-imgkey]');
    if (!slot) return;
    removeStoredImage(slot.dataset.imgkey);
    reapply();
  });
}

$('#stats').innerHTML = DATA.stats.map(s =>
  `<div class="glass stat"><div class="n">${esc(s.n)}</div><div class="l">${esc(s.l)}</div></div>`).join('');

$('#timeline').innerHTML = DATA.timeline.map(t =>
  `<li class="${t.done?'done':''}"><div class="y">${esc(t.year)}</div><div class="t">${esc(t.title)}</div><div class="d">${esc(t.desc)}</div></li>`).join('');

function renderProjects(){
  $('#projectGrid').innerHTML = DATA.projects.map(p => {
    const links = [
      p.github?`<a class="mini" href="${esc(p.github)}">GitHub ${arrow}</a>`:'',
      p.demo?`<a class="mini" href="${esc(p.demo)}">Live Demo ${arrow}</a>`:'',
      p.details?`<a class="mini" href="${esc(p.details)}">Details ${arrow}</a>`:''
    ].join('');
    const slot = uploadSlot('proj:'+slug(p.title), p.image, p.title, 'Add screenshot →');
    return `<article class="glass card" data-cat="${esc(p.category)}">
    <div class="shot"${slot.attr}>${slot.html}<span class="state ${esc(p.status)}">${esc(p.statusLabel)}</span></div>
    <div class="card-body"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
    <div class="stack">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
    <div class="card-links">${links}</div></div></article>`;
  }).join('');
}
renderProjects();

function buildFilter(mountSel, targetSel, cats, attr){
  const mount = $(mountSel);
  mount.dataset.current = 'All';
  mount.innerHTML = ['All'].concat(cats).map((c,i)=>
    `<button class="chip" data-v="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('');
  mount.addEventListener('click', e => {
    const chip = e.target.closest('.chip'); if(!chip) return;
    const v = chip.dataset.v;
    mount.dataset.current = v;
    $$(mountSel+' .chip').forEach(c=>c.setAttribute('aria-pressed', String(c.dataset.v===v)));
    $$(targetSel).forEach(el=>{ el.hidden = !(v==='All' || el.dataset[attr]===v); });
  });
}
/* re-applies whichever filter chip is currently selected — used after a
   re-render (e.g. after an image upload) rebuilds the target elements */
function reapplyFilter(mountSel, targetSel, attr){
  const v = $(mountSel).dataset.current || 'All';
  $$(targetSel).forEach(el=>{ el.hidden = !(v==='All' || el.dataset[attr]===v); });
}
buildFilter('#projFilters','#projectGrid .card',['Web','UI/UX','Backend','Data','Academic'],'cat');
wireImageUploads('#projectGrid', () => { renderProjects(); reapplyFilter('#projFilters','#projectGrid .card','cat'); });

$('#stackGroups').innerHTML = DATA.stack.map(g=>`<div class="glass sg"><h4>${esc(g.group)}</h4>
  ${g.items.map(t=>`<div class="tech" tabindex="0"><span class="dot" aria-hidden="true"></span>
  <span>${esc(t.name)}</span><span class="lv">${esc(t.level)}</span>
  <div class="pop"><b>${esc(t.used)}</b>${esc(t.note)}</div></div>`).join('')}</div>`).join('');

$('#skillGrid').innerHTML = DATA.skills.map(s=>{
  const f = Math.round(s.pct/10);
  return `<div class="glass skill"><div class="skill-top"><span>${esc(s.name)}</span><span class="pc">${s.pct}%</span></div>
  <div class="meter" role="img" aria-label="${esc(s.name)}: ${s.pct} percent">
  ${Array.from({length:10},(_,i)=>`<i class="${i<f?'on':''}"></i>`).join('')}</div></div>`;
}).join('');

$('#logs').innerHTML = DATA.logs.map(l=>{
  const d = Array.from({length:5},(_,i)=>`<i class="${i<l.difficulty?'on':''}"></i>`).join('');
  return `<article class="glass log" data-cat="${esc(l.category)}">
  <div class="log-meta"><span class="cat">${esc(l.category)}</span><span>${esc(l.date)}</span>
  <span class="diff" aria-label="Difficulty ${l.difficulty} of 5">${d}</span><span class="st">${esc(l.status)}</span></div>
  <h3>${esc(l.topic)}</h3><dl>
  <div><dt>What I learned</dt><dd>${esc(l.learned)}</dd></div>
  <div><dt>How I applied it</dt><dd>${esc(l.applied)}</dd></div>
  <div><dt>What's next</dt><dd>${esc(l.next)}</dd></div></dl>
  <div class="stack">${l.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div></article>`;
}).join('');
buildFilter('#logFilters','#logs .log',['Frontend','Backend','Database','DevOps','UI/UX','Programming'],'cat');

const noteCats = Array.from(new Set(DATA.notes.map(n=>n.cat)));
$('#notes').innerHTML = DATA.notes.map(n=>`
  <article class="glass note" data-cat="${esc(n.cat)}" data-hay="${esc((n.title+' '+n.body+' '+n.tags.join(' ')+' '+n.cat).toLowerCase())}">
  <h4>${n.fav?'<span class="star">★</span>':''}${esc(n.title)}</h4><p>${esc(n.body)}</p>
  ${n.code?`<code>${esc(n.code)}</code>`:''}
  <div class="tg">${n.tags.map(t=>`<span>#${esc(t)}</span>`).join('')}</div></article>`).join('')
  + '<div class="empty" id="noEmpty" hidden>No notes match that search.</div>';

let gardenCat = 'All';
function filterGarden(){
  const q = $('#gardenSearch').value.trim().toLowerCase();
  let shown = 0;
  $$('#notes .note').forEach(n=>{
    const ok = (gardenCat==='All'||n.dataset.cat===gardenCat) && (!q||n.dataset.hay.indexOf(q)!==-1);
    n.hidden = !ok; if(ok) shown++;
  });
  $('#noEmpty').hidden = shown>0;
}
$('#gardenFilters').innerHTML = ['All'].concat(noteCats).map((c,i)=>
  `<button class="chip" data-v="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('');
$('#gardenFilters').addEventListener('click', e=>{
  const chip = e.target.closest('.chip'); if(!chip) return;
  gardenCat = chip.dataset.v;
  $$('#gardenFilters .chip').forEach(c=>c.setAttribute('aria-pressed', String(c.dataset.v===gardenCat)));
  filterGarden();
});
$('#gardenSearch').addEventListener('input', filterGarden);

function renderCerts(){
  $('#certs').innerHTML = DATA.certs.map(c=>{
    const slot = uploadSlot('cert:'+slug(c.name), c.image, c.name, 'Add certificate image');
    return `<article class="glass cert" data-cat="${esc(c.cat)}">
  <div class="cert-img"${slot.attr}>${slot.html}</div>
  <div class="cert-body"><h4>${esc(c.name)}</h4><div class="org">${esc(c.org)} · ${esc(c.date)}</div>
  <div class="stack">${c.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div>
  <a class="mini" href="#">View Certificate ${arrow}</a></div></article>`;
  }).join('');
}
renderCerts();
buildFilter('#certFilters','#certs .cert',['Certificates','Awards','Competitions','Academic'],'cat');
wireImageUploads('#certs', () => { renderCerts(); reapplyFilter('#certFilters','#certs .cert','cat'); });

const roadLabel = {done:'Completed',now:'In progress',next:'Ahead'};
$('#road').innerHTML = DATA.road.map(r=>
  `<div class="glass node ${esc(r.state)}"><span class="st">${roadLabel[r.state]}</span><div class="nm">${esc(r.name)}</div></div>`).join('');

/* ══════════════ BEHAVIOUR ══════════════ */
const nav = $('#nav'), links = $('#navLinks'), burger = $('#burger'),
      drawer = $('#drawer'), progress = $('#progress');

$('#drawerLinks').innerHTML = links.innerHTML;

addEventListener('scroll', ()=>{
  nav.classList.toggle('stuck', scrollY > 12);
  const max = document.body.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max>0 ? scrollY/max : 0})`;
}, {passive:true});

burger.addEventListener('click', ()=>{
  const open = drawer.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
drawer.addEventListener('click', e=>{
  if(e.target.tagName==='A'){ drawer.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
});

/* highlight the section currently in view */
const ids = ['top','about','projects','learning','skills','garden','certificates','contact'];
const io2 = new IntersectionObserver(entries=>{
  const vis = entries.filter(e=>e.isIntersecting);
  if(!vis.length) return;
  const id = '#'+vis[0].target.id;
  $$('.nav-links a, .drawer a').forEach(a=>{
    if(a.getAttribute('href')===id) a.setAttribute('aria-current','true');
    else a.removeAttribute('aria-current');
  });
}, {rootMargin:'-20% 0px -70% 0px'});
ids.map(i=>document.getElementById(i)).filter(Boolean).forEach(s=>io2.observe(s));

$('#theme').addEventListener('click', ()=>{
  const el = document.documentElement;
  el.dataset.theme = el.dataset.theme==='dark' ? 'light' : 'dark';
});

$('#send').addEventListener('click', ()=>{
  const n=$('#cname').value.trim(), m=$('#cmail').value.trim(), msg=$('#cmsg').value.trim();
  const note=$('#formNote');
  if(!n||!m||!msg){ note.textContent='Please fill in all three fields.'; note.style.color='#E06C6C'; return; }
  note.textContent='Opening your mail app…'; note.style.color='var(--mint)';
  location.href = `mailto:you@example.com?subject=${encodeURIComponent('Portfolio message from '+n)}&body=${encodeURIComponent(msg+'\n\n— '+n+' ('+m+')')}`;
});

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  $$('section > .wrap > *').forEach(el=>el.classList.add('rv'));
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.08, rootMargin:'0px 0px -40px 0px'});
  $$('.rv').forEach(el=>io.observe(el));
}else{ $$('.rv').forEach(el=>el.classList.add('in')); }



