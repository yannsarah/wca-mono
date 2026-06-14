/* ============================ West Coast Arcades — Gestion (frontend) ============================ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ------------------------------- Icônes SVG ------------------------------- */
const ICONS = {
  globe:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  box:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/>',
  doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2z"/>',
  tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.2"/>',
  share:'<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  trash:'<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  pin:'<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  chevron:'<polyline points="9 18 15 12 9 6"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  joystick:'<circle cx="12" cy="7" r="3"/><path d="M12 10v6"/><rect x="6" y="16" width="12" height="5" rx="2"/>',
  flipper:'<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><circle cx="12" cy="9" r="2.4"/><path d="M7 17l3-2M17 17l-3-2"/>',
  console:'<rect x="2" y="7" width="20" height="10" rx="3"/><path d="M7 12h3M8.5 10.5v3"/><circle cx="16" cy="11" r="1"/><circle cx="18.5" cy="13" r="1"/>',
  gamepad:'<path d="M6 12h4M8 10v4"/><circle cx="15.5" cy="11" r="1"/><circle cx="18" cy="13.5" r="1"/><rect x="2" y="6" width="20" height="12" rx="6"/>',
  tv:'<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
  plug:'<path d="M9 2v6M15 2v6"/><path d="M7 8h10v3a5 5 0 0 1-10 0z"/><path d="M12 16v6"/>',
  chip:'<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/>',
  copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  archive:'<path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>',
  undo:'<path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-7.7L3 8"/>',
  brain:'<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>',
  send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  chat:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
};
const CAT_ICONS = {
  "Borne d'arcade":'joystick', "Flipper":'flipper', "Console rétro":'console',
  "Jeu vidéo":'gamepad', "Écran / TV":'tv', "Accessoire":'plug',
  "Pièce détachée":'chip', "Autre":'box',
};
function icon(name, cls = 'ic') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}
const LOGO_SVG = `<svg viewBox="0 0 48 48" width="42" height="42" xmlns="http://www.w3.org/2000/svg" class="brand-logo">
  <circle cx="24" cy="24" r="23" fill="#111"/>
  <circle cx="24" cy="24" r="20.5" fill="none" stroke="#f39314" stroke-width="2"/>
  <path d="M28 9c0-2 5-4 9-2-3 1-4 3-4 7v16" stroke="#2e9e5b" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M33 9c3-1 6 0 7 2-3-1-5 0-7 2" stroke="#2e9e5b" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M14 30a7 7 0 1 1 0-12v3.5l5-1.5-5-1.5" fill="#e23b3b"/>
  <rect x="22" y="20" width="9" height="7" rx="1.6" fill="#e23b3b"/>
  <circle cx="24.6" cy="23.5" r=".9" fill="#fff"/><circle cx="28.4" cy="23.5" r=".9" fill="#fff"/>
  <path d="M9 38c8 4 22 4 30 0" stroke="#f39314" stroke-width="2.4" fill="none" stroke-linecap="round"/>
</svg>`;
function logoSVG() { const span = document.createElement('span'); span.innerHTML = LOGO_SVG; return span.firstElementChild; }
window.logoSVG = logoSVG;
let CURRENT_USER = null;
const APP_VERSION = '2.6'; // Versionnage du dépôt unique : +0.1 à chaque mise à jour.
/* ------------------------------- Thèmes ------------------------------- */
const THEMES = [
  { key:'classic', label:'Classique', desc:'Thème par défaut, clair et net' },
  { key:'liquid', label:'Liquid Glass', desc:'Verre dépoli translucide façon Apple' },
  { key:'discord', label:'Sombre (Discord)', desc:'Thème foncé, teintes type Discord' },
  { key:'midnight', label:'Nuit profonde', desc:'Noir bleuté, dégradé bleu-violet' },
  { key:'paper', label:'Papier & pierre', desc:'Clair chaleureux, gris & pastels (serif)' },
  { key:'matrix', label:'Matrix', desc:'Noir & vert phosphore, terminal (monospace)' },
];
const THEME_KEYS = THEMES.map(t=>t.key);
function currentTheme(){ try{ const t=localStorage.getItem('wca_theme'); return THEME_KEYS.includes(t)?t:'classic'; }catch{ return 'classic'; } }
function applyTheme(t){
  if(!THEME_KEYS.includes(t)) t='classic';
  document.body.classList.remove(...THEMES.map(x=>'theme-'+x.key));
  document.body.classList.add('theme-'+t);
  try{ localStorage.setItem('wca_theme', t); }catch{}
}
const isReadonly = () => CURRENT_USER?.niveau === 'lecture';
const isAdminUser = () => CURRENT_USER?.niveau === 'admin';
function renderFooter(){ const f=$('#appfoot'); if(f) f.innerHTML = `<span>West Coast Arcades — Gestion · <strong>V${APP_VERSION}</strong></span><span class="foot-copy">© ${new Date().getFullYear()} Yann Gabel Solutions pour West Coast Arcades</span>`; }

/* ------------------------------- État & navigation ------------------------------- */
const state = { view: 'accueil' };
const NAV = [
  { id:'accueil', label:'Accueil', icon:'home' },
  { id:'inventaire', label:'Inventaire', icon:'box' },
  { id:'devis', label:'Devis', icon:'doc', mod:'devis' },
  { id:'evenements', label:'Événements', icon:'calendar', mod:'evenements' },
  { id:'reparations', label:'Réparations', icon:'wrench', mod:'reparations' },
  { id:'projets', label:'Projets', icon:'pin', mod:'projets' },
  { id:'ventes', label:'Ventes', icon:'tag', mod:'ventes' },
  { id:'prets', label:'Prêts', icon:'share', mod:'prets' },
  { id:'site', label:'Site internet', icon:'globe', mod:'site' },
  { id:'users', label:'Utilisateurs', icon:'users' },
  { id:'reglages', label:'Administration', icon:'settings' },
];

/* ------------------------------- Utilitaires ------------------------------- */
function todayISO() { return new Date().toISOString().slice(0, 10); }
const MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
function dateShort(iso){ if(!iso) return '—'; const [y,m,d]=iso.split('-').map(Number); return `${d} ${MOIS[m-1]} ${y}`; }
function dateTimeShort(iso){ if(!iso) return '—'; const d=new Date(iso); if(isNaN(d)) return dateShort((iso+'').slice(0,10)); return `${dateShort((iso+'').slice(0,10))} à ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
function esc(s){ return (s ?? '').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function euros(n){ return (Number(n)||0).toLocaleString('fr-FR',{style:'currency',currency:'EUR'}); }
async function api(url, opts){ const r=await fetch(url,{headers:{'Content-Type':'application/json'},credentials:'same-origin',...opts}); if(r.status===401){ if(typeof showLogin==='function'){ CURRENT_USER=null; showLogin(); } throw new Error('Session expirée, reconnectez-vous.'); } if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.error||'Erreur serveur');} return r.status===204?null:r.json(); }
let toastTimer;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2400); }
function confirmModal(msg, onYes){
  openModal(`<h3>Confirmation</h3><p style="color:var(--muted)">${esc(msg)}</p>
    <div class="buttons" style="margin-top:16px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn red" id="cf-yes">Supprimer</button></div>`);
  $('#cf-yes').addEventListener('click',()=>{ closeModal(); onYes(); });
}

/* ------------------------------- Archives (commun) ------------------------------- */
const ARCH = { inventaire:false, devis:false, evenements:false, reparations:false, ventes:false, prets:false, wip:false, projets:false };
function archHtml(type,id,archived){ return `<button class="iconbtn ghost js-arch" data-type="${type}" data-id="${id}" data-ar="${archived?1:0}" title="${archived?'Désarchiver':'Archiver'}">${icon(archived?'undo':'archive')}</button>`; }
function wireArch(reload){ $$('.js-arch').forEach(b=>b.addEventListener('click',async e=>{ e.stopPropagation(); try{ await api('/api/archive',{method:'POST',body:JSON.stringify({type:b.dataset.type,id:+b.dataset.id,archive:b.dataset.ar!=='1'})}); toast(b.dataset.ar==='1'?'Désarchivé':'Archivé ✓'); reload(); }catch(err){ toast(err.message); } })); }
function segArchHtml(viewId){ const on=ARCH[viewId]; return `<div class="seg arch-seg" style="margin-bottom:14px"><button class="${!on?'active':''}" data-ar="0">Actifs</button><button class="${on?'active':''}" data-ar="1">${icon('archive','ic')} Archivés</button></div>`; }
function wireSegArch(viewId,reload){ $$('.arch-seg button').forEach(b=>b.addEventListener('click',()=>{ ARCH[viewId]=b.dataset.ar==='1'; reload(); })); }
const archFilter = (list, viewId) => list.filter(x => ARCH[viewId] ? x.archive : !x.archive);

/* ------------------------------- Modale ------------------------------- */
function openModal(html,opts){ opts=opts||{}; $('#modal-root').innerHTML=`<div class="modal-overlay" id="ov"><div class="modal">${html}</div></div>`; if(opts.closeOnOutside===true){ $('#ov').addEventListener('click',e=>{ if(e.target.id==='ov') closeModal(); }); } }
function closeModal(){ $('#modal-root').innerHTML=''; }
window.closeModal = closeModal;

// Bouton "+" d'ajout rapide d'un élément à une liste déroulante (sans quitter le formulaire en cours).
// cfg.create : async (texte) => { value, label } de la nouvelle option (déjà créée côté serveur).
function quickAddSelect(sel, btn, cfg){
  if(!sel || !btn) return;
  btn.addEventListener('click', e=>{
    e.preventDefault(); e.stopPropagation();
    const field = sel.closest('.field') || sel.parentNode;
    const existing = field.querySelector('.quick-add');
    if(existing){ existing.querySelector('.qa-input').focus(); return; }
    const box = document.createElement('div');
    box.className = 'quick-add';
    box.innerHTML = `<input class="qa-input" placeholder="${esc(cfg.placeholder||'Nouveau…')}"><button type="button" class="btn small qa-ok">${icon('check')} Ajouter</button><button type="button" class="btn grey small qa-cancel" aria-label="Annuler">${icon('x')}</button>`;
    field.appendChild(box);
    const inp = box.querySelector('.qa-input'); inp.focus();
    const close = ()=> box.remove();
    box.querySelector('.qa-cancel').addEventListener('click', ev=>{ ev.preventDefault(); close(); });
    const ok = box.querySelector('.qa-ok');
    const submit = async ev=>{
      ev && ev.preventDefault();
      const txt = inp.value.trim();
      if(!txt){ inp.focus(); return; }
      ok.disabled = true;
      try{
        const opt = await cfg.create(txt);
        if(opt){
          let o = [...sel.options].find(x=>x.value===String(opt.value));
          if(!o){ o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; sel.appendChild(o); }
          sel.value = String(opt.value);
          sel.dispatchEvent(new Event('change'));
          toast('Ajouté ✓');
        }
        close();
      }catch(err){ toast(err.message); ok.disabled = false; }
    };
    ok.addEventListener('click', submit);
    inp.addEventListener('keydown', ev=>{ if(ev.key==='Enter'){ submit(ev); } else if(ev.key==='Escape'){ ev.preventDefault(); close(); } });
  });
}

/* ------------------------------- Données partagées ------------------------------- */
let CATEGORIES = ["Borne d'arcade","Flipper","Console rétro","Jeu vidéo","Écran / TV","Accessoire","Pièce détachée","Autre"];
let ETATS = [{label:'À réviser',bloque:true},{label:'À démonter',bloque:true}];
let PHOTO_PX = 40;
let ROLES = [{key:'admin',label:'Administrateur',niveau:'admin'},{key:'technicien',label:'Technicien',niveau:'standard'},{key:'invite',label:'Invité',niveau:'lecture'}];
let PARTENAIRES_MODE = 'fixe';
let PARTENAIRES_COUNT = 4;
let PARTENAIRES_VISIBLE = true;
let MODULES_ENABLED = {};
let MODULE_REGISTRY = [];
let NAV_VIS = {};      // {navId: 'auto'|'show'|'hide'}
let NAV_COUNTS = {};   // {coll: nombre d'éléments}
const NAV_HIDEABLE = { devis:'devis', evenements:'evenements', reparations:'reparations', projets:'projets', ventes:'ventes', prets:'prets' };
function moduleOn(key){ return MODULES_ENABLED[key]!==false; }
let PROPRIETAIRES = ['Perso','Asso','Partenaire','VIP','Autre'];
let TARIFS = { periodes:[{key:'we',label:'Week-end',jours:2},{key:'sem',label:'Semaine',jours:7}], couts:{essence_litre:1.9,conso_100:12,camion_jour:120,mo_heure:25,couchage_nuit:0,maintenance_pct:0,presence_jour:0}, extras:[] };
let PEOPLE = [];
async function loadPeople(){ try{ const r=await api('/api/people'); PEOPLE = r.all||[]; }catch{ PEOPLE=[]; } return PEOPLE; }
function peopleDatalist(id){ return `<datalist id="${id}">${PEOPLE.map(n=>`<option value="${esc(n)}">`).join('')}</datalist>`; }
function roleLabel(key){ return (ROLES.find(r=>r.key===key)||{}).label || key || '—'; }
function roleNiveauOf(key){ const r=ROLES.find(x=>x.key===key); return r?r.niveau:(key==='admin'?'admin':key==='invite'?'lecture':'standard'); }
async function loadConfig(){
  try{ const c=await api('/api/config'); if(Array.isArray(c.categories)) CATEGORIES=c.categories; if(Array.isArray(c.etats)) ETATS=c.etats; if(Array.isArray(c.proprietaires)) PROPRIETAIRES=c.proprietaires; if(typeof c.photo_px==='number') PHOTO_PX=c.photo_px; if(Array.isArray(c.roles)&&c.roles.length) ROLES=c.roles; if(c.partenaires_mode) PARTENAIRES_MODE=c.partenaires_mode; if(typeof c.partenaires_count==='number') PARTENAIRES_COUNT=c.partenaires_count; if(typeof c.partenaires_visible==='boolean') PARTENAIRES_VISIBLE=c.partenaires_visible; if(c.tarifs) TARIFS=c.tarifs; if(c.modules) MODULES_ENABLED=c.modules; if(Array.isArray(c.modules_registry)) MODULE_REGISTRY=c.modules_registry; if(c.nav_visibility) NAV_VIS=c.nav_visibility; if(c.counts) NAV_COUNTS=c.counts; }catch{} if(CURRENT_USER && document.getElementById('nav')) buildNav();
  return { categories:CATEGORIES, etats:ETATS, photo_px:PHOTO_PX, roles:ROLES };
}
let MAT_CACHE = [];
async function loadMateriel(){ MAT_CACHE = await api('/api/materiel'); return MAT_CACHE; }
function matOptions(selectedId){ return MAT_CACHE.map(m=>`<option value="${m.id}" ${+selectedId===m.id?'selected':''}>${esc(m.denomination)}${m.categorie?' — '+esc(m.categorie):''}</option>`).join(''); }

/* ------------------------------- Coquille / nav ------------------------------- */
function buildNav(){
  const items = NAV.filter(n => {
    if(n.admin && !(isAdminUser()||isReadonly())) return false;
    if(n.mod && !moduleOn(n.mod)) return false;
    const ck = NAV_HIDEABLE[n.id];
    if(ck){ const ov=NAV_VIS[n.id]; if(ov==='show') return true; if(ov==='hide') return false; return (NAV_COUNTS[ck]||0)>0; }
    return true;
  });
  $('#nav').innerHTML = items.map(n => `<a data-view="${n.id}">${icon(n.icon)}<span>${n.label}</span></a>`).join('');
  const closeDrawer = () => { $('#sidebar').classList.remove('open'); $('#scrim').classList.remove('show'); };
  $$('#nav a').forEach(a => a.addEventListener('click', () => { setView(a.dataset.view); closeDrawer(); }));
  $('#burger').innerHTML = `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
  // Liaison unique (évite les doubles écouteurs qui bloquaient le menu mobile).
  if(!buildNav._wired){
    buildNav._wired = true;
    $('#burger').addEventListener('click', () => { const o=$('#sidebar').classList.toggle('open'); $('#scrim').classList.toggle('show', o); });
    $('#scrim').addEventListener('click', closeDrawer);
  }
}
function setView(v){ if(window.__actTimer){ clearInterval(window.__actTimer); window.__actTimer=null; } state.view=v; $$('#nav a').forEach(a=>a.classList.toggle('active', a.dataset.view===v)); try{ history.replaceState(null,'','#'+v); }catch{} try{ localStorage.setItem('wca_view',v); }catch{} render(); window.scrollTo(0,0); }
function initialView(){
  let v=(location.hash||'').replace(/^#/,'');
  if(!NAV.some(n=>n.id===v)){ try{ v=localStorage.getItem('wca_view')||''; }catch{ v=''; } }
  if(!NAV.some(n=>n.id===v)) return 'accueil';
  const item=NAV.find(n=>n.id===v);
  if(item.admin && !(isAdminUser()||isReadonly())) return 'accueil';
  return v;
}
function setTopbar(title, actions=''){ $('#page-title').textContent=title; $('#topbar-actions').innerHTML=actions; }
const view = () => $('#view');
function render(){
  const nv=NAV.find(n=>n.id===state.view);
  if(nv && nv.mod && !moduleOn(nv.mod)){ state.view='accueil'; }
  const map={ accueil:renderAccueil, inventaire:renderInventaire, devis:renderDevis, evenements:renderEvenements,
    projets:renderProjets, reparations:renderReparations, ventes:renderVentes, prets:renderPrets, site:renderSiteInternet, users:renderUsers, reglages:renderReglages };
  (map[state.view]||renderAccueil)();
}

/* ============================== ACCUEIL ============================== */
async function renderAccueil(){
  await loadConfig();
  setTopbar('Accueil', `<button class="btn outline small" id="home-cfg">${icon('settings')} Personnaliser</button>`);
  $('#home-cfg').addEventListener('click',homeConfigModal);
  const prenom = CURRENT_USER?.prenom || CURRENT_USER?.nom || CURRENT_USER?.login || '';
  const S=homeSections();
  view().innerHTML = `${S.welcome?`<div class="welcome"><div class="welcome-txt">
      <h2>Bienvenue, ${esc(prenom)} 🕹️</h2>
      <p>Gérez votre <span class="accent">parc de bornes</span>, devis, réparations, ventes et prêts en un seul endroit.</p>
    </div></div>`:''}${S.alertes?`<div id="alertes"></div>`:''}${S.metrics?`<div class="metrics" id="metrics"></div>`:''}<div class="home-widgets" id="home-widgets"></div>${S.quick?`<div class="home-grid" id="quick"></div>`:''}${moduleOn('idees')?`<button class="idea-fab" id="idea-fab" title="Boîte à idées" aria-label="Boîte à idées">${icon('brain','ic')}<span class="idea-fab-lbl">Boîte à idées</span></button>`:''}`;
  $('#idea-fab')?.addEventListener('click',ideesPanel);
  if(S.alertes) loadAlertes();
  renderHomeWidgets();
  if(S.metrics){ try{
    const d = await api('/api/dashboard');
    const M=[
      ['Matériel total', d.materiel_total, '', ()=>{ INV.nonfonc=false; INV.cat=''; setView('inventaire'); }],
      ['Disponibles', d.materiel_dispo, 'accent', ()=>{ INV.nonfonc=false; INV.cat=''; setView('inventaire'); }],
      ['Bloqués', d.materiel_bloque, '', ()=>{ INV.nonfonc=false; INV.cat=''; setView('inventaire'); }],
      ['Hors service', d.materiel_hs, '', ()=>{ INV.nonfonc=true; INV.cat=''; setView('inventaire'); }],
      ['Devis actifs', d.devis_actifs, '', ()=>{ DEV_TAB='devis'; setView('devis'); }],
      ['Réparations', d.reparations_en_cours, '', ()=>{ REP_TAB='interv'; setView('reparations'); }],
      ['Prêts en cours', d.prets_en_cours, '', ()=>setView('prets')],
      ['Événements', d.evenements, '', ()=>{ ARCH.evenements=false; setView('evenements'); }],
    ].filter(m=>+m[1]>0);
    $('#metrics').innerHTML = M.map((m,i)=>`<div class="metric clic ${m[2]}" data-i="${i}"><div class="m-val">${m[1]}</div><div class="m-lbl">${m[0]}</div></div>`).join('') || `<div class="empty-state" style="grid-column:1/-1">Aucune donnée à afficher pour le moment.</div>`;
    $$('#metrics .metric.clic').forEach(el=>el.addEventListener('click',M[+el.dataset.i][3]));
  }catch(e){ const mb=$('#metrics'); if(mb) mb.innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; } }
  if(S.quick){
    const cards=[
      { id:'inventaire', t:'Inventaire', d:'Parc de bornes & matériel', c:'ic-teal', tc:'var(--teal-d)', i:'box' },
      { id:'devis', t:'Devis', d:'Créer un devis (bloque le matériel)', c:'ic-pink', tc:'var(--pink)', i:'doc', mod:'devis' },
      { id:'evenements', t:'Événements', d:'Vérifier les disponibilités', c:'ic-purple', tc:'var(--purple)', i:'calendar', mod:'evenements' },
      { id:'reparations', t:'Réparations', d:'Suivi des pannes & interventions', c:'ic-amber', tc:'#e0830f', i:'wrench', mod:'reparations' },
      { id:'ventes', t:'Ventes', d:'Matériel vendu', c:'ic-green', tc:'var(--green)', i:'tag', mod:'ventes' },
      { id:'prets', t:'Prêts', d:'Matériel prêté & retours', c:'ic-blue', tc:'var(--blue)', i:'share', mod:'prets' },
    ].filter(c=>!c.mod||moduleOn(c.mod));
    $('#quick').innerHTML = cards.map(c=>`<div class="home-card" data-go="${c.id}">
        <span class="h-ico ${c.c}">${icon(c.i)}</span>
        <div class="h-txt"><h4 style="color:${c.tc}">${c.t}</h4><p>${c.d}</p></div>${icon('chevron','ic h-chev')}</div>`).join('');
    $$('.home-card').forEach(c=>c.addEventListener('click',()=>setView(c.dataset.go)));
  }
}
/* ---- Accueil personnalisable (widgets) ---- */
const AVAIL_WIDGETS=[
  {type:'inventaire',label:'Inventaire',opts:['n','cat','nonfonc']},
  {type:'reparations',label:'Réparations en cours',opts:['n']},
  {type:'achats',label:'Pièces à acheter (urgentes)',opts:[]},
  {type:'evenements',label:'Prochains événements',opts:['n']},
  {type:'wip',label:'Projets WIP à venir',opts:['n']},
  {type:'projets',label:'Projets en cours',opts:['n']},
  {type:'devis',label:'Derniers devis',opts:['n']},
  {type:'prets',label:'Prêts en cours',opts:['n']},
];
function homeKey(){ return 'wca_home_'+(CURRENT_USER?.login||'anon'); }
function homeConfig(){
  let saved=null; try{ saved=JSON.parse(localStorage.getItem(homeKey())||'null'); }catch{}
  const base={}; AVAIL_WIDGETS.forEach(a=>base[a.type]={type:a.type,on:false,n:5,cat:'',nonfonc:false});
  if(Array.isArray(saved)){
    const ordered=[]; const used={};
    saved.forEach(s=>{ if(base[s.type]&&!used[s.type]){ used[s.type]=1; ordered.push(Object.assign(base[s.type],{on:!!s.on,n:+s.n||5,cat:s.cat||'',nonfonc:!!s.nonfonc})); } });
    AVAIL_WIDGETS.forEach(a=>{ if(!used[a.type]) ordered.push(base[a.type]); });
    return ordered;
  }
  return AVAIL_WIDGETS.map(a=>base[a.type]);
}
function saveHomeConfig(cfg){ try{ localStorage.setItem(homeKey(), JSON.stringify(cfg)); }catch{} }
const HOME_SECTIONS=[{key:'welcome',label:'Bandeau de bienvenue'},{key:'alertes',label:'Alertes (urgences / WIP)'},{key:'metrics',label:'Statistiques (bulles cliquables)'},{key:'quick',label:'Accès rapides (cartes)'}];
function homeSections(){
  let s=null; try{ s=JSON.parse(localStorage.getItem(homeKey()+'_sec')||'null'); }catch{}
  const def={welcome:true,alertes:true,metrics:true,quick:true};
  if(s&&typeof s==='object') HOME_SECTIONS.forEach(x=>{ if(typeof s[x.key]==='boolean') def[x.key]=s[x.key]; });
  return def;
}
function saveHomeSections(s){ try{ localStorage.setItem(homeKey()+'_sec', JSON.stringify(s)); }catch{} }
function widgetCard(title,count,rows,emptyTxt){
  return `<div class="home-widget"><div class="hw-head js-hw-go"><strong>${esc(title)}</strong>${count!=null?`<span class="hw-count">${count}</span>`:''}<span class="hw-arrow">${icon('chevron','ic')}</span></div><div class="hw-list">${rows||`<p class="mini" style="padding:6px 2px">${esc(emptyTxt||'Rien à afficher.')}</p>`}</div></div>`;
}
async function loadWidget(w, el){
  if(!el) return;
  const today=todayISO();
  const defs={
    inventaire: async()=>{ let l=(await api('/api/materiel?all=1')).filter(m=>!m.archive); if(w.cat) l=l.filter(m=>(m.categorie||'Autre')===w.cat); if(w.nonfonc) l=l.filter(m=>m.fonctionnel===false);
      return { title:'Inventaire'+(w.cat?' — '+w.cat:'')+(w.nonfonc?' (HS)':''), list:l, n:w.n, empty:'Aucun article.',
        row:m=>`<span>${esc(m.denomination)}${m.en_wip?' <span class="statut wip">EN WIP</span>':''}</span>${statutBadge(m)}`, go:()=>{ INV.cat=w.cat||''; INV.nonfonc=!!w.nonfonc; setView('inventaire'); }, open:m=>materielModal(m) }; },
    reparations: async()=>{ const l=(await api('/api/reparations')).filter(r=>r.statut!=='termine'&&!r.archive);
      return { title:'Réparations en cours', list:l, n:w.n, empty:'Aucune réparation.',
        row:r=>`<span>${esc(r.denomination)}</span><span class="pill-st ${r.statut}">${REP_STATUTS[r.statut]||r.statut}</span>`, go:()=>{ REP_TAB='interv'; setView('reparations'); }, open:r=>reparationModal(r) }; },
    achats: async()=>{ const l=(await api('/api/alertes')).urgences||[];
      return { title:'Pièces à acheter (urgentes)', list:l, n:8, empty:'Aucune urgence.',
        row:a=>`<span>${esc(a.designation)}</span><span class="urg urg-${a.urgence==='critique'?'critique':'urgent'}">${URGENCES[a.urgence]||''}</span>`, go:()=>{ REP_TAB='achats'; setView('reparations'); }, open:a=>achatModal(a) }; },
    evenements: async()=>{ const l=(await api('/api/evenements')).filter(e=>!e.archive&&(e.date_fin||e.date_debut||'')>=today).sort((a,b)=>(a.date_debut||'').localeCompare(b.date_debut||''));
      return { title:'Prochains événements', list:l, n:w.n, empty:'Aucun événement.',
        row:e=>`<span>${esc(e.nom)}</span><span class="mini">${dateShort(e.date_debut)}</span>`, go:()=>{ ARCH.evenements=false; setView('evenements'); }, open:e=>evenementModal(e) }; },
    wip: async()=>{ const l=(await api('/api/wip')).filter(x=>!x.archive&&x.statut!=='termine'&&(x.date||'')>=today).sort((a,b)=>(a.date||'').localeCompare(b.date||''));
      return { title:'Projets WIP à venir', list:l, n:w.n, empty:'Aucune séance.',
        row:x=>`<span>${esc(x.code)}</span><span class="mini">${dateShort(x.date)}</span>`, go:()=>{ REP_TAB='wip'; setView('reparations'); }, open:x=>wipModal(x) }; },
    projets: async()=>{ const l=(await api('/api/projets')).filter(x=>!x.archive);
      return { title:'Projets en cours', list:l, n:w.n, empty:'Aucun projet.',
        row:x=>`<span>${esc(x.nom)}</span><span class="mini">${x.date_debut?dateShort(x.date_debut):''}</span>`, go:()=>setView('projets'), open:x=>projetModal(x) }; },
    devis: async()=>{ const l=(await api('/api/devis')).filter(x=>!x.archive);
      return { title:'Derniers devis', list:l, n:w.n, empty:'Aucun devis.',
        row:x=>`<span>${esc(x.numero)} — ${esc(x.client_nom)}</span><span class="pill-st ${x.statut}">${DEVIS_STATUTS[x.statut]||x.statut}</span>`, go:()=>{ DEV_TAB='devis'; setView('devis'); }, open:x=>devisModal(x) }; },
    prets: async()=>{ const l=(await api('/api/prets')).filter(x=>x.statut!=='rendu'&&!x.archive);
      return { title:'Prêts en cours', list:l, n:w.n, empty:'Aucun prêt.',
        row:x=>`<span>${esc(x.denomination)}</span><span class="mini">${esc(x.emprunteur)||''}</span>`, go:()=>setView('prets'), open:x=>pretModal(x) }; },
  };
  try{
    if(!defs[w.type]) return;
    const def=await defs[w.type]();
    const slice=def.list.slice(0, def.n||8);
    el.innerHTML=widgetCard(def.title, def.list.length, slice.map((x,i)=>`<div class="hw-row js-hw-item" data-i="${i}">${def.row(x)}</div>`).join(''), def.empty);
    el.querySelector('.js-hw-go').addEventListener('click', def.go);
    if(def.open) el.querySelectorAll('.js-hw-item').forEach(r=>r.addEventListener('click', e=>{ e.stopPropagation(); def.open(slice[+r.dataset.i]); }));
  }catch(e){ el.innerHTML=`<div class="home-widget"><p class="mini" style="padding:8px">${esc(e.message)}</p></div>`; }
}
function renderHomeWidgets(){
  const box=$('#home-widgets'); if(!box) return;
  const cfg=homeConfig().filter(w=>w.on);
  box.innerHTML = cfg.map((w,i)=>`<div class="hw-slot" id="hw-${i}"></div>`).join('');
  cfg.forEach((w,i)=>loadWidget(w, $('#hw-'+i)));
}
function homeConfigModal(){
  let cfg=homeConfig();
  openModal(`<div id="home-cfg-body"></div>`);
  const labelOf=t=>(AVAIL_WIDGETS.find(a=>a.type===t)||{}).label||t;
  const optsOf=t=>(AVAIL_WIDGETS.find(a=>a.type===t)||{}).opts||[];
  function paint(){
    const sec=homeSections();
    $('#home-cfg-body').innerHTML=`<h3>Personnaliser l'accueil</h3>
      <div class="section-title" style="margin-top:0">Sections de l'accueil</div>
      ${HOME_SECTIONS.map(x=>`<div class="hwc-row"><div class="hwc-top"><span class="toggle-oui-non ${sec[x.key]?'on':'off'} js-sec" data-k="${x.key}"><span class="t-oui">OUI</span><span class="t-non">NON</span></span><strong style="flex:1">${x.label}</strong></div></div>`).join('')}
      <div class="section-title">Encarts personnalisés</div>
      <p class="help" style="margin-bottom:10px">Activez les encarts voulus, réglez-les et ordonnez-les (↑/↓). Mémorisé pour votre compte sur cet appareil.</p>
      ${cfg.map((w,i)=>{ const opts=optsOf(w.type); return `<div class="hwc-row">
        <div class="hwc-top"><span class="toggle-oui-non ${w.on?'on':'off'} js-hwc-on" data-i="${i}"><span class="t-oui">OUI</span><span class="t-non">NON</span></span>
          <strong style="flex:1">${labelOf(w.type)}</strong>
          <button class="iconbtn ghost js-hwc-up" data-i="${i}" title="Monter">↑</button><button class="iconbtn ghost js-hwc-down" data-i="${i}" title="Descendre">↓</button></div>
        ${w.on&&opts.length?`<div class="hwc-opts">
          ${opts.includes('n')?`<label class="field" style="margin:0"><span>Nombre affiché</span><input type="number" min="1" max="20" class="js-hwc-n" data-i="${i}" value="${w.n||5}"></label>`:''}
          ${opts.includes('cat')?`<label class="field" style="margin:0"><span>Catégorie</span><select class="js-hwc-cat" data-i="${i}"><option value="">Toutes</option>${CATEGORIES.map(c=>`<option ${w.cat===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label>`:''}
          ${opts.includes('nonfonc')?`<label class="field" style="margin:0"><span>Filtre</span><select class="js-hwc-nf" data-i="${i}"><option value="0" ${!w.nonfonc?'selected':''}>Tous</option><option value="1" ${w.nonfonc?'selected':''}>Non fonctionnels</option></select></label>`:''}
        </div>`:''}
      </div>`; }).join('')}
      <div class="buttons" style="margin-top:14px"><button class="btn" onclick="closeModal()">Fermer</button></div>`;
    const save=()=>{ saveHomeConfig(cfg); if(state.view==='accueil') renderHomeWidgets(); };
    $$('.js-sec').forEach(t=>t.addEventListener('click',()=>{ const s=homeSections(); s[t.dataset.k]=!s[t.dataset.k]; saveHomeSections(s); if(state.view==='accueil') renderAccueil(); paint(); }));
    $$('.js-hwc-on').forEach(t=>t.addEventListener('click',()=>{ cfg[+t.dataset.i].on=!cfg[+t.dataset.i].on; save(); paint(); }));
    $$('.js-hwc-up').forEach(b=>b.addEventListener('click',()=>{ const i=+b.dataset.i; if(i>0){ [cfg[i-1],cfg[i]]=[cfg[i],cfg[i-1]]; save(); paint(); } }));
    $$('.js-hwc-down').forEach(b=>b.addEventListener('click',()=>{ const i=+b.dataset.i; if(i<cfg.length-1){ [cfg[i+1],cfg[i]]=[cfg[i],cfg[i+1]]; save(); paint(); } }));
    $$('.js-hwc-n').forEach(inp=>inp.addEventListener('change',()=>{ cfg[+inp.dataset.i].n=Math.max(1,Math.min(20,+inp.value||5)); save(); }));
    $$('.js-hwc-cat').forEach(s=>s.addEventListener('change',()=>{ cfg[+s.dataset.i].cat=s.value; save(); }));
    $$('.js-hwc-nf').forEach(s=>s.addEventListener('change',()=>{ cfg[+s.dataset.i].nonfonc=s.value==='1'; save(); }));
  }
  paint();
}
async function loadAlertes(){
  const box=$('#alertes'); if(!box) return;
  try{
    const a=await api('/api/alertes'); const u=a.urgences||[]; const w=a.wip_prochain||null; const rdv=a.rdv_projets||[];
    const urgHtml = u.length ? `<div class="urg-bubble">
      <div class="ub-head">${icon('wrench','ic')} À TRAITER EN URGENCE <span class="ub-count">${u.length}</span></div>
      <div class="ub-list">${u.slice(0,4).map(x=>`<div class="ub-item"><span class="urg urg-${x.urgence==='critique'?'critique':'urgent'}">${x.urgence==='critique'?'🔴':'🟠'} ${URGENCES[x.urgence]||''}</span> <strong>${esc(x.designation)}</strong>${x.materiel_nom?` — ${esc(x.materiel_nom)}`:''}</div>`).join('')}${u.length>4?`<div class="mini">+${u.length-4} autre(s)…</div>`:''}</div>
      <button class="btn small" id="ub-go">Voir les pièces</button></div>` : '';
    let wipHtml='';
    if(w){
      const imminent = (w.date||'') <= new Date(Date.now()+2*86400000).toISOString().slice(0,10);
      wipHtml = `<div class="wip-bubble ${imminent?'imminent':''}">
        <div class="rb-head">${icon('calendar','ic')} PROCHAIN WIP${imminent?' <span class="ub-count">!</span>':''}</div>
        <div class="wb-main"><strong>${esc(w.code)}</strong> <span class="pill-st ${w.statut}">${WIP_STATUTS[w.statut]||w.statut}</span></div>
        <div class="wb-line">📅 ${dateShort(w.date)}${w.lieu?` · 📍 ${esc(w.lieu)}`:''}</div>
        <div class="wb-people">${(w.presents||[]).slice(0,6).map(p=>`<span class="gelule">${esc(p)}</span>`).join('')||'<span class="mini">Participants à définir</span>'}</div>
        <button class="btn small navy" id="wip-go">Voir le projet</button></div>`;
    }
    const rdvHtml = rdv.length ? `<div class="rdv-bubble">
        <div class="rb-head">${icon('pin','ic')} RENDEZ-VOUS PROJET <span class="ub-count">${rdv.length}</span></div>
        <div class="ub-list">${rdv.map(r=>`<div class="ub-item">🗓️ <strong>${dateShort(r.date)}</strong> — ${esc(r.projet_nom)}${r.note?' · '+esc(r.note):''}</div>`).join('')}</div>
        <button class="btn small navy" id="rdv-go">Voir les projets</button></div>` : '';
    const top = (urgHtml && wipHtml) ? `<div class="alert-grid">${urgHtml}${wipHtml}</div>` : (urgHtml||wipHtml||'');
    box.innerHTML = top + rdvHtml;
    $('#ub-go')?.addEventListener('click',()=>{ REP_TAB='achats'; setView('reparations'); });
    $('#wip-go')?.addEventListener('click',()=>{ REP_TAB='wip'; setView('reparations'); });
    $('#rdv-go')?.addEventListener('click',()=>setView('projets'));
  }catch{ box.innerHTML=''; }
}

/* ============================== PARTENAIRES ============================== */
const PHOTO_LINK = 'https://squoosh.app';
// Compresse en GARDANT le format (paysage/portrait), largeur max maxW, sous maxBytes. Pour bannières & visuels larges.
function compressImage(file, cb, maxW=1400, maxBytes=220*1024){
  const img=new Image(); const url=URL.createObjectURL(file);
  img.onload=()=>{
    URL.revokeObjectURL(url);
    let w=img.width, h=img.height; if(w>maxW){ h=Math.round(h*maxW/w); w=maxW; }
    const cv=document.createElement('canvas'); cv.width=w; cv.height=h; cv.getContext('2d').drawImage(img,0,0,w,h);
    const bytes=d=>Math.ceil((d.length-(d.indexOf(',')+1))*3/4);
    let out=null;
    for(const q of [0.86,0.78,0.7,0.6,0.5,0.42]){ out=cv.toDataURL('image/jpeg',q); if(bytes(out)<=maxBytes){ cb(out); return; } }
    cb(out);
  };
  img.onerror=()=>{ URL.revokeObjectURL(url); toast('Image illisible.'); };
  img.src=url;
}
// Recadre en carré et compresse sous maxBytes (≈60 Ko par défaut).
function compressSquare(file, cb, maxBytes=60*1024){
  const img=new Image(); const url=URL.createObjectURL(file);
  img.onload=()=>{
    URL.revokeObjectURL(url);
    const s=Math.min(img.width,img.height), sx=(img.width-s)/2, sy=(img.height-s)/2;
    const draw=(size,q)=>{ const cv=document.createElement('canvas'); cv.width=cv.height=size; cv.getContext('2d').drawImage(img,sx,sy,s,s,0,0,size,size); return cv.toDataURL('image/jpeg',q); };
    const bytes=d=>Math.ceil((d.length-(d.indexOf(',')+1))*3/4);
    let best=null;
    for(const size of [360,320,280,240,200,160]){
      for(const q of [0.82,0.72,0.62,0.5,0.4]){ best=draw(size,q); if(bytes(best)<=maxBytes){ cb(best); return; } }
    }
    cb(best); // garde la plus petite tentative (toujours < ~60 Ko à 160px)
  };
  img.onerror=()=>{ URL.revokeObjectURL(url); toast('Image illisible.'); };
  img.src=url;
}
let PARTNERS_CACHE=[];
let PT_INTAB=false; // true = partenaires affichés dans l'onglet Utilisateurs (pas en popup)
async function loadPartners(){ try{ PARTNERS_CACHE = await api('/api/partenaires'); }catch{ PARTNERS_CACHE=[]; } return PARTNERS_CACHE; }
async function renderPartnersStrip(){
  const strip=$('#partners-strip'); if(!strip) return;
  if(!PARTENAIRES_VISIBLE || !moduleOn('partenaires')){ strip.innerHTML=''; return; }
  await loadPartners();
  let list=[...PARTNERS_CACHE];
  if(!list.length){ strip.innerHTML = !isReadonly()?`<div class="pt-head"><span>${icon('users','ic')} Nos partenaires</span><button class="btn outline small" id="pt-manage">${icon('edit')} Gérer</button></div>`:''; $('#pt-manage')?.addEventListener('click',partenairesModal); return; }
  if(PARTENAIRES_MODE==='aleatoire') list.sort(()=>Math.random()-0.5);
  list=list.slice(0, Math.max(1, PARTENAIRES_COUNT||4));
  const cell=p=>`<div class="pt-cell" title="${esc(p.nom)}${p.prochain_evenement?' · prochain : '+esc(p.prochain_evenement.nom):''}">
      ${p.logo?`<img src="${p.logo}" alt="${esc(p.nom)}">`:`<span class="pt-ph">${esc((p.nom||'?').slice(0,2).toUpperCase())}</span>`}
      <span class="pt-name">${esc(p.nom)}</span></div>`;
  strip.innerHTML = `<div class="pt-head"><span>${icon('users','ic')} Nos partenaires</span>${!isReadonly()?`<button class="btn outline small" id="pt-manage">${icon('edit')} Gérer</button>`:''}</div>
    <div class="pt-row">${list.map(cell).join('')}</div>`;
  $('#pt-manage')?.addEventListener('click',partenairesModal);
}
async function partenairesModal(){
  PT_INTAB=false;
  await loadPartners();
  openModal(`<div id="pt-body"></div>`);
  renderPartenaires();
}
function renderPartenaires(){
  const body=$('#pt-body'); if(!body) return;
  body.innerHTML = `<h3>Partenaires</h3>
    <div class="card" style="margin-bottom:12px;padding:13px">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <span style="font-weight:700;color:var(--navy)">Afficher l'encart en bas de page</span>
        <span class="toggle-oui-non ${PARTENAIRES_VISIBLE?'on':'off'}" id="pm-visible"><span class="t-oui">OUI</span><span class="t-non">NON</span></span>
      </div>
      <div class="row2" style="margin-top:10px">
        <label class="field" style="margin:0"><span>Affichage</span><div class="seg" style="width:100%"><button class="${PARTENAIRES_MODE==='fixe'?'active':''}" id="pm-fixe" style="flex:1">Fixe</button><button class="${PARTENAIRES_MODE==='aleatoire'?'active':''}" id="pm-alea" style="flex:1">Aléatoire</button></div></label>
        <label class="field" style="margin:0"><span>Nombre de vignettes</span><input id="pm-count" type="number" min="1" max="12" value="${esc(PARTENAIRES_COUNT)}"></label>
      </div>
    </div>
    <div class="manage-list">${PARTNERS_CACHE.length?PARTNERS_CACHE.map(p=>`<div class="manage-row">
        <span class="pt-mini">${p.logo?`<img src="${p.logo}" alt="">`:`<span class="pt-ph">${esc((p.nom||'?').slice(0,2).toUpperCase())}</span>`}</span>
        <div style="flex:1;min-width:0"><div style="font-weight:700;color:var(--navy)">${esc(p.nom)}</div><div class="mini">${p.adresse?esc(p.adresse):''}${p.prochain_evenement?` · 📅 ${esc(p.prochain_evenement.nom)} (${dateShort(p.prochain_evenement.date_debut)})`:''}</div></div>
        <button class="iconbtn ghost js-pt-edit" data-id="${p.id}">${icon('edit')}</button>
        <button class="iconbtn ghost js-pt-del" data-id="${p.id}">${icon('trash')}</button>
      </div>`).join(''):'<p class="mini">Aucun partenaire pour le moment.</p>'}</div>
    <button class="btn light small" id="pt-add" style="margin-top:4px">${icon('plus')} Ajouter un partenaire</button>
    ${PT_INTAB?'':'<div class="buttons" style="margin-top:14px"><button class="btn" onclick="closeModal()">Fermer</button></div>'}`;
  const setMode=async m=>{ try{ await api('/api/config',{method:'PUT',body:JSON.stringify({partenaires_mode:m})}); PARTENAIRES_MODE=m; renderPartenaires(); renderPartnersStrip(); }catch(e){ toast(e.message); } };
  $('#pm-fixe').addEventListener('click',()=>setMode('fixe'));
  $('#pm-alea').addEventListener('click',()=>setMode('aleatoire'));
  $('#pm-visible').addEventListener('click',async()=>{ const v=!PARTENAIRES_VISIBLE; try{ await api('/api/config',{method:'PUT',body:JSON.stringify({partenaires_visible:v})}); PARTENAIRES_VISIBLE=v; toast(v?'Encart affiché':'Encart masqué'); renderPartenaires(); renderPartnersStrip(); }catch(e){ toast(e.message); } });
  $('#pm-count').addEventListener('change',async()=>{ const n=Math.max(1,Math.min(12,+$('#pm-count').value||4)); try{ await api('/api/config',{method:'PUT',body:JSON.stringify({partenaires_count:n})}); PARTENAIRES_COUNT=n; toast('Nombre mis à jour'); renderPartnersStrip(); }catch(e){ toast(e.message); } });
  $('#pt-add').addEventListener('click',()=>partenaireEditModal());
  $$('.js-pt-edit').forEach(b=>b.addEventListener('click',()=>partenaireEditModal(PARTNERS_CACHE.find(x=>x.id===+b.dataset.id))));
  $$('.js-pt-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer ce partenaire ?', async()=>{ try{ await api('/api/partenaires/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); await loadPartners(); renderPartenaires(); renderPartnersStrip(); }catch(e){ toast(e.message); } })));
}
function partenaireEditModal(p){
  const e=p||{}; let logo=e.logo||'';
  openModal(`<h3>${p?'Modifier le partenaire':'Nouveau partenaire'}</h3>
    <label class="field"><span>Logo (carré, ≤ 60 Ko)</span>
      <div class="photo-edit">
        <div class="photo-prev" id="pt-logo-prev">${logo?`<img src="${logo}" alt="">`:`<span class="ph">${icon('users','ic')}</span>`}</div>
        <div class="photo-btns">
          <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir un logo<input type="file" id="pt-logo-file" accept="image/*" style="display:none"></label>
          <button type="button" class="btn small red" id="pt-logo-clear">${icon('trash')} Retirer</button>
          <span class="help">Compressé automatiquement. Sinon : <a href="${PHOTO_LINK}" target="_blank" style="color:var(--teal-d);font-weight:700">réduire ici</a>.</span>
        </div>
      </div>
    </label>
    <label class="field"><span>Nom *</span><input id="pt-nom" value="${esc(e.nom)}" placeholder="ex. RGV, Crazy Flip…"></label>
    <label class="field"><span>Email</span><input id="pt-email" value="${esc(e.email||'')}" placeholder="contact@partenaire.fr"></label>
    <div class="row2">
      <label class="field"><span>Téléphone</span><input id="pt-tel" value="${esc(e.telephone||'')}" placeholder="06 12 34 56 78"></label>
      <label class="field"><span>Afficher le téléphone sur le site</span><select id="pt-tel-vis"><option value="0" ${e.telephone_visible?'':'selected'}>Non</option><option value="1" ${e.telephone_visible?'selected':''}>✅ Oui — visible sur le site</option></select></label>
    </div>
    <label class="field"><span>Site internet</span><input id="pt-site" value="${esc(e.site_internet||'')}" placeholder="https://www.partenaire.fr"></label>
    <label class="field"><span>Adresse postale</span><input id="pt-adr" value="${esc(e.adresse)}"></label>
    <label class="field"><span>Notes (privées)</span><textarea id="pt-notes">${esc(e.notes)}</textarea></label>
    <p class="help">Le « prochain événement » se renseigne en liant un événement à ce partenaire (page Événements).</p>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="pt-save">Enregistrer</button></div>`);
  $('#pt-logo-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ logo=data; $('#pt-logo-prev').innerHTML=`<img src="${data}" alt="">`; }); });
  $('#pt-logo-clear').addEventListener('click',()=>{ logo=''; $('#pt-logo-prev').innerHTML=`<span class="ph">${icon('users','ic')}</span>`; });
  $('#pt-save').addEventListener('click',async()=>{
    const body={ nom:$('#pt-nom').value.trim(), email:$('#pt-email').value.trim(), telephone:$('#pt-tel').value.trim(), telephone_visible:$('#pt-tel-vis').value==='1', site_internet:$('#pt-site').value.trim(), adresse:$('#pt-adr').value.trim(), notes:$('#pt-notes').value.trim(), logo };
    if(!body.nom){ toast('Le nom est obligatoire.'); return; }
    try{ await api(p?'/api/partenaires/'+p.id:'/api/partenaires',{method:p?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); await loadPartners(); if($('#pt-body')) renderPartenaires(); renderPartnersStrip(); }catch(err){ toast(err.message); }
  });
}

/* ============================== INVENTAIRE ============================== */
function statutBadge(m){
  if(m.blocages?.some(b=>b.type==='vendu')) return `<span class="statut vendu">Vendu</span>`;
  if(m.fonctionnel===false) return `<span class="statut hs">Hors service</span>`;
  if(m.blocages?.length) return `<span class="statut bloque">Bloqué</span>`;
  return `<span class="statut dispo">Disponible</span>`;
}
let INV_ALL = [];
const INV = { q:'', cat:'', nonfonc:false };
const INV_COLS = [
  { key:'photo', label:'Photo' }, { key:'categorie', label:'Catégorie' }, { key:'emplacement', label:'Emplacement' },
  { key:'proprietaire', label:'Propriétaire' }, { key:'etat', label:'État' }, { key:'fonctionnel', label:'Fonctionnel' }, { key:'statut', label:'Statut' },
];
let INV_VIS = null;
function invColsKey(){ return 'wca_invcols_'+(CURRENT_USER?.login||'anon'); }
function getInvCols(){
  try{ const raw=localStorage.getItem(invColsKey()); if(raw){ const a=JSON.parse(raw); if(Array.isArray(a)) return new Set(a); } }catch{}
  return new Set(INV_COLS.map(c=>c.key));
}
function saveInvCols(set){ try{ localStorage.setItem(invColsKey(), JSON.stringify([...set])); }catch{} }
function etatBloque(label){ const e=ETATS.find(x=>x.label===label); return !!(e&&e.bloque); }
function photoCell(m){
  const st=`width:${PHOTO_PX}px;height:${PHOTO_PX}px`;
  if(m.photo) return `<img class="mat-thumb" style="${st}" src="${m.photo}" alt="">`;
  return `<span class="mat-thumb ph" style="${st}">${icon(CAT_ICONS[m.categorie]||'box','ic')}</span>`;
}
function etatBadge(m){
  if(!m.etat) return '—';
  return `<span class="tag ${etatBloque(m.etat)?'amber':'gray'}">${esc(m.etat)}</span>`;
}
async function renderInventaire(){
  await loadConfig(); loadPeople();
  INV_VIS = getInvCols();
  setTopbar('Inventaire', `<button class="btn" id="add-mat">${icon('plus')} Ajouter</button>
    <button class="btn outline" id="cols-btn">${icon('settings')} Colonnes</button>
    <button class="btn grey" id="gerer-btn">${icon('edit')} Gérer</button>`);
  $('#add-mat').addEventListener('click',()=>materielModal());
  $('#cols-btn').addEventListener('click',colonnesModal);
  $('#gerer-btn').addEventListener('click',gererModal);
  view().innerHTML = `${segArchHtml('inventaire')}<div class="toolbar"><div class="search">${icon('search')}<input id="mat-q" value="${esc(INV.q)}" placeholder="Rechercher (nom, catégorie, emplacement)…"></div>
      <button class="btn ${INV.nonfonc?'red':'outline'} small" id="nf-btn" title="Voir le travail à faire pour les WIP">⛔ Non fonctionnels</button></div>
    <div id="cat-pills" class="cat-pills"></div><div id="mat-list"></div>`;
  wireSegArch('inventaire',()=>renderInventaire());
  $('#nf-btn').addEventListener('click',()=>{ INV.nonfonc=!INV.nonfonc; $('#nf-btn').classList.toggle('red',INV.nonfonc); $('#nf-btn').classList.toggle('outline',!INV.nonfonc); renderMatList(); });
  $('#mat-q').addEventListener('input', ()=>{ INV.q=$('#mat-q').value; renderMatList(); });
  loadMatList();
}
async function loadMatList(){
  try{
    INV_ALL = await api('/api/materiel?all=1'); MAT_CACHE = INV_ALL.filter(m=>!m.archive);
    renderCatPills(); renderMatList();
  }catch(e){ const el=$('#mat-list'); if(el) el.innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
function renderCatPills(){
  const box=$('#cat-pills'); if(!box) return;
  const base=archFilter(INV_ALL,'inventaire');
  const counts={}; base.forEach(m=>{ const c=m.categorie||'Autre'; counts[c]=(counts[c]||0)+1; });
  const present=CATEGORIES.filter(c=>counts[c]);
  if(INV.cat && !counts[INV.cat]) INV.cat='';
  const pill=(id,ic,label,n,active)=>`<button class="cat-pill ${active?'on':''}" data-cat="${esc(id)}">${icon(ic,'ic')}<span>${esc(label)}</span><b>${n}</b></button>`;
  box.innerHTML = pill('','box','Tous',base.length,INV.cat==='') +
    present.map(c=>pill(c,CAT_ICONS[c]||'box',c,counts[c],INV.cat===c)).join('');
  $$('#cat-pills .cat-pill').forEach(b=>b.addEventListener('click',()=>{ INV.cat=b.dataset.cat; renderCatPills(); renderMatList(); }));
}
function renderMatList(){
  const el=$('#mat-list'); if(!el) return;
  const q=(INV.q||'').trim().toLowerCase();
  const base=archFilter(INV_ALL,'inventaire');
  const list=base.filter(m=>{
    if(INV.nonfonc && m.fonctionnel!==false) return false;
    if(INV.cat && (m.categorie||'Autre')!==INV.cat) return false;
    if(q && ![m.denomination,m.categorie,m.emplacement,m.numero_serie].some(v=>(v||'').toLowerCase().includes(q))) return false;
    return true;
  });
  if(!base.length){ el.innerHTML=`<div class="empty-state">${ARCH.inventaire?'Aucun matériel archivé.':'Aucun matériel. Cliquez sur « Ajouter » pour démarrer.'}</div>`; return; }
  if(!list.length){ el.innerHTML=`<div class="empty-state">Aucun matériel dans cette sélection.</div>`; return; }
  const vis=INV_VIS||getInvCols(); const show=k=>vis.has(k);
  let head='';
  if(show('photo')) head+='<th class="col-photo"></th>';
  head+='<th>Dénomination</th>';
  if(show('categorie')) head+='<th>Catégorie</th>';
  if(show('emplacement')) head+='<th>Emplacement</th>';
  if(show('proprietaire')) head+='<th>Propriétaire</th>';
  if(show('etat')) head+='<th>État</th>';
  if(show('fonctionnel')) head+='<th>Fonctionnel</th>';
  if(show('statut')) head+='<th>Statut</th>';
  head+='<th></th>';
  const rows=list.map(m=>{
    let r='';
    if(show('photo')) r+=`<td data-label="" class="col-photo"><span class="js-mat-open" data-id="${m.id}" title="Voir la fiche">${photoCell(m)}</span></td>`;
    r+=`<td data-label="Dénomination"><div class="pcell"><div><strong class="js-mat-open" data-id="${m.id}" title="Voir la fiche">${esc(m.denomination)}</strong>${m.en_wip?' <span class="statut wip">EN WIP</span>':''}${m.numero_serie?`<div class="sub">N° ${esc(m.numero_serie)}</div>`:''}</div></div></td>`;
    if(show('categorie')) r+=`<td data-label="Catégorie">${m.categorie?`<span class="tag-cat">${icon(CAT_ICONS[m.categorie]||'box','ic')}${esc(m.categorie)}</span>`:'—'}</td>`;
    if(show('emplacement')) r+=`<td data-label="Emplacement">${esc(m.emplacement)||'—'}</td>`;
    if(show('proprietaire')) r+=`<td data-label="Propriétaire">${m.proprietaire?`<span class="tag blue">${esc(m.proprietaire)}</span>`:'—'}${m.proprietaire_nom?`<div class="sub">${esc(m.proprietaire_nom)}</div>`:''}</td>`;
    if(show('etat')) r+=`<td data-label="État">${etatBadge(m)}</td>`;
    if(show('fonctionnel')) r+=`<td data-label="Fonctionnel"><span class="toggle-oui-non ${m.fonctionnel!==false?'on':'off'}" data-id="${m.id}"><span class="t-oui">OUI</span><span class="t-non">NON</span></span></td>`;
    if(show('statut')) r+=`<td data-label="Statut">${statutBadge(m)}${m.blocages?.filter(b=>b.type!=='panne'&&b.type!=='vendu').length?`<div class="mini">${m.blocages.filter(b=>b.type!=='panne'&&b.type!=='vendu').map(b=>esc(b.label)).join(', ')}</div>`:''}</td>`;
    r+=`<td data-label="" class="cell-actions"><div class="row-actions"><button class="iconbtn ghost js-dup" data-id="${m.id}" title="Dupliquer">${icon('copy')}</button><button class="iconbtn ghost js-edit" data-id="${m.id}" title="Modifier">${icon('edit')}</button>${archHtml('materiel',m.id,m.archive)}<button class="iconbtn ghost js-del" data-id="${m.id}" title="Supprimer">${icon('trash')}</button></div></td>`;
    return `<tr>${r}</tr>`;
  }).join('');
  el.innerHTML = `<div class="tablecard"><table class="grid"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  $$('.toggle-oui-non').forEach(t=>t.addEventListener('click',async()=>{
    try{ const r=await api(`/api/materiel/${t.dataset.id}/fonctionnel`,{method:'POST',body:JSON.stringify({})}); toast(r.fonctionnel?'Marqué fonctionnel ✅':'Marqué hors service ⛔'); loadMatList(); }catch(e){ toast(e.message); }
  }));
  $$('.js-mat-open').forEach(e=>e.addEventListener('click',()=>materielModal(INV_ALL.find(m=>m.id===+e.dataset.id))));
  $$('.js-dup').forEach(b=>b.addEventListener('click',()=>materielModal(INV_ALL.find(m=>m.id===+b.dataset.id), true)));
  $$('.js-edit').forEach(b=>b.addEventListener('click',()=>materielModal(INV_ALL.find(m=>m.id===+b.dataset.id))));
  wireArch(()=>loadMatList());
  $$('.js-del').forEach(b=>b.addEventListener('click',()=>{ const m=INV_ALL.find(x=>x.id===+b.dataset.id); confirmModal(`Supprimer « ${m.denomination} » ? Les devis/réparations liés seront nettoyés.`, async()=>{ try{ await api('/api/materiel/'+m.id,{method:'DELETE'}); toast('Supprimé'); loadMatList(); }catch(e){ toast(e.message); } }); }));
}
function cropSquare(file, size, cb){
  const img=new Image(); const url=URL.createObjectURL(file);
  img.onload=()=>{ const s=Math.min(img.width,img.height); const sx=(img.width-s)/2, sy=(img.height-s)/2;
    const cv=document.createElement('canvas'); cv.width=size; cv.height=size; const ctx=cv.getContext('2d');
    ctx.drawImage(img, sx,sy,s,s, 0,0,size,size); URL.revokeObjectURL(url); cb(cv.toDataURL('image/jpeg',0.85)); };
  img.onerror=()=>{ URL.revokeObjectURL(url); toast('Image illisible.'); };
  img.src=url;
}
function materielModal(m, dup){
  const isEdit = m && !dup;
  const e=m||{};
  let photoData=e.photo||'';
  openModal(`<h3>${dup?'Dupliquer le matériel':(isEdit?'Modifier le matériel':'Nouveau matériel')}</h3>
    <label class="field"><span>Photo (recadrée en carré)</span>
      <div class="photo-edit">
        <div class="photo-prev" id="f-photo-prev">${photoData?`<img src="${photoData}" alt="">`:`<span class="ph">${icon('box','ic')}</span>`}</div>
        <div class="photo-btns">
          <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir une photo<input type="file" id="f-photo-file" accept="image/*" style="display:none"></label>
          <button type="button" class="btn small red" id="f-photo-clear">${icon('trash')} Retirer</button>
          <span class="help">Carré imposé, compressé sous 60 Ko. Sinon : <a href="${PHOTO_LINK}" target="_blank" style="color:var(--teal-d);font-weight:700">réduire la photo ici</a>.</span>
        </div>
      </div>
    </label>
    <label class="field"><span>Dénomination *</span><input id="f-denom" value="${esc(e.denomination)}${dup?' (copie)':''}" placeholder="ex. Borne Pac-Man, Flipper Addams Family"></label>
    <div class="row2">
      <label class="field"><span>Catégorie</span><div class="sel-add"><select id="f-cat"><option value="">— Aucune</option>${CATEGORIES.map(c=>`<option ${e.categorie===c?'selected':''}>${c}</option>`).join('')}</select><button type="button" class="qa-btn" id="f-cat-add" title="Ajouter une catégorie" aria-label="Ajouter une catégorie">${icon('plus')}</button></div></label>
      <label class="field"><span>N° de série</span><input id="f-serie" value="${esc(e.numero_serie)}"></label>
    </div>
    <div class="row2">
      <label class="field"><span>Emplacement</span><input id="f-empl" value="${esc(e.emplacement)}" placeholder="ex. Local Marseille, Étagère B3"></label>
      <label class="field"><span>Valeur (€)</span><input id="f-val" type="number" min="0" step="0.01" value="${esc(e.valeur)}"></label>
    </div>
    <div class="row2">
      <label class="field"><span>Fonctionnel</span><select id="f-fonc"><option value="1" ${e.fonctionnel!==false?'selected':''}>✅ Oui</option><option value="0" ${e.fonctionnel===false?'selected':''}>⛔ Non (hors service)</option></select></label>
      <label class="field"><span>État</span><div class="sel-add"><select id="f-etat"><option value="">— Aucun</option>${ETATS.map(et=>`<option value="${esc(et.label)}" ${e.etat===et.label?'selected':''}>${esc(et.label)}${et.bloque?' (bloque)':''}</option>`).join('')}</select><button type="button" class="qa-btn" id="f-etat-add" title="Ajouter un état" aria-label="Ajouter un état">${icon('plus')}</button></div></label>
    </div>
    <div class="row2">
      <label class="field"><span>Propriétaire</span><div class="sel-add"><select id="f-prop"><option value="">— Non précisé</option>${PROPRIETAIRES.map(pr=>`<option ${e.proprietaire===pr?'selected':''}>${esc(pr)}</option>`).join('')}</select><button type="button" class="qa-btn" id="f-prop-add" title="Ajouter un propriétaire" aria-label="Ajouter un propriétaire">${icon('plus')}</button></div></label>
      <label class="field"><span>Nom du propriétaire</span><input id="f-propnom" list="people-dl" value="${esc(e.proprietaire_nom)}" placeholder="utilisateur ou partenaire…">${peopleDatalist('people-dl')}</label>
    </div>
    <label class="field"><span>Notes</span><textarea id="f-notes">${esc(e.notes)}</textarea></label>
    <div class="row2">
      <label class="field"><span>Visible sur le site public</span><select id="f-vissite"><option value="0" ${e.visible_site?'':'selected'}>Non</option><option value="1" ${e.visible_site?'selected':''}>✅ Oui — affichée sur westcoastarcades.fr</option></select></label>
      <label class="field"><span>Description (site public)</span><input id="f-descsite" value="${esc(e.description_site||'')}" placeholder="texte court affiché sur le site"></label>
    </div>
    <div class="row2">
      <label class="field"><span>À vendre sur le site</span><select id="f-avendre"><option value="0" ${e.a_vendre?'':'selected'}>Non</option><option value="1" ${e.a_vendre?'selected':''}>🏷️ Oui — proposé à la vente</option></select></label>
      <label class="field"><span>Prix de vente affiché</span><input id="f-prixvente" value="${esc(e.prix_vente||'')}" placeholder="ex. 1200 € ou Nous consulter"></label>
    </div>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button>${isEdit?`<button class="btn wipper" id="f-wip" type="button">${icon('calendar')} WIPPER</button>`:''}<button class="btn" id="f-save">Enregistrer</button></div>`);
  $('#f-wip')?.addEventListener('click',()=>wipperModal(m.id, m.denomination));
  $('#f-photo-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ photoData=data; $('#f-photo-prev').innerHTML=`<img src="${data}" alt="">`; }); });
  $('#f-photo-clear').addEventListener('click',()=>{ photoData=''; $('#f-photo-prev').innerHTML=`<span class="ph">${icon('box','ic')}</span>`; });
  quickAddSelect($('#f-cat'), $('#f-cat-add'), { placeholder:'Nouvelle catégorie…', create: async txt=>{ await api('/api/categories',{method:'POST',body:JSON.stringify({value:txt})}); if(!CATEGORIES.includes(txt)) CATEGORIES.push(txt); return {value:txt,label:txt}; } });
  quickAddSelect($('#f-etat'), $('#f-etat-add'), { placeholder:'Nouvel état…', create: async txt=>{ await api('/api/etats',{method:'POST',body:JSON.stringify({label:txt})}); if(!ETATS.some(x=>x.label===txt)) ETATS.push({label:txt,bloque:false}); return {value:txt,label:txt}; } });
  quickAddSelect($('#f-prop'), $('#f-prop-add'), { placeholder:'Nouveau propriétaire…', create: async txt=>{ await api('/api/proprietaires',{method:'POST',body:JSON.stringify({value:txt})}); if(!PROPRIETAIRES.includes(txt)) PROPRIETAIRES.push(txt); return {value:txt,label:txt}; } });
  $('#f-save').addEventListener('click',async()=>{
    const body={ denomination:$('#f-denom').value.trim(), categorie:$('#f-cat').value, numero_serie:$('#f-serie').value.trim(), emplacement:$('#f-empl').value.trim(), valeur:$('#f-val').value, notes:$('#f-notes').value.trim(), fonctionnel:$('#f-fonc').value==='1', etat:$('#f-etat').value, proprietaire:$('#f-prop').value, proprietaire_nom:$('#f-propnom').value.trim(), photo:photoData, visible_site:$('#f-vissite').value==='1', description_site:$('#f-descsite').value.trim(), a_vendre:$('#f-avendre').value==='1', prix_vente:$('#f-prixvente').value.trim() };
    if(!body.denomination){ toast('La dénomination est obligatoire.'); return; }
    try{ await api(isEdit?'/api/materiel/'+m.id:'/api/materiel',{method:isEdit?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast(dup?'Copie créée':'Enregistré'); loadMatList(); }catch(err){ toast(err.message); }
  });
}

function colonnesModal(){
  const vis=INV_VIS||getInvCols();
  openModal(`<h3>Colonnes affichées</h3>
    <p class="help" style="margin-bottom:10px">Votre choix est mémorisé sur cet appareil pour votre compte.</p>
    <div class="cat-picker">${INV_COLS.map(c=>`<label class="cat-opt"><input type="checkbox" class="js-col" value="${c.key}" ${vis.has(c.key)?'checked':''}><span>${c.label}</span></label>`).join('')}</div>
    <p class="help">« Dénomination » et les actions restent toujours visibles.</p>
    <div class="buttons" style="margin-top:10px"><button class="btn" onclick="closeModal()">Fermer</button></div>`);
  $$('.js-col').forEach(c=>c.addEventListener('change',()=>{
    const set=new Set($$('.js-col').filter(x=>x.checked).map(x=>x.value));
    INV_VIS=set; saveInvCols(set); renderMatList();
  }));
}
async function gererModal(){
  await loadConfig();
  openModal(`<div id="gerer-body"></div>`);
  renderGerer();
}
async function afterCfg(){ await loadConfig(); if($('#gerer-body')) renderGerer(); if($('#mat-list')) loadMatList(); }
function renderGerer(){
  const body=$('#gerer-body'); if(!body) return;
  body.innerHTML = `<h3>Gérer l'inventaire</h3>
    <div class="section-title" style="margin-top:0">Catégories</div>
    <div class="manage-list">${CATEGORIES.length?CATEGORIES.map(c=>`<div class="manage-row">
        <span class="mr-ico">${icon(CAT_ICONS[c]||'box','ic')}</span>
        <input class="mr-input js-cat-name" data-old="${esc(c)}" value="${esc(c)}">
        <button class="iconbtn ghost js-cat-del" data-v="${esc(c)}" title="Supprimer">${icon('trash')}</button>
      </div>`).join(''):'<p class="mini">Aucune catégorie.</p>'}</div>
    <div class="add-row"><input id="cat-new" placeholder="Nouvelle catégorie…"><button class="btn small" id="cat-add">${icon('plus')} Ajouter</button></div>

    <div class="section-title">États du matériel</div>
    <p class="help" style="margin-bottom:8px">Cochez « bloque » si l'état rend le matériel indisponible (dispo/devis).</p>
    <div class="manage-list">${ETATS.length?ETATS.map(et=>`<div class="manage-row">
        <input class="mr-input js-etat-name" data-old="${esc(et.label)}" value="${esc(et.label)}">
        <label class="mr-bloque"><input type="checkbox" class="js-etat-bloque" data-label="${esc(et.label)}" ${et.bloque?'checked':''}> bloque</label>
        <button class="iconbtn ghost js-etat-del" data-v="${esc(et.label)}" title="Supprimer">${icon('trash')}</button>
      </div>`).join(''):'<p class="mini">Aucun état.</p>'}</div>
    <div class="add-row"><input id="etat-new" placeholder="Nouvel état…"><label class="mr-bloque"><input type="checkbox" id="etat-new-bloque"> bloque</label><button class="btn small" id="etat-add">${icon('plus')} Ajouter</button></div>

    <div class="section-title">Propriétaires</div>
    <div class="manage-list">${PROPRIETAIRES.length?PROPRIETAIRES.map(pr=>`<div class="manage-row">
        <input class="mr-input js-prop-name" data-old="${esc(pr)}" value="${esc(pr)}">
        <button class="iconbtn ghost js-prop-del" data-v="${esc(pr)}" title="Supprimer">${icon('trash')}</button>
      </div>`).join(''):'<p class="mini">Aucun propriétaire.</p>'}</div>
    <div class="add-row"><input id="prop-new" placeholder="Nouveau propriétaire…"><button class="btn small" id="prop-add">${icon('plus')} Ajouter</button></div>

    <div class="section-title">Taille des photos (affichage)</div>
    <div class="add-row"><input id="photo-px" type="number" min="20" max="200" value="${PHOTO_PX}" style="max-width:110px"><span class="mini">px</span><button class="btn small" id="photo-save">Appliquer</button></div>

    <div class="buttons" style="margin-top:14px"><button class="btn" onclick="closeModal()">Fermer</button></div>`;
  // Catégories
  $('#cat-add').addEventListener('click',async()=>{ const v=$('#cat-new').value.trim(); if(!v) return; try{ await api('/api/categories',{method:'POST',body:JSON.stringify({value:v})}); toast('Catégorie ajoutée'); afterCfg(); }catch(e){ toast(e.message); } });
  $$('.js-cat-name').forEach(inp=>inp.addEventListener('change',async()=>{ const old=inp.dataset.old, nw=inp.value.trim(); if(!nw||nw===old){ inp.value=old; return; } try{ await api('/api/categories',{method:'PUT',body:JSON.stringify({old,new:nw})}); toast('Catégorie renommée'); afterCfg(); }catch(e){ toast(e.message); inp.value=old; } }));
  $$('.js-cat-del').forEach(b=>b.addEventListener('click',()=>{ const v=b.dataset.v; confirmModal(`Supprimer la catégorie « ${v} » ? Le matériel concerné passera « sans catégorie ».`, async()=>{ try{ await api('/api/categories',{method:'DELETE',body:JSON.stringify({value:v})}); toast('Catégorie supprimée'); gererModal(); if($('#mat-list')) loadMatList(); }catch(e){ toast(e.message); } }); }));
  // États
  $('#etat-add').addEventListener('click',async()=>{ const label=$('#etat-new').value.trim(); if(!label) return; try{ await api('/api/etats',{method:'POST',body:JSON.stringify({label,bloque:$('#etat-new-bloque').checked})}); toast('État ajouté'); afterCfg(); }catch(e){ toast(e.message); } });
  $$('.js-etat-name').forEach(inp=>inp.addEventListener('change',async()=>{ const old=inp.dataset.old, nw=inp.value.trim(); if(!nw||nw===old){ inp.value=old; return; } try{ await api('/api/etats',{method:'PUT',body:JSON.stringify({old,new:nw})}); toast('État renommé'); afterCfg(); }catch(e){ toast(e.message); inp.value=old; } }));
  $$('.js-etat-bloque').forEach(cb=>cb.addEventListener('change',async()=>{ try{ await api('/api/etats',{method:'PUT',body:JSON.stringify({old:cb.dataset.label,bloque:cb.checked})}); toast('État mis à jour'); afterCfg(); }catch(e){ toast(e.message); cb.checked=!cb.checked; } }));
  $$('.js-etat-del').forEach(b=>b.addEventListener('click',()=>{ const v=b.dataset.v; confirmModal(`Supprimer l'état « ${v} » ? Le matériel concerné n'aura plus d'état.`, async()=>{ try{ await api('/api/etats',{method:'DELETE',body:JSON.stringify({label:v})}); toast('État supprimé'); gererModal(); if($('#mat-list')) loadMatList(); }catch(e){ toast(e.message); } }); }));
  // Propriétaires
  $('#prop-add').addEventListener('click',async()=>{ const v=$('#prop-new').value.trim(); if(!v) return; try{ await api('/api/proprietaires',{method:'POST',body:JSON.stringify({value:v})}); toast('Propriétaire ajouté'); afterCfg(); }catch(e){ toast(e.message); } });
  $$('.js-prop-name').forEach(inp=>inp.addEventListener('change',async()=>{ const old=inp.dataset.old, nw=inp.value.trim(); if(!nw||nw===old){ inp.value=old; return; } try{ await api('/api/proprietaires',{method:'PUT',body:JSON.stringify({old,new:nw})}); toast('Renommé'); afterCfg(); }catch(e){ toast(e.message); inp.value=old; } }));
  $$('.js-prop-del').forEach(b=>b.addEventListener('click',()=>{ const v=b.dataset.v; confirmModal(`Supprimer « ${v} » ?`, async()=>{ try{ await api('/api/proprietaires',{method:'DELETE',body:JSON.stringify({value:v})}); toast('Supprimé'); afterCfg(); }catch(e){ toast(e.message); } }); }));
  // Taille photo
  $('#photo-save').addEventListener('click',async()=>{ try{ await api('/api/config',{method:'PUT',body:JSON.stringify({photo_px:+$('#photo-px').value||40})}); toast('Taille appliquée'); afterCfg(); }catch(e){ toast(e.message); } });
}

/* ============================== DEVIS ============================== */
const DEVIS_STATUTS = { brouillon:'Brouillon', envoye:'Envoyé', accepte:'Accepté', refuse:'Refusé' };
let DEV_TAB='devis';
async function renderDevis(){
  await loadConfig();
  setTopbar('Devis', DEV_TAB==='devis'?`<button class="btn" id="add-dv">${icon('plus')} Nouveau devis</button>`:'');
  $('#add-dv')?.addEventListener('click',()=>devisModal());
  view().innerHTML = `<div class="tabs-row">
      <button class="${DEV_TAB==='devis'?'active':''}" id="dt-devis">${icon('doc')} Devis</button>
      <button class="${DEV_TAB==='tarifs'?'active':''}" id="dt-tarifs">${icon('tag')} Tarifs</button>
      <button class="${DEV_TAB==='calc'?'active':''}" id="dt-calc">${icon('settings')} Calculatrice</button>
    </div><div id="dev-body"></div>`;
  $('#dt-devis').addEventListener('click',()=>{ DEV_TAB='devis'; renderDevis(); });
  $('#dt-tarifs').addEventListener('click',()=>{ DEV_TAB='tarifs'; renderDevis(); });
  $('#dt-calc').addEventListener('click',()=>{ DEV_TAB='calc'; renderDevis(); });
  if(DEV_TAB==='devis'){ $('#dev-body').innerHTML=`${segArchHtml('devis')}<div class="card" style="margin-bottom:14px;background:var(--teal-l);border-color:#b6e3e8"><strong>ℹ️ Blocage automatique</strong><p class="help">Un devis actif (brouillon, envoyé ou accepté) <strong>réserve le matériel</strong> sur sa période. Passez-le en « Refusé » pour libérer le matériel.</p></div><div id="dv-list"></div>`; wireSegArch('devis',()=>renderDevis()); loadDevisList(); }
  else if(DEV_TAB==='tarifs'){ renderTarifs(); }
  else { renderCalculatrice(); }
}
async function loadDevisList(){
  try{
    const list = archFilter(await api('/api/devis'),'devis');
    if(!list.length){ $('#dv-list').innerHTML=`<div class="empty-state">${ARCH.devis?'Aucun devis archivé.':'Aucun devis pour le moment.'}</div>`; return; }
    $('#dv-list').innerHTML = list.map(dv=>`<div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
        <div><div style="font-weight:800;color:var(--navy);font-size:16px">${esc(dv.numero)} — ${esc(dv.client_nom)}</div>
          <div class="mini">${dv.lieu?esc(dv.lieu)+' · ':''}${dateShort(dv.date_debut)} → ${dateShort(dv.date_fin)}</div></div>
        <div style="text-align:right"><span class="pill-st ${dv.statut}">${DEVIS_STATUTS[dv.statut]||dv.statut}</span><div style="font-weight:800;color:var(--teal-d);font-size:18px;margin-top:4px">${euros(dv.total)}</div></div>
      </div>
      <div class="blocks-list" style="margin-top:10px">${(dv.lignes||[]).map(l=>`<span class="tag gray">${esc(l.denomination)}${l.quantite>1?' ×'+l.quantite:''}</span>`).join('')||'<span class="mini">Aucune ligne</span>'}</div>
      <div class="buttons" style="margin-top:12px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">
        <button class="btn small grey js-dv-edit" data-id="${dv.id}">${icon('edit')} Modifier</button>
        <select class="js-dv-stat btn small" data-id="${dv.id}" style="padding:8px;font-weight:700;color:var(--navy);background:#eef2f7;border:none">
          ${Object.entries(DEVIS_STATUTS).map(([k,v])=>`<option value="${k}" ${dv.statut===k?'selected':''}>${v}</option>`).join('')}
        </select>
        <button class="btn small ${dv.archive?'light':'outline'} js-arch" data-type="devis" data-id="${dv.id}" data-ar="${dv.archive?1:0}">${icon(dv.archive?'undo':'archive')} ${dv.archive?'Désarchiver':'Archiver'}</button>
        <button class="btn small red js-dv-del" data-id="${dv.id}">${icon('trash')} Supprimer</button>
      </div></div>`).join('');
    wireArch(()=>loadDevisList());
    $$('.js-dv-edit').forEach(b=>b.addEventListener('click',async()=>{ const dv=await api('/api/devis/'+b.dataset.id); devisModal(dv); }));
    $$('.js-dv-stat').forEach(s=>s.addEventListener('change',async()=>{ try{ await api(`/api/devis/${s.dataset.id}/statut`,{method:'POST',body:JSON.stringify({statut:s.value})}); toast('Statut mis à jour'); loadDevisList(); }catch(e){ toast(e.message); } }));
    $$('.js-dv-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer ce devis ? Le matériel sera libéré.', async()=>{ try{ await api('/api/devis/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadDevisList(); }catch(e){ toast(e.message); } })));
  }catch(e){ $('#dv-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
async function devisModal(dv, prefill){
  await loadMateriel();
  const e=dv||prefill||{}; let lignes=(e.lignes||[]).map(l=>({materiel_id:l.materiel_id,prix:l.prix,quantite:l.quantite||1}));
  openModal(`<h3>${dv?'Modifier le devis':'Nouveau devis'}</h3>
    <div class="row2">
      <label class="field"><span>Client *</span><input id="d-client" value="${esc(e.client_nom)}"></label>
      <label class="field"><span>Contact</span><input id="d-contact" value="${esc(e.client_contact)}" placeholder="tél. / email"></label>
    </div>
    <label class="field"><span>Lieu / événement</span><input id="d-lieu" value="${esc(e.lieu)}"></label>
    <div class="row2">
      <label class="field"><span>Du</span><input id="d-deb" type="date" value="${esc(e.date_debut)||todayISO()}"></label>
      <label class="field"><span>Au</span><input id="d-fin" type="date" value="${esc(e.date_fin)||todayISO()}"></label>
    </div>
    <div class="section-title">Matériel réservé</div>
    <div id="d-lignes"></div>
    <button class="btn light small" id="d-addline" style="margin-top:4px">${icon('plus')} Ajouter une ligne</button>
    <div class="row2" style="margin-top:12px">
      <label class="field"><span>Remise (€)</span><input id="d-remise" type="number" min="0" step="0.01" value="${esc(e.remise)}"></label>
      <label class="field"><span>Statut</span><select id="d-statut">${Object.entries(DEVIS_STATUTS).map(([k,v])=>`<option value="${k}" ${(e.statut||'brouillon')===k?'selected':''}>${v}</option>`).join('')}</select></label>
    </div>
    <label class="field"><span>Notes</span><textarea id="d-notes">${esc(e.notes)}</textarea></label>
    <div class="devis-total"><span>Total estimé</span><span class="dt-val" id="d-total">€0,00</span></div>
    <div class="buttons" style="margin-top:14px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="d-save">Enregistrer</button></div>`, {persist:true});
  function renderLignes(){
    $('#d-lignes').innerHTML = lignes.map((l,i)=>`<div class="ligne">
        <select class="l-name js-l-mat" data-i="${i}">${matOptions(l.materiel_id)}</select>
        <input class="l-qte js-l-qte" data-i="${i}" type="number" min="1" value="${l.quantite||1}" title="Quantité">
        <input class="l-prix js-l-prix" data-i="${i}" type="number" min="0" step="0.01" value="${l.prix||''}" placeholder="Prix €">
        <button class="iconbtn ghost js-l-del" data-i="${i}">${icon('x')}</button>
      </div>`).join('') || '<p class="mini">Aucune ligne. Ajoutez du matériel à réserver.</p>';
    $$('.js-l-mat').forEach(s=>s.addEventListener('change',()=>{ lignes[+s.dataset.i].materiel_id=+s.value; checkConflicts(); }));
    $$('.js-l-qte').forEach(s=>s.addEventListener('input',()=>{ lignes[+s.dataset.i].quantite=+s.value||1; }));
    $$('.js-l-prix').forEach(s=>s.addEventListener('input',()=>{ lignes[+s.dataset.i].prix=+s.value||0; updateTotal(); }));
    $$('.js-l-del').forEach(b=>b.addEventListener('click',()=>{ lignes.splice(+b.dataset.i,1); renderLignes(); updateTotal(); checkConflicts(); }));
    updateTotal();
  }
  function updateTotal(){ const ht=lignes.reduce((s,l)=>s+(+l.prix||0)*(+l.quantite||1),0); const t=Math.max(0,ht-(+$('#d-remise').value||0)); $('#d-total').textContent=euros(t); }
  async function checkConflicts(){
    const from=$('#d-deb').value, to=$('#d-fin').value; if(!from||!to) return;
    try{
      const dispo = await api(`/api/disponibilite?from=${from}&to=${to}${dv?('&exclude_devis='+dv.id):''}${e.evenement_id?('&exclude_event='+e.evenement_id):''}`);
      $$('#d-lignes .ligne').forEach((row,i)=>{
        const mid=lignes[i]?.materiel_id; const info=dispo.find(x=>x.id===mid);
        row.querySelector('.l-warn')?.remove();
        if(info && !info.dispo){ const w=document.createElement('span'); w.className='l-warn'; w.textContent='⚠ '+info.raisons.map(r=>r.label).join(', '); row.appendChild(w); }
      });
    }catch{}
  }
  $('#d-addline').addEventListener('click',()=>{ lignes.push({materiel_id:MAT_CACHE[0]?.id,prix:0,quantite:1}); renderLignes(); checkConflicts(); });
  $('#d-remise').addEventListener('input',updateTotal);
  $('#d-deb').addEventListener('change',checkConflicts); $('#d-fin').addEventListener('change',checkConflicts);
  renderLignes(); checkConflicts();
  $('#d-save').addEventListener('click',async()=>{
    const body={ client_nom:$('#d-client').value.trim(), client_contact:$('#d-contact').value.trim(), lieu:$('#d-lieu').value.trim(),
      date_debut:$('#d-deb').value, date_fin:$('#d-fin').value, remise:$('#d-remise').value, statut:$('#d-statut').value, notes:$('#d-notes').value.trim(),
      lignes:lignes.filter(l=>l.materiel_id) };
    if(!body.client_nom){ toast('Le nom du client est obligatoire.'); return; }
    try{ await api(dv?'/api/devis/'+dv.id:'/api/devis',{method:dv?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Devis enregistré'); loadDevisList(); }catch(err){ toast(err.message); }
  });
}

/* ---------------------------- Tarifs ---------------------------- */
async function renderTarifs(){
  const body=$('#dev-body'); if(!body) return;
  body.innerHTML='<p class="mini">Chargement…</p>';
  await loadConfig(); await loadMateriel();
  const periods=TARIFS.periodes||[]; const couts=TARIFS.couts||{};
  const coutFields=[['essence_litre','Essence (€/L)'],['conso_100','Conso camion (L/100km)'],['camion_jour','Location camion (€/jour)'],['mo_heure','Main d’œuvre (€/h)'],['couchage_nuit','Couchage (€/nuit/pers.)'],['presence_jour','Présence (€/jour)'],['maintenance_pct','Maintenance (% matériel)']];
  body.innerHTML = `
   <div class="card" style="margin-bottom:12px"><strong>${icon('calendar','ic')} Périodes de location</strong>
     <div class="manage-list" style="margin-top:10px">${periods.length?periods.map((p,i)=>`<div class="manage-row"><input class="mr-input js-per-label" data-i="${i}" value="${esc(p.label)}"><input class="js-per-jours" data-i="${i}" type="number" min="1" value="${esc(p.jours)}" style="max-width:80px" title="jours"><span class="mini">j</span><button class="iconbtn ghost js-per-del" data-i="${i}" type="button">${icon('trash')}</button></div>`).join(''):'<p class="mini">Aucune période.</p>'}</div>
     <div class="add-row"><input id="per-new" placeholder="Nouvelle période (ex. Mois)"><input id="per-new-j" type="number" min="1" value="1" style="max-width:80px"><span class="mini">j</span><button class="btn small" id="per-add">${icon('plus')} Ajouter</button></div></div>
   <div class="card" style="margin-bottom:12px"><strong>${icon('tag','ic')} Prix de location par matériel</strong>
     <div class="tablecard" style="margin-top:10px;box-shadow:none;border:none;overflow:auto"><table class="grid"><thead><tr><th>Matériel</th>${periods.map(p=>`<th>${esc(p.label)}</th>`).join('')}</tr></thead>
       <tbody>${MAT_CACHE.map(m=>`<tr><td><strong>${esc(m.denomination)}</strong></td>${periods.map(p=>`<td><input class="js-mat-prix" data-id="${m.id}" data-k="${esc(p.key)}" type="number" min="0" step="0.01" value="${esc((m.tarifs&&m.tarifs[p.key])||'')}" style="max-width:100px"></td>`).join('')}</tr>`).join('')||'<tr><td>Aucun matériel</td></tr>'}</tbody></table></div>
     <p class="help">Saisie enregistrée automatiquement.</p></div>
   <div class="card" style="margin-bottom:12px"><strong>${icon('settings','ic')} Coûts unitaires</strong>
     <div class="row2" style="margin-top:10px">${coutFields.map(([k,l])=>`<label class="field"><span>${l}</span><input class="js-cout" data-k="${k}" type="number" min="0" step="0.01" value="${esc(couts[k]??0)}"></label>`).join('')}</div>
     <button class="btn small" id="couts-save">Enregistrer les coûts</button></div>
   <div class="card"><strong>${icon('plus','ic')} Éléments supplémentaires (à volonté)</strong>
     <div class="manage-list" style="margin-top:10px">${(TARIFS.extras||[]).map((x,i)=>`<div class="manage-row"><input class="mr-input js-extra-label" data-i="${i}" value="${esc(x.label)}"><input class="js-extra-montant" data-i="${i}" type="number" step="0.01" value="${esc(x.montant)}" style="max-width:110px"><span class="mini">€</span><button class="iconbtn ghost js-extra-del" data-i="${i}" type="button">${icon('trash')}</button></div>`).join('')||'<p class="mini">Aucun élément.</p>'}</div>
     <div class="add-row"><input id="extra-new" placeholder="Nouvel élément (ex. Décoration)"><input id="extra-new-m" type="number" step="0.01" value="0" style="max-width:110px"><span class="mini">€</span><button class="btn small" id="extra-add">${icon('plus')} Ajouter</button></div></div>`;
  const saveTarifs=async(patch)=>{ try{ await api('/api/config',{method:'PUT',body:JSON.stringify({tarifs:patch})}); await loadConfig(); }catch(e){ toast(e.message); } };
  $('#per-add').addEventListener('click',async()=>{ const label=$('#per-new').value.trim(); if(!label) return; await saveTarifs({periodes:[...periods.map(p=>({...p})),{label,jours:+$('#per-new-j').value||1}]}); renderTarifs(); toast('Période ajoutée'); });
  $$('.js-per-label').forEach(inp=>inp.addEventListener('change',async()=>{ await saveTarifs({periodes:periods.map((p,i)=>({key:p.key,label:$$('.js-per-label')[i].value,jours:+$$('.js-per-jours')[i].value||1}))}); renderTarifs(); }));
  $$('.js-per-jours').forEach(inp=>inp.addEventListener('change',async()=>{ await saveTarifs({periodes:periods.map((p,i)=>({key:p.key,label:$$('.js-per-label')[i].value,jours:+$$('.js-per-jours')[i].value||1}))}); }));
  $$('.js-per-del').forEach(b=>b.addEventListener('click',async()=>{ await saveTarifs({periodes:periods.filter((_,i)=>i!==+b.dataset.i)}); renderTarifs(); toast('Supprimée'); }));
  $$('.js-mat-prix').forEach(inp=>inp.addEventListener('change',async()=>{ const id=+inp.dataset.id; const m=MAT_CACHE.find(x=>x.id===id); const t=Object.assign({},m.tarifs||{}); const v=inp.value.trim(); if(v==='') delete t[inp.dataset.k]; else t[inp.dataset.k]=+v||0; m.tarifs=t; try{ await api('/api/materiel/'+id,{method:'PUT',body:JSON.stringify({tarifs:t})}); toast('Prix enregistré'); }catch(e){ toast(e.message); } }));
  $('#couts-save').addEventListener('click',async()=>{ const c={}; $$('.js-cout').forEach(inp=>{ c[inp.dataset.k]=+inp.value||0; }); await saveTarifs({couts:c}); toast('Coûts enregistrés'); });
  $('#extra-add').addEventListener('click',async()=>{ const label=$('#extra-new').value.trim(); if(!label) return; await saveTarifs({extras:[...(TARIFS.extras||[]),{label,montant:+$('#extra-new-m').value||0}]}); renderTarifs(); toast('Ajouté'); });
  $$('.js-extra-del').forEach(b=>b.addEventListener('click',async()=>{ await saveTarifs({extras:(TARIFS.extras||[]).filter((_,i)=>i!==+b.dataset.i)}); renderTarifs(); }));
  $$('.js-extra-label,.js-extra-montant').forEach(inp=>inp.addEventListener('change',async()=>{ await saveTarifs({extras:(TARIFS.extras||[]).map((x,i)=>({label:$$('.js-extra-label')[i].value,montant:+$$('.js-extra-montant')[i].value||0}))}); }));
}

/* ---------------------------- Calculatrice ---------------------------- */
async function renderCalculatrice(){
  const body=$('#dev-body'); if(!body) return;
  await loadConfig(); await loadMateriel();
  const periods=TARIFS.periodes||[]; const couts=TARIFS.couts||{};
  let lignesMat=[];
  const matPrix=l=>{ const m=MAT_CACHE.find(x=>x.id===+l.materiel_id); return (m&&m.tarifs&&+m.tarifs[l.periode])||0; };
  body.innerHTML = `<div class="card"><div class="section-title" style="margin-top:0">Estimation des coûts d'une prestation</div>
     <div class="row2"><label class="field"><span>Client</span><input id="c-client"></label><label class="field"><span>Lieu</span><input id="c-lieu"></label></div>
     <div class="row2"><label class="field"><span>Date de départ</span><input id="c-deb" type="date" value="${todayISO()}"></label><label class="field"><span>Date de retour</span><input id="c-fin" type="date" value="${todayISO()}"></label></div>
     <div class="section-title">Matériel loué</div><div id="c-lignes"></div>
     <button class="btn light small" id="c-addline" type="button" style="margin-top:4px">${icon('plus')} Ajouter du matériel</button>
     <div class="section-title">Transport</div>
     <div class="row2"><label class="field"><span>Distance aller (km)</span><input id="c-km" type="number" min="0" value="0"></label><label class="field"><span>Nombre de camions</span><input id="c-camions" type="number" min="0" value="1"></label></div>
     <div class="row2"><label class="field"><span>Essence (€/L)</span><input id="c-ess" type="number" step="0.01" value="${esc(couts.essence_litre)}"></label><label class="field"><span>Conso (L/100km)</span><input id="c-conso" type="number" step="0.1" value="${esc(couts.conso_100)}"></label></div>
     <label class="field"><span>Location camion (€/jour)</span><input id="c-camprix" type="number" step="0.01" value="${esc(couts.camion_jour)}"></label>
     <div class="section-title">Main d'œuvre & présence</div>
     <div class="row2"><label class="field"><span>Personnes</span><input id="c-pers" type="number" min="0" value="2"></label><label class="field"><span>Heures de travail</span><input id="c-heures" type="number" min="0" value="0"></label></div>
     <div class="row2"><label class="field"><span>Tarif horaire (€)</span><input id="c-mo" type="number" step="0.01" value="${esc(couts.mo_heure)}"></label><label class="field"><span>Présence sur place (jours)</span><input id="c-presj" type="number" min="0" value="0"></label></div>
     <label class="field"><span>Présence (€/jour)</span><input id="c-presprix" type="number" step="0.01" value="${esc(couts.presence_jour)}"></label>
     <div class="section-title">Couchage</div>
     <div class="row2"><label class="field"><span>Nuits</span><input id="c-nuits" type="number" min="0" value="0"></label><label class="field"><span>€/nuit/pers. (0 = gratuit)</span><input id="c-couch" type="number" step="0.01" value="${esc(couts.couchage_nuit)}"></label></div>
     <div class="section-title">Maintenance & extras</div>
     <label class="field"><span>Maintenance (% du matériel)</span><input id="c-maint" type="number" step="0.1" value="${esc(couts.maintenance_pct)}"></label>
     <div id="c-extras" class="cat-picker" style="margin-top:6px">${(TARIFS.extras||[]).length?(TARIFS.extras||[]).map((x,i)=>`<label class="cat-opt"><input type="checkbox" class="js-cx" data-i="${i}" data-m="${x.montant}"><span>${esc(x.label)} — ${euros(x.montant)}</span></label>`).join(''):'<p class="mini" style="padding:10px">Aucun élément supplémentaire (ajoutez-en dans Tarifs).</p>'}</div>
     <div class="devis-total"><span>Total estimé</span><span class="dt-val" id="c-total">€0,00</span></div>
     <div id="c-breakdown" class="mini" style="margin-top:8px"></div>
     <div class="buttons" style="margin-top:12px"><button class="btn" id="c-devis">${icon('doc')} Établir un devis</button></div></div>`;
  function renderLignes(){
    $('#c-lignes').innerHTML = lignesMat.length? lignesMat.map((l,i)=>`<div class="ligne">
        <select class="l-name js-cl-mat" data-i="${i}">${MAT_CACHE.map(m=>`<option value="${m.id}" ${l.materiel_id===m.id?'selected':''}>${esc(m.denomination)}</option>`).join('')}</select>
        <select class="js-cl-per" data-i="${i}" style="max-width:130px">${periods.map(p=>`<option value="${esc(p.key)}" ${l.periode===p.key?'selected':''}>${esc(p.label)}</option>`).join('')}</select>
        <span class="l-prix-aff">${euros(matPrix(l))}</span>
        <button class="iconbtn ghost js-cl-del" data-i="${i}" type="button">${icon('x')}</button></div>`).join('') : '<p class="mini">Aucun matériel.</p>';
    $$('.js-cl-mat').forEach(s=>s.addEventListener('change',()=>{ lignesMat[+s.dataset.i].materiel_id=+s.value; renderLignes(); recompute(); }));
    $$('.js-cl-per').forEach(s=>s.addEventListener('change',()=>{ lignesMat[+s.dataset.i].periode=s.value; renderLignes(); recompute(); }));
    $$('.js-cl-del').forEach(b=>b.addEventListener('click',()=>{ lignesMat.splice(+b.dataset.i,1); renderLignes(); recompute(); }));
  }
  function compute(){
    const matTotal=lignesMat.reduce((s,l)=>s+matPrix(l),0);
    const km=+$('#c-km').value||0, camions=+$('#c-camions').value||0, ess=+$('#c-ess').value||0, conso=+$('#c-conso').value||0, camprix=+$('#c-camprix').value||0;
    let jours=Math.round((new Date($('#c-fin').value)-new Date($('#c-deb').value))/86400000)+1; if(!(jours>0)) jours=1;
    const fuel=(km*2)/100*conso*ess*Math.max(1,camions);
    const camionLoc=camions*camprix*jours;
    const mo=(+$('#c-pers').value||0)*(+$('#c-heures').value||0)*(+$('#c-mo').value||0);
    const presence=(+$('#c-presj').value||0)*(+$('#c-presprix').value||0);
    const couchage=(+$('#c-nuits').value||0)*(+$('#c-pers').value||0)*(+$('#c-couch').value||0);
    const maint=matTotal*((+$('#c-maint').value||0)/100);
    let extras=0; $$('.js-cx').forEach(c=>{ if(c.checked) extras+=+c.dataset.m||0; });
    return {matTotal,fuel,camionLoc,mo,presence,couchage,maint,extras,jours,total:matTotal+fuel+camionLoc+mo+presence+couchage+maint+extras};
  }
  function recompute(){ const r=compute(); $('#c-total').textContent=euros(r.total);
    $('#c-breakdown').innerHTML=`Matériel ${euros(r.matTotal)} · Essence ${euros(r.fuel)} · Camions ${euros(r.camionLoc)} · Main d'œuvre ${euros(r.mo)} · Présence ${euros(r.presence)} · Couchage ${euros(r.couchage)} · Maintenance ${euros(r.maint)} · Extras ${euros(r.extras)} · ${r.jours} j`; }
  renderLignes(); recompute();
  $('#c-addline').addEventListener('click',()=>{ lignesMat.push({materiel_id:MAT_CACHE[0]?.id, periode:periods[0]?.key}); renderLignes(); recompute(); });
  body.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',recompute));
  $('#c-devis').addEventListener('click',async()=>{
    const r=compute(); const lignes=[];
    lignesMat.forEach(l=>{ const m=MAT_CACHE.find(x=>x.id===+l.materiel_id); if(m) lignes.push({materiel_id:m.id,prix:matPrix(l),quantite:1}); });
    const addCost=(label,val)=>{ if(val>0) lignes.push({materiel_id:null,designation:label,prix:Math.round(val*100)/100,quantite:1}); };
    addCost('Transport — essence',r.fuel); addCost('Location camion(s)',r.camionLoc); addCost('Main d’œuvre',r.mo); addCost('Présence sur place',r.presence); addCost('Couchage',r.couchage); addCost('Maintenance',r.maint);
    $$('.js-cx').forEach(c=>{ if(c.checked){ const x=(TARIFS.extras||[])[+c.dataset.i]; if(x) addCost(x.label,x.montant); } });
    if(!lignes.length){ toast('Ajoutez au moins un élément.'); return; }
    const bdy={ client_nom:$('#c-client').value.trim()||'Client', lieu:$('#c-lieu').value.trim(), date_debut:$('#c-deb').value, date_fin:$('#c-fin').value, statut:'brouillon', remise:0, lignes, notes:'Estimation prestation — total '+euros(r.total) };
    try{ await api('/api/devis',{method:'POST',body:JSON.stringify(bdy)}); toast('Devis créé ✓'); DEV_TAB='devis'; renderDevis(); }catch(e){ toast(e.message); }
  });
}

/* ============================== ÉVÉNEMENTS + DISPONIBILITÉ ============================== */
let EV_VIEW = (()=>{ try{ return localStorage.getItem('wca_evview')||'cards'; }catch{ return 'cards'; } })();
async function renderEvenements(){
  await loadPartners();
  setTopbar('Événements', `<button class="btn" id="add-ev">${icon('plus')} Nouvel événement</button><button class="btn grey" id="part-btn">${icon('users')} Partenaires</button>`);
  $('#add-ev').addEventListener('click',()=>evenementModal());
  $('#part-btn').addEventListener('click',partenairesModal);
  view().innerHTML = `<div id="ev-hero"></div>
    <div class="card" style="margin-bottom:16px">
      <div class="section-title" style="margin-top:0">Vérifier la disponibilité du parc</div>
      <div class="row2"><label class="field"><span>Du</span><input id="dispo-from" type="date" value="${todayISO()}"></label>
        <label class="field"><span>Au</span><input id="dispo-to" type="date" value="${todayISO()}"></label></div>
      <button class="btn full" id="dispo-go">${icon('check')} Vérifier la disponibilité</button>
      <div id="dispo-res" style="margin-top:16px"></div>
    </div>
    <div class="ev-listhead"><div class="section-title" style="margin:0">Événements planifiés</div>
      <div class="ev-viewtog"><button class="${EV_VIEW==='cards'?'active':''}" id="evv-cards" title="Vue cartes">${icon('box')}</button><button class="${EV_VIEW==='rows'?'active':''}" id="evv-rows" title="Vue liste">${icon('doc')}</button></div>
    </div>${segArchHtml('evenements')}<div id="ev-list"></div>`;
  wireSegArch('evenements',()=>renderEvenements());
  const setEvView=v=>{ EV_VIEW=v; try{ localStorage.setItem('wca_evview',v); }catch{} $('#evv-cards').classList.toggle('active',v==='cards'); $('#evv-rows').classList.toggle('active',v==='rows'); loadEvenements(); };
  $('#evv-cards').addEventListener('click',()=>setEvView('cards'));
  $('#evv-rows').addEventListener('click',()=>setEvView('rows'));
  $('#dispo-go').addEventListener('click',()=>{
    const res=$('#dispo-res');
    if(res.dataset.open==='1'){ res.innerHTML=''; res.dataset.open='0'; setDispoBtn(false); }
    else checkDispo();
  });
  loadEventHero();
  loadEvenements();
}
async function loadEventHero(){
  const box=$('#ev-hero'); if(!box) return;
  try{
    const list=await api('/api/evenements');
    const today=todayISO();
    const ev=list.filter(e=>(e.date_fin||e.date_debut||'')>=today).sort((a,b)=>(a.date_debut||'').localeCompare(b.date_debut||''))[0];
    if(!ev){ box.innerHTML=''; return; }
    const ids=ev.materiel_ids||[]; let complet=null, manque=[];
    if(ids.length){
      try{ const dispo=await api(`/api/disponibilite?from=${ev.date_debut}&to=${ev.date_fin}&exclude_event=${ev.id}`);
        ids.forEach(id=>{ const m=dispo.find(x=>x.id===+id); if(m && !m.dispo) manque.push(m.denomination); });
        complet=manque.length===0;
      }catch{}
    }
    const badge = ids.length ? (complet?`<span class="statut dispo">✓ Matériel complet</span>`:`<span class="statut hs">Matériel incomplet</span>`)
      : `<span class="statut bloque">Aucun matériel rattaché</span>`;
    box.innerHTML = `<div class="ev-hero ${ids.length&&!complet?'warn':''}">
      <div class="eh-media">${ev.partenaire_logo?`<img src="${ev.partenaire_logo}" alt="">`:`<span class="eh-ph">${icon('calendar','ic')}</span>`}</div>
      <div class="eh-body">
        <div class="eh-tag">Prochain événement</div>
        <h3>${esc(ev.nom)}</h3>
        <div class="eh-meta">${ev.partenaire_nom?'🤝 '+esc(ev.partenaire_nom)+' · ':''}${dateShort(ev.date_debut)} → ${dateShort(ev.date_fin)}${ev.lieu?' · '+esc(ev.lieu):''}</div>
        ${ev.notes?`<p class="eh-desc">${esc(ev.notes)}</p>`:''}
        <div class="eh-status">${badge}${manque.length?`<span class="mini">Manque : ${manque.map(esc).join(', ')}</span>`:''}</div>
      </div></div>`;
  }catch{ box.innerHTML=''; }
}
function setDispoBtn(open){
  const b=$('#dispo-go'); if(!b) return;
  b.innerHTML = open ? `${icon('x')} Masquer la disponibilité` : `${icon('check')} Vérifier la disponibilité`;
}
async function checkDispo(){
  const from=$('#dispo-from').value, to=$('#dispo-to').value;
  if(!from||!to){ toast('Renseignez les deux dates.'); return; }
  try{
    const list = await api(`/api/disponibilite?from=${from}&to=${to}`);
    const ok=list.filter(x=>x.dispo).length;
    const res=$('#dispo-res'); res.dataset.open='1'; setDispoBtn(true);
    res.innerHTML = `<div class="recap">${ok} matériel(s) disponible(s) sur ${list.length} du ${dateShort(from)} au ${dateShort(to)}.</div>
      <div class="dispo-grid">${list.map(m=>`<div class="dispo-card ${m.dispo?'ok':'ko'} js-dispo-open" data-id="${m.id}" title="Voir la fiche">
        <div class="dc-top"><h4>${esc(m.denomination)}</h4>${m.dispo?`<span class="statut dispo">Libre</span>`:`<span class="statut hs">Occupé</span>`}</div>
        <div class="dc-cat">${esc(m.categorie)||'—'}${m.emplacement?' · '+esc(m.emplacement):''}</div>
        <div class="dc-raison">${m.dispo?'✓ Disponible':'⚠ '+m.raisons.map(r=>esc(r.label)).join(', ')}</div>
      </div>`).join('')}</div>`;
    $$('.js-dispo-open').forEach(c=>c.addEventListener('click',async()=>{
      const id=+c.dataset.id; let mat=MAT_CACHE.find(x=>x.id===id);
      if(!mat){ try{ mat=(await api('/api/materiel?all=1')).find(x=>x.id===id); }catch{} }
      if(mat) materielModal(mat); else toast('Fiche introuvable.');
    }));
  }catch(e){ $('#dispo-res').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
function evtPrefill(ev){
  return { client_nom:ev.partenaire||'', client_contact:ev.contact||'',
    lieu:[ev.nom,ev.lieu].filter(Boolean).join(' — '),
    date_debut:ev.date_debut, date_fin:ev.date_fin, evenement_id:ev.id,
    lignes:(ev.materiel_ids||[]).map(id=>({materiel_id:+id,prix:0,quantite:1})) };
}
async function loadEvenements(){
  try{
    await loadMateriel();
    const list = archFilter(await api('/api/evenements'),'evenements');
    if(!list.length){ $('#ev-list').innerHTML=`<div class="empty-state">${ARCH.evenements?'Aucun événement archivé.':'Aucun événement planifié.'}</div>`; return; }
    const matName = id => (MAT_CACHE.find(m=>m.id===+id)||{}).denomination || 'Matériel';
    const devisBadge = ev => ev.devis_signe ? '<span class="tag green">✓ Devis signé</span>' : ((ev.devis&&ev.devis.length)?'<span class="tag blue">Devis en cours</span>':'');
    const valideHtml = ev => `<div class="ev-valide-wrap"><span class="ev-cap">Validé&nbsp;?</span><span class="toggle-oui-non ${ev.valide?'on':'off'} js-ev-valide" data-id="${ev.id}" title="Événement validé et complet"><span class="t-oui">OUI</span><span class="t-non">NON</span></span></div>`;
    const actionsHtml = ev => `<div class="row-actions"><button class="iconbtn ghost js-ev-devis" data-id="${ev.id}" title="Créer un devis partenaire">${icon('doc')}</button><button class="iconbtn ghost js-ev-edit" data-id="${ev.id}" title="Modifier">${icon('edit')}</button>${archHtml('evenements',ev.id,ev.archive)}<button class="iconbtn ghost js-ev-del" data-id="${ev.id}" title="Supprimer">${icon('trash')}</button></div>`;
    $('#ev-list').className = 'ev-list-'+EV_VIEW;
    $('#ev-list').innerHTML = list.map(ev=>{
      const ids=ev.materiel_ids||[];
      if(EV_VIEW==='cards'){
        const tags = ids.length ? `<div class="blocks-list" style="margin-top:6px">${ids.slice(0,4).map(id=>`<span class="tag gray">${esc(matName(id))}</span>`).join('')}${ids.length>4?`<span class="tag gray">+${ids.length-4}</span>`:''}</div>` : '';
        return `<div class="ev-card js-ev ${ev.valide?'ev-ok':''}" data-id="${ev.id}">
          <div class="evc-photo">${ev.photo?`<img src="${ev.photo}" alt="">`:`<span class="evc-ph">${icon('calendar','ic')}</span>`}${ev.valide?'<span class="evc-valide">✓ Validé</span>':''}</div>
          <div class="evc-body">
            <div class="evc-title">${esc(ev.nom)}</div>
            <div class="evc-meta">${ev.lieu?esc(ev.lieu)+' · ':''}${dateShort(ev.date_debut)} → ${dateShort(ev.date_fin)}</div>
            ${(ev.partenaire||ev.partenaire_nom)?`<div class="evc-meta">🤝 ${esc(ev.partenaire_nom||ev.partenaire)}</div>`:''}
            ${tags}
            <div class="evc-badges">${devisBadge(ev)}</div>
          </div>
          <div class="evc-foot">${valideHtml(ev)}${actionsHtml(ev)}</div>
        </div>`;
      }
      const tags = ids.length ? `<div class="blocks-list" style="margin-top:8px">${ids.slice(0,6).map(id=>`<span class="tag gray">${esc(matName(id))}</span>`).join('')}${ids.length>6?`<span class="tag gray">+${ids.length-6}</span>`:''}</div>` : '';
      return `<div class="list-item js-ev ${ev.valide?'ev-ok':''}" data-id="${ev.id}" style="align-items:flex-start">
        <div class="ev-rowthumb">${ev.photo?`<img src="${ev.photo}" alt="">`:`<span class="evc-ph">${icon('calendar','ic')}</span>`}</div>
        <div style="flex:1;min-width:0">
        <div style="font-weight:800;color:var(--navy)">${esc(ev.nom)}${ev.valide?' <span class="tag green" style="vertical-align:middle">✓ Validé</span>':''}${devisBadge(ev)?' '+devisBadge(ev):''}</div>
        <div class="sub">${ev.lieu?esc(ev.lieu)+' · ':''}${dateShort(ev.date_debut)} → ${dateShort(ev.date_fin)}${ev.partenaire?' · 🤝 '+esc(ev.partenaire):''}</div>
        ${ev.cree_par_nom?`<div class="mini">Créé par ${esc(ev.cree_par_nom)}${ev.date_creation?' · '+dateTimeShort(ev.date_creation):''}</div>`:''}
        ${tags}</div>
        <div class="ev-side">
          ${valideHtml(ev)}
          ${actionsHtml(ev)}
        </div></div>`;
    }).join('');
    wireArch(()=>loadEvenements());
    $$('.js-ev-valide').forEach(t=>t.addEventListener('click',async e=>{ e.stopPropagation();
      try{ const r=await api(`/api/evenements/${t.dataset.id}/valide`,{method:'POST',body:JSON.stringify({})}); toast(r.valide?'Événement validé ✅':'Événement non validé'); loadEvenements(); }catch(err){ toast(err.message); }
    }));
    $$('.js-ev-edit').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); evenementModal(list.find(x=>x.id===+b.dataset.id)); }));
    $$('.js-ev-devis').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); const ev=list.find(x=>x.id===+b.dataset.id); devisModal(null, evtPrefill(ev)); }));
    $$('.js-ev-del').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); confirmModal('Supprimer cet événement ? Le matériel réservé sera libéré.', async()=>{ try{ await api('/api/evenements/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadEvenements(); }catch(err){ toast(err.message); } }); }));
    $$('.js-ev').forEach(c=>c.addEventListener('click',()=>{ const ev=list.find(x=>x.id===+c.dataset.id); evenementFiche(ev); }));
  }catch(e){ $('#ev-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
function evenementModal(ev){
  const e=ev||{};
  let evMat=new Set((e.materiel_ids||[]).map(Number));
  let evPhoto=e.photo||'';
  let evChamps=(e.champs||[]).map(c=>({label:c.label||'',valeur:c.valeur||''}));
  openModal(`<h3>${ev?'Modifier l\'événement':'Nouvel événement'}</h3>
    ${ev&&e.cree_par_nom?`<p class="help" style="margin:-6px 0 10px">Créé par <strong>${esc(e.cree_par_nom)}</strong>${e.date_creation?' le '+dateTimeShort(e.date_creation):''}</p>`:''}
    <label class="field"><span>Nom *</span><input id="e-nom" value="${esc(e.nom)}" placeholder="ex. Festival rétro Marseille"></label>
    <label class="field"><span>Photo de présentation</span>
      <div class="photo-edit">
        <div class="photo-prev" id="e-photo-prev">${evPhoto?`<img src="${evPhoto}" alt="">`:`<span class="ph">${icon('calendar','ic')}</span>`}</div>
        <div class="photo-btns">
          <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir une photo<input type="file" id="e-photo-file" accept="image/*" style="display:none"></label>
          <button type="button" class="btn small red" id="e-photo-clear">${icon('trash')} Retirer</button>
          <span class="help">Recadrée en carré, compressée sous 60 Ko.</span>
        </div>
      </div></label>
    <label class="field"><span>Lieu</span><input id="e-lieu" value="${esc(e.lieu)}"></label>
    <div class="row2"><label class="field"><span>Partenaire</span><input id="e-part" value="${esc(e.partenaire)}" placeholder="ex. Mairie de Marseille"></label>
      <label class="field"><span>Contact partenaire</span><input id="e-contact" value="${esc(e.contact)}" placeholder="tél. / email"></label></div>
    <label class="field"><span>Fiche partenaire liée</span><div class="sel-add"><select id="e-partid"><option value="">— Aucune</option>${PARTNERS_CACHE.map(pp=>`<option value="${pp.id}" ${+e.partenaire_id===pp.id?'selected':''}>${esc(pp.nom)}</option>`).join('')}</select><button type="button" class="qa-btn" id="e-partadd" title="Ajouter un partenaire" aria-label="Ajouter un partenaire">${icon('plus')}</button></div></label>
    <div class="row2"><label class="field"><span>Du</span><input id="e-deb" type="date" value="${esc(e.date_debut)||todayISO()}"></label>
      <label class="field"><span>Au</span><input id="e-fin" type="date" value="${esc(e.date_fin)||todayISO()}"></label></div>
    <label class="field"><span>Descriptif complet</span><textarea id="e-desc" rows="4" placeholder="Présentation de l'événement, programme, public attendu…">${esc(e.description)}</textarea></label>
    <label class="field"><span>Consignes</span><textarea id="e-consignes" rows="3" placeholder="Installation, sécurité, horaires de montage/démontage…">${esc(e.consignes)}</textarea></label>
    <div class="section-title">Informations supplémentaires</div>
    <p class="help" style="margin-bottom:8px">Ajoutez autant de lignes que nécessaire (intitulé + contenu).</p>
    <div id="e-champs"></div>
    <button type="button" class="btn light small" id="e-champ-add" style="margin-top:4px">${icon('plus')} Ajouter une ligne</button>
    <div class="section-title">Matériel libre à réserver</div>
    <p class="help" style="margin-bottom:8px">Le matériel coché est réservé pour la période et devient indisponible ailleurs.</p>
    <div id="e-mat" class="ev-picker"></div>
    <label class="field"><span>Notes</span><textarea id="e-notes">${esc(e.notes)}</textarea></label>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn light" id="e-devis">${icon('doc')} Créer un devis</button><button class="btn" id="e-save">Enregistrer</button></div>`);
  async function renderEvMat(){
    const box=$('#e-mat'); const from=$('#e-deb').value, to=$('#e-fin').value;
    if(!from||!to){ box.innerHTML='<p class="mini">Renseignez les dates pour voir le matériel libre.</p>'; return; }
    box.innerHTML='<p class="mini">Chargement…</p>';
    try{
      const data=await api(`/api/disponibilite?from=${from}&to=${to}${ev?('&exclude_event='+ev.id):''}`);
      const choix=data.filter(m=>m.dispo||evMat.has(m.id));
      box.innerHTML = choix.length ? choix.map(m=>`<label class="ev-pick ${evMat.has(m.id)?'on':''}">
          <input type="checkbox" data-id="${m.id}" ${evMat.has(m.id)?'checked':''}>
          ${icon(CAT_ICONS[m.categorie]||'box','ic')}
          <span class="ep-name">${esc(m.denomination)}</span>${m.categorie?`<small>${esc(m.categorie)}</small>`:''}
        </label>`).join('') : '<p class="mini">Aucun matériel libre sur cette période.</p>';
      $$('#e-mat input').forEach(c=>c.addEventListener('change',()=>{ const id=+c.dataset.id; c.checked?evMat.add(id):evMat.delete(id); c.closest('.ev-pick').classList.toggle('on',c.checked); }));
    }catch(err){ box.innerHTML=`<p class="mini">${esc(err.message)}</p>`; }
  }
  $('#e-deb').addEventListener('change',renderEvMat); $('#e-fin').addEventListener('change',renderEvMat);
  renderEvMat();
  $('#e-photo-file').addEventListener('change',ev2=>{ const f=ev2.target.files[0]; if(!f) return; compressSquare(f,data=>{ evPhoto=data; $('#e-photo-prev').innerHTML=`<img src="${data}" alt="">`; }); });
  $('#e-photo-clear').addEventListener('click',()=>{ evPhoto=''; $('#e-photo-prev').innerHTML=`<span class="ph">${icon('calendar','ic')}</span>`; });
  function renderChamps(){
    const box=$('#e-champs');
    box.innerHTML = evChamps.length ? evChamps.map((c,i)=>`<div class="champ-row">
      <input class="champ-lbl" data-i="${i}" placeholder="Intitulé (ex. Contact sur place)" value="${esc(c.label)}">
      <input class="champ-val" data-i="${i}" placeholder="Contenu" value="${esc(c.valeur)}">
      <button type="button" class="iconbtn ghost champ-del" data-i="${i}" aria-label="Supprimer">${icon('trash')}</button>
    </div>`).join('') : '<p class="mini">Aucune ligne pour le moment.</p>';
    box.querySelectorAll('.champ-lbl').forEach(inp=>inp.addEventListener('input',()=>{ evChamps[+inp.dataset.i].label=inp.value; }));
    box.querySelectorAll('.champ-val').forEach(inp=>inp.addEventListener('input',()=>{ evChamps[+inp.dataset.i].valeur=inp.value; }));
    box.querySelectorAll('.champ-del').forEach(b=>b.addEventListener('click',()=>{ evChamps.splice(+b.dataset.i,1); renderChamps(); }));
  }
  renderChamps();
  $('#e-champ-add').addEventListener('click',()=>{ evChamps.push({label:'',valeur:''}); renderChamps(); $('#e-champs .champ-lbl:last-of-type')?.focus(); });
  async function saveEvent(){
    const body={ nom:$('#e-nom').value.trim(), lieu:$('#e-lieu').value.trim(), partenaire:$('#e-part').value.trim(), contact:$('#e-contact').value.trim(),
      partenaire_id:$('#e-partid')?.value||null,
      date_debut:$('#e-deb').value, date_fin:$('#e-fin').value, notes:$('#e-notes').value.trim(), materiel_ids:[...evMat],
      description:$('#e-desc').value.trim(), consignes:$('#e-consignes').value.trim(), photo:evPhoto,
      champs:evChamps.map(c=>({label:(c.label||'').trim(),valeur:(c.valeur||'').trim()})).filter(c=>c.label||c.valeur) };
    if(!body.nom){ toast('Le nom est obligatoire.'); return null; }
    return api(ev?'/api/evenements/'+ev.id:'/api/evenements',{method:ev?'PUT':'POST',body:JSON.stringify(body)});
  }
  $('#e-save').addEventListener('click',async()=>{ try{ const r=await saveEvent(); if(!r) return; closeModal(); toast('Enregistré'); loadEvenements(); }catch(err){ toast(err.message); } });
  $('#e-devis').addEventListener('click',async()=>{ try{ const r=await saveEvent(); if(!r) return; toast('Événement enregistré'); devisModal(null, evtPrefill(r)); }catch(err){ toast(err.message); } });
  quickAddSelect($('#e-partid'), $('#e-partadd'), { placeholder:'Nom du partenaire…', create: async txt=>{ const r=await api('/api/partenaires',{method:'POST',body:JSON.stringify({nom:txt})}); await loadPartners(); return {value:r.id,label:r.nom}; } });
}
function evenementFiche(ev){
  const matName = id => (MAT_CACHE.find(m=>m.id===+id)||{}).denomination || 'Matériel';
  const ids = ev.materiel_ids||[];
  const champs = ev.champs||[];
  const devis = ev.devis||[];
  const STBADGE = { brouillon:'tag gray', envoye:'tag blue', accepte:'tag green', refuse:'tag pink' };
  const nl2br = s => esc(s).replace(/\n/g,'<br>');
  const devisHtml = devis.length
    ? `<div class="ef-devis-list">${devis.map(dv=>`<button type="button" class="ef-devis js-ef-devis" data-id="${dv.id}">${icon('doc')} <strong>${esc(dv.numero)}</strong> <span class="${STBADGE[dv.statut]||'tag gray'}">${DEVIS_STATUTS[dv.statut]||dv.statut}</span>${dv.statut==='accepte'?' <span class="tag green">✓ Signé &amp; approuvé</span>':''}</button>`).join('')}</div>`
    : `<p class="mini">Aucun devis associé pour le moment.</p>`;
  const canEdit = !isReadonly();
  openModal(`
    ${ev.photo?`<div class="ef-hero"><img src="${ev.photo}" alt=""></div>`:''}
    <h3 style="margin-bottom:2px">${esc(ev.nom)}${ev.valide?' <span class="tag green">✓ Validé</span>':''}</h3>
    <div class="ef-meta">${ev.lieu?'📍 '+esc(ev.lieu)+' · ':''}${dateShort(ev.date_debut)} → ${dateShort(ev.date_fin)}</div>
    ${(ev.partenaire||ev.partenaire_nom)?`<div class="ef-meta">🤝 ${esc(ev.partenaire_nom||ev.partenaire)}${ev.contact?' · '+esc(ev.contact):''}</div>`:''}
    ${ev.cree_par_nom?`<div class="mini" style="margin-top:2px">Créé par ${esc(ev.cree_par_nom)}${ev.date_creation?' · '+dateTimeShort(ev.date_creation):''}</div>`:''}
    ${ev.description?`<div class="ef-section"><h4>Descriptif</h4><p class="ef-text">${nl2br(ev.description)}</p></div>`:''}
    ${ev.consignes?`<div class="ef-section"><h4>Consignes</h4><p class="ef-text">${nl2br(ev.consignes)}</p></div>`:''}
    <div class="ef-section"><h4>Matériel présent${ids.length?` (${ids.length})`:''}</h4>${ids.length?`<div style="display:flex;flex-wrap:wrap;gap:10px">${ids.map(id=>{const m=MAT_CACHE.find(x=>x.id===+id)||{};return `<div class="js-ef-mat" data-id="${id}" title="Voir la fiche du matériel" style="cursor:pointer;width:110px;text-align:center"><div style="width:110px;height:90px;border-radius:8px;background:#0b0b0d;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#fff">${m.photo?`<img src="${esc(m.photo)}" alt="" style="width:100%;height:100%;object-fit:cover">`:icon(CAT_ICONS[m.categorie]||'box','ic')}</div><div style="font-size:12.5px;font-weight:600;color:var(--navy);margin-top:4px;line-height:1.2">${esc(m.denomination||matName(id))}</div>${m.categorie?`<div class="mini">${esc(m.categorie)}</div>`:''}</div>`;}).join('')}</div>`:'<p class="mini">Aucun matériel rattaché à cet événement.</p>'}</div>
    <div class="ef-section"><h4>Site internet</h4><p class="mini" style="margin-bottom:6px">Contrôle l'affichage de cet événement sur l'agenda du site public.</p><span class="toggle-oui-non ${ev.visible_site!==false?'on':'off'} js-ef-vis" data-id="${ev.id}" style="cursor:pointer"><span class="t-oui">${icon('check')} Affiché sur le site</span><span class="t-non">Masqué</span></span></div>
    ${champs.length?`<div class="ef-section"><h4>Informations</h4><table class="ef-champs">${champs.map(c=>`<tr><td>${esc(c.label||'—')}</td><td>${esc(c.valeur||'')}</td></tr>`).join('')}</table></div>`:''}
    <div class="ef-section"><h4>Devis ${ev.devis_signe?'<span class="tag green">Signé &amp; approuvé</span>':''}</h4>${devisHtml}</div>
    ${ev.notes?`<div class="ef-section"><h4>Notes internes</h4><p class="ef-text">${nl2br(ev.notes)}</p></div>`:''}
    <div class="buttons" style="margin-top:14px;flex-wrap:wrap">
      <button class="btn grey" onclick="closeModal()">Fermer</button>
      <button class="btn light" id="ef-dispo">${icon('check')} Vérifier la dispo</button>
      ${canEdit?`<button class="btn light" id="ef-newdevis">${icon('doc')} Créer un devis</button>`:''}
      ${canEdit?`<button class="btn" id="ef-edit">${icon('edit')} Modifier</button>`:''}
    </div>`);
  $('#ef-edit')?.addEventListener('click',()=>evenementModal(ev));
  $('#ef-newdevis')?.addEventListener('click',()=>devisModal(null, evtPrefill(ev)));
  $('#ef-dispo')?.addEventListener('click',()=>{ closeModal(); const f=$('#dispo-from'), t=$('#dispo-to'); if(f&&t){ f.value=ev.date_debut; t.value=ev.date_fin; checkDispo(); window.scrollTo(0,0); } });
  $$('.js-ef-devis').forEach(b=>b.addEventListener('click',async()=>{ try{ const dv=await api('/api/devis/'+b.dataset.id); devisModal(dv); }catch(err){ toast(err.message); } }));
  $$('.js-ef-mat').forEach(c=>c.addEventListener('click',()=>{ const m=MAT_CACHE.find(x=>x.id===+c.dataset.id); if(m) materielModal(m); }));
  const efv=$('.js-ef-vis'); if(efv && !isReadonly()) efv.addEventListener('click',async()=>{ const next=!efv.classList.contains('on'); try{ await api('/api/evenements/'+efv.dataset.id,{method:'PUT',body:JSON.stringify({visible_site:next})}); efv.classList.toggle('on',next); efv.classList.toggle('off',!next); ev.visible_site=next; toast(next?'Affiché sur le site':'Masqué du site'); }catch(e){ toast(e.message); } });
}

/* ============================== RÉPARATIONS ============================== */
const REP_STATUTS = { a_faire:'À faire', en_cours:'En cours', termine:'Terminé' };
const URGENCES = { normal:'Normal', urgent:'Urgent', critique:'Critique' };
const ACHAT_ST = { a_acheter:'À acheter', commande:'Commandé', recu:'Reçu' };
let REP_TAB = 'interv';
const WIP_STATUTS = { a_venir:'À venir', a_faire:'À faire', en_cours:'En cours', incomplet:'Incomplet', termine:'Terminé' };
// Sélecteur de personnes : chips + liste déroulante (ajout un par un, multiple possible).
function renderPeoplePicker(box, selected, options, onChange){
  if(!box) return;
  const avail=options.filter(n=>!selected.includes(n));
  box.innerHTML = `<div class="pp-chips">${selected.length?selected.map((n,i)=>`<span class="gelule">${esc(n)}<button type="button" class="pp-del" data-i="${i}">×</button></span>`).join(''):'<span class="mini">Cliquez pour ajouter…</span>'}</div>
    <select class="pp-add"><option value="">+ Ajouter une personne…</option>${avail.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('')}</select>`;
  box.querySelectorAll('.pp-del').forEach(b=>b.addEventListener('click',()=>{ selected.splice(+b.dataset.i,1); renderPeoplePicker(box,selected,options,onChange); onChange&&onChange(); }));
  box.querySelector('.pp-add').addEventListener('change',e=>{ const v=e.target.value; if(v && !selected.includes(v)) selected.push(v); renderPeoplePicker(box,selected,options,onChange); onChange&&onChange(); });
}
async function renderReparations(){
  const action = REP_TAB==='interv'
    ? `<button class="btn" id="add-rep">${icon('plus')} Nouvelle réparation</button>`
    : REP_TAB==='achats' ? `<button class="btn" id="add-ach">${icon('plus')} Nouvelle pièce</button>`
    : `<button class="btn" id="add-wip">${icon('plus')} Nouveau projet WIP</button>`;
  setTopbar('Réparations', action);
  $('#add-rep')?.addEventListener('click',()=>reparationModal());
  $('#add-ach')?.addEventListener('click',()=>achatModal());
  $('#add-wip')?.addEventListener('click',()=>wipModal());
  view().innerHTML = `<div class="tabs-row">
      <button class="${REP_TAB==='interv'?'active':''}" id="tab-interv">${icon('wrench')} Interventions</button>
      <button class="${REP_TAB==='wip'?'active':''}" id="tab-wip">${icon('calendar')} Projets WIP</button>
      <button class="${REP_TAB==='achats'?'active':''}" id="tab-achats">${icon('tag')} Pièces à acheter <span class="tab-badge hidden" id="ach-badge"></span></button>
    </div><div id="rep-body"></div>`;
  $('#tab-interv').addEventListener('click',()=>{ REP_TAB='interv'; renderReparations(); });
  $('#tab-wip').addEventListener('click',()=>{ REP_TAB='wip'; renderReparations(); });
  $('#tab-achats').addEventListener('click',()=>{ REP_TAB='achats'; renderReparations(); });
  if(REP_TAB==='interv'){ $('#rep-body').innerHTML=`${segArchHtml('reparations')}<div id="rep-list"></div>`; wireSegArch('reparations',()=>renderReparations()); loadReparations(); }
  else if(REP_TAB==='achats'){ $('#rep-body').innerHTML=`<div id="ach-list"></div>`; loadAchats(); }
  else { renderWipTab(); }
  updateAchBadge();
}
async function updateAchBadge(){
  try{ const a=await api('/api/alertes'); const n=a.urgences.length; const b=$('#ach-badge'); if(!b) return;
    if(n>0){ b.textContent=n; b.classList.remove('hidden'); } else b.classList.add('hidden'); }catch{}
}
function stepsBlock(r){
  const et=r.etapes||[]; if(!et.length) return '';
  const done=et.filter(s=>s.fait).length, pct=Math.round(done/et.length*100);
  return `<div class="etapes">
    <div class="etapes-head">${icon('check','ic')} Étapes — ${done}/${et.length}</div>
    <div class="prog"><span style="width:${pct}%"></span></div>
    ${et.map(s=>`<label class="etape ${s.fait?'done':''}"><input type="checkbox" class="js-step" data-rep="${r.id}" data-step="${esc(s.id)}" ${s.fait?'checked':''}><span>${esc(s.texte)}</span></label>`).join('')}
  </div>`;
}
async function loadReparations(){
  try{
    const list = archFilter(await api('/api/reparations'),'reparations');
    if(!list.length){ $('#rep-list').innerHTML=`<div class="empty-state">${ARCH.reparations?'Aucune réparation archivée.':'Aucune réparation enregistrée.'}</div>`; return; }
    $('#rep-list').innerHTML = list.map(r=>`<div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
        <div><div style="font-weight:800;color:var(--navy)">${esc(r.denomination)}</div>
          <div class="mini">${esc(r.panne)||'—'}</div></div>
        <span class="pill-st ${r.statut}">${REP_STATUTS[r.statut]||r.statut}</span></div>
      <div class="mini" style="margin-top:8px">Entrée ${dateShort(r.date_entree)}${r.date_sortie?' · Sortie '+dateShort(r.date_sortie):''}${r.technicien_nom?' · '+esc(r.technicien_nom):''}${r.cout?' · '+euros(r.cout):''}</div>
      ${stepsBlock(r)}
      <div class="buttons" style="margin-top:10px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">
        ${r.materiel_id?`<button class="btn small wipper js-rep-wip" data-id="${r.id}">${icon('calendar')} WIPPER</button>`:''}
        <button class="btn small grey js-rep-edit" data-id="${r.id}">${icon('edit')} Modifier</button>
        <button class="btn small ${r.archive?'light':'outline'} js-arch" data-type="reparations" data-id="${r.id}" data-ar="${r.archive?1:0}">${icon(r.archive?'undo':'archive')} ${r.archive?'Désarchiver':'Archiver'}</button>
        <button class="btn small red js-rep-del" data-id="${r.id}">${icon('trash')} Supprimer</button></div></div>`).join('');
    $$('.js-rep-wip').forEach(b=>b.addEventListener('click',()=>{ const r=list.find(x=>x.id===+b.dataset.id); if(r) wipperModal(r.materiel_id, r.denomination); }));
    wireArch(()=>loadReparations());
    $$('.js-step').forEach(cb=>cb.addEventListener('change',async()=>{
      const r=list.find(x=>x.id===+cb.dataset.rep); if(!r) return;
      const st=(r.etapes||[]).find(s=>String(s.id)===cb.dataset.step); if(st) st.fait=cb.checked;
      cb.closest('.etape').classList.toggle('done',cb.checked);
      try{ await api('/api/reparations/'+r.id,{method:'PUT',body:JSON.stringify({etapes:r.etapes})}); loadReparations(); }catch(e){ toast(e.message); cb.checked=!cb.checked; }
    }));
    $$('.js-rep-edit').forEach(b=>b.addEventListener('click',()=>reparationModal(list.find(x=>x.id===+b.dataset.id))));
    $$('.js-rep-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer cette réparation ?', async()=>{ try{ await api('/api/reparations/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadReparations(); }catch(e){ toast(e.message); } })));
  }catch(e){ $('#rep-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
async function reparationModal(r){
  await loadMateriel();
  let techs=[]; try{ techs = CURRENT_USER?.role==='admin' ? await api('/api/users') : []; }catch{}
  const e=r||{};
  let etapes=(e.etapes||[]).map(s=>({id:s.id,texte:s.texte,fait:!!s.fait}));
  openModal(`<h3>${r?'Modifier la réparation':'Nouvelle réparation'}</h3>
    <label class="field"><span>Matériel *</span><select id="r-mat">${matOptions(e.materiel_id)}</select></label>
    <label class="field"><span>Panne / description</span><textarea id="r-panne">${esc(e.panne)}</textarea></label>
    <div class="row2"><label class="field"><span>Statut</span><select id="r-statut">${Object.entries(REP_STATUTS).map(([k,v])=>`<option value="${k}" ${(e.statut||'a_faire')===k?'selected':''}>${v}</option>`).join('')}</select></label>
      <label class="field"><span>Coût (€)</span><input id="r-cout" type="number" min="0" step="0.01" value="${esc(e.cout)}"></label></div>
    <div class="row2"><label class="field"><span>Date d'entrée</span><input id="r-deb" type="date" value="${esc(e.date_entree)||todayISO()}"></label>
      <label class="field"><span>Date de sortie</span><input id="r-fin" type="date" value="${esc(e.date_sortie)}"></label></div>
    ${techs.length?`<label class="field"><span>Technicien</span><select id="r-tech"><option value="">—</option>${techs.map(t=>`<option value="${t.id}" ${+e.technicien_id===t.id?'selected':''}>${esc((t.prenom+' '+t.nom).trim()||t.login)}</option>`).join('')}</select></label>`:''}
    <div class="section-title">Étapes de réparation</div>
    <div id="r-etapes"></div>
    <button class="btn light small" id="r-addstep" type="button" style="margin-top:4px">${icon('plus')} Nouvelle étape de réparation</button>
    ${r?`<button class="btn outline small" id="r-addpiece" type="button" style="margin-top:4px">${icon('tag')} Pièce manquante à acheter</button>`:''}
    <label class="field"><span>Notes</span><textarea id="r-notes">${esc(e.notes)}</textarea></label>
    <p class="help">⚠ Un matériel en réparation (à faire / en cours) est automatiquement bloqué.</p>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="r-save">Enregistrer</button></div>`);
  function renderSteps(){
    $('#r-etapes').innerHTML = etapes.length ? etapes.map((s,i)=>`<div class="step-row">
        <input type="checkbox" class="js-st-fait" data-i="${i}" ${s.fait?'checked':''} title="Terminée">
        <input class="js-st-txt ${s.fait?'done':''}" data-i="${i}" value="${esc(s.texte)}" placeholder="Décrire l'étape…">
        <button class="iconbtn ghost js-st-del" data-i="${i}" type="button">${icon('x')}</button>
      </div>`).join('') : '<p class="mini">Aucune étape. Ajoutez la première étape de réparation.</p>';
    $$('.js-st-fait').forEach(c=>c.addEventListener('change',()=>{ etapes[+c.dataset.i].fait=c.checked; renderSteps(); }));
    $$('.js-st-txt').forEach(t=>t.addEventListener('input',()=>{ etapes[+t.dataset.i].texte=t.value; }));
    $$('.js-st-del').forEach(b=>b.addEventListener('click',()=>{ etapes.splice(+b.dataset.i,1); renderSteps(); }));
  }
  renderSteps();
  $('#r-addstep').addEventListener('click',()=>{ etapes.push({texte:'',fait:false}); renderSteps(); const t=$$('.js-st-txt').slice(-1)[0]; t&&t.focus(); });
  $('#r-addpiece')?.addEventListener('click',()=>achatModal(null,{ reparation_id:e.id, materiel_id:e.materiel_id }));
  $('#r-save').addEventListener('click',async()=>{
    const body={ materiel_id:$('#r-mat').value, panne:$('#r-panne').value.trim(), statut:$('#r-statut').value, cout:$('#r-cout').value,
      date_entree:$('#r-deb').value, date_sortie:$('#r-fin').value, notes:$('#r-notes').value.trim(), technicien_id:$('#r-tech')?.value||null,
      etapes:etapes.filter(s=>(s.texte||'').trim()) };
    try{ await api(r?'/api/reparations/'+r.id:'/api/reparations',{method:r?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); loadReparations(); }catch(err){ toast(err.message); }
  });
}

/* ---------------------------- Pièces à acheter ---------------------------- */
function urgBadge(u){ const k=URGENCES[u]?u:'normal'; return `<span class="urg urg-${k}">${k==='critique'?'🔴':(k==='urgent'?'🟠':'⚪')} ${URGENCES[k]}</span>`; }
async function loadAchats(){
  try{
    const list = await api('/api/achats');
    if(!list.length){ $('#ach-list').innerHTML=`<div class="empty-state">Aucune pièce à acheter. Cliquez sur « Nouvelle pièce » ou ajoutez-en depuis une réparation.</div>`; return; }
    $('#ach-list').innerHTML = list.map(a=>{
      const urgent=(a.urgence==='urgent'||a.urgence==='critique')&&a.statut!=='recu';
      return `<div class="card ach-card ${urgent?'ach-urgent':''} ${a.statut==='recu'?'ach-recu':''}" style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:0"><div style="font-weight:800;color:var(--navy)">${esc(a.designation)}${a.quantite?` <span class="mini">× ${esc(a.quantite)}</span>`:''}</div>
            <div class="mini">${a.materiel_nom?'🎮 '+esc(a.materiel_nom)+' · ':''}${a.reparation_nom?'🔧 '+esc(a.reparation_nom)+' · ':''}${a.fournisseur?esc(a.fournisseur)+' · ':''}${a.cout?euros(a.cout):''}</div>
            ${a.notes?`<div class="mini">${esc(a.notes)}</div>`:''}</div>
          ${urgBadge(a.urgence)}</div>
        <div class="buttons" style="margin-top:10px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">
          <select class="js-ach-stat btn small" data-id="${a.id}" style="padding:8px;font-weight:700;color:var(--navy);background:#eef2f7;border:none">
            ${Object.entries(ACHAT_ST).map(([k,v])=>`<option value="${k}" ${a.statut===k?'selected':''}>${v}</option>`).join('')}
          </select>
          <button class="btn small grey js-ach-edit" data-id="${a.id}">${icon('edit')} Modifier</button>
          <button class="btn small red js-ach-del" data-id="${a.id}">${icon('trash')} Supprimer</button></div></div>`;
    }).join('');
    $$('.js-ach-stat').forEach(s=>s.addEventListener('change',async()=>{ try{ await api(`/api/achats/${s.dataset.id}/statut`,{method:'POST',body:JSON.stringify({statut:s.value})}); toast('Statut mis à jour'); loadAchats(); updateAchBadge(); }catch(e){ toast(e.message); } }));
    $$('.js-ach-edit').forEach(b=>b.addEventListener('click',()=>achatModal(list.find(x=>x.id===+b.dataset.id))));
    $$('.js-ach-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer cette pièce ?', async()=>{ try{ await api('/api/achats/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadAchats(); updateAchBadge(); }catch(e){ toast(e.message); } })));
  }catch(e){ $('#ach-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
async function achatModal(a, prefill){
  await loadMateriel();
  const e=a||prefill||{};
  openModal(`<h3>${a?'Modifier la pièce':'Nouvelle pièce à acheter'}</h3>
    <label class="field"><span>Désignation *</span><input id="a-des" value="${esc(e.designation)}" placeholder="ex. Alimentation 12V, joystick, vitre…"></label>
    <div class="row2"><label class="field"><span>Quantité</span><input id="a-qte" type="number" min="1" value="${esc(e.quantite)||1}"></label>
      <label class="field"><span>Urgence</span><select id="a-urg">${Object.entries(URGENCES).map(([k,v])=>`<option value="${k}" ${(e.urgence||'normal')===k?'selected':''}>${v}</option>`).join('')}</select></label></div>
    <div class="row2"><label class="field"><span>Statut</span><select id="a-stat">${Object.entries(ACHAT_ST).map(([k,v])=>`<option value="${k}" ${(e.statut||'a_acheter')===k?'selected':''}>${v}</option>`).join('')}</select></label>
      <label class="field"><span>Coût estimé (€)</span><input id="a-cout" type="number" min="0" step="0.01" value="${esc(e.cout)}"></label></div>
    <div class="row2"><label class="field"><span>Fournisseur</span><input id="a-four" value="${esc(e.fournisseur)}"></label>
      <label class="field"><span>Matériel concerné</span><select id="a-mat"><option value="">— Aucun</option>${matOptions(e.materiel_id)}</select></label></div>
    <label class="field"><span>Notes</span><textarea id="a-notes">${esc(e.notes)}</textarea></label>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="a-save">Enregistrer</button></div>`);
  $('#a-save').addEventListener('click',async()=>{
    const body={ designation:$('#a-des').value.trim(), quantite:$('#a-qte').value, urgence:$('#a-urg').value, statut:$('#a-stat').value,
      cout:$('#a-cout').value, fournisseur:$('#a-four').value.trim(), materiel_id:$('#a-mat').value||null, reparation_id:e.reparation_id||null, notes:$('#a-notes').value.trim() };
    if(!body.designation){ toast('La désignation est obligatoire.'); return; }
    try{ await api(a?'/api/achats/'+a.id:'/api/achats',{method:a?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); if(state.view==='reparations'){ REP_TAB='achats'; renderReparations(); } }catch(err){ toast(err.message); }
  });
}

/* ---------------------------- Projets WIP ---------------------------- */
let WIP_ALL=[];
function renderWipTab(){
  $('#rep-body').innerHTML = `<div id="wip-next"></div>${segArchHtml('wip')}<div id="wip-list"></div>`;
  wireSegArch('wip',()=>renderReparations());
  loadWip();
}
async function loadWip(){
  try{ await loadMateriel(); WIP_ALL = await api('/api/wip'); }catch(e){ const el=$('#wip-list'); if(el) el.innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; return; }
  renderWipNext(); renderWipList();
}
function renderWipNext(){
  const box=$('#wip-next'); if(!box) return;
  const today=todayISO();
  const upcoming=WIP_ALL.filter(w=>!w.archive && w.statut!=='termine' && (w.date||'')>=today).sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(0,2);
  if(!upcoming.length){ box.innerHTML=''; return; }
  box.innerHTML = `<div class="wipnext">${upcoming.map((w,i)=>`<div class="wipnext-bubble st-${w.statut} js-wn" data-id="${w.id}">
      <div class="wn-tag">${i===0?'⭐ Prochaine séance':'Séance suivante'}</div>
      <div class="wn-date">${dateShort(w.date)}</div>
      <div class="wn-main"><strong>${esc(w.code)}</strong> <span class="pill-st ${w.statut}">${WIP_STATUTS[w.statut]||w.statut}</span></div>
      <div class="wn-line">${w.lieu?'📍 '+esc(w.lieu)+' · ':''}${w.presents&&w.presents.length?'👥 '+w.presents.map(esc).join(', '):'Participants à définir'}</div>
    </div>`).join('')}</div>`;
  $$('.js-wn').forEach(c=>c.addEventListener('click',()=>wipModal(WIP_ALL.find(x=>x.id===+c.dataset.id))));
}
function wipTeamBlock(w,t){
  const et=t.etapes||[]; const done=et.filter(s=>s.fait).length; const pct=et.length?Math.round(done/et.length*100):0;
  const mats=(t.materiel||[]).map(m=>esc(m.denomination)).join(', ');
  return `<div class="wip-team">
    <div class="wt-head"><strong>${esc(t.tache||'Équipe')}</strong>${t.membres&&t.membres.length?`<span class="mini"> — 👥 ${t.membres.map(esc).join(', ')}</span>`:''}</div>
    ${mats?`<div class="mini">🎮 ${mats}</div>`:''}
    ${et.length?`<div class="prog" style="margin-top:6px"><span style="width:${pct}%"></span></div>
      ${et.map(s=>`<label class="etape ${s.fait?'done':''}"><input type="checkbox" class="js-wip-step" data-w="${w.id}" data-t="${esc(t.id)}" data-s="${esc(s.id)}" ${s.fait?'checked':''}><span>${esc(s.texte)}</span></label>`).join('')}`:''}
  </div>`;
}
function wipCard(w){
  return `<div class="card wip-card st-${w.statut}" style="margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
      <div><div style="font-weight:800;color:var(--navy)">${esc(w.code)}</div>
        <div class="mini">${dateShort(w.date)}${w.lieu?' · 📍 '+esc(w.lieu):''}${w.presents&&w.presents.length?' · 👥 '+w.presents.map(esc).join(', '):''}</div></div>
      <span class="pill-st ${w.statut}">${WIP_STATUTS[w.statut]||w.statut}</span></div>
    ${(Array.isArray(w.manquant)?w.manquant:(w.manquant?[w.manquant]:[])).length?`<div class="mini" style="margin-top:6px;color:#c0392b">⚠ Manque : ${(Array.isArray(w.manquant)?w.manquant:[w.manquant]).map(esc).join(', ')}</div>`:''}
    ${(w.equipes||[]).map(t=>wipTeamBlock(w,t)).join('')}
    <div class="buttons" style="margin-top:10px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">
      <button class="btn small grey js-wip-edit" data-id="${w.id}">${icon('edit')} Modifier</button>
      <button class="btn small ${w.archive?'light':'outline'} js-arch" data-type="wip" data-id="${w.id}" data-ar="${w.archive?1:0}">${icon(w.archive?'undo':'archive')} ${w.archive?'Désarchiver':'Archiver'}</button>
      <button class="btn small red js-wip-del" data-id="${w.id}">${icon('trash')} Supprimer</button>
    </div></div>`;
}
function renderWipList(){
  const el=$('#wip-list'); if(!el) return;
  const list=archFilter(WIP_ALL,'wip').sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  if(!list.length){ el.innerHTML=`<div class="empty-state">${ARCH.wip?'Aucun projet archivé.':'Aucun projet WIP. Cliquez sur « Nouveau projet WIP » pour démarrer.'}</div>`; return; }
  let html=''; let cur=null;
  list.forEach(w=>{ if(w.date!==cur){ cur=w.date; html+=`<div class="wip-dateheader">${icon('calendar','ic')} ${dateShort(w.date)}</div>`; } html+=wipCard(w); });
  el.innerHTML = html;
  $$('.js-wip-step').forEach(cb=>cb.addEventListener('change',async()=>{
    const w=WIP_ALL.find(x=>x.id===+cb.dataset.w); if(!w) return;
    const t=(w.equipes||[]).find(x=>String(x.id)===cb.dataset.t); if(!t) return;
    const s=(t.etapes||[]).find(x=>String(x.id)===cb.dataset.s); if(s) s.fait=cb.checked;
    cb.closest('.etape').classList.toggle('done',cb.checked);
    try{ await api('/api/wip/'+w.id,{method:'PUT',body:JSON.stringify({equipes:w.equipes})}); loadWip(); }catch(e){ toast(e.message); cb.checked=!cb.checked; }
  }));
  $$('.js-wip-edit').forEach(b=>b.addEventListener('click',()=>wipModal(WIP_ALL.find(x=>x.id===+b.dataset.id))));
  $$('.js-wip-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer ce projet WIP ?', async()=>{ try{ await api('/api/wip/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadWip(); }catch(e){ toast(e.message); } })));
  wireArch(()=>loadWip());
}
async function wipModal(w, prefill){
  await loadMateriel(); await loadPeople();
  const e=w||prefill||{};
  let presents=(e.presents||[]).slice();
  let manquant=Array.isArray(e.manquant)?e.manquant.slice():(e.manquant?[e.manquant]:[]);
  let equipes=(e.equipes||[]).map(t=>({ id:t.id, tache:t.tache||'', membres:(t.membres||[]).slice(), materiel_ids:(t.materiel_ids||(t.materiel||[]).map(m=>m.id)||[]).slice(), etapes:(t.etapes||[]).map(s=>({id:s.id,texte:s.texte,fait:!!s.fait})) }));
  openModal(`<h3>${w?'Projet '+esc(e.code):'Nouveau projet WIP'}</h3>
    ${w?`<p class="help" style="margin:-6px 0 10px">Code <strong>${esc(e.code)}</strong>${e.cree_par?' · créé par '+esc(e.cree_par):''}</p>`:''}
    <div class="row2">
      <label class="field"><span>Date de la séance</span><input id="w-date" type="date" value="${esc(e.date)||todayISO()}"></label>
      <label class="field"><span>État</span><select id="w-statut">${Object.entries(WIP_STATUTS).map(([k,v])=>`<option value="${k}" ${(e.statut||'a_venir')===k?'selected':''}>${v}</option>`).join('')}</select></label>
    </div>
    <label class="field"><span>Lieu</span><input id="w-lieu" value="${esc(e.lieu)}" placeholder="ex. Local Marseille"></label>
    <label class="field"><span>Présents</span><div id="w-pres-box" class="people-picker"></div></label>
    <div class="section-title">Matériel manquant</div>
    <div id="w-manq-box"></div>
    <button class="btn light small" id="w-manq-add" type="button" style="margin-top:4px">${icon('plus')} Ajouter un matériel</button>
    <div class="section-title">Équipes & tâches</div>
    <div id="w-teams"></div>
    <div class="buttons" style="grid-template-columns:1fr 1fr;margin:6px 0">
      <button class="btn light small" id="w-addteam" type="button">${icon('plus')} Ajouter une équipe</button>
      <button class="btn outline small" id="w-piece" type="button">${icon('tag')} Commander une pièce</button>
    </div>
    <label class="field"><span>Notes</span><textarea id="w-notes">${esc(e.notes)}</textarea></label>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="w-save">Enregistrer</button></div>`);
  renderPeoplePicker($('#w-pres-box'), presents, PEOPLE);
  function renderManquant(){
    $('#w-manq-box').innerHTML = manquant.length? manquant.map((v,i)=>`<div class="mq-row"><input class="js-mq" data-i="${i}" value="${esc(v)}" placeholder="Pièce / matériel manquant…"><button class="iconbtn ghost js-mq-del" data-i="${i}" type="button">${icon('x')}</button></div>`).join('') : '<p class="mini">Aucun matériel manquant.</p>';
    $$('.js-mq').forEach(inp=>inp.addEventListener('input',()=>{ manquant[+inp.dataset.i]=inp.value; }));
    $$('.js-mq-del').forEach(b=>b.addEventListener('click',()=>{ manquant.splice(+b.dataset.i,1); renderManquant(); }));
  }
  renderManquant();
  $('#w-manq-add').addEventListener('click',()=>{ manquant.push(''); renderManquant(); const last=$$('.js-mq').slice(-1)[0]; last&&last.focus(); });
  function renderTeams(){
    $('#w-teams').innerHTML = equipes.length? equipes.map((t,i)=>`<div class="team-edit">
        <div class="te-top"><input class="js-t-tache" data-i="${i}" value="${esc(t.tache)}" placeholder="Tâche (ex. Réparation Blast-01)"><button class="iconbtn ghost js-t-del" data-i="${i}" type="button">${icon('x')}</button></div>
        <div class="te-membres-box people-picker" data-i="${i}"></div>
        <div class="te-mat"><select class="js-t-matsel" data-i="${i}"><option value="">+ Ajouter du matériel…</option>${MAT_CACHE.map(m=>`<option value="${m.id}">${esc(m.denomination)}</option>`).join('')}</select>
          <div class="te-chips">${t.materiel_ids.map(id=>{ const m=MAT_CACHE.find(x=>x.id===+id); return `<span class="chip">${esc(m?m.denomination:'#'+id)}<button type="button" class="js-t-matdel" data-i="${i}" data-id="${id}">×</button></span>`; }).join('')}</div></div>
        <div class="te-steps">${t.etapes.map((s,si)=>`<div class="step-row"><input type="checkbox" class="js-te-fait" data-i="${i}" data-si="${si}" ${s.fait?'checked':''}><input class="js-te-txt ${s.fait?'done':''}" data-i="${i}" data-si="${si}" value="${esc(s.texte)}" placeholder="Étape réalisée…"><button class="iconbtn ghost js-te-del" data-i="${i}" data-si="${si}" type="button">${icon('x')}</button></div>`).join('')}
          <button class="btn light small js-te-add" data-i="${i}" type="button">${icon('plus')} Étape</button></div>
      </div>`).join('') : '<p class="mini">Aucune équipe. Ex. « Cédric & Yann » sur Blast-01, « Stéphane & Christophe » sur Daytona USA.</p>';
    $$('.js-t-tache').forEach(inp=>inp.addEventListener('input',()=>{ equipes[+inp.dataset.i].tache=inp.value; }));
    $$('.js-t-del').forEach(b=>b.addEventListener('click',()=>{ equipes.splice(+b.dataset.i,1); renderTeams(); }));
    $$('.js-t-matsel').forEach(s=>s.addEventListener('change',()=>{ const i=+s.dataset.i, id=+s.value; if(id && !equipes[i].materiel_ids.includes(id)) equipes[i].materiel_ids.push(id); renderTeams(); }));
    $$('.js-t-matdel').forEach(b=>b.addEventListener('click',()=>{ const i=+b.dataset.i; equipes[i].materiel_ids=equipes[i].materiel_ids.filter(x=>x!==+b.dataset.id); renderTeams(); }));
    $$('.js-te-fait').forEach(c=>c.addEventListener('change',()=>{ equipes[+c.dataset.i].etapes[+c.dataset.si].fait=c.checked; renderTeams(); }));
    $$('.js-te-txt').forEach(t=>t.addEventListener('input',()=>{ equipes[+t.dataset.i].etapes[+t.dataset.si].texte=t.value; }));
    $$('.js-te-del').forEach(b=>b.addEventListener('click',()=>{ equipes[+b.dataset.i].etapes.splice(+b.dataset.si,1); renderTeams(); }));
    $$('.js-te-add').forEach(b=>b.addEventListener('click',()=>{ equipes[+b.dataset.i].etapes.push({texte:'',fait:false}); renderTeams(); }));
    $$('.te-membres-box').forEach(box=>{ const i=+box.dataset.i; renderPeoplePicker(box, equipes[i].membres, PEOPLE); });
  }
  renderTeams();
  $('#w-addteam').addEventListener('click',()=>{ equipes.push({tache:'',membres:[],materiel_ids:[],etapes:[]}); renderTeams(); });
  $('#w-piece').addEventListener('click',()=>achatModal(null,{ notes:'Projet '+(e.code||'WIP')+' · séance du '+($('#w-date').value||todayISO()) }));
  $('#w-save').addEventListener('click',async()=>{
    const body={ date:$('#w-date').value, lieu:$('#w-lieu').value.trim(), statut:$('#w-statut').value, notes:$('#w-notes').value.trim(),
      presents, manquant:manquant.map(x=>(x||'').trim()).filter(Boolean),
      equipes:equipes.map(t=>({ id:t.id, tache:(t.tache||'').trim(), membres:t.membres, materiel_ids:t.materiel_ids, etapes:t.etapes.filter(s=>(s.texte||'').trim()) })) };
    try{ await api(w?'/api/wip/'+w.id:'/api/wip',{method:w?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); if(state.view==='reparations'){ REP_TAB='wip'; renderReparations(); } }catch(err){ toast(err.message); }
  });
}
// Ajoute un matériel à un projet WIP (existant ou nouveau).
async function wipperModal(materielId, denom){
  let list=[]; try{ list=(await api('/api/wip')).filter(w=>!w.archive && w.statut!=='termine'); }catch(e){ toast(e.message); }
  openModal(`<h3>${icon('calendar')} WIPPER — ${esc(denom)}</h3>
    <p class="help" style="margin-bottom:10px">Ajouter ce matériel à un projet WIP. Une équipe « Réparation » sera créée dans le projet.</p>
    <div class="manage-list">${list.length?list.map(w=>`<button class="btn outline full js-wipper" data-id="${w.id}" type="button" style="justify-content:space-between;margin-bottom:8px"><span>${esc(w.code)} · ${dateShort(w.date)}</span><span class="pill-st ${w.statut}">${WIP_STATUTS[w.statut]||w.statut}</span></button>`).join(''):'<p class="mini">Aucun projet WIP actif. Créez-en un ci-dessous.</p>'}</div>
    <button class="btn light full" id="wipper-new" type="button" style="margin-top:6px">${icon('plus')} Créer un nouveau projet WIP</button>
    <div class="buttons" style="margin-top:12px"><button class="btn grey" onclick="closeModal()">Annuler</button></div>`);
  $$('.js-wipper').forEach(b=>b.addEventListener('click',async()=>{
    const w=list.find(x=>x.id===+b.dataset.id); if(!w) return;
    const equipes=(w.equipes||[]).map(t=>({ id:t.id, tache:t.tache, membres:t.membres||[], materiel_ids:(t.materiel_ids||[]).map(Number), etapes:t.etapes||[] }));
    if(!equipes.some(t=>(t.materiel_ids||[]).includes(+materielId))) equipes.push({ tache:'Réparation '+denom, membres:[], materiel_ids:[+materielId], etapes:[] });
    try{ await api('/api/wip/'+w.id,{method:'PUT',body:JSON.stringify({equipes})}); closeModal(); toast('Ajouté au projet '+w.code+' ✓'); if(state.view==='reparations' && REP_TAB==='wip') loadWip(); }catch(e){ toast(e.message); }
  }));
  $('#wipper-new').addEventListener('click',()=>{ closeModal(); wipModal(null,{ equipes:[{ tache:'Réparation '+denom, membres:[], materiel_ids:[+materielId], etapes:[] }] }); });
}

/* ============================== PROJETS ============================== */
let PROJ_ALL=[];
let PJ_VIEW = (()=>{ try{ return localStorage.getItem('wca_pjview')||'cards'; }catch{ return 'cards'; } })();
async function renderProjets(){
  await loadPeople();
  setTopbar('Projets', `<button class="btn" id="add-pj">${icon('plus')} Nouveau projet</button>`);
  $('#add-pj')?.addEventListener('click',()=>projetModal());
  view().innerHTML = `<div class="ev-listhead"><div class="section-title" style="margin:0">Projets</div>
      <div class="ev-viewtog"><button class="${PJ_VIEW==='cards'?'active':''}" id="pjv-cards" title="Vue cartes">${icon('box')}</button><button class="${PJ_VIEW==='rows'?'active':''}" id="pjv-rows" title="Vue liste">${icon('doc')}</button></div>
    </div>${segArchHtml('projets')}<div id="pj-list"></div>`;
  wireSegArch('projets',()=>renderProjets());
  const setPjView=v=>{ PJ_VIEW=v; try{ localStorage.setItem('wca_pjview',v); }catch{} $('#pjv-cards').classList.toggle('active',v==='cards'); $('#pjv-rows').classList.toggle('active',v==='rows'); loadProjets(); };
  $('#pjv-cards').addEventListener('click',()=>setPjView('cards'));
  $('#pjv-rows').addEventListener('click',()=>setPjView('rows'));
  loadProjets();
}
async function loadProjets(){
  try{ PROJ_ALL = await api('/api/projets'); }catch(e){ $('#pj-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; return; }
  const list=archFilter(PROJ_ALL,'projets');
  $('#pj-list').className = 'ev-list-'+PJ_VIEW;
  if(!list.length){ $('#pj-list').innerHTML=`<div class="empty-state" style="grid-column:1/-1">${ARCH.projets?'Aucun projet archivé.':'Aucun projet en cours. Cliquez sur « Nouveau projet ».'}</div>`; return; }
  const today=todayISO();
  const actionsHtml = p => `<div class="row-actions"><button class="iconbtn ghost js-pj-edit" data-id="${p.id}" title="Modifier">${icon('edit')}</button><button class="iconbtn ghost js-arch" data-type="projets" data-id="${p.id}" data-ar="${p.archive?1:0}" title="${p.archive?'Désarchiver':'Archiver'}">${icon(p.archive?'undo':'archive')}</button><button class="iconbtn ghost js-pj-del" data-id="${p.id}" title="Supprimer">${icon('trash')}</button></div>`;
  $('#pj-list').innerHTML = list.map(p=>{
    const tks=p.taches||[]; const done=tks.filter(t=>t.fait).length; const pct=tks.length?Math.round(done/tks.length*100):0;
    const nextRdv=(p.rdvs||[]).filter(r=>r.date>=today).sort((a,b)=>a.date.localeCompare(b.date))[0];
    const meta=`${p.date_debut?'📅 '+dateShort(p.date_debut):''}${p.budget?' · 💶 '+euros(p.budget):''}`;
    const prog=tks.length?`<div class="pj-prog"><div class="prog"><span style="width:${pct}%"></span></div><span class="mini">${done}/${tks.length} tâches</span></div>`:'';
    const peeps=(p.intervenants||[]);
    if(PJ_VIEW==='cards'){
      return `<div class="ev-card js-pj ${pct===100&&tks.length?'ev-ok':''}" data-id="${p.id}">
        <div class="evc-photo">${p.photo?`<img src="${p.photo}" alt="">`:`<span class="evc-ph">${icon('box','ic')}</span>`}${pct===100&&tks.length?'<span class="evc-valide">✓ Terminé</span>':''}</div>
        <div class="evc-body">
          <div class="evc-title">${esc(p.nom)}</div>
          <div class="evc-meta">${meta||'—'}</div>
          ${peeps.length?`<div class="pj-people" style="margin-top:6px">${peeps.slice(0,4).map(n=>`<span class="gelule">${esc(n)}</span>`).join('')}${peeps.length>4?`<span class="gelule">+${peeps.length-4}</span>`:''}</div>`:''}
          ${prog}
          ${nextRdv?`<div class="mini" style="margin-top:6px;color:var(--blue);font-weight:700">🗓️ ${dateShort(nextRdv.date)}${nextRdv.note?' — '+esc(nextRdv.note):''}</div>`:''}
        </div>
        <div class="evc-foot">${actionsHtml(p)}</div>
      </div>`;
    }
    return `<div class="list-item js-pj ${pct===100&&tks.length?'ev-ok':''}" data-id="${p.id}" style="align-items:flex-start">
      <div class="ev-rowthumb">${p.photo?`<img src="${p.photo}" alt="">`:`<span class="evc-ph">${icon('box','ic')}</span>`}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:800;color:var(--navy)">${esc(p.nom)}${pct===100&&tks.length?' <span class="tag green" style="vertical-align:middle">✓ Terminé</span>':''}</div>
        <div class="sub">${meta?meta+' · ':''}${p.cree_par?esc(p.cree_par):''}</div>
        ${peeps.length?`<div class="pj-people" style="margin-top:6px">${peeps.slice(0,6).map(n=>`<span class="gelule">${esc(n)}</span>`).join('')}</div>`:''}
        ${prog}
        ${nextRdv?`<div class="mini" style="margin-top:6px;color:var(--blue);font-weight:700">🗓️ ${dateShort(nextRdv.date)}${nextRdv.note?' — '+esc(nextRdv.note):''}</div>`:''}
      </div>
      <div class="ev-side">${actionsHtml(p)}</div>
    </div>`;
  }).join('');
  $$('.js-pj-edit').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); projetModal(PROJ_ALL.find(x=>x.id===+b.dataset.id)); }));
  $$('.js-pj-del').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); confirmModal('Supprimer ce projet ?', async()=>{ try{ await api('/api/projets/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadProjets(); }catch(err){ toast(err.message); } }); }));
  wireArch(()=>loadProjets());
  $$('.js-pj').forEach(c=>c.addEventListener('click',()=>{ const p=PROJ_ALL.find(x=>x.id===+c.dataset.id); projetFiche(p); }));
}
function projetFiche(p){
  const tks=p.taches||[]; const done=tks.filter(t=>t.fait).length; const pct=tks.length?Math.round(done/tks.length*100):0;
  const champs=p.champs||[];
  const nl2br=s=>esc(s).replace(/\n/g,'<br>');
  const canEdit=!isReadonly();
  openModal(`
    ${p.photo?`<div class="ef-hero"><img src="${p.photo}" alt=""></div>`:''}
    <h3 style="margin-bottom:2px">${esc(p.nom)}${pct===100&&tks.length?' <span class="tag green">✓ Terminé</span>':''}</h3>
    <div class="ef-meta">${p.date_debut?'📅 '+dateShort(p.date_debut):''}${p.budget?' · 💶 '+euros(p.budget):''}${p.cree_par?' · '+esc(p.cree_par):''}</div>
    ${p.description?`<div class="ef-section"><h4>Descriptif</h4><p class="ef-text">${nl2br(p.description)}</p></div>`:''}
    ${p.consignes?`<div class="ef-section"><h4>Consignes</h4><p class="ef-text">${nl2br(p.consignes)}</p></div>`:''}
    ${(p.intervenants||[]).length?`<div class="ef-section"><h4>Intervenants</h4><div class="pj-people">${p.intervenants.map(n=>`<span class="gelule">${esc(n)}</span>`).join('')}</div></div>`:''}
    ${(p.ressources||[]).length?`<div class="ef-section"><h4>Ressources nécessaires</h4><div class="blocks-list">${p.ressources.map(r=>`<span class="tag gray">${esc(r)}</span>`).join('')}</div></div>`:''}
    ${tks.length?`<div class="ef-section"><h4>Tâches — ${done}/${tks.length}</h4><div class="prog"><span style="width:${pct}%"></span></div><div class="etapes" style="margin-top:8px">${tks.map(t=>`<label class="etape ${t.fait?'done':''}"><input type="checkbox" class="js-pf-task" data-t="${esc(t.id)}" ${t.fait?'checked':''} ${canEdit?'':'disabled'}><span>${esc(t.texte)}</span></label>`).join('')}</div></div>`:''}
    ${(p.rdvs||[]).length?`<div class="ef-section"><h4>Sessions de travail</h4>${p.rdvs.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(r=>`<div class="mini" style="margin-bottom:3px;color:var(--blue);font-weight:700">🗓️ ${dateShort(r.date)}${r.note?' — '+esc(r.note):''}</div>`).join('')}</div>`:''}
    ${champs.length?`<div class="ef-section"><h4>Informations</h4><table class="ef-champs">${champs.map(c=>`<tr><td>${esc(c.label||'—')}</td><td>${esc(c.valeur||'')}</td></tr>`).join('')}</table></div>`:''}
    ${(p.fichiers||[]).length?`<div class="ef-section"><h4>Fichiers</h4><div class="pj-files">${p.fichiers.map(f=>`<a class="pj-file" href="${f.data}" download="${esc(f.name)}">${icon('download','ic')} ${esc(f.name)}</a>`).join('')}</div></div>`:''}
    ${p.notes?`<div class="ef-section"><h4>Notes</h4><p class="ef-text">${nl2br(p.notes)}</p></div>`:''}
    <div class="buttons" style="margin-top:14px;flex-wrap:wrap">
      <button class="btn grey" onclick="closeModal()">Fermer</button>
      ${canEdit?`<button class="btn" id="pf-edit">${icon('edit')} Modifier</button>`:''}
    </div>`);
  $('#pf-edit')?.addEventListener('click',()=>projetModal(p));
  $$('.js-pf-task').forEach(cb=>cb.addEventListener('click',async()=>{
    const t=(p.taches||[]).find(x=>String(x.id)===cb.dataset.t); if(t) t.fait=cb.checked;
    cb.closest('.etape').classList.toggle('done',cb.checked);
    try{ await api('/api/projets/'+p.id,{method:'PUT',body:JSON.stringify({taches:p.taches})}); if(state.view==='projets') loadProjets(); }catch(err){ toast(err.message); cb.checked=!cb.checked; }
  }));
}
async function projetModal(pj){
  await loadPeople();
  const e=pj||{};
  let intervenants=(e.intervenants||[]).slice();
  let ressources=(e.ressources||[]).slice();
  let fichiers=(e.fichiers||[]).slice();
  let taches=(e.taches||[]).map(t=>({id:t.id,texte:t.texte,fait:!!t.fait}));
  let rdvs=(e.rdvs||[]).map(r=>({id:r.id,date:r.date,note:r.note||''}));
  let pjPhoto=e.photo||'';
  let pjChamps=(e.champs||[]).map(c=>({label:c.label||'',valeur:c.valeur||''}));
  openModal(`<h3>${pj?'Modifier le projet':'Nouveau projet'}</h3>
    <label class="field"><span>Nom du projet *</span><input id="pj-nom" value="${esc(e.nom)}" placeholder="ex. Rénovation borne Daytona"></label>
    <label class="field"><span>Photo de présentation</span>
      <div class="photo-edit">
        <div class="photo-prev" id="pj-photo-prev">${pjPhoto?`<img src="${pjPhoto}" alt="">`:`<span class="ph">${icon('box','ic')}</span>`}</div>
        <div class="photo-btns">
          <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir une photo<input type="file" id="pj-photo-file" accept="image/*" style="display:none"></label>
          <button type="button" class="btn small red" id="pj-photo-clear">${icon('trash')} Retirer</button>
          <span class="help">Recadrée en carré, compressée sous 60 Ko.</span>
        </div>
      </div></label>
    <div class="row2"><label class="field"><span>Date de début</span><input id="pj-deb" type="date" value="${esc(e.date_debut)||todayISO()}"></label>
      <label class="field"><span>Budget estimé (€, optionnel)</span><input id="pj-budget" type="number" min="0" step="0.01" value="${esc(e.budget)}"></label></div>
    <label class="field"><span>Descriptif complet</span><textarea id="pj-desc" rows="4" placeholder="Objectif du projet, contexte, étapes clés…">${esc(e.description)}</textarea></label>
    <label class="field"><span>Consignes</span><textarea id="pj-consignes" rows="3" placeholder="Sécurité, méthode, points d'attention…">${esc(e.consignes)}</textarea></label>
    <label class="field"><span>Partenaires participants (encart sur le site)</span><div id="pj-parts" style="display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:4px"><span class="mini">Chargement…</span></div></label>
    <label class="field"><span>Intervenants</span><div id="pj-int-box" class="people-picker"></div></label>
    <div class="section-title">Ressources nécessaires</div>
    <div id="pj-res-box"></div>
    <button class="btn light small" id="pj-res-add" type="button" style="margin-top:4px">${icon('plus')} Ajouter une ressource</button>
    <div class="section-title">Tâches</div>
    <div id="pj-tach-box"></div>
    <button class="btn light small" id="pj-tach-add" type="button" style="margin-top:4px">${icon('plus')} Ajouter une tâche</button>
    <div class="section-title">Sessions de travail (rendez-vous WIP)</div>
    <p class="help" style="margin:0 0 8px">Une alerte apparaîtra sur l'accueil 2 jours avant chaque session, jusqu'au jour J.</p>
    <div id="pj-rdv-box"></div>
    <button class="btn light small" id="pj-rdv-add" type="button" style="margin-top:4px">${icon('plus')} Ajouter une session</button>
    <label class="field"><span>Notes</span><textarea id="pj-notes" placeholder="description courte, détails…">${esc(e.notes)}</textarea></label>
    <div class="section-title">Informations supplémentaires</div>
    <p class="help" style="margin-bottom:8px">Ajoutez autant de lignes que nécessaire (intitulé + contenu).</p>
    <div id="pj-champs"></div>
    <button type="button" class="btn light small" id="pj-champ-add" style="margin-top:4px">${icon('plus')} Ajouter une ligne</button>
    <div class="section-title">Fichiers (plans, docs techniques)</div>
    <div id="pj-files-box"></div>
    <label class="btn light small" style="cursor:pointer;margin-top:4px">${icon('plus')} Ajouter des fichiers<input type="file" id="pj-file-input" multiple style="display:none"></label>
    <p class="help">Max ~4 Mo par fichier (images, PDF, plans…).</p>
    <div class="buttons" style="margin-top:10px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="pj-save">Enregistrer</button></div>`);
  renderPeoplePicker($('#pj-int-box'), intervenants, PEOPLE);
  function renderTaches(){
    $('#pj-tach-box').innerHTML = taches.length? taches.map((s,i)=>`<div class="step-row"><input type="checkbox" class="js-tk-fait" data-i="${i}" ${s.fait?'checked':''}><input class="js-tk-txt ${s.fait?'done':''}" data-i="${i}" value="${esc(s.texte)}" placeholder="Tâche à accomplir…"><button class="iconbtn ghost js-tk-del" data-i="${i}" type="button">${icon('x')}</button></div>`).join('') : '<p class="mini">Aucune tâche.</p>';
    $$('.js-tk-fait').forEach(c=>c.addEventListener('change',()=>{ taches[+c.dataset.i].fait=c.checked; renderTaches(); }));
    $$('.js-tk-txt').forEach(t=>t.addEventListener('input',()=>{ taches[+t.dataset.i].texte=t.value; }));
    $$('.js-tk-del').forEach(b=>b.addEventListener('click',()=>{ taches.splice(+b.dataset.i,1); renderTaches(); }));
  }
  renderTaches();
  $('#pj-tach-add').addEventListener('click',()=>{ taches.push({texte:'',fait:false}); renderTaches(); const l=$$('.js-tk-txt').slice(-1)[0]; l&&l.focus(); });
  function renderRdvs(){
    $('#pj-rdv-box').innerHTML = rdvs.length? rdvs.map((r,i)=>`<div class="rdv-row"><input type="date" class="js-rdv-date" data-i="${i}" value="${esc(r.date)}"><input class="js-rdv-note" data-i="${i}" value="${esc(r.note)}" placeholder="Objet / lieu (optionnel)"><button class="iconbtn ghost js-rdv-del" data-i="${i}" type="button">${icon('x')}</button></div>`).join('') : '<p class="mini">Aucune session planifiée.</p>';
    $$('.js-rdv-date').forEach(inp=>inp.addEventListener('change',()=>{ rdvs[+inp.dataset.i].date=inp.value; }));
    $$('.js-rdv-note').forEach(inp=>inp.addEventListener('input',()=>{ rdvs[+inp.dataset.i].note=inp.value; }));
    $$('.js-rdv-del').forEach(b=>b.addEventListener('click',()=>{ rdvs.splice(+b.dataset.i,1); renderRdvs(); }));
  }
  renderRdvs();
  $('#pj-rdv-add').addEventListener('click',()=>{ rdvs.push({date:todayISO(),note:''}); renderRdvs(); });
  function renderRes(){
    $('#pj-res-box').innerHTML = ressources.length? ressources.map((v,i)=>`<div class="mq-row"><input class="js-res" data-i="${i}" value="${esc(v)}" placeholder="Ressource (matériel, salle, outil…)"><button class="iconbtn ghost js-res-del" data-i="${i}" type="button">${icon('x')}</button></div>`).join('') : '<p class="mini">Aucune ressource.</p>';
    $$('.js-res').forEach(inp=>inp.addEventListener('input',()=>{ ressources[+inp.dataset.i]=inp.value; }));
    $$('.js-res-del').forEach(b=>b.addEventListener('click',()=>{ ressources.splice(+b.dataset.i,1); renderRes(); }));
  }
  renderRes();
  $('#pj-res-add').addEventListener('click',()=>{ ressources.push(''); renderRes(); const l=$$('.js-res').slice(-1)[0]; l&&l.focus(); });
  function renderFiles(){
    $('#pj-files-box').innerHTML = fichiers.length? fichiers.map((f,i)=>`<div class="mq-row"><a class="pj-file" href="${f.data}" download="${esc(f.name)}" style="flex:1;min-width:0">${icon('download','ic')} ${esc(f.name)}</a><button class="iconbtn ghost js-file-del" data-i="${i}" type="button">${icon('x')}</button></div>`).join('') : '<p class="mini">Aucun fichier.</p>';
    $$('.js-file-del').forEach(b=>b.addEventListener('click',()=>{ fichiers.splice(+b.dataset.i,1); renderFiles(); }));
  }
  renderFiles();
  $('#pj-file-input').addEventListener('change',ev=>{
    [...ev.target.files].forEach(f=>{ if(f.size>4*1024*1024){ toast(`${f.name} dépasse 4 Mo`); return; } const r=new FileReader(); r.onload=()=>{ fichiers.push({name:f.name,type:f.type,size:f.size,data:r.result}); renderFiles(); }; r.readAsDataURL(f); });
    ev.target.value='';
  });
  $('#pj-photo-file').addEventListener('change',ev2=>{ const f=ev2.target.files[0]; if(!f) return; compressSquare(f,data=>{ pjPhoto=data; $('#pj-photo-prev').innerHTML=`<img src="${data}" alt="">`; }); });
  $('#pj-photo-clear').addEventListener('click',()=>{ pjPhoto=''; $('#pj-photo-prev').innerHTML=`<span class="ph">${icon('box','ic')}</span>`; });
  function renderPjChamps(){
    const box=$('#pj-champs');
    box.innerHTML = pjChamps.length ? pjChamps.map((c,i)=>`<div class="champ-row">
      <input class="champ-lbl" data-i="${i}" placeholder="Intitulé (ex. Fournisseur pièce)" value="${esc(c.label)}">
      <input class="champ-val" data-i="${i}" placeholder="Contenu" value="${esc(c.valeur)}">
      <button type="button" class="iconbtn ghost champ-del" data-i="${i}" aria-label="Supprimer">${icon('trash')}</button>
    </div>`).join('') : '<p class="mini">Aucune ligne pour le moment.</p>';
    box.querySelectorAll('.champ-lbl').forEach(inp=>inp.addEventListener('input',()=>{ pjChamps[+inp.dataset.i].label=inp.value; }));
    box.querySelectorAll('.champ-val').forEach(inp=>inp.addEventListener('input',()=>{ pjChamps[+inp.dataset.i].valeur=inp.value; }));
    box.querySelectorAll('.champ-del').forEach(b=>b.addEventListener('click',()=>{ pjChamps.splice(+b.dataset.i,1); renderPjChamps(); }));
  }
  renderPjChamps();
  loadPartners().then(()=>{ const box=$('#pj-parts'); if(!box) return; const sel=new Set((e.partenaires_ids||[]).map(Number)); box.innerHTML = PARTNERS_CACHE.length ? PARTNERS_CACHE.map(p=>`<label style="display:inline-flex;align-items:center;gap:6px;font-weight:500"><input type="checkbox" class="pj-pt" value="${p.id}" ${sel.has(p.id)?'checked':''}> ${esc(p.nom)}</label>`).join('') : '<span class="mini">Aucun partenaire (Utilisateurs → Partenaires).</span>'; });
  $('#pj-champ-add').addEventListener('click',()=>{ pjChamps.push({label:'',valeur:''}); renderPjChamps(); $('#pj-champs .champ-lbl:last-of-type')?.focus(); });
  $('#pj-save').addEventListener('click',async()=>{
    const body={ nom:$('#pj-nom').value.trim(), date_debut:$('#pj-deb').value, budget:$('#pj-budget').value, notes:$('#pj-notes').value.trim(),
      description:$('#pj-desc').value.trim(), consignes:$('#pj-consignes').value.trim(), photo:pjPhoto,
      partenaires_ids:[...document.querySelectorAll('.pj-pt:checked')].map(x=>+x.value),
      champs:pjChamps.map(c=>({label:(c.label||'').trim(),valeur:(c.valeur||'').trim()})).filter(c=>c.label||c.valeur),
      intervenants, ressources:ressources.map(x=>(x||'').trim()).filter(Boolean), fichiers,
      taches:taches.filter(s=>(s.texte||'').trim()), rdvs:rdvs.filter(r=>r.date) };
    if(!body.nom){ toast('Le nom est obligatoire.'); return; }
    try{ await api(pj?'/api/projets/'+pj.id:'/api/projets',{method:pj?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); loadProjets(); }catch(err){ toast(err.message); }
  });
}

/* ============================== VENTES ============================== */
async function renderVentes(){
  setTopbar('Ventes', `<button class="btn" id="add-v">${icon('plus')} Enregistrer une vente</button>`);
  $('#add-v').addEventListener('click',()=>venteModal());
  view().innerHTML = `${segArchHtml('ventes')}<div class="card" style="margin-bottom:14px;background:#eef1f5;border-color:#dde3eb"><strong>ℹ️</strong> <span class="mini">Un matériel vendu est retiré du parc disponible.</span></div><div id="v-list"></div>`;
  wireSegArch('ventes',()=>renderVentes());
  loadVentes();
}
async function loadVentes(){
  try{
    const list = archFilter(await api('/api/ventes'),'ventes');
    if(!list.length){ $('#v-list').innerHTML=`<div class="empty-state">${ARCH.ventes?'Aucune vente archivée.':'Aucune vente enregistrée.'}</div>`; return; }
    $('#v-list').innerHTML = `<div class="tablecard"><table class="grid">
      <thead><tr><th>Matériel</th><th>Client</th><th>Date</th><th>Vendu</th><th>Prix</th><th></th></tr></thead>
      <tbody>${list.map(v=>`<tr>
        <td data-label="Matériel"><strong>${esc(v.denomination)}</strong></td>
        <td data-label="Client">${esc(v.client_nom)||'—'}${v.client_contact?`<div class="sub">${esc(v.client_contact)}</div>`:''}</td>
        <td data-label="Date">${dateShort(v.date)}</td>
        <td data-label="Vendu"><span class="toggle-oui-non ${v.vendu!==false?'on':'off'} js-v-vendu" data-id="${v.id}"><span class="t-oui">OUI</span><span class="t-non">NON</span></span></td>
        <td data-label="Prix"><strong>${euros(v.prix)}</strong></td>
        <td data-label="" class="cell-actions"><div class="row-actions"><button class="iconbtn ghost js-v-edit" data-id="${v.id}">${icon('edit')}</button>${archHtml('ventes',v.id,v.archive)}<button class="iconbtn ghost js-v-del" data-id="${v.id}">${icon('trash')}</button></div></td></tr>`).join('')}</tbody></table></div>`;
    wireArch(()=>loadVentes());
    $$('.js-v-vendu').forEach(t=>t.addEventListener('click',async()=>{
      try{ const r=await api(`/api/ventes/${t.dataset.id}/vendu`,{method:'POST',body:JSON.stringify({})}); toast(r.vendu?'Marqué vendu ✅':'Marqué non vendu — matériel de nouveau disponible'); loadVentes(); }catch(e){ toast(e.message); }
    }));
    $$('.js-v-edit').forEach(b=>b.addEventListener('click',()=>venteModal(list.find(x=>x.id===+b.dataset.id))));
    $$('.js-v-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer cette vente ? Le matériel redeviendra disponible.', async()=>{ try{ await api('/api/ventes/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadVentes(); }catch(e){ toast(e.message); } })));
  }catch(e){ $('#v-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
async function venteModal(v){
  await loadMateriel();
  const e=v||{};
  openModal(`<h3>${v?'Modifier la vente':'Nouvelle vente'}</h3>
    <label class="field"><span>Matériel *</span><select id="v-mat">${matOptions(e.materiel_id)}</select></label>
    <div class="row2"><label class="field"><span>Client</span><input id="v-client" value="${esc(e.client_nom)}"></label>
      <label class="field"><span>Contact</span><input id="v-contact" value="${esc(e.client_contact)}"></label></div>
    <div class="row2"><label class="field"><span>Prix (€)</span><input id="v-prix" type="number" min="0" step="0.01" value="${esc(e.prix)}"></label>
      <label class="field"><span>Date</span><input id="v-date" type="date" value="${esc(e.date)||todayISO()}"></label></div>
    <label class="field"><span>Vendu</span><select id="v-vendu"><option value="1" ${e.vendu!==false?'selected':''}>✅ Oui (sorti du parc)</option><option value="0" ${e.vendu===false?'selected':''}>⛔ Non (toujours disponible)</option></select></label>
    <label class="field"><span>Notes</span><textarea id="v-notes">${esc(e.notes)}</textarea></label>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn green" id="v-save">Enregistrer</button></div>`);
  $('#v-save').addEventListener('click',async()=>{
    const body={ materiel_id:$('#v-mat').value, client_nom:$('#v-client').value.trim(), client_contact:$('#v-contact').value.trim(), prix:$('#v-prix').value, date:$('#v-date').value, vendu:$('#v-vendu').value==='1', notes:$('#v-notes').value.trim() };
    try{ await api(v?'/api/ventes/'+v.id:'/api/ventes',{method:v?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); loadVentes(); }catch(err){ toast(err.message); }
  });
}

/* ============================== PRÊTS ============================== */
const PRET_STATUTS = { en_cours:'En cours', rendu:'Rendu' };
async function renderPrets(){
  setTopbar('Prêts', `<button class="btn" id="add-p">${icon('plus')} Nouveau prêt</button>`);
  $('#add-p').addEventListener('click',()=>pretModal());
  view().innerHTML = `${segArchHtml('prets')}<div id="p-list"></div>`;
  wireSegArch('prets',()=>renderPrets());
  loadPrets();
}
async function loadPrets(){
  try{
    const list = archFilter(await api('/api/prets'),'prets');
    if(!list.length){ $('#p-list').innerHTML=`<div class="empty-state">${ARCH.prets?'Aucun prêt archivé.':'Aucun prêt enregistré.'}</div>`; return; }
    $('#p-list').innerHTML = list.map(p=>`<div class="card" style="margin-bottom:12px ${p.statut==='rendu'?';opacity:.65':''}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap">
        <div><div style="font-weight:800;color:var(--navy)">${esc(p.denomination)}</div>
          <div class="mini">Prêté à ${esc(p.emprunteur)||'—'}${p.contact?' ('+esc(p.contact)+')':''}</div>
          <div class="mini">${dateShort(p.date_debut)} → ${dateShort(p.date_fin)}</div></div>
        <span class="pill-st ${p.statut}">${PRET_STATUTS[p.statut]||p.statut}</span></div>
      <div class="buttons" style="margin-top:10px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr))">
        ${p.statut!=='rendu'?`<button class="btn small green js-p-rendu" data-id="${p.id}">${icon('check')} Marquer rendu</button>`:''}
        <button class="btn small grey js-p-edit" data-id="${p.id}">${icon('edit')} Modifier</button>
        <button class="btn small ${p.archive?'light':'outline'} js-arch" data-type="prets" data-id="${p.id}" data-ar="${p.archive?1:0}">${icon(p.archive?'undo':'archive')} ${p.archive?'Désarchiver':'Archiver'}</button>
        <button class="btn small red js-p-del" data-id="${p.id}">${icon('trash')} Supprimer</button></div></div>`).join('');
    wireArch(()=>loadPrets());
    $$('.js-p-rendu').forEach(b=>b.addEventListener('click',async()=>{ try{ await api('/api/prets/'+b.dataset.id,{method:'PUT',body:JSON.stringify({statut:'rendu'})}); toast('Marqué rendu'); loadPrets(); }catch(e){ toast(e.message); } }));
    $$('.js-p-edit').forEach(b=>b.addEventListener('click',()=>pretModal(list.find(x=>x.id===+b.dataset.id))));
    $$('.js-p-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer ce prêt ?', async()=>{ try{ await api('/api/prets/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadPrets(); }catch(e){ toast(e.message); } })));
  }catch(e){ $('#p-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
async function pretModal(p){
  await loadMateriel();
  const e=p||{};
  openModal(`<h3>${p?'Modifier le prêt':'Nouveau prêt'}</h3>
    <label class="field"><span>Matériel *</span><select id="p-mat">${matOptions(e.materiel_id)}</select></label>
    <div class="row2"><label class="field"><span>Emprunteur</span><input id="p-emp" value="${esc(e.emprunteur)}"></label>
      <label class="field"><span>Contact</span><input id="p-contact" value="${esc(e.contact)}"></label></div>
    <div class="row2"><label class="field"><span>Du</span><input id="p-deb" type="date" value="${esc(e.date_debut)||todayISO()}"></label>
      <label class="field"><span>Au</span><input id="p-fin" type="date" value="${esc(e.date_fin)||todayISO()}"></label></div>
    <label class="field"><span>Statut</span><select id="p-statut">${Object.entries(PRET_STATUTS).map(([k,v])=>`<option value="${k}" ${(e.statut||'en_cours')===k?'selected':''}>${v}</option>`).join('')}</select></label>
    <label class="field"><span>Notes</span><textarea id="p-notes">${esc(e.notes)}</textarea></label>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="p-save">Enregistrer</button></div>`);
  $('#p-save').addEventListener('click',async()=>{
    const body={ materiel_id:$('#p-mat').value, emprunteur:$('#p-emp').value.trim(), contact:$('#p-contact').value.trim(), date_debut:$('#p-deb').value, date_fin:$('#p-fin').value, statut:$('#p-statut').value, notes:$('#p-notes').value.trim() };
    try{ await api(p?'/api/prets/'+p.id:'/api/prets',{method:p?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); loadPrets(); }catch(err){ toast(err.message); }
  });
}

/* ============================== UTILISATEURS ============================== */
let USR_ALL = []; const USR = { role:'' };
let USR_TAB = null;
/* ============================ SITE INTERNET (blog + affichage) ============================ */
/* ---- Médiathèque (images réutilisables, stockées en fichiers sur le serveur) ---- */
let MEDIAS_CACHE=[];
async function loadMedias(){ try{ MEDIAS_CACHE=await api('/api/medias'); }catch{ MEDIAS_CACHE=[]; } return MEDIAS_CACHE; }
function mediaPicker(onPick){
  openModal(`<h3>Médiathèque</h3>
    <p class="help" style="margin-bottom:10px">${onPick?'Clique sur une image pour la choisir.':'Gère ici tes images réutilisables.'} Ajoute des images (réutilisables partout dans la gestion).</p>
    <label class="btn" style="cursor:pointer;display:inline-block;margin-bottom:12px">${icon('plus')} Ajouter des images<input type="file" id="med-add" accept="image/*" multiple style="display:none"></label>
    <div id="med-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;max-height:52vh;overflow:auto"><span class="mini">Chargement…</span></div>
    <div class="buttons" style="margin-top:12px"><button class="btn grey" onclick="closeModal()">Fermer</button></div>`);
  function draw(){
    const g=$('#med-grid'); if(!g) return;
    g.innerHTML = MEDIAS_CACHE.length ? MEDIAS_CACHE.map(m=>`<div style="position:relative">
        <img src="${m.url}" data-url="${esc(m.url)}" class="js-med-pick" title="${onPick?'Choisir':''}" style="width:100%;height:92px;object-fit:cover;border-radius:8px;${onPick?'cursor:pointer;':''}border:1px solid var(--line)">
        <button class="js-med-del" data-id="${m.id}" title="Supprimer" style="position:absolute;top:3px;right:3px;background:#e23b3b;color:#fff;border:0;border-radius:5px;width:22px;height:22px;cursor:pointer;line-height:1">×</button>
      </div>`).join('') : '<span class="mini" style="grid-column:1/-1">Médiathèque vide — ajoute ta première image ci-dessus.</span>';
    if(onPick) $$('.js-med-pick').forEach(im=>im.addEventListener('click',()=>{ onPick(im.dataset.url); closeModal(); }));
    $$('.js-med-del').forEach(b=>b.addEventListener('click',async(e)=>{ e.stopPropagation(); if(!window.confirm('Supprimer cette image de la médiathèque ?')) return; try{ await api('/api/medias/'+b.dataset.id,{method:'DELETE'}); await loadMedias(); draw(); }catch(err){ toast(err.message); } }));
  }
  loadMedias().then(draw);
  $('#med-add').addEventListener('change',ev=>{ const files=[...ev.target.files]; if(!files.length) return; ev.target.value=''; toast('Ajout en cours…'); let done=0; files.forEach(f=>compressImage(f,async data=>{ try{ await api('/api/medias',{method:'POST',body:JSON.stringify({data,name:f.name})}); }catch(err){ toast(err.message); } if(++done===files.length){ await loadMedias(); draw(); toast('Ajouté à la médiathèque'); } },1600,300*1024)); });
}

let SITE_TAB = 'blog';
let ARTICLES = [];
let SITE_CONTENT = {};

async function renderSiteInternet(){
  const tabs = `<div class="tabs-row" id="si-tabs">
      <button class="${SITE_TAB==='blog'?'active':''}" data-t="blog">${icon('doc')} Blog</button>
      <button class="${SITE_TAB==='affichage'?'active':''}" data-t="affichage">${icon('globe')} Affichage du site</button>
      <button class="${SITE_TAB==='modules'?'active':''}" data-t="modules">${icon('box')} Modules accueil</button>
    </div>`;
  const action = (SITE_TAB==='blog' ? `<button class="btn" id="si-new">${icon('plus')} Nouvel article</button>` : '') + `<button class="btn" id="si-media" style="background:var(--purple,#7c5cff)">🖼 Médiathèque</button>`;
  setTopbar('Site internet', action);
  $('#view').innerHTML = tabs + `<div id="si-body"><p class="help" style="padding:20px">Chargement…</p></div>`;
  $$('#si-tabs button').forEach(b=>b.addEventListener('click',()=>{ SITE_TAB=b.dataset.t; renderSiteInternet(); }));
  $('#si-new')?.addEventListener('click',()=>articleModal(null));
  $('#si-media')?.addEventListener('click',()=>mediaPicker());
  if(SITE_TAB==='blog') await renderBlogTab();
  else if(SITE_TAB==='affichage') await renderAffichageTab();
  else await renderModulesTab();
}

async function renderBlogTab(){
  const body=$('#si-body');
  try{ ARTICLES = await api('/api/articles'); }catch(e){ body.innerHTML=`<p class="help" style="padding:20px">${esc(e.message)}</p>`; return; }
  if(!ARTICLES.length){ body.innerHTML=`<div style="text-align:center;padding:48px 16px;color:var(--muted)">Aucun article pour l'instant.<br>Cliquez sur « Nouvel article » pour rédiger le premier.</div>`; return; }
  body.innerHTML = `<div class="tablecard"><table class="grid"><thead><tr><th>Titre</th><th>Date</th><th>État</th><th></th></tr></thead><tbody>${
    ARTICLES.map(a=>`<tr>
      <td data-label="Titre"><strong class="js-art-open" data-id="${a.id}" style="cursor:pointer;color:var(--teal-d)">${esc(a.titre||'(sans titre)')}</strong>${a.extrait?`<div class="sub">${esc((a.extrait||'').slice(0,90))}</div>`:''}</td>
      <td data-label="Date">${esc(a.date||'')}</td>
      <td data-label="État">${a.archive?'<span class="statut hs">Archivé</span>':(a.visible_site===false?'<span class="statut">Masqué</span>':'<span class="statut dispo">Publié</span>')}</td>
      <td class="actions"><button class="icon-btn js-art-open" data-id="${a.id}" title="Modifier">${icon('edit')}</button><button class="icon-btn js-art-del" data-id="${a.id}" title="Supprimer">${icon('trash')}</button></td>
    </tr>`).join('')
  }</tbody></table></div>`;
  $$('.js-art-open').forEach(b=>b.addEventListener('click',()=>{ const a=ARTICLES.find(x=>x.id===+b.dataset.id); articleModal(a); }));
  $$('.js-art-del').forEach(b=>b.addEventListener('click',()=>{ const a=ARTICLES.find(x=>x.id===+b.dataset.id); confirmModal(`Supprimer l'article « ${esc(a.titre||'')} » ? Cette action est définitive.`, async()=>{ try{ await api('/api/articles/'+a.id,{method:'DELETE'}); toast('Supprimé'); renderBlogTab(); }catch(e){ toast(e.message); } }); }));
}

function articleModal(a){
  const isEdit=!!(a&&a.id); a=a||{};
  let cover = a.image||''; let banner = a.banniere||'';
  openModal(`<h3>${isEdit?'Modifier l’article':'Nouvel article'}</h3>
    <label class="field"><span>Titre *</span><input id="art-titre" value="${esc(a.titre||'')}" placeholder="Titre de l'article"></label>
    <div class="row2">
      <label class="field"><span>Date</span><input id="art-date" type="date" value="${esc(a.date||new Date().toISOString().slice(0,10))}"></label>
      <label class="field"><span>Auteur</span><input id="art-auteur" value="${esc(a.auteur||'')}" placeholder="ex. West Coast Arcades"></label>
    </div>
    <label class="field"><span>Catégorie (pour les filtres du blog)</span><input id="art-cat" value="${esc(a.categorie||'')}" placeholder="ex. Salons, Projets, Coulisses…"></label>
    <label class="field"><span>Extrait (résumé affiché dans la liste du blog)</span><textarea id="art-extrait" rows="2">${esc(a.extrait||'')}</textarea></label>
    <div class="field"><span>Image à la une</span>
      <div style="display:flex;gap:12px;align-items:center;margin-top:4px">
        <div id="art-cover-prev" style="width:96px;height:96px;border-radius:8px;background:#0b0b0d;background-size:cover;background-position:center;background-repeat:no-repeat;${cover?`background-image:url('${cover}')`:''}"></div>
        <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="art-cover-file" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small red" id="art-cover-clear">${icon('trash')} Retirer</button>
      </div>
    </div>
    <div class="field"><span>Bannière de l'article (paysage, en haut — sinon celle du blog est utilisée)</span>
      <div style="display:flex;gap:12px;align-items:center;margin-top:4px">
        <div id="art-ban-prev" style="width:180px;height:56px;border-radius:6px;background:#0b0b0d;background-size:cover;background-position:center;background-repeat:no-repeat;${banner?`background-image:url('${banner}')`:''}"></div>
        <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="art-ban-file" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small red" id="art-ban-clear">${icon('trash')} Retirer</button>
      </div>
    </div>
    <div class="field"><span>Contenu</span>
      <div class="wysi-toolbar" style="display:flex;flex-wrap:wrap;gap:4px;margin:4px 0 6px">
        <button type="button" class="btn small grey" data-cmd="bold" title="Gras"><b>G</b></button>
        <button type="button" class="btn small grey" data-cmd="italic" title="Italique"><i>I</i></button>
        <button type="button" class="btn small grey" data-block="h2" title="Titre">Titre</button>
        <button type="button" class="btn small grey" data-block="h3" title="Sous-titre">Sous-titre</button>
        <button type="button" class="btn small grey" data-block="p" title="Paragraphe">¶</button>
        <button type="button" class="btn small grey" data-cmd="insertUnorderedList" title="Liste à puces">• Liste</button>
        <button type="button" class="btn small grey" data-cmd="insertOrderedList" title="Liste numérotée">1. Liste</button>
        <button type="button" class="btn small grey" id="art-link" title="Insérer un lien">${icon('share')} Lien</button>
        <label class="btn small grey" style="cursor:pointer" title="Insérer une image">${icon('plus')} Image<input type="file" id="art-img-file" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small grey" data-cmd="removeFormat" title="Effacer la mise en forme">${icon('x')} Format</button>
      </div>
      <div id="art-contenu" contenteditable="true" style="min-height:220px;border:1px solid var(--line);border-radius:8px;padding:14px;background:#ffffff;color:#1a1a1a;overflow:auto;line-height:1.6">${a.contenu||''}</div>
    </div>
    <label style="display:flex;align-items:center;gap:8px;font-weight:600;margin-top:12px;cursor:pointer"><input type="checkbox" id="art-vis" ${a.visible_site!==false?'checked':''}> 🌐 Publié sur le site (visible dans le blog)</label>
    <div class="field"><span>Partenaires participants (encart en bas de l'article)</span><div id="art-parts" style="display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:4px"><span class="mini">Chargement…</span></div></div>
    <div class="buttons" style="margin-top:12px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="art-save">Enregistrer</button></div>`);
  loadPartners().then(()=>{ const box=$('#art-parts'); if(!box) return; const sel=new Set((a.partenaires_ids||[]).map(Number)); box.innerHTML = PARTNERS_CACHE.length ? PARTNERS_CACHE.map(p=>`<label style="display:inline-flex;align-items:center;gap:6px;font-weight:500"><input type="checkbox" class="art-pt" value="${p.id}" ${sel.has(p.id)?'checked':''}> ${esc(p.nom)}</label>`).join('') : '<span class="mini">Aucun partenaire (Utilisateurs → Partenaires).</span>'; });
  const ed=$('#art-contenu');
  $$('.wysi-toolbar [data-cmd]').forEach(b=>b.addEventListener('click',()=>{ ed.focus(); document.execCommand(b.dataset.cmd,false,null); }));
  $$('.wysi-toolbar [data-block]').forEach(b=>b.addEventListener('click',()=>{ ed.focus(); document.execCommand('formatBlock',false,b.dataset.block); }));
  $('#art-link').addEventListener('click',()=>{ const url=prompt('Adresse du lien (https://…)'); if(url){ ed.focus(); document.execCommand('createLink',false,url); } });
  $('#art-img-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressImage(f,data=>{ ed.focus(); document.execCommand('insertHTML',false,'<p style="text-align:center"><img src="'+data+'" style="max-width:100%;height:auto;display:inline-block;margin:10px 0;border-radius:6px" draggable="false"></p><p><br></p>'); },1200,180*1024); });
  $('#art-cover-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ cover=data; $('#art-cover-prev').style.backgroundImage=`url('${data}')`; },120*1024); });
  $('#art-cover-clear').addEventListener('click',()=>{ cover=''; $('#art-cover-prev').style.backgroundImage=''; });
  $('#art-ban-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressImage(f,data=>{ banner=data; $('#art-ban-prev').style.backgroundImage=`url('${data}')`; }); });
  $('#art-ban-clear').addEventListener('click',()=>{ banner=''; $('#art-ban-prev').style.backgroundImage=''; });
  $('#art-save').addEventListener('click',async()=>{
    const body={ titre:$('#art-titre').value.trim(), date:$('#art-date').value, auteur:$('#art-auteur').value.trim(), extrait:$('#art-extrait').value.trim(), contenu:$('#art-contenu').innerHTML.trim(), image:cover, banniere:banner, visible_site:$('#art-vis').checked, categorie:$('#art-cat').value.trim(), partenaires_ids:[...document.querySelectorAll('.art-pt:checked')].map(x=>+x.value) };
    if(!body.titre){ toast('Le titre est obligatoire.'); return; }
    try{ await api(isEdit?'/api/articles/'+a.id:'/api/articles',{method:isEdit?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); renderBlogTab(); }catch(e){ toast(e.message); }
  });
}

async function renderAffichageTab(){
  const body=$('#si-body');
  const [evs,mats,projs,parts,siteC]=await Promise.all([
    api('/api/evenements').catch(()=>[]), api('/api/materiel').catch(()=>[]),
    api('/api/projets').catch(()=>[]), api('/api/partenaires').catch(()=>[]), api('/api/site').catch(()=>({}))
  ]);
  let blogHero = siteC.blog_hero||'';
  function section(emo, title, desc, list, coll, nameKey, optIn){
    const n=(list||[]).length;
    const rows=(list||[]).map(x=>{
      const on = optIn ? (x.visible_site===true) : (x.visible_site!==false);
      const vit = optIn ? `<button class="btn small light js-vitrine" data-id="${x.id}" style="margin-right:10px">${icon('edit')} Fiche vitrine</button>` : '';
      return `<tr><td>${esc(x[nameKey]||'(sans nom)')}</td><td class="actions" style="white-space:nowrap;text-align:right">${vit}<span class="toggle-oui-non ${on?'on':'off'} js-vis" data-coll="${coll}" data-id="${x.id}" style="cursor:pointer"><span class="t-oui">${icon('check')} Publié</span><span class="t-non">Masqué</span></span></td></tr>`;
    }).join('') || `<tr><td colspan="2" class="help" style="padding:10px">Aucun élément.</td></tr>`;
    return `<details class="aff-sec" style="border:1px solid var(--line);border-radius:12px;margin-bottom:10px;overflow:hidden;background:var(--card)">
      <summary style="cursor:pointer;display:flex;align-items:center;gap:12px;padding:14px 16px">
        <span style="font-size:22px;line-height:1">${emo}</span>
        <span style="flex:1;min-width:0"><span style="font-weight:800;color:var(--navy)">${title}</span><span class="mini" style="display:block">${desc}</span></span>
        <span class="statut" style="background:var(--line);color:var(--navy)">${n}</span>
        <span class="aff-chev">▸</span>
      </summary>
      <div style="padding:0 12px 12px"><div class="tablecard" style="box-shadow:none;border:1px solid var(--line,#eee);margin:0"><table class="grid"><tbody>${rows}</tbody></table></div></div>
    </details>`;
  }
  body.innerHTML = `<style>.aff-sec summary{list-style:none}.aff-sec summary::-webkit-details-marker{display:none}.aff-chev{display:inline-block;transition:.15s;color:var(--muted)}.aff-sec[open] .aff-chev{transform:rotate(90deg)}</style>`
    + `<p class="help" style="margin-bottom:10px">Clique sur une rubrique pour la déplier. Les <strong>machines</strong> sont masquées par défaut (l'inventaire reste privé) ; événements, projets et partenaires sont visibles sauf si tu les masques.</p>`
    + section('📅','Événements',"Affichés sur l'agenda du site",evs,'evenements','nom',false)
    + section('🕹','Machines (inventaire)','Vitrine « Nos Machines » — masquées par défaut',mats,'materiel','denomination',true)
    + section('📌','Projets','Affichés sur la page Projets',projs,'projets','nom',false)
    + section('🤝','Partenaires',"Encart partenaires du site",parts,'partenaires','nom',false)
    + `<details class="aff-sec" style="border:1px solid var(--line);border-radius:12px;margin-bottom:10px;overflow:hidden;background:var(--card)">
        <summary style="cursor:pointer;display:flex;align-items:center;gap:12px;padding:14px 16px">
          <span style="font-size:22px;line-height:1">📰</span>
          <span style="flex:1;min-width:0"><span style="font-weight:800;color:var(--navy)">Blog</span><span class="mini" style="display:block">Tous les réglages du blog (affichage, widgets, bannières, image de fond)</span></span>
          <span class="aff-chev">▸</span>
        </summary>
        <div style="padding:0 14px 14px">
          <p class="mini" style="margin-bottom:10px">Disposition (grille / sidebar), widgets, encart pub, bannière des articles et image de fond du hero — tout est regroupé ici.</p>
          <button type="button" class="btn js-blog-cfg">${icon('edit')} Configurer le blog</button>
        </div>
      </details>`;
  $('.js-blog-cfg')?.addEventListener('click',()=>blogDisplayModal());
  $$('.js-vis').forEach(t=>t.addEventListener('click',async()=>{
    const next=!t.classList.contains('on');
    try{ await api('/api/'+t.dataset.coll+'/'+t.dataset.id,{method:'PUT',body:JSON.stringify({visible_site:next})}); t.classList.toggle('on',next); t.classList.toggle('off',!next); toast(next?'Publié sur le site':'Masqué'); }catch(e){ toast(e.message); }
  }));
  $$('.js-vitrine').forEach(b=>b.addEventListener('click',()=>{ const m=(mats||[]).find(x=>x.id===+b.dataset.id); if(m) vitrineModal(m); }));
}

// Fiche vitrine d'une machine : présentation publique (photo + titre + sous-titre + description + sens).
function vitrineModal(m){
  let photo = m.photo||'';
  const sensVal = m.sens_site||'auto';
  openModal(`<h3>Fiche vitrine — ${esc(m.denomination)}</h3>
    <p class="help" style="margin:-4px 0 10px">Présentation publique de cette borne sur la page « Nos Machines » (grande photo + texte).</p>
    <div class="field"><span>Photo</span>
      <div style="display:flex;gap:12px;align-items:center;margin-top:4px">
        <div id="vit-prev" style="width:150px;height:104px;border-radius:8px;background:#0b0b0d;background-size:cover;background-position:center;background-repeat:no-repeat;${photo?`background-image:url('${photo}')`:''}"></div>
        <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="vit-photo" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small red" id="vit-photo-clear">${icon('trash')} Retirer</button>
      </div>
    </div>
    <label class="field"><span>Grand titre</span><input id="vit-titre" value="${esc(m.titre_site||m.denomination||'')}" placeholder="ex. La Virtua Fighter 2"></label>
    <label class="field"><span>Sous-titre</span><input id="vit-sous" value="${esc(m.sous_titre_site||'')}" placeholder="ex. le jeu de combat par SEGA"></label>
    <label class="field"><span>Description</span><textarea id="vit-desc" rows="4" placeholder="Présentation de la borne pour les visiteurs…">${esc(m.description_site||'')}</textarea></label>
    <div class="row2">
      <label class="field"><span>Sens d'affichage</span><select id="vit-sens">
        <option value="auto" ${sensVal==='auto'?'selected':''}>Auto (zigzag)</option>
        <option value="image-texte" ${sensVal==='image-texte'?'selected':''}>Image à gauche / texte à droite</option>
        <option value="texte-image" ${sensVal==='texte-image'?'selected':''}>Texte à gauche / image à droite</option>
      </select></label>
      <label class="field"><span>Publié sur le site</span><select id="vit-vis"><option value="0" ${m.visible_site?'':'selected'}>Non</option><option value="1" ${m.visible_site?'selected':''}>✅ Oui — affichée sur westcoastarcades.fr</option></select></label>
    </div>
    <div class="buttons" style="margin-top:12px;flex-wrap:wrap"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn light" id="vit-del" type="button">${icon('trash')} Vider la fiche</button><button class="btn" id="vit-save">Enregistrer</button></div>`);
  $('#vit-photo').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ photo=data; $('#vit-prev').style.backgroundImage=`url('${data}')`; },120*1024); });
  $('#vit-photo-clear').addEventListener('click',()=>{ photo=''; $('#vit-prev').style.backgroundImage=''; });
  const put = body => api('/api/materiel/'+m.id,{method:'PUT',body:JSON.stringify(body)});
  $('#vit-save').addEventListener('click',async()=>{
    try{ await put({ photo, titre_site:$('#vit-titre').value.trim(), sous_titre_site:$('#vit-sous').value.trim(), description_site:$('#vit-desc').value.trim(), sens_site:$('#vit-sens').value, visible_site:$('#vit-vis').value==='1' }); closeModal(); toast('Fiche vitrine enregistrée'); renderAffichageTab(); }catch(e){ toast(e.message); }
  });
  $('#vit-del').addEventListener('click',()=>{ confirmModal('Vider la fiche vitrine de cette borne et la retirer du site ? (la photo de l’inventaire est conservée)', async()=>{ try{ await put({ titre_site:'', sous_titre_site:'', description_site:'', sens_site:'auto', visible_site:false }); closeModal(); toast('Fiche vitrine vidée'); renderAffichageTab(); }catch(e){ toast(e.message); } }); });
}

/* ---- Onglet MODULES : sections de la page d'accueil (hero, photos, équipe) ---- */
async function renderModulesTab(){
  const body=$('#si-body');
  try{ SITE_CONTENT = await api('/api/site'); }catch(e){ SITE_CONTENT={}; }
  const h=SITE_CONTENT.hero||{}; const ph=SITE_CONTENT.photos||[]; const eq=SITE_CONTENT.equipe||[]; const bl=SITE_CONTENT.blog||{};
  const card=(key,titre,desc,resume)=>`<div class="tablecard" style="padding:16px 18px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;gap:16px">
    <div><div style="font-weight:800;color:var(--navy);font-size:16px">${titre}</div><div class="help" style="margin-top:2px">${desc}</div><div class="mini" style="margin-top:4px">${resume}</div></div>
    <button class="btn js-mod-edit" data-k="${key}" style="white-space:nowrap">${icon('edit')} Éditer</button></div>`;
  body.innerHTML = `<p class="help" style="margin-bottom:10px">Chaque module est une section de la page d'accueil du site. Tu modifies le contenu ici ; tant qu'un module n'est pas configuré, le site garde son contenu actuel (aucun risque).</p>`
    + card('hero','🎬 Hero (haut de page)','Grand titre, texte d’accroche, image, bouton.', h.titre?('Titre : '+esc(h.titre)):'Non configuré.')
    + card('photos','🖼 Photos asso',"La galerie « L’association en quelques images… ».", ph.length?(ph.length+' photo(s)'):'Aucune photo.')
    + card('equipe','👥 L’équipe',"La section « La fine équipe » (photo, nom, description).", eq.length?(eq.length+' membre(s)'):'Aucun membre.');
  $$('.js-mod-edit').forEach(b=>b.addEventListener('click',()=>{ const k=b.dataset.k; if(k==='hero') heroModal(); else if(k==='photos') photosModal(); else if(k==='equipe') equipeModal(); }));
}

function heroModal(){
  const h=SITE_CONTENT.hero||{}; let img=h.image||'';
  openModal(`<h3>Module Hero — page d'accueil</h3>
    <label class="field"><span>Grand titre</span><input id="h-titre" value="${esc(h.titre||'')}" placeholder="Association Arcades, Flippers, Retrogaming…"></label>
    <label class="field"><span>Texte d'accroche</span><textarea id="h-texte" rows="5" placeholder="Bienvenue sur notre site associatif…">${esc(h.texte||'')}</textarea></label>
    <div class="field"><span>Image (visuel à droite)</span>
      <div style="display:flex;gap:12px;align-items:center;margin-top:4px">
        <div id="h-prev" style="width:96px;height:120px;border-radius:8px;background:#0b0b0d;background-size:cover;background-position:center;background-repeat:no-repeat;${img?`background-image:url('${img}')`:''}"></div>
        <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="h-img" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small red" id="h-img-clear">${icon('trash')} Retirer</button>
      </div>
    </div>
    <div class="row2">
      <label class="field"><span>Texte du bouton</span><input id="h-cta" value="${esc(h.cta_label||'')}" placeholder="ex. Projet en cours - VIRTUA FIGHTER 2"></label>
      <label class="field"><span>Lien du bouton</span><input id="h-ctaurl" value="${esc(h.cta_url||'')}" placeholder="ex. projet-virtua-fighter-2.html"></label>
    </div>
    <label class="field"><span>Vidéo de fond YouTube — ID ou lien (optionnel)</span><input id="h-video" value="${esc(h.video_url||'')}" placeholder="ex. W3NuWfFUITM"></label>
    <div class="buttons" style="margin-top:12px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="h-save">Enregistrer</button></div>`);
  $('#h-img').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ img=data; $('#h-prev').style.backgroundImage=`url('${data}')`; },120*1024); });
  $('#h-img-clear').addEventListener('click',()=>{ img=''; $('#h-prev').style.backgroundImage=''; });
  $('#h-save').addEventListener('click',async()=>{
    const hero={ titre:$('#h-titre').value.trim(), texte:$('#h-texte').value.trim(), image:img, cta_label:$('#h-cta').value.trim(), cta_url:$('#h-ctaurl').value.trim(), video_url:$('#h-video').value.trim() };
    try{ await api('/api/site',{method:'PUT',body:JSON.stringify({hero})}); closeModal(); toast('Hero enregistré'); renderModulesTab(); }catch(e){ toast(e.message); }
  });
}

function photosModal(){
  let photos=(SITE_CONTENT.photos||[]).map(p=>({image:p.image||p}));
  function draw(){
    const grid=$('#ph-grid');
    grid.innerHTML = photos.length ? photos.map((p,i)=>`<div style="position:relative;width:104px;height:80px;border-radius:6px;overflow:hidden;background:#0b0b0d"><img src="${esc(p.image)}" style="width:100%;height:100%;object-fit:cover"><button type="button" class="js-ph-del" data-i="${i}" title="Retirer" style="position:absolute;top:2px;right:2px;background:#e23b3b;color:#fff;border:none;border-radius:4px;width:20px;height:20px;cursor:pointer;line-height:1">×</button></div>`).join('') : '<p class="mini">Aucune photo. Ajoutez-en ci-dessous.</p>';
    $$('.js-ph-del').forEach(b=>b.addEventListener('click',()=>{ photos.splice(+b.dataset.i,1); draw(); }));
  }
  openModal(`<h3>Module Photos asso</h3>
    <p class="help" style="margin-bottom:8px">La galerie « L'association en quelques images… ». Ajoute autant de photos que tu veux.</p>
    <div id="ph-grid" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px"></div>
    <label class="btn light" style="cursor:pointer">${icon('plus')} Ajouter des photos<input type="file" id="ph-add" accept="image/*" multiple style="display:none"></label>
    <div class="buttons" style="margin-top:12px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="ph-save">Enregistrer</button></div>`);
  draw();
  $('#ph-add').addEventListener('change',ev=>{ [...ev.target.files].forEach(f=>compressSquare(f,data=>{ photos.push({image:data}); draw(); },120*1024)); ev.target.value=''; });
  $('#ph-save').addEventListener('click',async()=>{ try{ await api('/api/site',{method:'PUT',body:JSON.stringify({photos})}); closeModal(); toast('Photos enregistrées'); renderModulesTab(); }catch(e){ toast(e.message); } });
}

function equipeModal(){
  let team=(SITE_CONTENT.equipe||[]).map(m=>({nom:m.nom||'',description:m.description||'',photo:m.photo||''}));
  function draw(){
    const box=$('#eq-list');
    box.innerHTML = team.length ? team.map((m,i)=>`<div class="tablecard" style="padding:10px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start">
      <div class="js-eq-photo" data-i="${i}" title="Changer la photo" style="width:64px;height:64px;flex:0 0 auto;border-radius:8px;background:#0b0b0d;background-size:cover;background-position:center;cursor:pointer;${m.photo?`background-image:url('${m.photo}')`:''}"></div>
      <div style="flex:1;min-width:0">
        <input class="js-eq-nom" data-i="${i}" value="${esc(m.nom)}" placeholder="Nom" style="width:100%;margin-bottom:4px">
        <textarea class="js-eq-desc" data-i="${i}" rows="2" placeholder="Description" style="width:100%">${esc(m.description)}</textarea>
      </div>
      <button type="button" class="iconbtn ghost js-eq-del" data-i="${i}" title="Supprimer">${icon('trash')}</button>
    </div>`).join('') : '<p class="mini">Aucun membre.</p>';
    $$('.js-eq-nom').forEach(inp=>inp.addEventListener('input',()=>{ team[+inp.dataset.i].nom=inp.value; }));
    $$('.js-eq-desc').forEach(inp=>inp.addEventListener('input',()=>{ team[+inp.dataset.i].description=inp.value; }));
    $$('.js-eq-del').forEach(b=>b.addEventListener('click',()=>{ team.splice(+b.dataset.i,1); draw(); }));
    $$('.js-eq-photo').forEach(d=>d.addEventListener('click',()=>{ const i=+d.dataset.i; const inp=document.createElement('input'); inp.type='file'; inp.accept='image/*'; inp.onchange=ev=>{ const f=ev.target.files[0]; if(f) compressSquare(f,data=>{ team[i].photo=data; draw(); },120*1024); }; inp.click(); }));
  }
  openModal(`<h3>Module L'équipe</h3>
    <p class="help" style="margin-bottom:8px">La section « La fine équipe ». Clique sur une photo pour la changer.</p>
    <div id="eq-list"></div>
    <button type="button" class="btn light" id="eq-add">${icon('plus')} Ajouter un membre</button>
    <div class="buttons" style="margin-top:12px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="eq-save">Enregistrer</button></div>`);
  draw();
  $('#eq-add').addEventListener('click',()=>{ team.push({nom:'',description:'',photo:''}); draw(); });
  $('#eq-save').addEventListener('click',async()=>{ try{ await api('/api/site',{method:'PUT',body:JSON.stringify({equipe:team})}); closeModal(); toast('Équipe enregistrée'); renderModulesTab(); }catch(e){ toast(e.message); } });
}

async function blogDisplayModal(){
  SITE_CONTENT = await api('/api/site').catch(()=>SITE_CONTENT||{});
  const b=SITE_CONTENT.blog||{}; const w=b.widgets||{}; const pub=b.pub||{};
  let mode=b.mode||'grid'; let side=b.sidebar_side||'right'; let pubType=pub.type||'image'; let pubMedia=pub.media||''; let bannerG=b.banner||''; let heroImg=SITE_CONTENT.blog_hero||'';
  const ck='display:flex;align-items:center;gap:8px;margin:7px 0;cursor:pointer;font-weight:600';
  openModal(`<h3>Blog — réglages</h3>
    <div class="field"><span>Image de fond du hero (grande bannière en haut de la page Blog)</span>
      <div style="display:flex;gap:12px;align-items:center;margin-top:4px">
        <div id="bl-hero-prev" style="width:220px;height:60px;border-radius:6px;background:#0b0b0d;background-size:cover;background-position:center;background-repeat:no-repeat;${heroImg?`background-image:url('${heroImg}')`:''}"></div>
        <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="bl-hero-file" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small red" id="bl-hero-clear">${icon('trash')} Retirer</button>
      </div>
    </div>
    <div class="field"><span>Disposition de la page blog</span>
      <div class="seg" id="bl-mode" style="width:100%;margin-top:4px">
        <button class="${mode==='grid'?'active':''}" data-m="grid" style="flex:1">▦ Grille</button>
        <button class="${mode==='sidebar'?'active':''}" data-m="sidebar" style="flex:1">▤ Avec sidebar</button>
      </div>
    </div>
    <div class="field" id="bl-side-wrap" style="${mode==='sidebar'?'':'display:none'}"><span>Position de la sidebar</span>
      <div class="seg" id="bl-side" style="width:100%;margin-top:4px">
        <button class="${side==='left'?'active':''}" data-s="left" style="flex:1">◧ À gauche</button>
        <button class="${side==='right'?'active':''}" data-s="right" style="flex:1">◨ À droite</button>
      </div>
    </div>
    <div class="field"><span>Bannière du blog (paysage, en haut des articles)</span>
      <div style="display:flex;gap:12px;align-items:center;margin-top:4px">
        <div id="bl-ban-prev" style="width:200px;height:60px;border-radius:6px;background:#0b0b0d;background-size:cover;background-position:center;background-repeat:no-repeat;${bannerG?`background-image:url('${bannerG}')`:''}"></div>
        <label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="bl-ban-file" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small red" id="bl-ban-clear">${icon('trash')} Retirer</button>
      </div>
    </div>
    <div class="section-title">Widgets de la sidebar</div>
    <label style="${ck}"><input type="checkbox" id="bl-w-search" ${w.search!==false?'checked':''}> 🔍 Recherche sur le blog</label>
    <label style="${ck}"><input type="checkbox" id="bl-w-pub" ${w.pub?'checked':''}> 📢 Encart publicitaire</label>
    <label style="${ck}"><input type="checkbox" id="bl-w-ventes" ${w.ventes?'checked':''}> 🏷️ Matériel à vendre (depuis l'inventaire « à vendre »)</label>
    <div class="card" id="bl-pub-cfg" style="margin-top:8px;padding:12px;${w.pub?'':'display:none'}">
      <div style="font-weight:700;color:var(--navy);margin-bottom:8px">Encart publicitaire</div>
      <label class="field"><span>Type</span><select id="bl-pub-type"><option value="image" ${pubType==='image'?'selected':''}>Image / GIF</option><option value="youtube" ${pubType==='youtube'?'selected':''}>Vidéo YouTube</option></select></label>
      <div id="bl-pub-img" style="${pubType==='image'?'':'display:none'}"><div style="display:flex;gap:10px;align-items:center;margin:4px 0"><div id="bl-pub-prev" style="width:130px;height:84px;border-radius:6px;background:#0b0b0d;background-size:cover;background-position:center;${pubMedia&&pubType==='image'?`background-image:url('${pubMedia}')`:''}"></div><label class="btn small grey" style="cursor:pointer">${icon('plus')} Image<input type="file" id="bl-pub-file" accept="image/*" style="display:none"></label></div></div>
      <label class="field" id="bl-pub-yt" style="${pubType==='youtube'?'':'display:none'}"><span>ID ou lien YouTube</span><input id="bl-pub-ytid" value="${pubType==='youtube'?esc(pubMedia):''}" placeholder="ex. W3NuWfFUITM"></label>
      <label class="field"><span>Lien au clic (optionnel)</span><input id="bl-pub-link" value="${esc(pub.link||'')}" placeholder="https://…"></label>
      <label class="field"><span>Titre de l'encart (optionnel)</span><input id="bl-pub-titre" value="${esc(pub.titre||'')}" placeholder="ex. Nos partenaires"></label>
    </div>
    <div class="buttons" style="margin-top:12px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="bl-save">Enregistrer</button></div>`);
  $$('#bl-mode button').forEach(x=>x.addEventListener('click',()=>{ mode=x.dataset.m; $$('#bl-mode button').forEach(y=>y.classList.toggle('active',y===x)); $('#bl-side-wrap').style.display=mode==='sidebar'?'':'none'; }));
  $$('#bl-side button').forEach(x=>x.addEventListener('click',()=>{ side=x.dataset.s; $$('#bl-side button').forEach(y=>y.classList.toggle('active',y===x)); }));
  $('#bl-w-pub').addEventListener('change',()=>{ $('#bl-pub-cfg').style.display=$('#bl-w-pub').checked?'':'none'; });
  $('#bl-pub-type').addEventListener('change',()=>{ pubType=$('#bl-pub-type').value; $('#bl-pub-img').style.display=pubType==='image'?'':'none'; $('#bl-pub-yt').style.display=pubType==='youtube'?'':'none'; });
  $('#bl-pub-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ pubMedia=data; $('#bl-pub-prev').style.backgroundImage=`url('${data}')`; },150*1024); });
  $('#bl-ban-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressImage(f,data=>{ bannerG=data; $('#bl-ban-prev').style.backgroundImage=`url('${data}')`; }); });
  $('#bl-ban-clear').addEventListener('click',()=>{ bannerG=''; $('#bl-ban-prev').style.backgroundImage=''; });
  $('#bl-hero-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressImage(f,data=>{ heroImg=data; $('#bl-hero-prev').style.backgroundImage=`url('${data}')`; }); });
  $('#bl-hero-clear').addEventListener('click',()=>{ heroImg=''; $('#bl-hero-prev').style.backgroundImage=''; });
  $('#bl-save').addEventListener('click',async()=>{
    if(pubType==='youtube') pubMedia=$('#bl-pub-ytid').value.trim();
    const blog={ mode, sidebar_side:side, banner:bannerG, widgets:{ search:$('#bl-w-search').checked, pub:$('#bl-w-pub').checked, ventes:$('#bl-w-ventes').checked }, pub:{ type:pubType, media:pubMedia, link:$('#bl-pub-link').value.trim(), titre:$('#bl-pub-titre').value.trim() } };
    try{ await api('/api/site',{method:'PUT',body:JSON.stringify({blog, blog_hero:heroImg})}); closeModal(); toast('Réglages du blog enregistrés'); renderSiteInternet(); }catch(e){ toast(e.message); }
  });
}

async function renderUsers(){
  await loadConfig();
  const canComptes = isAdminUser() || isReadonly();
  const dispoOn = moduleOn('disponibilites');
  const partOn = moduleOn('partenaires') && canComptes;
  const groupesOn = isAdminUser();
  if(USR_TAB===null) USR_TAB = isAdminUser()||!dispoOn ? 'comptes' : 'dispo';
  if(USR_TAB==='comptes' && !canComptes) USR_TAB = dispoOn?'dispo':'comptes';
  if(USR_TAB==='dispo' && !dispoOn) USR_TAB='comptes';
  if(USR_TAB==='partenaires' && !partOn) USR_TAB = canComptes?'comptes':'dispo';
  if(USR_TAB==='groupes' && !groupesOn) USR_TAB = canComptes?'comptes':'dispo';
  if(!canComptes && !dispoOn){ setView('accueil'); return; }
  const action = USR_TAB==='comptes'
    ? (isAdminUser()?`<button class="btn" id="add-u">${icon('userplus')} Nouvel utilisateur</button>`:'')
    : USR_TAB==='dispo' ? `<button class="btn" id="add-abs">${icon('plus')} Ajouter une absence</button>` : '';
  setTopbar('Utilisateurs', action);
  $('#add-u')?.addEventListener('click',()=>userModal());
  $('#add-abs')?.addEventListener('click',()=>absenceModal());
  view().innerHTML = `<div class="tabs-row">
      ${canComptes?`<button class="${USR_TAB==='comptes'?'active':''}" id="ut-comptes">${icon('users')} Comptes</button>`:''}
      ${partOn?`<button class="${USR_TAB==='partenaires'?'active':''}" id="ut-part">${icon('share')} Partenaires</button>`:''}
      ${dispoOn?`<button class="${USR_TAB==='dispo'?'active':''}" id="ut-dispo">${icon('calendar')} Disponibilités</button>`:''}
      ${groupesOn?`<button class="${USR_TAB==='groupes'?'active':''}" id="ut-groupes">${icon('lock')} Groupes & permissions</button>`:''}
    </div><div id="usr-body"></div>`;
  $('#ut-dispo')?.addEventListener('click',()=>{ USR_TAB='dispo'; renderUsers(); });
  $('#ut-comptes')?.addEventListener('click',()=>{ USR_TAB='comptes'; renderUsers(); });
  $('#ut-part')?.addEventListener('click',()=>{ USR_TAB='partenaires'; renderUsers(); });
  $('#ut-groupes')?.addEventListener('click',()=>{ USR_TAB='groupes'; renderUsers(); });
  if(USR_TAB==='comptes'){ $('#usr-body').innerHTML=`<div id="u-pills" class="cat-pills"></div><div id="u-list"></div>`; loadUsers(); }
  else if(USR_TAB==='partenaires'){ PT_INTAB=true; $('#usr-body').innerHTML='<div id="pt-body"></div>'; loadPartners().then(()=>renderPartenaires()); }
  else if(USR_TAB==='groupes'){ $('#usr-body').innerHTML='<div id="roles-body"></div>'; renderRoles(); }
  else { renderDispo(); }
}

/* ---------------------------- Disponibilités (frise) ---------------------------- */
const ABS_TYPES = {
  vacances:{label:'Vacances', color:'#5b5bd6'},
  deplacement:{label:'Déplacement professionnel', color:'#ee6c5a'},
  teletravail:{label:'Télétravail', color:'#5a9e6f'},
  maladie:{label:'Arrêt maladie', color:'#f0a93b'},
  indispo:{label:'Indisponible', color:'#8a93a3'},
  dispo:{label:'Disponible', color:'#14a4b4'},
};
let MEMBRES=[]; let ABS=[];
const DISPO={ start:null, days:14, q:'' };
function addDays(iso,n){ const d=new Date(iso+'T00:00:00'); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); }
function daysBetween(a,b){ return Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/86400000); }
function mondayOf(iso){ const d=new Date(iso+'T00:00:00'); const dow=(d.getDay()+6)%7; d.setDate(d.getDate()-dow); return d.toISOString().slice(0,10); }
async function renderDispo(){
  const body=$('#usr-body'); if(!body) return;
  body.innerHTML='<p class="mini">Chargement…</p>';
  try{ MEMBRES=await api('/api/membres'); ABS=await api('/api/absences'); }catch(e){ body.innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; return; }
  if(!DISPO.start) DISPO.start=mondayOf(todayISO());
  drawDispo();
}
function drawDispo(){
  const body=$('#usr-body'); if(!body) return;
  const days=DISPO.days, start=DISPO.start, today=todayISO();
  const dates=[]; for(let i=0;i<days;i++) dates.push(addDays(start,i));
  const q=(DISPO.q||'').toLowerCase();
  const members=MEMBRES.filter(m=>!q || m.nom.toLowerCase().includes(q));
  const byUser={}; ABS.forEach(a=>{ (byUser[a.user_id]=byUser[a.user_id]||[]).push(a); });
  const WK=['D','L','M','M','J','V','S'];
  const headCells = dates.map((d,i)=>{ const dt=new Date(d+'T00:00:00'); const we=(dt.getDay()===0||dt.getDay()===6); const t=d===today; return `<div class="fz-day ${we?'we':''} ${t?'today':''}" style="grid-column:${i+2}"><span class="fz-dnum ${t?'now':''}">${dt.getDate()}</span><span class="fz-dwk">${WK[dt.getDay()]}</span></div>`; }).join('');
  let rows='';
  members.forEach(m=>{
    const cells = dates.map((d,i)=>{ const dt=new Date(d+'T00:00:00'); const we=(dt.getDay()===0||dt.getDay()===6); const t=d===today; return `<div class="fz-cell ${we?'we':''} ${t?'today':''} js-fz-cell" style="grid-column:${i+2}" data-uid="${m.id}" data-date="${d}"></div>`; }).join('');
    const bars=(byUser[m.id]||[]).map(a=>{
      const end=a.date_fin||a.date_debut;
      if(daysBetween(start,end)<0 || daysBetween(start,a.date_debut)>days-1) return '';
      const s=Math.max(0, daysBetween(start, a.date_debut));
      const e=Math.min(days-1, daysBetween(start, end));
      const ty=ABS_TYPES[a.type]||{label:a.type,color:'#8a93a3'};
      return `<div class="fz-bar js-fz-bar" data-id="${a.id}" style="grid-column:${s+2}/${e+3};background:${ty.color}" title="${esc(ty.label)} — ${dateShort(a.date_debut)} → ${dateShort(end)}${a.note?' · '+esc(a.note):''}">${esc(ty.label)}</div>`;
    }).join('');
    rows+=`<div class="fz-row" style="grid-template-columns:var(--fz-name) repeat(${days},var(--fz-day))">
      <div class="fz-name">${m.photo?`<img class="avatar avatar-sm" src="${m.photo}" alt="">`:`<span class="avatar avatar-sm avatar-ph">${esc((m.nom[0]||'?').toUpperCase())}</span>`}<span class="fz-nm">${esc(m.nom)}</span></div>
      ${cells}${bars}</div>`;
  });
  body.innerHTML = `
    <div class="fz-toolbar">
      <div class="seg"><button data-d="7" class="${days===7?'active':''}">Semaine</button><button data-d="14" class="${days===14?'active':''}">2 semaines</button><button data-d="31" class="${days===31?'active':''}">Mois</button></div>
      <div class="fz-nav"><button class="iconbtn ghost" id="fz-prev" title="Précédent">‹</button><span class="fz-period">${dateShort(start)} → ${dateShort(addDays(start,days-1))}</span><button class="iconbtn ghost" id="fz-next" title="Suivant">›</button><button class="btn small grey" id="fz-today">Aujourd'hui</button></div>
    </div>
    <div class="fz-legend">${Object.entries(ABS_TYPES).map(([k,t])=>`<span class="fz-leg"><span class="fz-dot" style="background:${t.color}"></span>${t.label}</span>`).join('')}</div>
    <div class="friz"><div class="fz-inner" style="--fz-name:200px;--fz-day:46px">
      <div class="fz-row fz-head" style="grid-template-columns:var(--fz-name) repeat(${days},var(--fz-day))"><div class="fz-name fz-search">${icon('search','ic')}<input id="fz-q" value="${esc(DISPO.q)}" placeholder="Recherche employés"></div>${headCells}</div>
      ${rows||'<div class="empty-state" style="margin:16px">Aucun membre.</div>'}
    </div></div>`;
  $$('.fz-toolbar .seg button').forEach(b=>b.addEventListener('click',()=>{ DISPO.days=+b.dataset.d; drawDispo(); }));
  $('#fz-prev').addEventListener('click',()=>{ DISPO.start=addDays(start,-days); drawDispo(); });
  $('#fz-next').addEventListener('click',()=>{ DISPO.start=addDays(start,days); drawDispo(); });
  $('#fz-today').addEventListener('click',()=>{ DISPO.start=mondayOf(todayISO()); drawDispo(); });
  const qi=$('#fz-q'); qi.addEventListener('input',()=>{ DISPO.q=qi.value; drawDispo(); const n=$('#fz-q'); if(n){ n.focus(); n.setSelectionRange(n.value.length,n.value.length); } });
  $$('.js-fz-bar').forEach(b=>b.addEventListener('click',()=>{ const a=ABS.find(x=>x.id===+b.dataset.id); if(a) absenceModal(a); }));
  $$('.js-fz-cell').forEach(c=>c.addEventListener('click',()=>{ const uid=+c.dataset.uid; if(!isAdminUser() && uid!==CURRENT_USER.id){ toast('Vous ne pouvez gérer que vos propres disponibilités.'); return; } absenceModal(null,{user_id:uid,date_debut:c.dataset.date,date_fin:c.dataset.date}); }));
}
async function absenceModal(a, prefill){
  if(!MEMBRES.length){ try{ MEMBRES=await api('/api/membres'); }catch{} }
  const e=a||prefill||{}; const admin=isAdminUser();
  openModal(`<h3>${a?'Modifier la disponibilité':'Nouvelle disponibilité'}</h3>
    ${admin?`<label class="field"><span>Membre</span><select id="ab-user">${MEMBRES.map(m=>`<option value="${m.id}" ${+e.user_id===m.id?'selected':''}>${esc(m.nom)}</option>`).join('')}</select></label>`:''}
    <label class="field"><span>Type</span><select id="ab-type">${Object.entries(ABS_TYPES).map(([k,t])=>`<option value="${k}" ${(e.type||'vacances')===k?'selected':''}>${t.label}</option>`).join('')}</select></label>
    <div class="row2"><label class="field"><span>Du</span><input id="ab-deb" type="date" value="${esc(e.date_debut)||todayISO()}"></label>
      <label class="field"><span>Au</span><input id="ab-fin" type="date" value="${esc(e.date_fin)||esc(e.date_debut)||todayISO()}"></label></div>
    <label class="field"><span>Note (optionnel)</span><input id="ab-note" value="${esc(e.note)}" placeholder="précision…"></label>
    <div style="display:flex;gap:8px;margin-top:10px;align-items:center">${a?`<button class="btn small red" id="ab-del">${icon('trash')} Supprimer</button>`:''}<span style="flex:1"></span><button class="btn grey small" onclick="closeModal()">Annuler</button><button class="btn small" id="ab-save">Enregistrer</button></div>`);
  $('#ab-save').addEventListener('click',async()=>{
    const body={ type:$('#ab-type').value, date_debut:$('#ab-deb').value, date_fin:$('#ab-fin').value, note:$('#ab-note').value.trim() };
    if(admin && $('#ab-user')) body.user_id=+$('#ab-user').value;
    if(!body.date_debut){ toast('Date de début requise.'); return; }
    try{ await api(a?'/api/absences/'+a.id:'/api/absences',{method:a?'PUT':'POST',body:JSON.stringify(body)}); closeModal(); toast('Enregistré'); renderDispo(); }catch(err){ toast(err.message); }
  });
  $('#ab-del')?.addEventListener('click',()=>confirmModal('Supprimer cette disponibilité ?', async()=>{ try{ await api('/api/absences/'+a.id,{method:'DELETE'}); toast('Supprimé'); renderDispo(); }catch(err){ toast(err.message); } }));
}
async function loadUsers(){
  try{ USR_ALL = await api('/api/users'); renderUsrPills(); renderUsrList(); }
  catch(e){ $('#u-list').innerHTML=`<div class="empty-state">${esc(e.message)}</div>`; }
}
function renderUsrPills(){
  const box=$('#u-pills'); if(!box) return;
  const counts={}; USR_ALL.forEach(u=>{ counts[u.role]=(counts[u.role]||0)+1; });
  if(USR.role && !counts[USR.role]) USR.role='';
  const pill=(id,label,n,active)=>`<button class="cat-pill ${active?'on':''}" data-role="${esc(id)}">${icon('users','ic')}<span>${esc(label)}</span><b>${n}</b></button>`;
  box.innerHTML = pill('','Tous',USR_ALL.length,USR.role==='') + ROLES.filter(r=>counts[r.key]).map(r=>pill(r.key,r.label,counts[r.key],USR.role===r.key)).join('');
  $$('#u-pills .cat-pill').forEach(b=>b.addEventListener('click',()=>{ USR.role=b.dataset.role; renderUsrPills(); renderUsrList(); }));
}
function renderUsrList(){
  const el=$('#u-list'); if(!el) return;
  const list=USR_ALL.filter(u=>!USR.role || u.role===USR.role);
  el.innerHTML = `<div class="tablecard"><table class="grid">
    <thead><tr><th>Nom</th><th>Identifiant</th><th>Rôle</th><th></th></tr></thead>
    <tbody>${list.map(u=>`<tr>
      <td data-label="Nom"><div class="pcell">${u.photo?`<img class="avatar avatar-sm" src="${u.photo}" alt="">`:`<span class="avatar avatar-sm avatar-ph">${esc(((u.prenom||u.nom||u.login||'?')[0]||'?').toUpperCase())}</span>`}<strong>${esc((u.prenom+' '+u.nom).trim()||'—')}</strong></div></td>
      <td data-label="Identifiant">${esc(u.login)}</td>
      <td data-label="Rôle"><span class="tag ${u.niveau==='admin'?'purple':(u.niveau==='lecture'?'gray':'blue')}">${esc(roleLabel(u.role))}${u.niveau==='lecture'?' · lecture':''}</span></td>
      <td data-label="" class="cell-actions"><div class="row-actions"><button class="iconbtn ghost js-u-pw" data-id="${u.id}" title="Mot de passe">${icon('lock')}</button><button class="iconbtn ghost js-u-edit" data-id="${u.id}">${icon('edit')}</button>${u.id!==CURRENT_USER.id?`<button class="iconbtn ghost js-u-del" data-id="${u.id}">${icon('trash')}</button>`:''}</div></td></tr>`).join('')}</tbody></table></div>`;
  $$('.js-u-edit').forEach(b=>b.addEventListener('click',()=>userModal(USR_ALL.find(x=>x.id===+b.dataset.id))));
  $$('.js-u-pw').forEach(b=>b.addEventListener('click',()=>userPwModal(+b.dataset.id)));
  $$('.js-u-del').forEach(b=>b.addEventListener('click',()=>confirmModal('Supprimer ce compte ?', async()=>{ try{ await api('/api/users/'+b.dataset.id,{method:'DELETE'}); toast('Supprimé'); loadUsers(); }catch(e){ toast(e.message); } })));
}
function gererRolesModal(){
  openModal(`<div id="roles-body"></div>`);
  renderRoles();
}
const NIVEAUX = { admin:'Administrateur', standard:'Standard', lecture:'Lecture seule' };
function renderRoles(){
  const body=$('#roles-body'); if(!body) return;
  body.innerHTML = `<h3>Gérer les rôles</h3>
    <p class="help" style="margin-bottom:10px">Chaque rôle porte un niveau d'accès qui définit les droits.</p>
    <div class="manage-list">${ROLES.map(r=>`<div class="manage-row">
        <input class="mr-input js-role-name" data-key="${esc(r.key)}" value="${esc(r.label)}">
        <select class="js-role-niv" data-key="${esc(r.key)}" style="max-width:150px">${Object.entries(NIVEAUX).map(([k,v])=>`<option value="${k}" ${r.niveau===k?'selected':''}>${v}</option>`).join('')}</select>
        <button class="iconbtn ghost js-role-del" data-key="${esc(r.key)}" title="Supprimer">${icon('trash')}</button>
      </div>`).join('')}</div>
    <div class="add-row"><input id="role-new" placeholder="Nouveau rôle…"><select id="role-new-niv" style="max-width:150px">${Object.entries(NIVEAUX).map(([k,v])=>`<option value="${k}" ${k==='standard'?'selected':''}>${v}</option>`).join('')}</select><button class="btn small" id="role-add">${icon('plus')} Ajouter</button></div>`;
  const after=async()=>{ await loadConfig(); renderRoles(); if($('#u-list')) loadUsers(); updateUserbox(); };
  $('#role-add').addEventListener('click',async()=>{ const label=$('#role-new').value.trim(); if(!label) return; try{ await api('/api/roles',{method:'POST',body:JSON.stringify({label,niveau:$('#role-new-niv').value})}); toast('Rôle ajouté'); after(); }catch(e){ toast(e.message); } });
  $$('.js-role-name').forEach(inp=>inp.addEventListener('change',async()=>{ try{ await api('/api/roles',{method:'PUT',body:JSON.stringify({key:inp.dataset.key,label:inp.value.trim()})}); toast('Rôle renommé'); after(); }catch(e){ toast(e.message); } }));
  $$('.js-role-niv').forEach(s=>s.addEventListener('change',async()=>{ try{ await api('/api/roles',{method:'PUT',body:JSON.stringify({key:s.dataset.key,niveau:s.value})}); toast('Niveau mis à jour'); after(); }catch(e){ toast(e.message); after(); } }));
  $$('.js-role-del').forEach(b=>b.addEventListener('click',()=>{ const k=b.dataset.key; confirmModal('Supprimer ce rôle ? Les comptes concernés repasseront « Technicien ».', async()=>{ try{ await api('/api/roles',{method:'DELETE',body:JSON.stringify({key:k})}); toast('Rôle supprimé'); after(); }catch(e){ toast(e.message); } }); }));
}
function userModal(u){
  const e=u||{};
  let uPhoto=e.photo||'';
  openModal(`<h3>${u?'Modifier l\'utilisateur':'Nouvel utilisateur'}</h3>
    <label class="field"><span>Photo</span><div class="photo-edit"><div class="photo-prev" id="u-photo-prev">${uPhoto?`<img src="${uPhoto}" alt="">`:`<span class="ph">${icon('users','ic')}</span>`}</div>
      <div class="photo-btns"><label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="u-photo-file" accept="image/*" style="display:none"></label>
        <button type="button" class="btn small red" id="u-photo-clear">${icon('trash')} Retirer</button></div></div></label>
    <div class="row2"><label class="field"><span>Prénom</span><input id="u-prenom" value="${esc(e.prenom)}"></label>
      <label class="field"><span>Nom</span><input id="u-nom" value="${esc(e.nom)}"></label></div>
    <label class="field"><span>Identifiant *</span><input id="u-login" value="${esc(e.login)}" ${u?'disabled style="opacity:.6"':''}></label>
    ${u?'':`<label class="field"><span>Mot de passe *</span><input id="u-pw" type="text" placeholder="mot de passe initial"></label>`}
    <label class="field"><span>Rôle</span><select id="u-role">${ROLES.map(r=>`<option value="${esc(r.key)}" ${(e.role||'technicien')===r.key?'selected':''}>${esc(r.label)} — ${NIVEAUX[r.niveau]||r.niveau}</option>`).join('')}</select></label>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="u-save">Enregistrer</button></div>`);
  $('#u-photo-file').addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ uPhoto=data; $('#u-photo-prev').innerHTML=`<img src="${data}" alt="">`; }); });
  $('#u-photo-clear').addEventListener('click',()=>{ uPhoto=''; $('#u-photo-prev').innerHTML=`<span class="ph">${icon('users','ic')}</span>`; });
  $('#u-save').addEventListener('click',async()=>{
    if(u){ try{ await api('/api/users/'+u.id,{method:'PUT',body:JSON.stringify({nom:$('#u-nom').value,prenom:$('#u-prenom').value,role:$('#u-role').value,photo:uPhoto})}); closeModal(); toast('Enregistré'); loadUsers(); }catch(e){ toast(e.message); } }
    else { const body={ login:$('#u-login').value.trim(), password:$('#u-pw').value, nom:$('#u-nom').value, prenom:$('#u-prenom').value, role:$('#u-role').value, photo:uPhoto, must_change:true };
      if(!body.login||!body.password){ toast('Identifiant et mot de passe obligatoires.'); return; }
      try{ await api('/api/users',{method:'POST',body:JSON.stringify(body)}); closeModal(); toast('Compte créé'); loadUsers(); }catch(e){ toast(e.message); } }
  });
}
function userPwModal(id){
  openModal(`<h3>Réinitialiser le mot de passe</h3>
    <label class="field"><span>Nouveau mot de passe (direct)</span><input id="pw-new" type="text"></label>
    <p class="help">L'utilisateur devra le changer à sa prochaine connexion.</p>
    <div class="buttons" style="margin-top:8px"><button class="btn grey" onclick="closeModal()">Annuler</button><button class="btn" id="pw-save">Enregistrer</button></div>
    <div class="section-title">Ou : code de réinitialisation</div>
    <p class="help" style="margin:0 0 8px">Générez un code à communiquer au membre. Il pourra changer lui-même son mot de passe via « Mot de passe oublié ? » sur l'écran de connexion (valable 24h).</p>
    <div id="pw-code-box"></div>
    <button class="btn light small" id="pw-code-gen">${icon('lock')} Générer un code</button>`);
  $('#pw-save').addEventListener('click',async()=>{ try{ await api(`/api/users/${id}/password`,{method:'POST',body:JSON.stringify({password:$('#pw-new').value})}); closeModal(); toast('Mot de passe réinitialisé'); }catch(e){ toast(e.message); } });
  $('#pw-code-gen').addEventListener('click',async()=>{ try{ const r=await api(`/api/users/${id}/reset-code`,{method:'POST',body:JSON.stringify({})}); $('#pw-code-box').innerHTML=`<div class="recap" style="font-size:18px;letter-spacing:2px;text-align:center;font-weight:800">${esc(r.code)}</div><p class="help">Identifiant : <strong>${esc(r.login)}</strong> · valable 24h, usage unique.</p>`; toast('Code généré'); }catch(e){ toast(e.message); } });
}

/* ============================== PARAMÈTRES ============================== */
async function renderReglages(){
  setTopbar('Administration','');
  const u=CURRENT_USER||{};
  const isAdmin=isAdminUser();
  const canActivite=(isAdmin||isReadonly()) && moduleOn('activite');
  let mePhoto=u.photo||'';
  view().innerHTML = `
    ${isReadonly()?`<div class="card" style="background:var(--amber-l);border-color:#f0dca6;margin-bottom:6px"><strong>${icon('lock')} Mode invité — lecture seule</strong><p class="help">Vous pouvez tout consulter ; les modifications sont désactivées.</p></div>`:''}
    <div class="section-title" style="margin-top:0">Mon compte</div>
    <div class="card">
      <label class="field"><span>Photo de profil</span>
        <div class="photo-edit"><div class="photo-prev" id="me-photo-prev">${mePhoto?`<img src="${mePhoto}" alt="">`:`<span class="ph">${icon('users','ic')}</span>`}</div>
          <div class="photo-btns"><label class="btn small grey" style="cursor:pointer">${icon('plus')} Choisir<input type="file" id="me-photo-file" accept="image/*" style="display:none"></label>
            <button type="button" class="btn small red" id="me-photo-clear">${icon('trash')} Retirer</button>
            <span class="help">Carré, compressée. S'affiche dans les disponibilités.</span></div></div></label>
      <div class="row2"><label class="field"><span>Prénom</span><input id="me-prenom" value="${esc(u.prenom)}"></label>
        <label class="field"><span>Nom</span><input id="me-nom" value="${esc(u.nom)}"></label></div>
      <button class="btn small" id="me-save">Enregistrer</button>
    </div>
    <div class="section-title">Apparence</div>
    <div class="card"><p class="help" style="margin:0 0 12px">Le thème est mémorisé sur cet appareil pour votre compte.</p>
      <div class="theme-grid">${THEMES.map(t=>`<button class="theme-opt ${currentTheme()===t.key?'on':''}" data-theme="${t.key}">
          <span class="theme-swatch sw-${t.key}"></span>
          <span class="theme-meta"><strong>${t.label}</strong><small>${esc(t.desc)}</small></span>
          ${currentTheme()===t.key?`<span class="theme-check">${icon('check','ic')}</span>`:''}
        </button>`).join('')}</div>
    </div>
    <div class="section-title">Changer mon mot de passe</div>
    <div class="card">
      <label class="field"><span>Mot de passe actuel</span><input id="me-cur" type="password"></label>
      <label class="field"><span>Nouveau mot de passe</span><input id="me-new" type="password"></label>
      <button class="btn small" id="me-pw">Modifier le mot de passe</button>
    </div>
    ${isAdmin?`<div class="section-title">Menus & modules</div>
    <div class="card"><p class="help" style="margin:0 0 10px">Activez ou désactivez les modules. Un module désactivé masque sa page et ses fonctions.</p>
      <div class="watch-list">${MODULE_REGISTRY.map(m=>`<div class="watch-row"><span class="wr-lbl">${esc(m.label)}<br><small style="font-weight:400;color:var(--muted)">${esc(m.desc||'')}</small></span><span class="toggle-oui-non ${moduleOn(m.key)?'on':'off'} js-mod" data-k="${esc(m.key)}"><span class="t-oui">OUI</span><span class="t-non">NON</span></span></div>`).join('')}</div>
    </div>
    <div class="card" style="margin-top:10px"><p class="help" style="margin:0 0 10px">Affichage des menus de gauche. <strong>Auto</strong> : le menu se cache quand il est vide. Tu peux forcer l'affichage ou le masquage.</p>
      <div class="watch-list">${NAV.filter(n=>NAV_HIDEABLE[n.id]).map(n=>{ const ov=NAV_VIS[n.id]||'auto'; const cnt=NAV_COUNTS[NAV_HIDEABLE[n.id]]||0; return `<div class="watch-row"><span class="wr-lbl">${icon(n.icon)} ${esc(n.label)} <small style="color:var(--muted)">(${cnt})</small></span><select class="js-navvis" data-id="${esc(n.id)}" style="width:auto"><option value="auto" ${ov==='auto'?'selected':''}>Auto (cacher si vide)</option><option value="show" ${ov==='show'?'selected':''}>Toujours afficher</option><option value="hide" ${ov==='hide'?'selected':''}>Cacher</option></select></div>`; }).join('')}</div>
    </div>`:''}
    ${isAdmin?`<div class="section-title">Sauvegarde & restauration</div>
    <div class="card">
      <p class="help" style="margin-bottom:12px">Exportez toutes vos données (matériel, devis, ventes…) dans un fichier, ou restaurez une sauvegarde.</p>
      <div class="buttons">
        <button class="btn small navy" id="bk-export">${icon('download')} Télécharger la sauvegarde</button>
        <label class="btn small grey" style="cursor:pointer">${icon('share')} Restaurer<input type="file" id="bk-file" accept="application/json" style="display:none"></label>
      </div>
    </div>`:''}
    ${canActivite?`<div class="section-title">Activité de l'équipe</div>
    <div id="act-box"><div class="card"><p class="mini">Chargement…</p></div></div>`:''}
    <div class="section-title">À propos</div>
    <div class="card"><strong>West Coast Arcades — Gestion</strong><p class="help">Inventaire, devis, événements, réparations, ventes et prêts. <a href="https://www.westcoastarcades.fr" target="_blank" style="color:var(--teal-d);font-weight:700">westcoastarcades.fr</a></p>
      <button class="btn small red" id="me-logout" style="margin-top:10px">${icon('logout')} Se déconnecter</button></div>`;
  $$('.theme-opt').forEach(b=>b.addEventListener('click',()=>{ applyTheme(b.dataset.theme); toast('Thème appliqué'); renderReglages(); }));
  $('#me-photo-file')?.addEventListener('change',ev=>{ const f=ev.target.files[0]; if(!f) return; compressSquare(f,data=>{ mePhoto=data; $('#me-photo-prev').innerHTML=`<img src="${data}" alt="">`; }); });
  $('#me-photo-clear')?.addEventListener('click',()=>{ mePhoto=''; $('#me-photo-prev').innerHTML=`<span class="ph">${icon('users','ic')}</span>`; });
  $('#me-save').addEventListener('click',async()=>{ try{ const r=await api('/api/me',{method:'PUT',body:JSON.stringify({nom:$('#me-nom').value,prenom:$('#me-prenom').value,photo:mePhoto})}); CURRENT_USER=r.user; updateUserbox(); toast('Enregistré'); }catch(e){ toast(e.message); } });
  $('#me-pw').addEventListener('click',async()=>{ try{ await api('/api/me/password',{method:'POST',body:JSON.stringify({current:$('#me-cur').value,new:$('#me-new').value})}); toast('Mot de passe modifié'); $('#me-cur').value='';$('#me-new').value=''; }catch(e){ toast(e.message); } });
  $('#me-logout').addEventListener('click',doLogout);
  if(isAdmin){
    $$('.js-mod').forEach(t=>t.addEventListener('click',async()=>{ const k=t.dataset.k; const v=!moduleOn(k); try{ await api('/api/config',{method:'PUT',body:JSON.stringify({modules:{[k]:v}})}); MODULES_ENABLED[k]=v; toast(v?'Module activé':'Module désactivé'); buildNav(); renderReglages(); }catch(e){ toast(e.message); } }));
    $$('.js-navvis').forEach(s=>s.addEventListener('change',async()=>{ const id=s.dataset.id, v=s.value; try{ await api('/api/config',{method:'PUT',body:JSON.stringify({nav_visibility:{[id]:v}})}); NAV_VIS[id]=v; toast('Affichage du menu mis à jour'); buildNav(); }catch(e){ toast(e.message); } }));
    $('#bk-export').addEventListener('click',async()=>{ try{ const data=await api('/api/backup'); const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`wca-sauvegarde-${todayISO()}.json`; a.click(); toast('Sauvegarde téléchargée'); }catch(e){ toast(e.message); } });
    $('#bk-file').addEventListener('change',e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=async()=>{ try{ const data=JSON.parse(r.result); confirmModal('Restaurer cette sauvegarde ? Toutes les données actuelles seront remplacées.', async()=>{ try{ await api('/api/restore',{method:'POST',body:JSON.stringify(data)}); toast('Données restaurées'); setView('accueil'); }catch(err){ toast(err.message); } }); }catch{ toast('Fichier invalide.'); } }; r.readAsText(f); });
  }
  if(canActivite){
    loadActivite();
    if(window.__actTimer) clearInterval(window.__actTimer);
    window.__actTimer = setInterval(()=>{ if(state.view==='reglages') loadActivite(true); }, 20000);
  }
}
function relTime(iso){
  if(!iso) return 'jamais';
  const s=Math.floor((Date.now()-new Date(iso).getTime())/1000);
  if(s<60) return 'à l\'instant';
  if(s<3600) return `il y a ${Math.floor(s/60)} min`;
  if(s<86400) return `il y a ${Math.floor(s/3600)} h`;
  return dateTimeShort(iso);
}
async function loadActivite(silent){
  const box=$('#act-box'); if(!box) return;
  try{
    const d=await api('/api/activite');
    const medal=i=>['🥇','🥈','🥉'][i]||`${i+1}.`;
    const onlineHtml = d.en_ligne.length
      ? d.en_ligne.map(u=>`<span class="online-chip"><span class="dot"></span>${esc(u.nom)} <small>${esc(u.login)}</small></span>`).join('')
      : '<p class="mini">Personne en ligne actuellement.</p>';
    const cnxHtml = d.connexions.length
      ? `<table class="grid"><thead><tr><th>Jour</th><th>Connexions</th><th>Utilisateurs</th></tr></thead><tbody>${
          d.connexions.map(c=>`<tr><td data-label="Jour">${dateShort(c.jour)}</td><td data-label="Connexions">${c.total}</td><td data-label="Utilisateurs">${esc(c.logins.join(', '))}</td></tr>`).join('')}</tbody></table>`
      : '<p class="mini">Aucune connexion enregistrée.</p>';
    const lastHtml = d.comptes.map(u=>`<tr><td data-label="Utilisateur">${esc(u.nom)} ${u.en_ligne?'<span class="dot"></span>':''}</td><td data-label="Identifiant">${esc(u.login)}</td><td data-label="Rôle">${u.role==='admin'?'Admin':'Technicien'}</td><td data-label="Dernière connexion">${u.derniere_connexion?relTime(u.derniere_connexion):'jamais'}</td></tr>`).join('');
    const lead=(list,key,label)=> list.length
      ? `<table class="grid"><thead><tr><th></th><th>Utilisateur</th><th>${label}</th></tr></thead><tbody>${
          list.slice(0,5).map((c,i)=>`<tr><td>${medal(i)}</td><td data-label="Utilisateur">${esc(c.nom)}</td><td data-label="${label}"><strong>${c[key]}</strong></td></tr>`).join('')}</tbody></table>`
      : '<p class="mini">Aucune contribution pour le moment.</p>';
    const ENTITY_LBL={materiel:'Inventaire',devis:'Devis',evenements:'Événement',reparations:'Réparation',ventes:'Vente',prets:'Prêt',wip:'Projet WIP',projets:'Projet'};
    const ENTITY_ICON={materiel:'box',devis:'doc',evenements:'calendar',reparations:'wrench',ventes:'tag',prets:'share',wip:'calendar',projets:'pin'};
    const ENTITY_COLOR={materiel:'teal',devis:'pink',evenements:'purple',reparations:'amber',ventes:'green',prets:'blue',wip:'blue',projets:'navy'};
    const ACTION_LBL={create:'a créé',update:'a modifié',delete:'a supprimé',archive:'a archivé',desarchive:'a désarchivé'};
    const recentHtml = (d.recent&&d.recent.length)
      ? d.recent.map(r=>`<div class="act-item"><span class="act-ico ic-${ENTITY_COLOR[r.entity]||'navy'}">${icon(ENTITY_ICON[r.entity]||'doc','ic')}</span>
          <div class="act-txt"><div><strong>${esc(r.nom)}</strong> ${ACTION_LBL[r.action]||esc(r.action)} <span class="tag gray">${ENTITY_LBL[r.entity]||esc(r.entity)}</span>${r.label?' — '+esc(r.label):''}</div><div class="mini">${relTime(r.ts)}</div></div></div>`).join('')
      : '<p class="mini">Aucune action enregistrée.</p>';
    const watch=d.watch||{};
    const watchHtml = Object.keys(ENTITY_LBL).map(k=>`<div class="watch-row"><span class="wr-lbl">${icon(ENTITY_ICON[k],'ic')} ${ENTITY_LBL[k]}</span><span class="toggle-oui-non ${watch[k]!==false?'on':'off'} js-watch" data-k="${k}"><span class="t-oui">OUI</span><span class="t-non">NON</span></span></div>`).join('');
    box.innerHTML = `
      <div class="card" style="margin-bottom:12px">
        <strong>🟢 En ligne maintenant</strong>
        <div class="online-row" style="margin-top:10px">${onlineHtml}</div>
        <p class="help">Mise à jour automatique toutes les 20 s · « en ligne » = actif dans les 5 dernières minutes.</p>
      </div>
      <div class="card" style="margin-bottom:12px"><strong>🕘 10 dernières actions</strong><div class="act-list" style="margin-top:10px">${recentHtml}</div></div>
      <div class="card" style="margin-bottom:12px"><strong>👁 Surveillance des rubriques</strong><p class="help" style="margin:4px 0 10px">Activez/désactivez le suivi par rubrique (OUI = consigné dans le journal).</p><div class="watch-list">${watchHtml}</div></div>
      <div class="card" style="margin-bottom:12px"><strong>Connexions par jour</strong><div class="tablecard" style="margin-top:10px;box-shadow:none;border:none">${cnxHtml}</div></div>
      <div class="card" style="margin-bottom:12px"><strong>Dernière connexion par utilisateur</strong>
        <div class="tablecard" style="margin-top:10px;box-shadow:none;border:none"><table class="grid"><thead><tr><th>Utilisateur</th><th>Identifiant</th><th>Rôle</th><th>Dernière connexion</th></tr></thead><tbody>${lastHtml}</tbody></table></div></div>
      <div class="lead-grid">
        <div class="card"><strong>🏆 Top contributions — Inventaire</strong><div class="tablecard" style="margin-top:10px;box-shadow:none;border:none">${lead(d.top_inventaire,'materiel','Actions')}</div></div>
        <div class="card"><strong>🏆 Top contributions — Réparations</strong><div class="tablecard" style="margin-top:10px;box-shadow:none;border:none">${lead(d.top_reparations,'reparation','Actions')}</div></div>
      </div>`;
    $$('.js-watch').forEach(t=>t.addEventListener('click',async()=>{ const k=t.dataset.k; const newVal=!t.classList.contains('on'); try{ await api('/api/config',{method:'PUT',body:JSON.stringify({watch:{[k]:newVal}})}); toast(newVal?'Surveillance activée':'Surveillance désactivée'); loadActivite(true); }catch(e){ toast(e.message); } }));
  }catch(e){ if(!silent) box.innerHTML=`<div class="card"><p class="mini">${esc(e.message)}</p></div>`; }
}

/* ============================== CONNEXION ============================== */
function showLogin(){
  $('#app').classList.add('hidden');
  const lr=$('#login-root'); lr.classList.remove('hidden');
  lr.innerHTML = `<div class="login-wrap">
    <div class="login-hero">
      <div class="login-brand">${LOGO_SVG}<div><div class="lb-name">West Coast Arcades</div><div class="lb-sub">Gestion du parc</div></div></div>
      <h2>Bornes, devis,<br><span>tout sous contrôle.</span></h2>
      <p>L'interface de gestion du matériel d'arcade : inventaire, réparations, ventes et prêts.</p>
      <ul class="login-points">
        <li>${icon('box')} Inventaire & disponibilité en temps réel</li>
        <li>${icon('doc')} Devis qui réservent le matériel</li>
        <li>${icon('wrench')} Réparations, ventes & prêts centralisés</li>
      </ul>
    </div>
    <div class="login-card" id="login-card"></div></div>`;
  const cardStaff=()=>`
      <h3>Connexion</h3>
      <div id="login-err" class="login-err hidden"></div>
      <label class="field"><span>Identifiant</span><input id="lg-login" autocomplete="username" placeholder="ex. admin"></label>
      <label class="field"><span>Mot de passe</span><input id="lg-pass" type="password" autocomplete="current-password"></label>
      <button class="btn full" id="lg-btn" style="margin-top:8px">Se connecter</button>
      <button class="btn outline full" id="lg-guest" style="margin-top:10px">${icon('users')} Je suis invité</button>
      <p class="help" style="margin-top:12px;text-align:center"><a href="#" id="lg-forgot" style="color:var(--teal-d);font-weight:700">Mot de passe oublié ?</a></p>`;
  const cardReset=()=>`
      <h3>Réinitialiser le mot de passe</h3>
      <div class="ro-badge">${icon('lock')} Avec un code fourni par un administrateur</div>
      <div id="login-err" class="login-err hidden"></div>
      <label class="field"><span>Identifiant</span><input id="rs-login" autocomplete="username"></label>
      <label class="field"><span>Code de réinitialisation</span><input id="rs-code" placeholder="ex. K7P2QM" style="text-transform:uppercase"></label>
      <label class="field"><span>Nouveau mot de passe</span><input id="rs-pass" type="password" autocomplete="new-password"></label>
      <button class="btn full" id="rs-btn" style="margin-top:8px">Réinitialiser</button>
      <button class="btn grey full" id="rs-back" style="margin-top:10px">← Retour</button>`;
  const cardGuest=()=>`
      <h3>Accès invité</h3>
      <div class="ro-badge">${icon('lock')} Démonstration en lecture seule</div>
      <div id="login-err" class="login-err hidden"></div>
      <label class="field"><span>Identifiant</span><input id="lg-login" autocomplete="off" placeholder="identifiant invité"></label>
      <label class="field"><span>Mot de passe</span><input id="lg-pass" type="password" autocomplete="off" placeholder="mot de passe invité"></label>
      <button class="btn full" id="lg-btn" style="margin-top:8px">Découvrir l'application</button>
      <button class="btn grey full" id="lg-back" style="margin-top:10px">← Connexion équipe</button>`;
  const showErr=m=>{ const e=$('#login-err'); e.textContent=m; e.classList.remove('hidden'); };
  const submit=async()=>{
    const login=$('#lg-login').value.trim(), password=$('#lg-pass').value;
    if(!login||!password){ showErr('Renseignez l\'identifiant et le mot de passe.'); return; }
    try{ const r=await api('/api/login',{method:'POST',body:JSON.stringify({login,password})}); startApp(r.user); }
    catch(e){ showErr(e.message); }
  };
  const wire=()=>{
    $('#lg-btn').addEventListener('click', submit);
    $('#lg-login').addEventListener('keydown', e=>{ if(e.key==='Enter') $('#lg-pass').focus(); });
    $('#lg-pass').addEventListener('keydown', e=>{ if(e.key==='Enter') submit(); });
    $('#lg-guest')?.addEventListener('click', ()=>{ $('#login-card').innerHTML=cardGuest(); wire(); $('#lg-login').focus(); });
    $('#lg-back')?.addEventListener('click', ()=>{ $('#login-card').innerHTML=cardStaff(); wire(); $('#lg-login').focus(); });
    $('#lg-forgot')?.addEventListener('click', e=>{ e.preventDefault(); $('#login-card').innerHTML=cardReset(); wire(); $('#rs-login').focus(); });
    $('#rs-back')?.addEventListener('click', ()=>{ $('#login-card').innerHTML=cardStaff(); wire(); $('#lg-login').focus(); });
    $('#rs-btn')?.addEventListener('click', async()=>{
      const login=$('#rs-login').value.trim(), code=$('#rs-code').value.trim(), password=$('#rs-pass').value;
      if(!login||!code||!password){ showErr('Renseignez identifiant, code et nouveau mot de passe.'); return; }
      try{ await api('/api/reset-password',{method:'POST',body:JSON.stringify({login,code,password})}); toast('Mot de passe réinitialisé, connectez-vous.'); $('#login-card').innerHTML=cardStaff(); wire(); $('#lg-login').value=login; $('#lg-pass').focus(); }
      catch(e){ showErr(e.message); }
    });
    if($('#lg-login')) $('#lg-login').focus(); else if($('#rs-login')) $('#rs-login').focus();
  };
  $('#login-card').innerHTML=cardStaff(); wire();
}
function startApp(user){
  CURRENT_USER=user;
  const lr=$('#login-root'); lr.classList.add('hidden'); lr.innerHTML='';
  $('#app').classList.remove('hidden');
  document.body.classList.toggle('guest-ro', isReadonly());
  buildNav(); updateUserbox(); renderFooter(); renderPartnersStrip();
  loadConfig().then(()=>renderPartnersStrip());
  setView(initialView());
  if(user.must_change) toast('Pensez à changer votre mot de passe (Paramètres → Mon compte)');
  else if(isReadonly()) toast('Mode invité — lecture seule : naviguez et cliquez partout, les modifications sont désactivées.');
}
function updateUserbox(){
  const u=CURRENT_USER||{};
  const name=`${u.prenom||''} ${u.nom||''}`.trim()||u.login||'Utilisateur';
  const role=roleLabel(u.role)+(u.niveau==='lecture'?' · lecture seule':'');
  const letter=esc(((u.prenom||u.nom||u.login||'?')[0]||'?').toUpperCase());
  const av = u.photo?`<img class="avatar" src="${u.photo}" alt="">`:`<span class="avatar avatar-ph">${letter}</span>`;
  $('#userbox').innerHTML=`${av}
    <div style="flex:1;min-width:0"><div class="u-name">${esc(name)}</div><div class="u-role">${role}</div></div>
    <button class="ub-logout" id="ub-logout" title="Se déconnecter">${icon('logout','ic')}</button>`;
  $('#ub-logout').addEventListener('click', doLogout);
}
async function doLogout(){ try{ await api('/api/logout',{method:'POST'}); }catch{} CURRENT_USER=null; showLogin(); }

/* ============================== BOÎTE À IDÉES (forum / helpdesk) ============================== */
let IDEE_TAB = 'ouvert';
let IDEES_CACHE = [];
const IDEE_TYPE_LBL = { idee:'💡 Idée', question:'❓ Question', bug:'🐞 Bug', autre:'📌 Autre' };
const IDEE_TYPE_BADGE = { idee:'tag amber', question:'tag blue', bug:'tag pink', autre:'tag gray' };
const IDEE_RUBRIQUES = ['Général','Accueil','Inventaire','Devis','Événements','Réparations','Projets','Ventes','Prêts','Disponibilités','Paramètres','Autre'];
async function ideesPanel(){
  openModal(`<div class="idea-panel"><div id="idea-body"><p class="mini">Chargement…</p></div></div>`);
  await ideesRefresh();
}
async function ideesRefresh(){ try{ IDEES_CACHE = await api('/api/idees'); }catch{ IDEES_CACHE = []; } ideesRenderList(); }
function ideaRow(t){
  const n=(t.messages||[]).length;
  return `<div class="idea-row" data-id="${t.id}">
    <div class="idea-row-main">
      <div class="idea-row-title">${esc(t.titre)}</div>
      <div class="idea-row-meta"><span class="${IDEE_TYPE_BADGE[t.type]||'tag gray'}">${IDEE_TYPE_LBL[t.type]||t.type}</span> <span class="tag gray">${esc(t.rubrique)}</span> · ${esc(t.auteur_nom)} · ${dateTimeShort(t.date_creation)}</div>
    </div>
    <div class="idea-row-side">${t.statut==='resolu'?'<span class="tag green">Résolu</span>':''}<span class="idea-msgcount">${icon('chat','ic')} ${n}</span></div>
  </div>`;
}
function ideesRenderList(){
  const body=$('#idea-body'); if(!body) return;
  const open=IDEES_CACHE.filter(t=>t.statut!=='resolu');
  const done=IDEES_CACHE.filter(t=>t.statut==='resolu');
  const list = IDEE_TAB==='resolu'?done:open;
  body.innerHTML = `
    <div class="idea-head"><h3>${icon('brain','ic')} Boîte à idées</h3><button class="iconbtn ghost" onclick="closeModal()" aria-label="Fermer">${icon('x')}</button></div>
    <p class="help" style="margin:0 0 10px">Proposez une idée, posez une question ou signalez un bug. Tout le monde peut répondre dans un fil. Un fil résolu part dans « Archivés » et peut être rouvert.</p>
    <div class="idea-tabs">
      <button class="${IDEE_TAB==='ouvert'?'active':''}" id="idea-tab-open">Ouverts <span class="idea-count">${open.length}</span></button>
      <button class="${IDEE_TAB==='resolu'?'active':''}" id="idea-tab-done">Archivés <span class="idea-count">${done.length}</span></button>
    </div>
    ${!isReadonly()?`<button class="btn full" id="idea-new" style="margin-bottom:10px">${icon('plus')} Nouveau fil</button>`:'<p class="mini">Connectez-vous (hors lecture seule) pour participer.</p>'}
    <div class="idea-list">${list.length?list.map(ideaRow).join(''):`<div class="empty-state">${IDEE_TAB==='resolu'?'Aucun fil archivé.':'Aucun fil ouvert. Lancez le premier !'}</div>`}</div>`;
  $('#idea-tab-open').addEventListener('click',()=>{ IDEE_TAB='ouvert'; ideesRenderList(); });
  $('#idea-tab-done').addEventListener('click',()=>{ IDEE_TAB='resolu'; ideesRenderList(); });
  $('#idea-new')?.addEventListener('click',ideesRenderForm);
  $$('.idea-row').forEach(r=>r.addEventListener('click',()=>ideesRenderThread(+r.dataset.id)));
}
function ideesRenderForm(){
  const body=$('#idea-body'); if(!body) return;
  body.innerHTML = `
    <div class="idea-head"><h3>${icon('plus','ic')} Nouveau fil</h3><button class="iconbtn ghost" id="idea-back" aria-label="Retour">${icon('x')}</button></div>
    <label class="field"><span>Titre *</span><input id="idea-titre" placeholder="Résumé court de l'idée / question / bug"></label>
    <div class="row2">
      <label class="field"><span>Type</span><select id="idea-type">${Object.entries(IDEE_TYPE_LBL).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label>
      <label class="field"><span>Rubrique</span><input id="idea-rub" list="idea-rub-dl" placeholder="Choisir ou saisir…" value="Général"><datalist id="idea-rub-dl">${IDEE_RUBRIQUES.map(r=>`<option value="${esc(r)}"></option>`).join('')}</datalist></label>
    </div>
    <label class="field"><span>Message</span><textarea id="idea-msg" rows="4" placeholder="Décrivez votre idée, votre question ou le bug rencontré…"></textarea></label>
    <div class="buttons"><button class="btn grey" id="idea-cancel">Annuler</button><button class="btn" id="idea-publish">${icon('send')} Publier</button></div>`;
  $('#idea-back').addEventListener('click',ideesRenderList);
  $('#idea-cancel').addEventListener('click',ideesRenderList);
  $('#idea-titre').focus();
  $('#idea-publish').addEventListener('click',async()=>{
    const titre=$('#idea-titre').value.trim(); if(!titre){ toast('Le titre est obligatoire.'); return; }
    const payload={ titre, type:$('#idea-type').value, rubrique:$('#idea-rub').value.trim(), texte:$('#idea-msg').value.trim() };
    try{ await api('/api/idees',{method:'POST',body:JSON.stringify(payload)}); toast('Publié ✓'); IDEE_TAB='ouvert'; await ideesRefresh(); }catch(e){ toast(e.message); }
  });
}
function ideesRenderThread(id){
  const body=$('#idea-body'); if(!body) return;
  const t=IDEES_CACHE.find(x=>x.id===id); if(!t){ ideesRenderList(); return; }
  const canMod = isAdminUser() || t.auteur===CURRENT_USER?.login;
  body.innerHTML = `
    <div class="idea-head"><button class="iconbtn ghost" id="idea-back" aria-label="Retour">${icon('chevron','ic')}</button><h3 style="flex:1;min-width:0">${esc(t.titre)}</h3><button class="iconbtn ghost" onclick="closeModal()" aria-label="Fermer">${icon('x')}</button></div>
    <div class="idea-row-meta" style="margin-bottom:10px"><span class="${IDEE_TYPE_BADGE[t.type]||'tag gray'}">${IDEE_TYPE_LBL[t.type]||t.type}</span> <span class="tag gray">${esc(t.rubrique)}</span>${t.statut==='resolu'?' <span class="tag green">Résolu</span>':''} · ${esc(t.auteur_nom)} · ${dateTimeShort(t.date_creation)}</div>
    <div class="idea-thread">${(t.messages||[]).map(m=>`<div class="idea-msg"><div class="idea-msg-head">${esc(m.auteur_nom)} · ${dateTimeShort(m.date)}</div><div class="idea-msg-body">${esc(m.texte).replace(/\n/g,'<br>')}</div></div>`).join('')||'<p class="mini">Aucun message dans ce fil.</p>'}</div>
    ${!isReadonly()?`<div class="idea-reply"><textarea id="idea-reply-txt" rows="2" placeholder="Votre réponse…"></textarea><button class="btn" id="idea-reply-send">${icon('send')} Répondre</button></div>`:''}
    <div class="buttons" style="margin-top:10px;flex-wrap:wrap">
      <button class="btn grey" id="idea-back2">${icon('chevron')} Liste</button>
      ${canMod?`<button class="btn ${t.statut==='resolu'?'light':'green'}" id="idea-toggle">${t.statut==='resolu'?icon('undo')+' Rouvrir':icon('check')+' Marquer résolu'}</button>`:''}
      ${canMod?`<button class="btn red" id="idea-del">${icon('trash')} Supprimer</button>`:''}
    </div>`;
  $('#idea-back').addEventListener('click',ideesRenderList);
  $('#idea-back2').addEventListener('click',ideesRenderList);
  $('#idea-reply-send')?.addEventListener('click',async()=>{
    const txt=$('#idea-reply-txt').value.trim(); if(!txt) return;
    try{ const r=await api('/api/idees/'+id+'/message',{method:'POST',body:JSON.stringify({texte:txt})}); const i=IDEES_CACHE.findIndex(x=>x.id===id); if(i>=0) IDEES_CACHE[i]=r; ideesRenderThread(id); }catch(e){ toast(e.message); }
  });
  $('#idea-toggle')?.addEventListener('click',async()=>{
    const ns=t.statut==='resolu'?'ouvert':'resolu';
    try{ const r=await api('/api/idees/'+id+'/statut',{method:'POST',body:JSON.stringify({statut:ns})}); const i=IDEES_CACHE.findIndex(x=>x.id===id); if(i>=0) IDEES_CACHE[i]=r; toast(ns==='resolu'?'Fil archivé ✓':'Fil rouvert'); ideesRenderThread(id); }catch(e){ toast(e.message); }
  });
  const del=$('#idea-del');
  del?.addEventListener('click',async()=>{
    if(del.dataset.confirm!=='1'){ del.dataset.confirm='1'; del.innerHTML=`${icon('trash')} Confirmer ?`; setTimeout(()=>{ if(del){ del.dataset.confirm='0'; del.innerHTML=`${icon('trash')} Supprimer`; } },3000); return; }
    try{ await api('/api/idees/'+id,{method:'DELETE'}); toast('Supprimé'); IDEES_CACHE=IDEES_CACHE.filter(x=>x.id!==id); ideesRenderList(); }catch(e){ toast(e.message); }
  });
}

/* ------------------------------- Démarrage ------------------------------- */
applyTheme(currentTheme());
(async function init(){
  try{ const r=await api('/api/session'); startApp(r.user); }
  catch{ showLogin(); }
})();
