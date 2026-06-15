// Serveur HTTP (modules intégrés Node) : API JSON + frontend + protection par mot de passe.
// Compatible hébergement o2switch / Passenger (écoute sur process.env.PORT).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { db, save, nextId, setData } from './store.js';
import { handlePublic } from './MODULES/public-api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, 'public');
const MEDIA_DIR = path.join(PUBLIC, 'medias'); // médiathèque : images stockées en fichiers
const DOCS_DIR = path.join(__dirname, 'docs');  // documents asso (hors public : servis via route authentifiée)
const PORT = process.env.PORT || 3000;

// Registre des modules activables (dossier MODULES/modules.json), avec repli intégré.
const DEFAULT_MODULES = [
  { key: 'devis', label: 'Devis & tarifs', desc: 'Devis, Tarifs et Calculatrice', nav: ['devis'], default: true },
  { key: 'evenements', label: 'Événements', desc: 'Événements & disponibilité', nav: ['evenements'], default: true },
  { key: 'partenaires', label: 'Partenaires', desc: 'Encart partenaires + fiches', nav: [], default: true },
  { key: 'reparations', label: 'Réparations & WIP', desc: 'Interventions, WIP, pièces à acheter', nav: ['reparations'], default: true },
  { key: 'projets', label: 'Projets', desc: 'Projets, tâches, sessions', nav: ['projets'], default: true },
  { key: 'ventes', label: 'Ventes', desc: 'Suivi des ventes', nav: ['ventes'], default: true },
  { key: 'prets', label: 'Prêts', desc: 'Prêts de matériel', nav: ['prets'], default: true },
  { key: 'site', label: 'Site internet', desc: 'Blog + pilotage affichage du site', nav: ['site'], default: true },
  { key: 'disponibilites', label: 'Disponibilités', desc: 'Frise des absences/présences', nav: [], default: true },
  { key: 'idees', label: 'Boîte à idées', desc: 'Suggestions & forum d\'entraide', nav: [], default: true },
  { key: 'activite', label: 'Activité & surveillance', desc: "Journal d'actions, en ligne", nav: [], default: true },
  { key: 'email_reset', label: 'Réinitialisation par email', desc: 'Code par email (SMTP) — à venir', nav: [], default: false },
];
function loadModuleRegistry() {
  try { const j = JSON.parse(fs.readFileSync(path.join(__dirname, 'MODULES', 'modules.json'), 'utf8')); if (Array.isArray(j.modules) && j.modules.length) return j.modules; } catch {}
  return DEFAULT_MODULES;
}
const MODULE_REGISTRY = loadModuleRegistry();

function logFatal(kind, e) {
  const line = `[${new Date().toISOString()}] ${kind}: ${(e && e.stack) || e}\n`;
  try { fs.appendFileSync(path.join(__dirname, 'wca-error.log'), line); } catch {}
  console.error(line);
}
process.on('uncaughtException', e => logFatal('uncaughtException', e));
process.on('unhandledRejection', e => logFatal('unhandledRejection', e));

const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript',
  '.json':'application/json', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.png':'image/png', '.jpg':'image/jpeg' };

const send = (res, code, obj, headers = {}) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(JSON.stringify(obj));
};

/* =============================== AUTHENTIFICATION =============================== */
const SESSION_TTL = 7 * 24 * 3600 * 1000;
function hashPw(pw, salt) { return crypto.scryptSync(String(pw), salt, 32).toString('hex'); }
function makePw(pw) { const salt = crypto.randomBytes(12).toString('hex'); return { salt, hash: hashPw(pw, salt) }; }
function makeResetCode() { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c = ''; for (let i = 0; i < 6; i++) c += A[Math.floor(Math.random() * A.length)]; const salt = crypto.randomBytes(8).toString('hex'); return { code: c, salt, hash: hashPw(c, salt) }; }
function checkPw(pw, u) { return !!u && u.hash === hashPw(pw, u.salt); }
// Nettoie les valeurs textuelles parasites (« undefined »/« null » stockées par d'anciens imports).
function cleanStr(s) { return (s === undefined || s === null || s === 'undefined' || s === 'null') ? '' : String(s); }
function publicUser(u) { return u && { id: u.id, login: u.login, nom: cleanStr(u.nom), prenom: cleanStr(u.prenom), photo: u.photo || '', role: u.role, niveau: roleNiveau(u.role), must_change: !!u.must_change }; }

function sessionSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const d = db();
  if (!d.settings) d.settings = {};
  if (!d.settings.session_secret) { d.settings.session_secret = crypto.randomBytes(32).toString('hex'); save(); }
  return d.settings.session_secret;
}
function signSession(userId) {
  const payload = `${userId}.${Date.now() + SESSION_TTL}`;
  const sig = crypto.createHmac('sha256', sessionSecret()).update(payload).digest('hex');
  return `${payload}.${sig}`;
}
function verifySession(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [uid, exp, sig] = parts;
  const expect = crypto.createHmac('sha256', sessionSecret()).update(`${uid}.${exp}`).digest('hex');
  if (sig !== expect || +exp < Date.now()) return null;
  return db().users.find(u => u.id === +uid) || null;
}
function parseCookies(req) {
  const out = {}; (req.headers.cookie || '').split(';').forEach(c => { const i = c.indexOf('='); if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim()); });
  return out;
}
function currentUser(req) { return verifySession(parseCookies(req).wca_session); }
function cookieHeader(token) {
  const base = `wca_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${Math.floor(SESSION_TTL / 1000)}`;
  return process.env.NODE_ENV === 'production' ? base + '; Secure' : base;
}
function ensureAdmin() {
  const d = db();
  if (!d.users || !d.users.length) {
    const { salt, hash } = makePw('arcade');
    d.users.push({ id: nextId('users'), login: 'admin', nom: 'Administrateur', prenom: '', role: 'admin', salt, hash, must_change: true, created_at: new Date().toISOString() });
    save();
    console.log('  → Compte admin par défaut : identifiant « admin » / mot de passe « arcade » (à changer à la 1re connexion)');
  }
}
// Compte invité (lecture seule) pour démonstration / vitrine.
function ensureGuest() {
  const d = db();
  if (!d.users.some(u => u.role === 'invite')) {
    const { salt, hash } = makePw('invite');
    d.users.push({ id: nextId('users'), login: 'invite', nom: 'Invité', prenom: '', role: 'invite', salt, hash, must_change: false, created_at: new Date().toISOString() });
    save();
    console.log('  → Compte invité (lecture seule) : identifiant « invite » / mot de passe « invite »');
  }
}

/* =============================== SUIVI D'ACTIVITÉ =============================== */
const PRESENCE_WINDOW = 5 * 60 * 1000; // « en ligne » si actif dans les 5 dernières minutes
// Journalise une contribution (création/modif/suppression) sur l'inventaire ou les réparations.
// Marque qui a modifié une fiche et quand (pour l'alerte d'édition concurrente).
function stampModif(row, user) {
  if (!user) return;
  row.modif_par = (user.prenom && user.prenom.trim()) ? user.prenom : user.login;
  row.modif_par_id = user.id;
  row.modif_le = new Date().toISOString();
}
// Vrai si la fiche a changé depuis l'ouverture, par quelqu'un d'autre (et pas de forçage).
function conflictHit(row, body, user) {
  return !!(body.base_modif_le && row.modif_le && row.modif_le !== body.base_modif_le
    && row.modif_par_id !== (user && user.id) && !body.force);
}
function conflictResponse(res, row) {
  return send(res, 409, { error: 'Fiche modifiée entre-temps', conflict: { par: row.modif_par || 'un autre utilisateur', le: row.modif_le } });
}
function logActivity(user, action, entity, label) {
  if (!user) return;
  const d = db();
  const watch = (d.settings && d.settings.watch) || {};
  if (watch[entity] === false) return; // surveillance désactivée pour cette rubrique
  if (!Array.isArray(d.activity)) d.activity = [];
  d.activity.push({ ts: new Date().toISOString(), user_id: user.id, login: user.login, action, entity, label: label || '' });
  if (d.activity.length > 4000) d.activity = d.activity.slice(-4000);
}
// Met à jour la présence (dernière activité) de l'utilisateur courant.
function touchPresence(user) {
  if (!user) return;
  const d = db();
  if (!d.presence || typeof d.presence !== 'object') d.presence = {};
  d.presence[user.id] = new Date().toISOString();
}

/* ------------------------------ Routes ------------------------------ */
const routes = [];
const add = (method, pattern, handler) => routes.push({ method, pattern, handler });
function matchRoute(pattern, pathname) {
  const pk = pattern.split('/'), ck = pathname.split('/');
  if (pk.length !== ck.length) return null;
  const params = {};
  for (let i = 0; i < pk.length; i++) {
    if (pk[i].startsWith(':')) params[pk[i].slice(1)] = decodeURIComponent(ck[i]);
    else if (pk[i] !== ck[i]) return null;
  }
  return params;
}

/* =============================== DISPONIBILITÉ =============================== */
// Deux périodes se chevauchent si a1<=b2 && b1<=a2 (dates ISO comparables en chaîne).
function overlap(a1, a2, b1, b2) {
  if (!a1 || !a2 || !b1 || !b2) return false;
  return a1 <= b2 && b1 <= a2;
}
const DEVIS_ACTIFS = ['brouillon', 'envoye', 'accepte'];

/* =============================== CONFIG INVENTAIRE (catégories / états / photo) =============================== */
const DEFAULT_CATS = ["Borne d'arcade", "Flipper", "Console rétro", "Jeu vidéo", "Écran / TV", "Accessoire", "Pièce détachée", "Autre"];
const DEFAULT_ETATS = [{ label: 'À réviser', bloque: true }, { label: 'À démonter', bloque: true }];
const DEFAULT_PROPRIOS = ['Perso', 'Asso', 'Partenaire', 'VIP', 'Autre'];
const DEFAULT_ROLES = [
  { key: 'admin', label: 'Administrateur', niveau: 'admin' },
  { key: 'technicien', label: 'Technicien', niveau: 'standard' },
  { key: 'invite', label: 'Invité', niveau: 'lecture' },
];
const WATCH_KEYS = ['materiel', 'devis', 'evenements', 'reparations', 'ventes', 'prets'];
const DEFAULT_TARIFS = {
  periodes: [{ key: 'we', label: 'Week-end', jours: 2 }, { key: 'sem', label: 'Semaine', jours: 7 }],
  couts: { essence_litre: 1.9, conso_100: 12, camion_jour: 120, mo_heure: 25, couchage_nuit: 0, maintenance_pct: 0, presence_jour: 0 },
  extras: [],
};
// Renvoie (et initialise au besoin) la config stockée dans settings.
function config() {
  const d = db();
  if (!d.settings || typeof d.settings !== 'object') d.settings = {};
  if (!Array.isArray(d.settings.categories)) d.settings.categories = [...DEFAULT_CATS];
  if (!Array.isArray(d.settings.etats)) d.settings.etats = DEFAULT_ETATS.map(e => ({ ...e }));
  if (!Array.isArray(d.settings.proprietaires)) d.settings.proprietaires = [...DEFAULT_PROPRIOS];
  if (typeof d.settings.photo_px !== 'number') d.settings.photo_px = 40;
  if (!Array.isArray(d.settings.roles) || !d.settings.roles.length) d.settings.roles = DEFAULT_ROLES.map(r => ({ ...r }));
  if (d.settings.partenaires_mode !== 'fixe' && d.settings.partenaires_mode !== 'aleatoire') d.settings.partenaires_mode = 'fixe';
  if (typeof d.settings.partenaires_count !== 'number') d.settings.partenaires_count = 4;
  if (typeof d.settings.partenaires_visible !== 'boolean') d.settings.partenaires_visible = true;
  if (!d.settings.modules || typeof d.settings.modules !== 'object') d.settings.modules = {};
  MODULE_REGISTRY.forEach(m => { if (d.settings.modules[m.key] === undefined) d.settings.modules[m.key] = !!m.default; });
  if (!d.settings.watch || typeof d.settings.watch !== 'object') d.settings.watch = {};
  WATCH_KEYS.forEach(k => { if (d.settings.watch[k] === undefined) d.settings.watch[k] = true; });
  if (!d.settings.tarifs || typeof d.settings.tarifs !== 'object') d.settings.tarifs = {};
  const tf = d.settings.tarifs;
  if (!Array.isArray(tf.periodes)) tf.periodes = DEFAULT_TARIFS.periodes.map(p => ({ ...p }));
  if (!tf.couts || typeof tf.couts !== 'object') tf.couts = { ...DEFAULT_TARIFS.couts };
  else Object.keys(DEFAULT_TARIFS.couts).forEach(k => { if (tf.couts[k] === undefined) tf.couts[k] = DEFAULT_TARIFS.couts[k]; });
  if (!Array.isArray(tf.extras)) tf.extras = [];
  return { categories: d.settings.categories, etats: d.settings.etats, proprietaires: d.settings.proprietaires, photo_px: d.settings.photo_px, roles: d.settings.roles, partenaires_mode: d.settings.partenaires_mode, partenaires_count: d.settings.partenaires_count, partenaires_visible: d.settings.partenaires_visible, watch: d.settings.watch, tarifs: tf, modules: d.settings.modules, modules_registry: MODULE_REGISTRY, nav_visibility: d.settings.nav_visibility || {}, counts: { devis: (d.devis || []).length, evenements: (d.evenements || []).length, reparations: (d.reparations || []).length, projets: (d.projets || []).length, ventes: (d.ventes || []).length, prets: (d.prets || []).length } };
}
function normNiveau(n) { return ['admin', 'standard', 'lecture'].includes(n) ? n : 'standard'; }
function roleNiveau(key) {
  const r = config().roles.find(x => x.key === key);
  if (r) return r.niveau;
  if (key === 'admin') return 'admin';
  if (key === 'invite') return 'lecture';
  return 'standard';
}
function normRole(r) { return config().roles.some(x => x.key === r) ? r : 'technicien'; }
function slugRole(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || ('role_' + Date.now().toString(36));
}

// Renvoie la liste des blocages d'un matériel pour la période [from,to].
// Si from/to absent → on prend "aujourd'hui" pour un état instantané.
function blocages(materielId, from, to) {
  const d = db();
  const id = +materielId;
  const today = new Date().toISOString().slice(0, 10);
  const f = from || today, t = to || from || today;
  const out = [];

  const m = d.materiel.find(x => x.id === id);
  if (m && m.fonctionnel === false) out.push({ type: 'panne', label: 'Hors service' });

  // État bloquant (ex. « À réviser », « À démonter ») défini dans la config.
  if (m && m.etat) {
    const et = config().etats.find(e => e.label === m.etat);
    if (et && et.bloque) out.push({ type: 'etat', ref: m.etat, label: m.etat });
  }

  // Vente confirmée (vendu) → matériel sorti du parc.
  if (d.ventes.some(v => v.materiel_id === id && v.vendu !== false))
    out.push({ type: 'vendu', label: 'Vendu' });

  // Réparations en cours / à faire → bloqué tant que non terminé (hors archivées).
  for (const r of d.reparations) {
    if (r.materiel_id === id && r.statut !== 'termine' && !r.archive)
      out.push({ type: 'reparation', ref: r.id, label: 'En réparation' });
  }

  // Prêts non rendus qui chevauchent la période (hors archivés).
  for (const p of d.prets) {
    if (p.materiel_id === id && p.statut !== 'rendu' && !p.archive && overlap(f, t, p.date_debut, p.date_fin))
      out.push({ type: 'pret', ref: p.id, label: `Prêté à ${p.emprunteur || '—'}`, from: p.date_debut, to: p.date_fin });
  }

  // Devis actifs qui chevauchent la période (hors devis exclu / archivé).
  for (const dv of d.devis) {
    if (!DEVIS_ACTIFS.includes(dv.statut) || dv.archive) continue;
    if (!(dv.lignes || []).some(l => +l.materiel_id === id)) continue;
    if (overlap(f, t, dv.date_debut, dv.date_fin))
      out.push({ type: 'devis', ref: dv.id, label: `Devis ${dv.numero || '#' + dv.id}`, from: dv.date_debut, to: dv.date_fin });
  }

  // Événements : matériel rattaché qui chevauche la période → réservé (hors archivés).
  for (const ev of (d.evenements || [])) {
    if (ev.archive) continue;
    if (!(ev.materiel_ids || []).map(Number).includes(id)) continue;
    if (overlap(f, t, ev.date_debut, ev.date_fin))
      out.push({ type: 'evenement', ref: ev.id, label: `Événement ${ev.nom || '#' + ev.id}`, from: ev.date_debut, to: ev.date_fin });
  }
  return out;
}
function dispoPour(materielId, from, to, excludeDevis, excludeEvent) {
  let b = blocages(materielId, from, to);
  if (excludeDevis) b = b.filter(x => !(x.type === 'devis' && x.ref === +excludeDevis));
  if (excludeEvent) b = b.filter(x => !(x.type === 'evenement' && x.ref === +excludeEvent));
  return { dispo: b.length === 0, raisons: b };
}

/* =============================== MATÉRIEL (inventaire) =============================== */
const MF = ['denomination', 'categorie', 'numero_serie', 'emplacement', 'valeur', 'notes', 'photo', 'etat', 'proprietaire', 'proprietaire_nom', 'tarifs', 'visible_site', 'description_site', 'titre_site', 'sous_titre_site', 'sens_site', 'a_vendre', 'prix_vente'];
// Vrai si le matériel est dans un projet WIP actif (non terminé, non archivé).
function inActiveWip(id) {
  return (db().wip || []).some(w => !w.archive && w.statut !== 'termine' && (w.equipes || []).some(e => (e.materiel_ids || []).map(Number).includes(+id)));
}

add('GET', '/api/materiel', (req, res, p, body, query) => {
  let list = [...db().materiel];
  if (query.all !== '1') list = list.filter(m => !m.archive);
  const q = (query.q || '').trim().toLowerCase();
  if (q) list = list.filter(x => [x.denomination, x.categorie, x.emplacement, x.numero_serie].some(v => (v || '').toLowerCase().includes(q)));
  list.sort((a, b) => (a.denomination || '').localeCompare(b.denomination || ''));
  // Statut instantané (aujourd'hui) + indicateur « en WIP »
  list = list.map(m => ({ ...m, blocages: blocages(m.id), en_wip: inActiveWip(m.id) }));
  send(res, 200, list);
});

add('GET', '/api/materiel/:id', (req, res, p) => {
  const row = db().materiel.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Matériel introuvable.' });
  send(res, 200, { ...row, blocages: blocages(row.id) });
});

add('POST', '/api/materiel', (req, res, p, body, query, user) => {
  if (!body.denomination) return send(res, 400, { error: 'La dénomination est obligatoire.' });
  const row = { id: nextId('materiel'), fonctionnel: body.fonctionnel !== false };
  MF.forEach(f => row[f] = body[f] ?? '');
  row.visible_site = body.visible_site === true; // publié sur le site : booléen strict (opt-in)
  row.a_vendre = body.a_vendre === true;         // proposé à la vente sur le site
  stampModif(row, user);
  db().materiel.push(row); logActivity(user, 'create', 'materiel', row.denomination); save();
  send(res, 200, row);
});

add('PUT', '/api/materiel/:id', (req, res, p, body, query, user) => {
  const row = db().materiel.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Matériel introuvable.' });
  // Détection d'édition concurrente : si la fiche a changé depuis l'ouverture (par quelqu'un d'autre).
  if (body.base_modif_le && row.modif_le && row.modif_le !== body.base_modif_le
      && row.modif_par_id !== (user && user.id) && !body.force) {
    return send(res, 409, { error: 'Fiche modifiée entre-temps', conflict: { par: row.modif_par || 'un autre utilisateur', le: row.modif_le } });
  }
  MF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  if (body.fonctionnel !== undefined) row.fonctionnel = !!body.fonctionnel;
  if (body.visible_site !== undefined) row.visible_site = !!body.visible_site;
  if (body.a_vendre !== undefined) row.a_vendre = !!body.a_vendre;
  stampModif(row, user);
  logActivity(user, 'update', 'materiel', row.denomination); save(); send(res, 200, row);
});

// Bascule l'état fonctionnel (case OUI/NON verte/rouge cliquable).
add('POST', '/api/materiel/:id/fonctionnel', (req, res, p, body, query, user) => {
  const row = db().materiel.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Matériel introuvable.' });
  row.fonctionnel = body.fonctionnel !== undefined ? !!body.fonctionnel : !row.fonctionnel;
  stampModif(row, user);
  logActivity(user, 'update', 'materiel', row.denomination); save(); send(res, 200, { ...row, blocages: blocages(row.id) });
});

add('DELETE', '/api/materiel/:id', (req, res, p, body, query, user) => {
  const d = db(); const id = +p.id;
  const gone = d.materiel.find(x => x.id === id);
  d.materiel = d.materiel.filter(x => x.id !== id);
  logActivity(user, 'delete', 'materiel', gone ? gone.denomination : '');
  // Nettoyage des références (devis : on retire la ligne)
  d.devis.forEach(dv => { if (Array.isArray(dv.lignes)) dv.lignes = dv.lignes.filter(l => +l.materiel_id !== id); });
  d.reparations = d.reparations.filter(r => r.materiel_id !== id);
  d.prets = d.prets.filter(r => r.materiel_id !== id);
  d.ventes = d.ventes.filter(r => r.materiel_id !== id);
  save(); send(res, 200, { ok: true });
});

/* =============================== CONFIG : CATÉGORIES / ÉTATS / PHOTO =============================== */
add('GET', '/api/config', (req, res) => send(res, 200, config()));

// Taille d'affichage des photos (px) — réglage global.
add('PUT', '/api/config', (req, res, p, body, query, user) => {
  const d = db(); config();
  if (body.photo_px !== undefined) d.settings.photo_px = Math.max(20, Math.min(200, +body.photo_px || 40));
  if (body.partenaires_mode !== undefined) d.settings.partenaires_mode = body.partenaires_mode === 'aleatoire' ? 'aleatoire' : 'fixe';
  if (body.partenaires_count !== undefined) d.settings.partenaires_count = Math.max(1, Math.min(12, +body.partenaires_count || 4));
  if (body.partenaires_visible !== undefined) d.settings.partenaires_visible = !!body.partenaires_visible;
  if (body.modules && typeof body.modules === 'object' && roleNiveau(user && user.role) === 'admin') { Object.keys(body.modules).forEach(k => { if (MODULE_REGISTRY.some(m => m.key === k)) d.settings.modules[k] = !!body.modules[k]; }); }
  if (body.nav_visibility && typeof body.nav_visibility === 'object' && roleNiveau(user && user.role) === 'admin') { if (!d.settings.nav_visibility || typeof d.settings.nav_visibility !== 'object') d.settings.nav_visibility = {}; Object.keys(body.nav_visibility).forEach(k => { const v = body.nav_visibility[k]; d.settings.nav_visibility[k] = (v === 'show' || v === 'hide') ? v : 'auto'; }); }
  if (body.watch && typeof body.watch === 'object') { WATCH_KEYS.forEach(k => { if (body.watch[k] !== undefined) d.settings.watch[k] = !!body.watch[k]; }); }
  if (body.tarifs && typeof body.tarifs === 'object') {
    const tf = d.settings.tarifs;
    if (Array.isArray(body.tarifs.periodes)) tf.periodes = body.tarifs.periodes.map(p => ({ key: (p.key || slugRole(p.label) || ('p' + Date.now().toString(36))), label: String(p.label || '').trim() || 'Période', jours: +p.jours || 1 })).filter(p => p.label);
    if (body.tarifs.couts && typeof body.tarifs.couts === 'object') Object.keys(body.tarifs.couts).forEach(k => { tf.couts[k] = +body.tarifs.couts[k] || 0; });
    if (Array.isArray(body.tarifs.extras)) tf.extras = body.tarifs.extras.map(x => ({ label: String(x.label || '').trim(), montant: +x.montant || 0 })).filter(x => x.label);
  }
  save(); send(res, 200, config());
});

/* =============================== ARCHIVES =============================== */
function archiveLabel(coll, row) {
  const d = db(); const mname = id => { const m = d.materiel.find(x => x.id === +id); return m ? m.denomination : ''; };
  if (coll === 'materiel') return row.denomination || '';
  if (coll === 'devis') return `${row.numero || ''} ${row.client_nom || ''}`.trim();
  if (coll === 'evenements') return row.nom || '';
  if (coll === 'reparations' || coll === 'ventes' || coll === 'prets') return mname(row.materiel_id);
  return '';
}
add('POST', '/api/archive', (req, res, p, body, query, user) => {
  const types = { materiel: 'materiel', devis: 'devis', evenements: 'evenements', reparations: 'reparations', ventes: 'ventes', prets: 'prets', wip: 'wip', projets: 'projets' };
  const coll = types[body.type];
  if (!coll) return send(res, 400, { error: 'Type inconnu.' });
  const row = db()[coll].find(x => x.id === +body.id);
  if (!row) return send(res, 404, { error: 'Élément introuvable.' });
  row.archive = body.archive !== undefined ? !!body.archive : !row.archive;
  logActivity(user, row.archive ? 'archive' : 'desarchive', body.type, coll === 'wip' ? row.code : (coll === 'projets' ? row.nom : archiveLabel(coll, row)));
  save(); send(res, 200, { ok: true, archive: row.archive });
});

// Catégories : ajouter / renommer / supprimer (migre le matériel concerné).
add('POST', '/api/categories', (req, res, p, body) => {
  const c = config(); const v = (body.value || '').trim();
  if (!v) return send(res, 400, { error: 'Nom de catégorie requis.' });
  if (!c.categories.includes(v)) c.categories.push(v);
  save(); send(res, 200, config());
});
add('PUT', '/api/categories', (req, res, p, body) => {
  const c = config(); const old = (body.old || '').trim(), nw = (body.new || '').trim();
  if (!old || !nw) return send(res, 400, { error: 'Ancien et nouveau nom requis.' });
  const i = c.categories.indexOf(old);
  if (i < 0) return send(res, 404, { error: 'Catégorie introuvable.' });
  if (!c.categories.includes(nw)) c.categories[i] = nw; else c.categories.splice(i, 1);
  db().materiel.forEach(m => { if (m.categorie === old) m.categorie = nw; });
  save(); send(res, 200, config());
});
add('DELETE', '/api/categories', (req, res, p, body) => {
  const c = config(); const v = (body.value || '').trim();
  db().settings.categories = c.categories.filter(x => x !== v);
  db().materiel.forEach(m => { if (m.categorie === v) m.categorie = ''; });
  save(); send(res, 200, config());
});

// États : ajouter / modifier (renommer + drapeau bloquant) / supprimer.
add('POST', '/api/etats', (req, res, p, body) => {
  const c = config(); const label = (body.label || '').trim();
  if (!label) return send(res, 400, { error: 'Libellé d\'état requis.' });
  if (!c.etats.some(e => e.label === label)) c.etats.push({ label, bloque: !!body.bloque });
  save(); send(res, 200, config());
});
add('PUT', '/api/etats', (req, res, p, body) => {
  const c = config(); const old = (body.old || '').trim();
  const et = c.etats.find(e => e.label === old);
  if (!et) return send(res, 404, { error: 'État introuvable.' });
  const nw = (body.new || '').trim();
  if (nw && nw !== old) { et.label = nw; db().materiel.forEach(m => { if (m.etat === old) m.etat = nw; }); }
  if (body.bloque !== undefined) et.bloque = !!body.bloque;
  save(); send(res, 200, config());
});
add('DELETE', '/api/etats', (req, res, p, body) => {
  const c = config(); const label = (body.label || '').trim();
  db().settings.etats = c.etats.filter(e => e.label !== label);
  db().materiel.forEach(m => { if (m.etat === label) m.etat = ''; });
  save(); send(res, 200, config());
});

// Propriétaires : liste gérable (Perso, Asso, Partenaire, VIP…).
add('POST', '/api/proprietaires', (req, res, p, body) => {
  const c = config(); const v = (body.value || '').trim();
  if (!v) return send(res, 400, { error: 'Nom requis.' });
  if (!c.proprietaires.includes(v)) c.proprietaires.push(v);
  save(); send(res, 200, config());
});
add('PUT', '/api/proprietaires', (req, res, p, body) => {
  const c = config(); const old = (body.old || '').trim(), nw = (body.new || '').trim();
  if (!old || !nw) return send(res, 400, { error: 'Ancien et nouveau nom requis.' });
  const i = c.proprietaires.indexOf(old);
  if (i < 0) return send(res, 404, { error: 'Introuvable.' });
  if (!c.proprietaires.includes(nw)) c.proprietaires[i] = nw; else c.proprietaires.splice(i, 1);
  db().materiel.forEach(m => { if (m.proprietaire === old) m.proprietaire = nw; });
  save(); send(res, 200, config());
});
add('DELETE', '/api/proprietaires', (req, res, p, body) => {
  const c = config(); const v = (body.value || '').trim();
  db().settings.proprietaires = c.proprietaires.filter(x => x !== v);
  db().materiel.forEach(m => { if (m.proprietaire === v) m.proprietaire = ''; });
  save(); send(res, 200, config());
});

// Membres (tous les comptes, infos minimales) — accessible à tous pour la frise de disponibilités.
add('GET', '/api/membres', (req, res) => {
  const list = db().users.map(u => ({ id: u.id, login: u.login, nom: ((u.prenom + ' ' + u.nom).trim() || u.login), photo: u.photo || '' }))
    .sort((a, b) => a.nom.localeCompare(b.nom));
  send(res, 200, list);
});

// Annuaire : tous les utilisateurs + partenaires (pour les sélecteurs de noms).
add('GET', '/api/people', (req, res) => {
  const d = db();
  const users = d.users.map(u => ({ name: (u.prenom + ' ' + u.nom).trim() || u.login, type: 'utilisateur' }));
  const parts = (d.partenaires || []).map(pt => ({ name: pt.nom, type: 'partenaire' }));
  send(res, 200, { users, partenaires: parts, all: [...users, ...parts].map(x => x.name).filter(Boolean) });
});

// Rôles : chaque rôle porte un niveau d'accès (admin / standard / lecture).
add('GET', '/api/roles', (req, res) => send(res, 200, config().roles));
add('POST', '/api/roles', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const c = config(); const label = (body.label || '').trim();
  if (!label) return send(res, 400, { error: 'Libellé du rôle requis.' });
  const key = slugRole(label);
  if (c.roles.some(r => r.key === key)) return send(res, 400, { error: 'Ce rôle existe déjà.' });
  c.roles.push({ key, label, niveau: normNiveau(body.niveau) });
  save(); send(res, 200, config());
});
add('PUT', '/api/roles', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const c = config(); const r = c.roles.find(x => x.key === (body.key || ''));
  if (!r) return send(res, 404, { error: 'Rôle introuvable.' });
  if (r.niveau === 'admin' && body.niveau !== undefined && normNiveau(body.niveau) !== 'admin'
      && c.roles.filter(x => x.niveau === 'admin').length <= 1)
    return send(res, 400, { error: 'Il doit rester au moins un rôle administrateur.' });
  if (body.label !== undefined && body.label.trim()) r.label = body.label.trim();
  if (body.niveau !== undefined) r.niveau = normNiveau(body.niveau);
  save(); send(res, 200, config());
});
add('DELETE', '/api/roles', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const d = db(); const c = config(); const key = (body.key || '');
  const r = c.roles.find(x => x.key === key);
  if (!r) return send(res, 404, { error: 'Rôle introuvable.' });
  if (r.niveau === 'admin' && c.roles.filter(x => x.niveau === 'admin').length <= 1)
    return send(res, 400, { error: 'Impossible de supprimer le dernier rôle administrateur.' });
  const fallback = c.roles.find(x => x.niveau === 'standard' && x.key !== key) || c.roles.find(x => x.key === 'technicien');
  const fbKey = fallback ? fallback.key : 'technicien';
  d.users.forEach(u => { if (u.role === key) u.role = fbKey; });
  d.settings.roles = c.roles.filter(x => x.key !== key);
  save(); send(res, 200, config());
});

/* =============================== DEVIS (bloque le matériel) =============================== */
function devisTotal(dv) {
  const ht = (dv.lignes || []).reduce((s, l) => s + (+l.prix || 0) * (+l.quantite || 1), 0);
  const remise = +dv.remise || 0;
  return Math.max(0, ht - remise);
}
function enrichDevis(dv) {
  const d = db();
  const lignes = (dv.lignes || []).map(l => {
    const m = d.materiel.find(x => x.id === +l.materiel_id);
    return { ...l, denomination: m ? m.denomination : (l.designation || 'Matériel supprimé') };
  });
  return { ...dv, lignes, total: devisTotal(dv) };
}

add('GET', '/api/devis', (req, res) => {
  const list = [...db().devis].sort((a, b) => (b.date_creation || '').localeCompare(a.date_creation || ''));
  send(res, 200, list.map(enrichDevis));
});
add('GET', '/api/devis/:id', (req, res, p) => {
  const row = db().devis.find(x => x.id === +p.id);
  row ? send(res, 200, enrichDevis(row)) : send(res, 404, { error: 'Devis introuvable.' });
});

const DVF = ['client_nom', 'client_contact', 'lieu', 'date_debut', 'date_fin', 'statut', 'remise', 'notes', 'evenement_id'];
add('POST', '/api/devis', (req, res, p, body, query, user) => {
  if (!body.client_nom) return send(res, 400, { error: 'Le nom du client est obligatoire.' });
  const id = nextId('devis');
  const annee = new Date().getFullYear();
  const row = {
    id, numero: `D${annee}-${String(id).padStart(4, '0')}`,
    date_creation: new Date().toISOString().slice(0, 10),
    statut: body.statut || 'brouillon',
    lignes: Array.isArray(body.lignes) ? body.lignes.map(l => ({ materiel_id: +l.materiel_id, prix: +l.prix || 0, quantite: +l.quantite || 1, designation: l.designation || '' })) : [],
  };
  DVF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  row.evenement_id = body.evenement_id ? +body.evenement_id : null;
  stampModif(row, user);
  db().devis.push(row); logActivity(user, 'create', 'devis', archiveLabel('devis', row)); save();
  send(res, 200, enrichDevis(row));
});

add('PUT', '/api/devis/:id', (req, res, p, body, query, user) => {
  const row = db().devis.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Devis introuvable.' });
  if (conflictHit(row, body, user)) return conflictResponse(res, row);
  DVF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  if (body.evenement_id !== undefined) row.evenement_id = body.evenement_id ? +body.evenement_id : null;
  if (Array.isArray(body.lignes))
    row.lignes = body.lignes.map(l => ({ materiel_id: +l.materiel_id, prix: +l.prix || 0, quantite: +l.quantite || 1, designation: l.designation || '' }));
  stampModif(row, user);
  logActivity(user, 'update', 'devis', archiveLabel('devis', row)); save(); send(res, 200, enrichDevis(row));
});

add('POST', '/api/devis/:id/statut', (req, res, p, body, query, user) => {
  const row = db().devis.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Devis introuvable.' });
  row.statut = body.statut; logActivity(user, 'update', 'devis', archiveLabel('devis', row)); save();
  send(res, 200, enrichDevis(row));
});

add('DELETE', '/api/devis/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = d.devis.find(x => x.id === +p.id);
  d.devis = d.devis.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'devis', gone ? archiveLabel('devis', gone) : ''); save();
  send(res, 200, { ok: true });
});

/* =============================== ÉVÉNEMENTS + DISPONIBILITÉ =============================== */
function enrichEvent(ev) {
  const d = db();
  const u = ev.cree_par_id ? d.users.find(x => x.id === +ev.cree_par_id) : null;
  const nom = u ? ((u.prenom + ' ' + u.nom).trim() || u.login) : (ev.cree_par || null);
  const pt = ev.partenaire_id ? (d.partenaires || []).find(x => x.id === +ev.partenaire_id) : null;
  const devisList = (d.devis || []).filter(x => +x.evenement_id === +ev.id && !x.archive)
    .map(x => ({ id: x.id, numero: x.numero, statut: x.statut }));
  return { ...ev, valide: !!ev.valide, cree_par_nom: nom, cree_par_login: u ? u.login : (ev.cree_par || null),
    partenaire_nom: pt ? pt.nom : null, partenaire_logo: pt ? pt.logo : null,
    champs: Array.isArray(ev.champs) ? ev.champs : [],
    devis: devisList, devis_signe: devisList.some(x => x.statut === 'accepte') };
}
add('GET', '/api/evenements', (req, res) => {
  const list = [...db().evenements].sort((a, b) => (a.date_debut || '').localeCompare(b.date_debut || ''));
  send(res, 200, list.map(enrichEvent));
});
const EF = ['nom', 'lieu', 'partenaire', 'contact', 'date_debut', 'date_fin', 'notes', 'description', 'consignes', 'photo', 'affiche', 'visible_site'];
function cleanChamps(arr) { return Array.isArray(arr) ? arr.map(c => ({ label: String(c.label || ''), valeur: String(c.valeur || '') })).filter(c => c.label || c.valeur) : []; }
add('POST', '/api/evenements', (req, res, p, body, query, user) => {
  if (!body.nom) return send(res, 400, { error: 'Le nom de l\'événement est obligatoire.' });
  const row = {
    id: nextId('evenements'),
    materiel_ids: Array.isArray(body.materiel_ids) ? body.materiel_ids.map(Number) : [],
    valide: !!body.valide,
    partenaire_id: body.partenaire_id ? +body.partenaire_id : null,
    cree_par_id: user ? user.id : null,
    cree_par: user ? user.login : null,
    date_creation: new Date().toISOString(),
  };
  EF.forEach(f => row[f] = body[f] ?? '');
  row.champs = cleanChamps(body.champs);
  stampModif(row, user);
  db().evenements.push(row); logActivity(user, 'create', 'evenements', row.nom); save();
  send(res, 200, enrichEvent(row));
});
add('PUT', '/api/evenements/:id', (req, res, p, body, query, user) => {
  const row = db().evenements.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Événement introuvable.' });
  if (conflictHit(row, body, user)) return conflictResponse(res, row);
  EF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  if (body.champs !== undefined) row.champs = cleanChamps(body.champs);
  if (Array.isArray(body.materiel_ids)) row.materiel_ids = body.materiel_ids.map(Number);
  if (body.valide !== undefined) row.valide = !!body.valide;
  if (body.partenaire_id !== undefined) row.partenaire_id = body.partenaire_id ? +body.partenaire_id : null;
  stampModif(row, user);
  logActivity(user, 'update', 'evenements', row.nom); save(); send(res, 200, enrichEvent(row));
});
// Bascule l'état « validé et complet » (OUI/NON cliquable).
add('POST', '/api/evenements/:id/valide', (req, res, p, body) => {
  const row = db().evenements.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Événement introuvable.' });
  row.valide = body.valide !== undefined ? !!body.valide : !row.valide;
  save(); send(res, 200, enrichEvent(row));
});
add('DELETE', '/api/evenements/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = d.evenements.find(x => x.id === +p.id);
  d.evenements = d.evenements.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'evenements', gone ? gone.nom : ''); save();
  send(res, 200, { ok: true });
});

// Disponibilité de tout le parc pour une période donnée (?from=...&to=...).
add('GET', '/api/disponibilite', (req, res, p, body, query) => {
  const { from, to } = query;
  if (!from || !to) return send(res, 400, { error: 'Période (from, to) requise.' });
  const list = [...db().materiel].filter(m => !m.archive).sort((a, b) => (a.denomination || '').localeCompare(b.denomination || ''));
  send(res, 200, list.map(m => {
    const r = dispoPour(m.id, from, to, query.exclude_devis, query.exclude_event);
    return { id: m.id, denomination: m.denomination, categorie: m.categorie, emplacement: m.emplacement, fonctionnel: m.fonctionnel !== false, dispo: r.dispo, raisons: r.raisons };
  }));
});

/* =============================== RÉPARATIONS =============================== */
function enrichRep(r) {
  const d = db();
  const m = d.materiel.find(x => x.id === +r.materiel_id);
  const t = r.technicien_id ? d.users.find(x => x.id === +r.technicien_id) : null;
  return { ...r, etapes: r.etapes || [], denomination: m ? m.denomination : 'Matériel supprimé', technicien_nom: t ? (t.prenom + ' ' + t.nom).trim() : null };
}
function sanitizeEtapes(arr) {
  return Array.isArray(arr) ? arr.map(s => ({
    id: s.id || (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)),
    texte: String(s.texte || '').trim(), fait: !!s.fait,
  })).filter(s => s.texte) : [];
}
add('GET', '/api/reparations', (req, res) => {
  const ordre = { en_cours: 0, a_faire: 1, termine: 2 };
  const list = [...db().reparations].sort((a, b) => (ordre[a.statut] ?? 1) - (ordre[b.statut] ?? 1) || (b.date_entree || '').localeCompare(a.date_entree || ''));
  send(res, 200, list.map(enrichRep));
});
const RF = ['materiel_id', 'panne', 'statut', 'technicien_id', 'date_entree', 'date_sortie', 'cout', 'notes'];
add('POST', '/api/reparations', (req, res, p, body, query, user) => {
  if (!body.materiel_id) return send(res, 400, { error: 'Matériel obligatoire.' });
  const row = { id: nextId('reparations'), statut: body.statut || 'a_faire', date_entree: body.date_entree || new Date().toISOString().slice(0, 10) };
  RF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'materiel_id' || f === 'technicien_id' ? (body[f] ? +body[f] : null) : body[f]; });
  row.etapes = sanitizeEtapes(body.etapes);
  stampModif(row, user);
  db().reparations.push(row); logActivity(user, 'create', 'reparations', archiveLabel('reparations', row)); save();
  send(res, 200, enrichRep(row));
});
add('PUT', '/api/reparations/:id', (req, res, p, body, query, user) => {
  const row = db().reparations.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Réparation introuvable.' });
  if (conflictHit(row, body, user)) return conflictResponse(res, row);
  RF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'materiel_id' || f === 'technicien_id' ? (body[f] ? +body[f] : null) : body[f]; });
  if (Array.isArray(body.etapes)) row.etapes = sanitizeEtapes(body.etapes);
  stampModif(row, user);
  logActivity(user, 'update', 'reparations', archiveLabel('reparations', row)); save(); send(res, 200, enrichRep(row));
});
add('DELETE', '/api/reparations/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = d.reparations.find(x => x.id === +p.id);
  d.reparations = d.reparations.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'reparations', gone ? archiveLabel('reparations', gone) : ''); save();
  send(res, 200, { ok: true });
});

/* =============================== ACHATS / PIÈCES À ACHETER =============================== */
const URGENCE_RANK = { critique: 0, urgent: 1, normal: 2 };
const ACHAT_STATUTS = ['a_acheter', 'commande', 'recu'];
function enrichAchat(a) {
  const d = db();
  const m = a.materiel_id ? d.materiel.find(x => x.id === +a.materiel_id) : null;
  const r = a.reparation_id ? d.reparations.find(x => x.id === +a.reparation_id) : null;
  const rm = r ? d.materiel.find(x => x.id === +r.materiel_id) : null;
  return { ...a, materiel_nom: m ? m.denomination : null, reparation_nom: r ? (rm ? rm.denomination : ('Réparation #' + r.id)) : null };
}
function achatUrgent(a) { return (a.urgence === 'urgent' || a.urgence === 'critique') && a.statut !== 'recu'; }
add('GET', '/api/achats', (req, res) => {
  const list = [...(db().achats || [])].sort((a, b) =>
    (a.statut === 'recu' ? 1 : 0) - (b.statut === 'recu' ? 1 : 0) ||
    (URGENCE_RANK[a.urgence] ?? 2) - (URGENCE_RANK[b.urgence] ?? 2) ||
    (b.date_creation || '').localeCompare(a.date_creation || ''));
  send(res, 200, list.map(enrichAchat));
});
const ACF = ['designation', 'quantite', 'urgence', 'statut', 'fournisseur', 'cout', 'notes', 'materiel_id', 'reparation_id'];
add('POST', '/api/achats', (req, res, p, body, query, user) => {
  if (!body.designation) return send(res, 400, { error: 'La désignation est obligatoire.' });
  const row = {
    id: nextId('achats'),
    urgence: URGENCE_RANK[body.urgence] !== undefined ? body.urgence : 'normal',
    statut: ACHAT_STATUTS.includes(body.statut) ? body.statut : 'a_acheter',
    date_creation: new Date().toISOString(), cree_par: user ? user.login : null,
  };
  ACF.forEach(f => { if (body[f] !== undefined && f !== 'urgence' && f !== 'statut') row[f] = (f === 'materiel_id' || f === 'reparation_id') ? (body[f] ? +body[f] : null) : body[f]; });
  db().achats.push(row); save();
  send(res, 200, enrichAchat(row));
});
add('PUT', '/api/achats/:id', (req, res, p, body) => {
  const row = db().achats.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Article introuvable.' });
  ACF.forEach(f => { if (body[f] !== undefined) row[f] = (f === 'materiel_id' || f === 'reparation_id') ? (body[f] ? +body[f] : null) : body[f]; });
  if (body.urgence !== undefined && URGENCE_RANK[body.urgence] === undefined) row.urgence = 'normal';
  if (body.statut !== undefined && !ACHAT_STATUTS.includes(body.statut)) row.statut = 'a_acheter';
  save(); send(res, 200, enrichAchat(row));
});
add('POST', '/api/achats/:id/statut', (req, res, p, body) => {
  const row = db().achats.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Article introuvable.' });
  if (ACHAT_STATUTS.includes(body.statut)) row.statut = body.statut;
  save(); send(res, 200, enrichAchat(row));
});
add('DELETE', '/api/achats/:id', (req, res, p) => {
  const d = db(); d.achats = d.achats.filter(x => x.id !== +p.id); save();
  send(res, 200, { ok: true });
});
// Alertes pour l'accueil (extensible). Pour l'instant : pièces urgentes à acheter.
add('GET', '/api/alertes', (req, res) => {
  const urgents = (db().achats || []).filter(achatUrgent).map(enrichAchat)
    .sort((a, b) => (URGENCE_RANK[a.urgence] ?? 2) - (URGENCE_RANK[b.urgence] ?? 2));
  // Rappels : projets WIP dont la date est dans les 2 jours (non terminés / archivés).
  const today = new Date(); const t0 = today.toISOString().slice(0, 10);
  const t2 = new Date(today.getTime() + 2 * 86400000).toISOString().slice(0, 10);
  const rappels = (db().wip || []).filter(w => !w.archive && w.statut !== 'termine' && w.date >= t0 && w.date <= t2)
    .map(enrichWip).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  // Prochain WIP à venir (toute date future, non terminé) pour l'encart d'accueil.
  const upcoming = (db().wip || []).filter(w => !w.archive && w.statut !== 'termine' && (w.date || '') >= t0)
    .map(enrichWip).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  // Rendez-vous de projet dans les 2 jours (de J-2 jusqu'au jour J).
  const rdv_projets = [];
  (db().projets || []).forEach(p => { if (p.archive) return; (p.rdvs || []).forEach(r => { if (r.date >= t0 && r.date <= t2) rdv_projets.push({ projet_id: p.id, projet_nom: p.nom, date: r.date, note: r.note || '' }); }); });
  rdv_projets.sort((a, b) => a.date.localeCompare(b.date));
  send(res, 200, { urgences: urgents, rappels, wip_prochain: upcoming[0] || null, rdv_projets });
});

/* =============================== VENTES =============================== */
function enrichVente(v) {
  const m = db().materiel.find(x => x.id === +v.materiel_id);
  return { ...v, vendu: v.vendu !== false, denomination: m ? m.denomination : 'Matériel supprimé' };
}
add('GET', '/api/ventes', (req, res) => {
  const list = [...db().ventes].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  send(res, 200, list.map(enrichVente));
});
const VF = ['materiel_id', 'client_nom', 'client_contact', 'prix', 'date', 'notes'];
add('POST', '/api/ventes', (req, res, p, body, query, user) => {
  if (!body.materiel_id) return send(res, 400, { error: 'Matériel obligatoire.' });
  const row = { id: nextId('ventes'), date: body.date || new Date().toISOString().slice(0, 10), vendu: body.vendu !== false };
  VF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'materiel_id' ? +body[f] : body[f]; });
  db().ventes.push(row); logActivity(user, 'create', 'ventes', archiveLabel('ventes', row)); save();
  send(res, 200, enrichVente(row));
});
add('PUT', '/api/ventes/:id', (req, res, p, body, query, user) => {
  const row = db().ventes.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Vente introuvable.' });
  VF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'materiel_id' ? +body[f] : body[f]; });
  if (body.vendu !== undefined) row.vendu = !!body.vendu;
  logActivity(user, 'update', 'ventes', archiveLabel('ventes', row)); save(); send(res, 200, enrichVente(row));
});
// Bascule l'état « Vendu » (OUI/NON cliquable).
add('POST', '/api/ventes/:id/vendu', (req, res, p, body) => {
  const row = db().ventes.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Vente introuvable.' });
  row.vendu = body.vendu !== undefined ? !!body.vendu : (row.vendu === false);
  save(); send(res, 200, enrichVente(row));
});
add('DELETE', '/api/ventes/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = d.ventes.find(x => x.id === +p.id);
  d.ventes = d.ventes.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'ventes', gone ? archiveLabel('ventes', gone) : ''); save();
  send(res, 200, { ok: true });
});

/* =============================== PRÊTS =============================== */
function enrichPret(pr) {
  const m = db().materiel.find(x => x.id === +pr.materiel_id);
  return { ...pr, denomination: m ? m.denomination : 'Matériel supprimé' };
}
add('GET', '/api/prets', (req, res) => {
  const list = [...db().prets].sort((a, b) => (a.statut === 'rendu' ? 1 : 0) - (b.statut === 'rendu' ? 1 : 0) || (b.date_debut || '').localeCompare(a.date_debut || ''));
  send(res, 200, list.map(enrichPret));
});
const PF = ['materiel_id', 'emprunteur', 'contact', 'date_debut', 'date_fin', 'statut', 'notes'];
add('POST', '/api/prets', (req, res, p, body, query, user) => {
  if (!body.materiel_id) return send(res, 400, { error: 'Matériel obligatoire.' });
  const row = { id: nextId('prets'), statut: body.statut || 'en_cours' };
  PF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'materiel_id' ? +body[f] : body[f]; });
  db().prets.push(row); logActivity(user, 'create', 'prets', archiveLabel('prets', row)); save();
  send(res, 200, enrichPret(row));
});
add('PUT', '/api/prets/:id', (req, res, p, body, query, user) => {
  const row = db().prets.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Prêt introuvable.' });
  PF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'materiel_id' ? +body[f] : body[f]; });
  logActivity(user, 'update', 'prets', archiveLabel('prets', row)); save(); send(res, 200, enrichPret(row));
});
add('DELETE', '/api/prets/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = d.prets.find(x => x.id === +p.id);
  d.prets = d.prets.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'prets', gone ? archiveLabel('prets', gone) : ''); save();
  send(res, 200, { ok: true });
});

/* =============================== PARTENAIRES =============================== */
function enrichPartner(pt) {
  const d = db(); const today = new Date().toISOString().slice(0, 10);
  const evs = (d.evenements || [])
    .filter(e => +e.partenaire_id === pt.id && (e.date_fin || e.date_debut || '') >= today)
    .sort((a, b) => (a.date_debut || '').localeCompare(b.date_debut || ''));
  const next = evs[0] || null;
  return { ...pt, prochain_evenement: next ? { id: next.id, nom: next.nom, date_debut: next.date_debut, date_fin: next.date_fin } : null };
}
add('GET', '/api/partenaires', (req, res) => {
  const list = [...(db().partenaires || [])].sort((a, b) => (a.ordre || 0) - (b.ordre || 0) || (a.nom || '').localeCompare(b.nom || ''));
  send(res, 200, list.map(enrichPartner));
});
const PTF = ['nom', 'adresse', 'logo', 'notes', 'ordre', 'visible_site', 'email', 'telephone', 'telephone_visible', 'site_internet'];
// Récupération douce de l'existant : l'email était saisi dans « adresse », le téléphone dans « notes ».
function migratePartners() {
  const d = db(); let changed = false;
  (d.partenaires || []).forEach(p => {
    if (!p.email && p.adresse && /@/.test(p.adresse)) { p.email = String(p.adresse).trim(); p.adresse = ''; changed = true; }
    if (!p.telephone && p.notes && /^[\d\s+().\-]{6,25}$/.test(String(p.notes).trim())) { p.telephone = String(p.notes).trim(); p.notes = ''; changed = true; }
    if (p.telephone_visible === undefined) { p.telephone_visible = false; changed = true; }
  });
  if (changed) save();
}
add('POST', '/api/partenaires', (req, res, p, body) => {
  if (!body.nom) return send(res, 400, { error: 'Le nom du partenaire est obligatoire.' });
  const row = { id: nextId('partenaires') };
  PTF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'ordre' ? (+body[f] || 0) : body[f]; });
  db().partenaires.push(row); save(); send(res, 200, enrichPartner(row));
});
add('PUT', '/api/partenaires/:id', (req, res, p, body) => {
  const row = db().partenaires.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Partenaire introuvable.' });
  PTF.forEach(f => { if (body[f] !== undefined) row[f] = f === 'ordre' ? (+body[f] || 0) : body[f]; });
  save(); send(res, 200, enrichPartner(row));
});
add('DELETE', '/api/partenaires/:id', (req, res, p) => {
  const d = db(); d.partenaires = d.partenaires.filter(x => x.id !== +p.id);
  d.evenements.forEach(e => { if (+e.partenaire_id === +p.id) e.partenaire_id = null; });
  save(); send(res, 200, { ok: true });
});

/* =============================== BLOG / ARTICLES =============================== */
const ARTF = ['titre', 'slug', 'date', 'image', 'extrait', 'contenu', 'auteur', 'visible_site', 'archive', 'partenaires_ids', 'categorie', 'banniere'];
function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}
function uniqueSlug(base, exceptId) {
  let s = base || ('article-' + Date.now()); let n = 2;
  const taken = () => (db().articles || []).some(a => a.slug === s && a.id !== exceptId);
  while (taken()) { s = (base || 'article') + '-' + n; n++; }
  return s;
}
add('GET', '/api/articles', (req, res) => {
  send(res, 200, [...(db().articles || [])].sort((a, b) => (b.date || '').localeCompare(a.date || '')));
});
add('GET', '/api/articles/:id', (req, res, p) => {
  const row = (db().articles || []).find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Article introuvable.' });
  send(res, 200, row);
});
add('POST', '/api/articles', (req, res, p, body, query, user) => {
  if (!body.titre) return send(res, 400, { error: 'Le titre est obligatoire.' });
  const row = { id: nextId('articles') };
  ARTF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  row.visible_site = body.visible_site !== false;
  row.archive = body.archive === true;
  row.slug = uniqueSlug(slugify(body.slug || body.titre), row.id);
  if (!row.date) row.date = new Date().toISOString().slice(0, 10);
  db().articles.push(row); logActivity(user, 'create', 'articles', row.titre); save();
  send(res, 200, row);
});
add('PUT', '/api/articles/:id', (req, res, p, body, query, user) => {
  const row = (db().articles || []).find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Article introuvable.' });
  ARTF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  if (body.visible_site !== undefined) row.visible_site = !!body.visible_site;
  if (body.archive !== undefined) row.archive = !!body.archive;
  if (body.slug !== undefined || body.titre !== undefined)
    row.slug = uniqueSlug(slugify(body.slug || row.slug || body.titre || row.titre), row.id);
  logActivity(user, 'update', 'articles', row.titre); save(); send(res, 200, row);
});
add('DELETE', '/api/articles/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = (d.articles || []).find(x => x.id === +p.id);
  d.articles = (d.articles || []).filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'articles', gone ? gone.titre : ''); save(); send(res, 200, { ok: true });
});

/* =============================== CONTENU SITE (page d'accueil : hero, photos, équipe) =============================== */
// Stocké dans settings.site = { hero:{...}, photos:[...], equipe:[...] }.
add('GET', '/api/site', (req, res) => {
  send(res, 200, (db().settings && db().settings.site) || {});
});
add('PUT', '/api/site', (req, res, p, body, query, user) => {
  const s = db().settings; if (!s.site || typeof s.site !== 'object') s.site = {};
  for (const k of ['hero', 'photos', 'equipe', 'blog', 'blog_hero', 'icon_links', 'contact_home', 'machines_page', 'contact_page', 'salons_page']) if (body[k] !== undefined) s.site[k] = body[k];
  logActivity(user, 'update', 'site', ''); save(); send(res, 200, s.site);
});

/* =============================== FICHES PRODUIT PDF =============================== */
// Entête type courrier (logo + adresse + téléphone) — réglages persistants.
add('GET', '/api/pdf-config', (req, res) => {
  const s = db().settings || {};
  send(res, 200, s.pdf_entete || { show: true, nom: '', adresse: '', telephone: '', email: '', site: '', logo: '' });
});
add('PUT', '/api/pdf-config', (req, res, p, body, query, user) => {
  const s = db().settings; if (!s.pdf_entete || typeof s.pdf_entete !== 'object') s.pdf_entete = {};
  ['show', 'nom', 'adresse', 'telephone', 'email', 'site', 'logo'].forEach(k => { if (body[k] !== undefined) s.pdf_entete[k] = body[k]; });
  save(); send(res, 200, s.pdf_entete);
});
// Historique LÉGER (métadonnées seulement, jamais le PDF). Plafonné à 60 entrées.
add('GET', '/api/pdf-history', (req, res) => {
  const s = db().settings || {};
  send(res, 200, Array.isArray(s.pdf_history) ? s.pdf_history : []);
});
add('POST', '/api/pdf-history', (req, res, p, body, query, user) => {
  const s = db().settings; if (!Array.isArray(s.pdf_history)) s.pdf_history = [];
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    user: user ? (user.prenom || user.login) : '',
    materiel_id: body.materiel_id || null,
    titre: String(body.titre || '').slice(0, 160),
    include: body.include || {},
    extras: Array.isArray(body.extras) ? body.extras : [],
  };
  s.pdf_history.unshift(entry);
  if (s.pdf_history.length > 60) s.pdf_history = s.pdf_history.slice(0, 60);
  save(); send(res, 200, entry);
});
add('DELETE', '/api/pdf-history/:id', (req, res, p, body, query, user) => {
  const s = db().settings; s.pdf_history = (s.pdf_history || []).filter(x => x.id !== +p.id);
  save(); send(res, 200, { ok: true });
});

/* =============================== MODULE ASSO (loi 1901) =============================== */
// --- Identité de l'association ---
const ASSO_FIELDS = ['nom', 'objet', 'adresse', 'code_postal', 'ville', 'telephone', 'email', 'site', 'logo', 'rna', 'siret', 'iban', 'bic', 'mode_paiement', 'president_nom', 'tresorier_nom', 'secretaire_nom', 'lieu', 'statut_article'];
add('GET', '/api/asso', (req, res, p, body, query, user) => {
  if (!requireView(user, res)) return;
  send(res, 200, (db().settings && db().settings.asso) || {});
});
add('PUT', '/api/asso', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const s = db().settings; if (!s.asso || typeof s.asso !== 'object') s.asso = {};
  ASSO_FIELDS.forEach(k => { if (body[k] !== undefined) s.asso[k] = body[k]; });
  save(); send(res, 200, s.asso);
});

// --- Campagnes de cotisation (réglages annuels, base des lettres) ---
const CAMP_FIELDS = ['annee', 'montant', 'ag_date', 'periode_debut', 'periode_fin', 'echeance', 'echeance2', 'rappel', 'mode_paiement', 'statut_article'];
add('GET', '/api/asso/campagnes', (req, res, p, body, query, user) => {
  if (!requireView(user, res)) return;
  send(res, 200, Array.isArray(db().settings.cotisation_campagnes) ? db().settings.cotisation_campagnes : []);
});
add('POST', '/api/asso/campagnes', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const s = db().settings; if (!Array.isArray(s.cotisation_campagnes)) s.cotisation_campagnes = [];
  const annee = String(body.annee || '').trim(); if (!annee) return send(res, 400, { error: 'Année obligatoire.' });
  let c = s.cotisation_campagnes.find(x => String(x.annee) === annee);
  if (!c) { c = { annee }; s.cotisation_campagnes.push(c); }
  CAMP_FIELDS.forEach(k => { if (body[k] !== undefined) c[k] = body[k]; });
  s.cotisation_campagnes.sort((a, b) => String(b.annee).localeCompare(String(a.annee)));
  save(); send(res, 200, c);
});
add('DELETE', '/api/asso/campagnes/:annee', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const s = db().settings; s.cotisation_campagnes = (s.cotisation_campagnes || []).filter(x => String(x.annee) !== String(p.annee));
  save(); send(res, 200, { ok: true });
});

// --- Membres (= comptes utilisateurs, vue étendue) ---
const MEMBER_FIELDS = ['adresse', 'code_postal', 'ville', 'telephone', 'email', 'date_adhesion', 'date_naissance', 'profession', 'notes_membre', 'statut_membre'];
function memberView(u) {
  return {
    id: u.id, kind: 'compte', login: u.login, nom: cleanStr(u.nom), prenom: cleanStr(u.prenom), role: u.role, photo: u.photo || '',
    adresse: u.adresse || '', code_postal: u.code_postal || '', ville: u.ville || '', telephone: u.telephone || '',
    email: u.email || '', date_adhesion: u.date_adhesion || '', date_naissance: u.date_naissance || '',
    profession: u.profession || '', notes_membre: u.notes_membre || '', statut_membre: u.statut_membre || 'actif',
    cotisations: Array.isArray(u.cotisations) ? u.cotisations : [],
  };
}
// Membres extérieurs (cotisants sans compte de connexion).
function extView(e) {
  return { id: e.id, kind: 'externe', nom: cleanStr(e.nom), prenom: cleanStr(e.prenom), adresse: e.adresse || '', code_postal: e.code_postal || '', ville: e.ville || '', telephone: e.telephone || '', email: e.email || '', date_adhesion: e.date_adhesion || '', date_naissance: e.date_naissance || '', profession: e.profession || '', notes_membre: e.notes_membre || '', statut_membre: e.statut_membre || 'actif', cotisations: Array.isArray(e.cotisations) ? e.cotisations : [] };
}
add('GET', '/api/asso/membres', (req, res, p, body, query, user) => {
  if (!requireView(user, res)) return;
  const ext = Array.isArray(db().settings.membres_ext) ? db().settings.membres_ext : [];
  send(res, 200, [...db().users.map(memberView), ...ext.map(extView)]);
});
// CRUD membres extérieurs
add('POST', '/api/membres-ext', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const s = db().settings; if (!Array.isArray(s.membres_ext)) s.membres_ext = [];
  const e = { id: Date.now(), cotisations: [] };
  MEMBER_FIELDS.forEach(k => { if (body[k] !== undefined) e[k] = String(body[k]); });
  e.nom = String(body.nom || '').trim(); e.prenom = String(body.prenom || '').trim();
  s.membres_ext.push(e); save(); send(res, 200, extView(e));
});
add('PUT', '/api/membres-ext/:id', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const e = (db().settings.membres_ext || []).find(x => x.id === +p.id); if (!e) return send(res, 404, { error: 'Membre introuvable.' });
  if (body.nom !== undefined) e.nom = String(body.nom).trim();
  if (body.prenom !== undefined) e.prenom = String(body.prenom).trim();
  MEMBER_FIELDS.forEach(k => { if (body[k] !== undefined) e[k] = String(body[k]); });
  save(); send(res, 200, extView(e));
});
add('DELETE', '/api/membres-ext/:id', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const s = db().settings; s.membres_ext = (s.membres_ext || []).filter(x => x.id !== +p.id);
  save(); send(res, 200, { ok: true });
});
add('POST', '/api/membres-ext/:id/cotisation', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const e = (db().settings.membres_ext || []).find(x => x.id === +p.id); if (!e) return send(res, 404, { error: 'Membre introuvable.' });
  if (!Array.isArray(e.cotisations)) e.cotisations = [];
  const annee = String(body.annee || '').trim(); if (!annee) return send(res, 400, { error: 'Année obligatoire.' });
  let c = e.cotisations.find(x => String(x.annee) === annee); if (!c) { c = { annee }; e.cotisations.push(c); }
  if (body.paye !== undefined) c.paye = !!body.paye;
  if (body.date_paiement !== undefined) c.date_paiement = String(body.date_paiement);
  if (body.montant !== undefined) c.montant = body.montant;
  if (body.mode !== undefined) c.mode = String(body.mode);
  e.cotisations.sort((a, b) => String(b.annee).localeCompare(String(a.annee)));
  save(); send(res, 200, extView(e));
});
add('DELETE', '/api/membres-ext/:id/cotisation/:annee', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const e = (db().settings.membres_ext || []).find(x => x.id === +p.id); if (!e) return send(res, 404, { error: 'Membre introuvable.' });
  e.cotisations = (e.cotisations || []).filter(x => String(x.annee) !== String(p.annee));
  save(); send(res, 200, extView(e));
});
add('PUT', '/api/membres/:id', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const u = db().users.find(x => x.id === +p.id); if (!u) return send(res, 404, { error: 'Membre introuvable.' });
  if (body.nom !== undefined) u.nom = String(body.nom).trim();
  if (body.prenom !== undefined) u.prenom = String(body.prenom).trim();
  MEMBER_FIELDS.forEach(k => { if (body[k] !== undefined) u[k] = String(body[k]); });
  save(); send(res, 200, memberView(u));
});
// Ajoute / met à jour la cotisation d'une année pour un membre.
add('POST', '/api/membres/:id/cotisation', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const u = db().users.find(x => x.id === +p.id); if (!u) return send(res, 404, { error: 'Membre introuvable.' });
  if (!Array.isArray(u.cotisations)) u.cotisations = [];
  const annee = String(body.annee || '').trim(); if (!annee) return send(res, 400, { error: 'Année obligatoire.' });
  let c = u.cotisations.find(x => String(x.annee) === annee);
  if (!c) { c = { annee }; u.cotisations.push(c); }
  if (body.paye !== undefined) c.paye = !!body.paye;
  if (body.date_paiement !== undefined) c.date_paiement = String(body.date_paiement);
  if (body.montant !== undefined) c.montant = body.montant;
  if (body.mode !== undefined) c.mode = String(body.mode);
  u.cotisations.sort((a, b) => String(b.annee).localeCompare(String(a.annee)));
  save(); send(res, 200, memberView(u));
});
add('DELETE', '/api/membres/:id/cotisation/:annee', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const u = db().users.find(x => x.id === +p.id); if (!u) return send(res, 404, { error: 'Membre introuvable.' });
  u.cotisations = (u.cotisations || []).filter(x => String(x.annee) !== String(p.annee));
  save(); send(res, 200, memberView(u));
});

// --- Assemblées générales (historique + PV) ---
const AG_FIELDS = ['date', 'type', 'titre', 'lieu', 'heure', 'presents', 'representes', 'absents', 'quorum', 'ordre_du_jour', 'resolutions', 'decisions', 'documents', 'president_seance', 'secretaire_seance'];
add('GET', '/api/ag', (req, res, p, body, query, user) => {
  if (!requireView(user, res)) return;
  send(res, 200, Array.isArray(db().settings.ag) ? db().settings.ag : []);
});
add('POST', '/api/ag', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const s = db().settings; if (!Array.isArray(s.ag)) s.ag = [];
  const row = { id: Date.now(), cree_le: new Date().toISOString() };
  AG_FIELDS.forEach(k => { if (body[k] !== undefined) row[k] = body[k]; });
  s.ag.unshift(row); save(); send(res, 200, row);
});
add('PUT', '/api/ag/:id', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const row = (db().settings.ag || []).find(x => x.id === +p.id); if (!row) return send(res, 404, { error: 'AG introuvable.' });
  AG_FIELDS.forEach(k => { if (body[k] !== undefined) row[k] = body[k]; });
  save(); send(res, 200, row);
});
add('DELETE', '/api/ag/:id', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const s = db().settings; s.ag = (s.ag || []).filter(x => x.id !== +p.id);
  save(); send(res, 200, { ok: true });
});

// --- Documents (fichiers réels, hors /public, servis seulement aux personnes connectées) ---
const DOC_MIME_EXT = { 'application/pdf': 'pdf', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'application/msword': 'doc', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx', 'application/vnd.ms-excel': 'xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx', 'text/plain': 'txt', 'application/zip': 'zip' };
const EXT_MIME = { pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', txt: 'text/plain', zip: 'application/zip' };
function saveDocFile(dataUrl, origName) {
  const m = /^data:([^;]+);base64,(.+)$/i.exec(dataUrl || '');
  if (!m) throw new Error('Fichier invalide.');
  let ext = DOC_MIME_EXT[m[1].toLowerCase()] || ((String(origName || '').match(/\.([a-z0-9]{1,6})$/i) || [])[1] || 'bin').toLowerCase();
  ext = ext.replace(/[^a-z0-9]/g, '') || 'bin';
  const rid = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const safe = String(origName || 'doc').replace(/\.[a-z0-9]+$/i, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'doc';
  const file = `${rid}-${safe}.${ext}`;
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  fs.writeFileSync(path.join(DOCS_DIR, file), Buffer.from(m[2], 'base64'));
  let size = 0; try { size = fs.statSync(path.join(DOCS_DIR, file)).size; } catch {}
  return { file, ext, size };
}
add('POST', '/api/docs', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  try {
    const r = saveDocFile(body.data, body.name);
    send(res, 200, { file: r.file, url: '/api/docs/' + r.file, name: body.name || r.file, size: r.size, ext: r.ext });
  } catch (e) { send(res, 400, { error: e.message }); }
});
// Téléchargement protégé : nécessite une session (pas accessible depuis l'extérieur).
add('GET', '/api/docs/:file', (req, res, p, body, query, user) => {
  if (!user) return send(res, 401, { error: 'Non authentifié.' });
  const file = String(p.file).replace(/[^a-z0-9._-]/gi, '');
  const full = path.join(DOCS_DIR, file);
  if (!full.startsWith(DOCS_DIR) || !fs.existsSync(full)) return send(res, 404, { error: 'Document introuvable.' });
  const ext = (file.match(/\.([a-z0-9]+)$/i) || [])[1] || '';
  res.writeHead(200, { 'Content-Type': EXT_MIME[ext.toLowerCase()] || 'application/octet-stream', 'Content-Disposition': 'inline; filename="' + file + '"', 'Cache-Control': 'private, no-store' });
  fs.createReadStream(full).pipe(res);
});
add('DELETE', '/api/docs/:file', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const file = String(p.file).replace(/[^a-z0-9._-]/gi, '');
  const full = path.join(DOCS_DIR, file);
  if (full.startsWith(DOCS_DIR)) { try { fs.unlinkSync(full); } catch {} }
  send(res, 200, { ok: true });
});

/* =============================== MÉDIATHÈQUE (images en fichiers, réutilisables) =============================== */
const MIME_EXT = { 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp' };
function mediaUrl(req, file) {
  const host = req.headers.host || 'gestion.westcoastarcades.fr';
  const proto = /localhost|127\.0\.0\.1/.test(host) ? 'http' : 'https';
  return proto + '://' + host + '/medias/' + file;
}
function saveMediaFile(dataUrl, origName) {
  const m = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(dataUrl || '');
  if (!m) throw new Error('Image invalide.');
  const ext = MIME_EXT[m[1].toLowerCase()] || 'jpg';
  const id = nextId('medias');
  const safe = String(origName || 'image').replace(/\.[a-z0-9]+$/i, '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'image';
  const file = `m${id}-${safe}.${ext}`;
  try { fs.mkdirSync(MEDIA_DIR, { recursive: true }); } catch {}
  fs.writeFileSync(path.join(MEDIA_DIR, file), Buffer.from(m[2], 'base64'));
  return { id, file };
}
// Convertit une image en data: (champ d'un objet) en fichier de médiathèque, et remplace par l'URL.
function migrateImageField(obj, key, req, label) {
  if (obj && typeof obj[key] === 'string' && obj[key].startsWith('data:')) {
    try {
      const r = saveMediaFile(obj[key], label || key);
      let size = 0; try { size = fs.statSync(path.join(MEDIA_DIR, r.file)).size; } catch {}
      db().medias.push({ id: r.id, file: r.file, url: mediaUrl(req, r.file), name: label || r.file, folder: 'Importées', size, date: new Date().toISOString() });
      obj[key] = db().medias[db().medias.length - 1].url;
      return 1;
    } catch { return 0; }
  }
  return 0;
}
add('GET', '/api/medias', (req, res) => {
  send(res, 200, [...(db().medias || [])].sort((a, b) => (b.date || '').localeCompare(a.date || '')));
});
add('POST', '/api/medias', (req, res, p, body, query, user) => {
  try {
    const r = saveMediaFile(body.data, body.name);
    let size = 0; try { size = fs.statSync(path.join(MEDIA_DIR, r.file)).size; } catch {}
    const media = { id: r.id, file: r.file, url: mediaUrl(req, r.file), name: body.name || r.file, folder: '', size, date: new Date().toISOString() };
    db().medias.push(media); logActivity(user, 'create', 'medias', media.name); save();
    send(res, 200, media);
  } catch (e) { send(res, 400, { error: e.message }); }
});
add('PUT', '/api/medias/:id', (req, res, p, body, query, user) => {
  const m = (db().medias || []).find(x => x.id === +p.id);
  if (!m) return send(res, 404, { error: 'Média introuvable.' });
  if (body.name !== undefined) m.name = String(body.name).slice(0, 120);
  if (body.folder !== undefined) m.folder = String(body.folder).slice(0, 60);
  save(); send(res, 200, m);
});
add('DELETE', '/api/medias/:id', (req, res, p, body, query, user) => {
  const d = db(); const m = (d.medias || []).find(x => x.id === +p.id);
  if (m) { try { fs.unlinkSync(path.join(MEDIA_DIR, m.file)); } catch {} }
  d.medias = (d.medias || []).filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'medias', m ? m.name : ''); save(); send(res, 200, { ok: true });
});
// Importe (migre) toutes les images encore stockées « en dur » vers la médiathèque.
add('POST', '/api/medias/migrate', (req, res, p, body, query, user) => {
  if (roleNiveau(user && user.role) !== 'admin') return send(res, 403, { error: 'Réservé aux administrateurs.' });
  const d = db(); let n = 0;
  (d.materiel || []).forEach(m => n += migrateImageField(m, 'photo', req, m.denomination));
  (d.evenements || []).forEach(e => { n += migrateImageField(e, 'photo', req, e.nom); n += migrateImageField(e, 'affiche', req, (e.nom || '') + ' affiche'); });
  (d.projets || []).forEach(x => n += migrateImageField(x, 'photo', req, x.nom));
  (d.partenaires || []).forEach(x => n += migrateImageField(x, 'logo', req, (x.nom || '') + ' logo'));
  (d.articles || []).forEach(a => { n += migrateImageField(a, 'image', req, a.titre); n += migrateImageField(a, 'banniere', req, (a.titre || '') + ' bannière'); });
  (d.users || []).forEach(u => n += migrateImageField(u, 'photo', req, (u.prenom || u.login || 'Membre') + ' avatar'));
  const s = (d.settings && d.settings.site) || {};
  if (s.hero) n += migrateImageField(s.hero, 'image', req, 'Hero accueil');
  if (Array.isArray(s.photos)) s.photos.forEach((ph, i) => n += migrateImageField(ph, 'image', req, 'Galerie ' + (i + 1)));
  if (Array.isArray(s.equipe)) s.equipe.forEach(m => n += migrateImageField(m, 'photo', req, m.nom || 'Membre'));
  if (s.blog) { n += migrateImageField(s.blog, 'banner', req, 'Bannière blog'); if (s.blog.pub) n += migrateImageField(s.blog.pub, 'media', req, 'Encart pub'); }
  n += migrateImageField(s, 'blog_hero', req, 'Hero blog');
  save(); send(res, 200, { migrated: n });
});

/* ---- Nettoyage médiathèque : références d'images dans toute la base ----
   visit(getURL, setURL, isHTML) appelé pour chaque champ susceptible de contenir une URL d'image. */
function walkImageRefs(d, visit) {
  const f = (obj, key, html) => { if (obj && typeof obj === 'object') visit(() => obj[key], v => { obj[key] = v; }, !!html); };
  (d.materiel || []).forEach(m => f(m, 'photo'));
  (d.evenements || []).forEach(e => { f(e, 'photo'); f(e, 'affiche'); });
  (d.projets || []).forEach(x => f(x, 'photo'));
  (d.partenaires || []).forEach(x => f(x, 'logo'));
  (d.articles || []).forEach(a => { f(a, 'image'); f(a, 'banniere'); f(a, 'contenu', true); });
  (d.users || []).forEach(u => f(u, 'photo'));
  const s = (d.settings && d.settings.site) || {};
  if (s.hero) f(s.hero, 'image');
  if (Array.isArray(s.photos)) s.photos.forEach(ph => f(ph, 'image'));
  if (Array.isArray(s.equipe)) s.equipe.forEach(m => f(m, 'photo'));
  if (s.blog) { f(s.blog, 'banner'); if (s.blog.pub) f(s.blog.pub, 'media'); }
  f(s, 'blog_hero');
  if (Array.isArray(s.icon_links)) s.icon_links.forEach(it => f(it, 'icon'));
}
// Compte combien de fois une URL est référencée (champs simples = 1, HTML = nb d'occurrences).
function countRef(d, urlList) {
  const counts = {}; urlList.forEach(u => counts[u] = 0);
  walkImageRefs(d, (get, set, html) => {
    const v = get(); if (typeof v !== 'string' || !v) return;
    if (html) { urlList.forEach(u => { if (u && v.indexOf(u) >= 0) counts[u] += v.split(u).length - 1; }); }
    else if (counts[v] !== undefined) counts[v]++;
  });
  return counts;
}
function mediaFileHash(file) { try { return crypto.createHash('sha1').update(fs.readFileSync(path.join(MEDIA_DIR, file))).digest('hex'); } catch { return null; }
}
// Analyse SANS rien modifier : doublons identiques, fichiers manquants, images non utilisées.
add('GET', '/api/medias/audit', (req, res, p, body, query, user) => {
  if (roleNiveau(user && user.role) !== 'admin') return send(res, 403, { error: 'Réservé aux administrateurs.' });
  const d = db(); const meds = d.medias || [];
  const urls = meds.map(m => m.url).filter(Boolean);
  const refs = countRef(d, urls);
  const byHash = {}; const missing = [];
  meds.forEach(m => { const h = mediaFileHash(m.file); if (!h) { missing.push({ id: m.id, name: m.name, file: m.file }); return; } (byHash[h] = byHash[h] || []).push(m); });
  const duplicates = [];
  Object.values(byHash).forEach(group => {
    if (group.length < 2) return;
    const sorted = group.slice().sort((a, b) => (refs[b.url] || 0) - (refs[a.url] || 0) || a.id - b.id);
    const keep = sorted[0];
    duplicates.push({
      keep: { id: keep.id, name: keep.name, url: keep.url, refs: refs[keep.url] || 0 },
      dups: sorted.slice(1).map(m => ({ id: m.id, name: m.name, url: m.url, refs: refs[m.url] || 0 })),
    });
  });
  const unused = meds.filter(m => (refs[m.url] || 0) === 0).map(m => ({ id: m.id, name: m.name, url: m.url }));
  send(res, 200, { total: meds.length, duplicates, missing, unused, dupFiles: duplicates.reduce((n, g) => n + g.dups.length, 0) });
});
// Fusionne UNIQUEMENT les doublons identiques (mêmes octets) : réaffecte les liens puis supprime les copies.
add('POST', '/api/medias/dedupe', (req, res, p, body, query, user) => {
  if (roleNiveau(user && user.role) !== 'admin') return send(res, 403, { error: 'Réservé aux administrateurs.' });
  const d = db(); const meds = d.medias || [];
  const byHash = {};
  meds.forEach(m => { const h = mediaFileHash(m.file); if (h) (byHash[h] = byHash[h] || []).push(m); });
  const urls = meds.map(m => m.url).filter(Boolean);
  const refs = countRef(d, urls);
  const remap = {}; const toDelete = [];
  Object.values(byHash).forEach(group => {
    if (group.length < 2) return;
    const sorted = group.slice().sort((a, b) => (refs[b.url] || 0) - (refs[a.url] || 0) || a.id - b.id);
    const keep = sorted[0];
    sorted.slice(1).forEach(m => { if (m.url && m.url !== keep.url) remap[m.url] = keep.url; toDelete.push(m); });
  });
  let reassigned = 0;
  walkImageRefs(d, (get, set, html) => {
    const v = get(); if (typeof v !== 'string' || !v) return;
    if (html) { let nv = v; Object.keys(remap).forEach(o => { if (nv.indexOf(o) >= 0) { nv = nv.split(o).join(remap[o]); reassigned++; } }); if (nv !== v) set(nv); }
    else if (remap[v]) { set(remap[v]); reassigned++; }
  });
  // Supprime les enregistrements + fichiers des doublons
  const delIds = new Set(toDelete.map(m => m.id));
  toDelete.forEach(m => { try { fs.unlinkSync(path.join(MEDIA_DIR, m.file)); } catch {} });
  d.medias = meds.filter(m => !delIds.has(m.id));
  logActivity(user, 'update', 'medias', 'Nettoyage doublons (' + delIds.size + ')'); save();
  send(res, 200, { merged: delIds.size, reassigned });
});

/* =============================== PROJETS WIP =============================== */
const WIP_STATUTS = ['a_venir', 'a_faire', 'en_cours', 'incomplet', 'termine'];
function manquantArr(v) { return Array.isArray(v) ? v.map(x => String(x).trim()).filter(Boolean) : (v ? [String(v).trim()].filter(Boolean) : []); }
function wipCode(dateISO) {
  const [y, m, dd] = (dateISO || new Date().toISOString().slice(0, 10)).split('-');
  const base = `WIP-${dd}-${m}-${y}`;
  const existing = new Set((db().wip || []).map(x => x.code));
  if (!existing.has(base)) return base;
  for (const s of 'BCDEFGHIJKLMNOPQRSTUVWXYZ') if (!existing.has(base + '-' + s)) return base + '-' + s;
  return base + '-' + Date.now().toString(36).slice(-3);
}
function sanitizeEquipes(arr) {
  return Array.isArray(arr) ? arr.map(e => ({
    id: e.id || (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)),
    tache: String(e.tache || '').trim(),
    membres: Array.isArray(e.membres) ? e.membres.map(x => String(x).trim()).filter(Boolean) : [],
    materiel_ids: Array.isArray(e.materiel_ids) ? e.materiel_ids.map(Number).filter(Boolean) : [],
    etapes: sanitizeEtapes(e.etapes),
  })) : [];
}
function enrichWip(w) {
  const d = db();
  const equipes = (w.equipes || []).map(e => ({
    ...e,
    materiel: (e.materiel_ids || []).map(id => { const m = d.materiel.find(x => x.id === +id); return { id: +id, denomination: m ? m.denomination : '(supprimé)' }; }),
  }));
  return { ...w, equipes, archive: !!w.archive };
}
add('GET', '/api/wip', (req, res) => {
  const list = [...(db().wip || [])].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  send(res, 200, list.map(enrichWip));
});
add('POST', '/api/wip', (req, res, p, body, query, user) => {
  const date = body.date || new Date().toISOString().slice(0, 10);
  const row = {
    id: nextId('wip'), code: wipCode(date), date, lieu: body.lieu || '',
    statut: WIP_STATUTS.includes(body.statut) ? body.statut : 'a_venir',
    presents: Array.isArray(body.presents) ? body.presents.map(x => String(x).trim()).filter(Boolean) : [],
    manquant: manquantArr(body.manquant), notes: body.notes || '', equipes: sanitizeEquipes(body.equipes),
    cree_par: user ? user.login : null, date_creation: new Date().toISOString(),
  };
  db().wip.push(row); logActivity(user, 'create', 'wip', row.code); save();
  send(res, 200, enrichWip(row));
});
add('PUT', '/api/wip/:id', (req, res, p, body, query, user) => {
  const row = db().wip.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Projet introuvable.' });
  ['date', 'lieu', 'notes'].forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  if (body.manquant !== undefined) row.manquant = manquantArr(body.manquant);
  if (body.statut !== undefined && WIP_STATUTS.includes(body.statut)) row.statut = body.statut;
  if (Array.isArray(body.presents)) row.presents = body.presents.map(x => String(x).trim()).filter(Boolean);
  if (Array.isArray(body.equipes)) row.equipes = sanitizeEquipes(body.equipes);
  logActivity(user, 'update', 'wip', row.code); save(); send(res, 200, enrichWip(row));
});
add('DELETE', '/api/wip/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = d.wip.find(x => x.id === +p.id);
  d.wip = d.wip.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'wip', gone ? gone.code : ''); save();
  send(res, 200, { ok: true });
});

/* =============================== PROJETS =============================== */
function sanitizeFichiers(arr) {
  return Array.isArray(arr) ? arr.filter(f => f && f.data).map(f => ({
    name: String(f.name || 'fichier'), type: String(f.type || ''), size: +f.size || 0, data: String(f.data),
  })) : [];
}
function sanitizeRdvs(arr) {
  return Array.isArray(arr) ? arr.map(r => ({
    id: r.id || (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)),
    date: String(r.date || '').slice(0, 10), note: String(r.note || '').trim(),
  })).filter(r => r.date) : [];
}
function enrichProjet(p) {
  return { ...p, archive: !!p.archive, intervenants: p.intervenants || [], ressources: p.ressources || [], fichiers: p.fichiers || [], taches: p.taches || [], rdvs: p.rdvs || [], champs: Array.isArray(p.champs) ? p.champs : [] };
}
add('GET', '/api/projets', (req, res) => {
  const list = [...(db().projets || [])].sort((a, b) => (a.date_debut || '').localeCompare(b.date_debut || ''));
  send(res, 200, list.map(enrichProjet));
});
const PJF = ['nom', 'date_debut', 'budget', 'notes', 'description', 'consignes', 'photo', 'visible_site', 'partenaires_ids'];
add('POST', '/api/projets', (req, res, p, body, query, user) => {
  if (!body.nom) return send(res, 400, { error: 'Le nom du projet est obligatoire.' });
  const row = {
    id: nextId('projets'),
    intervenants: Array.isArray(body.intervenants) ? body.intervenants.map(x => String(x).trim()).filter(Boolean) : [],
    ressources: Array.isArray(body.ressources) ? body.ressources.map(x => String(x).trim()).filter(Boolean) : [],
    fichiers: sanitizeFichiers(body.fichiers),
    taches: sanitizeEtapes(body.taches), rdvs: sanitizeRdvs(body.rdvs),
    cree_par: user ? user.login : null, date_creation: new Date().toISOString(),
  };
  PJF.forEach(f => row[f] = body[f] ?? '');
  row.champs = cleanChamps(body.champs);
  db().projets.push(row); logActivity(user, 'create', 'projets', row.nom); save();
  send(res, 200, enrichProjet(row));
});
add('PUT', '/api/projets/:id', (req, res, p, body, query, user) => {
  const row = db().projets.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Projet introuvable.' });
  PJF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  if (body.champs !== undefined) row.champs = cleanChamps(body.champs);
  if (Array.isArray(body.intervenants)) row.intervenants = body.intervenants.map(x => String(x).trim()).filter(Boolean);
  if (Array.isArray(body.ressources)) row.ressources = body.ressources.map(x => String(x).trim()).filter(Boolean);
  if (Array.isArray(body.fichiers)) row.fichiers = sanitizeFichiers(body.fichiers);
  if (Array.isArray(body.taches)) row.taches = sanitizeEtapes(body.taches);
  if (Array.isArray(body.rdvs)) row.rdvs = sanitizeRdvs(body.rdvs);
  logActivity(user, 'update', 'projets', row.nom); save(); send(res, 200, enrichProjet(row));
});
add('DELETE', '/api/projets/:id', (req, res, p, body, query, user) => {
  const d = db(); const gone = d.projets.find(x => x.id === +p.id);
  d.projets = d.projets.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'projets', gone ? gone.nom : ''); save();
  send(res, 200, { ok: true });
});

/* =============================== BOÎTE À IDÉES (forum / helpdesk) =============================== */
function loginName(login) {
  const u = (db().users || []).find(x => x.login === login);
  return u ? ((u.prenom + ' ' + u.nom).trim() || u.login) : (login || 'Inconnu');
}
const IDEE_TYPES = ['idee', 'question', 'bug', 'autre'];
function enrichIdee(t) {
  return {
    ...t,
    statut: t.statut === 'resolu' ? 'resolu' : 'ouvert',
    auteur_nom: loginName(t.auteur),
    messages: (t.messages || []).map(m => ({ ...m, auteur_nom: loginName(m.auteur) })),
  };
}
add('GET', '/api/idees', (req, res) => {
  const list = [...(db().idees || [])].sort((a, b) => (b.date_creation || '').localeCompare(a.date_creation || ''));
  send(res, 200, list.map(enrichIdee));
});
add('POST', '/api/idees', (req, res, p, body, query, user) => {
  const titre = (body.titre || '').trim();
  const texte = (body.texte || '').trim();
  if (!titre) return send(res, 400, { error: 'Le titre est obligatoire.' });
  const now = new Date().toISOString();
  const row = {
    id: nextId('idees'),
    titre,
    type: IDEE_TYPES.includes(body.type) ? body.type : 'idee',
    rubrique: (body.rubrique || '').trim() || 'Général',
    auteur: user ? user.login : null,
    date_creation: now,
    statut: 'ouvert',
    messages: texte ? [{ id: Date.now(), auteur: user ? user.login : null, texte, date: now }] : [],
  };
  db().idees.push(row); logActivity(user, 'create', 'idees', titre); save();
  send(res, 200, enrichIdee(row));
});
add('POST', '/api/idees/:id/message', (req, res, p, body, query, user) => {
  const row = db().idees.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Fil introuvable.' });
  const texte = (body.texte || '').trim();
  if (!texte) return send(res, 400, { error: 'Message vide.' });
  if (!Array.isArray(row.messages)) row.messages = [];
  row.messages.push({ id: Date.now(), auteur: user ? user.login : null, texte, date: new Date().toISOString() });
  save(); send(res, 200, enrichIdee(row));
});
function canModerateIdee(user, row) { return user && (roleNiveau(user.role) === 'admin' || row.auteur === user.login); }
add('POST', '/api/idees/:id/statut', (req, res, p, body, query, user) => {
  const row = db().idees.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Fil introuvable.' });
  if (!canModerateIdee(user, row)) return send(res, 403, { error: 'Seuls l\'auteur et les administrateurs peuvent changer le statut.' });
  row.statut = body.statut === 'resolu' ? 'resolu' : 'ouvert';
  save(); send(res, 200, enrichIdee(row));
});
add('DELETE', '/api/idees/:id', (req, res, p, body, query, user) => {
  const row = db().idees.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Fil introuvable.' });
  if (!canModerateIdee(user, row)) return send(res, 403, { error: 'Seuls l\'auteur et les administrateurs peuvent supprimer ce fil.' });
  db().idees = db().idees.filter(x => x.id !== +p.id);
  logActivity(user, 'delete', 'idees', row.titre); save();
  send(res, 200, { ok: true });
});

/* =============================== ABSENCES / DISPONIBILITÉS =============================== */
function enrichAbsence(a) {
  const u = db().users.find(x => x.id === +a.user_id);
  return { ...a, user_nom: u ? ((u.prenom + ' ' + u.nom).trim() || u.login) : 'Inconnu', user_photo: u ? (u.photo || '') : '' };
}
function canEditAbsence(user, row) { return user && (roleNiveau(user.role) === 'admin' || +row.user_id === +user.id); }
add('GET', '/api/absences', (req, res) => {
  const list = [...(db().absences || [])].sort((a, b) => (a.date_debut || '').localeCompare(b.date_debut || ''));
  send(res, 200, list.map(enrichAbsence));
});
const ABF = ['type', 'date_debut', 'date_fin', 'note'];
add('POST', '/api/absences', (req, res, p, body, query, user) => {
  // Un membre crée une absence pour lui-même ; un admin peut le faire pour un autre.
  let uid = user.id;
  if (body.user_id !== undefined && roleNiveau(user.role) === 'admin') uid = +body.user_id;
  if (!body.date_debut) return send(res, 400, { error: 'Date de début requise.' });
  const row = { id: nextId('absences'), user_id: uid };
  ABF.forEach(f => row[f] = body[f] ?? '');
  if (!row.date_fin) row.date_fin = row.date_debut;
  db().absences.push(row); save();
  send(res, 200, enrichAbsence(row));
});
add('PUT', '/api/absences/:id', (req, res, p, body, query, user) => {
  const row = db().absences.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Absence introuvable.' });
  if (!canEditAbsence(user, row)) return send(res, 403, { error: 'Vous ne pouvez modifier que vos propres absences.' });
  ABF.forEach(f => { if (body[f] !== undefined) row[f] = body[f]; });
  if (body.user_id !== undefined && roleNiveau(user.role) === 'admin') row.user_id = +body.user_id;
  if (!row.date_fin) row.date_fin = row.date_debut;
  save(); send(res, 200, enrichAbsence(row));
});
add('DELETE', '/api/absences/:id', (req, res, p, body, query, user) => {
  const d = db(); const row = d.absences.find(x => x.id === +p.id);
  if (!row) return send(res, 404, { error: 'Absence introuvable.' });
  if (!canEditAbsence(user, row)) return send(res, 403, { error: 'Vous ne pouvez supprimer que vos propres absences.' });
  d.absences = d.absences.filter(x => x.id !== +p.id); save();
  send(res, 200, { ok: true });
});

/* =============================== TABLEAU DE BORD =============================== */
add('GET', '/api/dashboard', (req, res) => {
  const d = db();
  const mats = d.materiel.filter(m => !m.archive);
  const total = mats.length;
  const hs = mats.filter(m => m.fonctionnel === false).length;
  const bloque = mats.filter(m => blocages(m.id).length > 0).length;
  const dispo = total - bloque;
  send(res, 200, {
    materiel_total: total, materiel_hs: hs, materiel_bloque: bloque, materiel_dispo: dispo,
    devis_actifs: d.devis.filter(x => DEVIS_ACTIFS.includes(x.statut) && !x.archive).length,
    reparations_en_cours: d.reparations.filter(x => x.statut !== 'termine' && !x.archive).length,
    prets_en_cours: d.prets.filter(x => x.statut !== 'rendu' && !x.archive).length,
    evenements: d.evenements.filter(x => !x.archive).length,
    ventes: d.ventes.filter(x => !x.archive).length,
    achats_urgents: (d.achats || []).filter(achatUrgent).length,
    achats_ouverts: (d.achats || []).filter(a => a.statut !== 'recu').length,
  });
});

/* =============================== COMPTES & SESSION =============================== */
function requireAdmin(user, res) { if (!user || roleNiveau(user.role) !== 'admin') { send(res, 403, { error: 'Réservé aux administrateurs.' }); return false; } return true; }
// Lecture des pages admin : autorisée aux administrateurs ET aux invités (lecture seule, pour la démo).
function requireView(user, res) { const n = roleNiveau(user && user.role); if (n === 'admin' || n === 'lecture') return true; send(res, 403, { error: 'Réservé aux administrateurs.' }); return false; }

add('POST', '/api/login', (req, res, p, body) => {
  const login = (body.login || '').trim().toLowerCase();
  const u = db().users.find(x => x.login.toLowerCase() === login);
  if (!u || !checkPw(body.password, u)) return send(res, 401, { error: 'Identifiant ou mot de passe incorrect.' });
  const d = db();
  if (!Array.isArray(d.logins)) d.logins = [];
  d.logins.push({ ts: new Date().toISOString(), user_id: u.id, login: u.login });
  if (d.logins.length > 5000) d.logins = d.logins.slice(-5000);
  touchPresence(u); save();
  send(res, 200, { user: publicUser(u) }, { 'Set-Cookie': cookieHeader(signSession(u.id)) });
});
add('POST', '/api/logout', (req, res) => {
  send(res, 200, { ok: true }, { 'Set-Cookie': 'wca_session=; HttpOnly; Path=/; Max-Age=0' });
});
add('GET', '/api/session', (req, res, p, body, query, user) => {
  user ? send(res, 200, { user: publicUser(user) }) : send(res, 401, { error: 'Non authentifié' });
});

add('PUT', '/api/me', (req, res, p, body, query, user) => {
  if (body.nom !== undefined) user.nom = String(body.nom).trim();
  if (body.prenom !== undefined) user.prenom = String(body.prenom).trim();
  if (body.photo !== undefined) user.photo = String(body.photo || '');
  save(); send(res, 200, { user: publicUser(user) });
});
add('POST', '/api/me/password', (req, res, p, body, query, user) => {
  if (!checkPw(body.current, user)) return send(res, 400, { error: 'Mot de passe actuel incorrect.' });
  if (!body.new || String(body.new).length < 4) return send(res, 400, { error: 'Nouveau mot de passe trop court (4 caractères min).' });
  Object.assign(user, makePw(body.new), { must_change: false }); save();
  send(res, 200, { ok: true });
});

add('GET', '/api/users', (req, res, p, body, query, user) => {
  if (!requireView(user, res)) return;
  send(res, 200, db().users.map(publicUser));
});
add('POST', '/api/users', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const login = (body.login || '').trim().toLowerCase();
  if (!login || !body.password) return send(res, 400, { error: 'Identifiant et mot de passe obligatoires.' });
  if (db().users.some(x => x.login.toLowerCase() === login)) return send(res, 400, { error: 'Cet identifiant existe déjà.' });
  const { salt, hash } = makePw(body.password);
  const u = { id: nextId('users'), login, nom: (body.nom || '').trim(), prenom: (body.prenom || '').trim(), photo: body.photo || '', role: normRole(body.role), salt, hash, must_change: !!body.must_change, created_at: new Date().toISOString() };
  db().users.push(u); save(); send(res, 200, publicUser(u));
});
add('PUT', '/api/users/:id', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const u = db().users.find(x => x.id === +p.id); if (!u) return send(res, 404, { error: 'Compte introuvable.' });
  if (body.nom !== undefined) u.nom = String(body.nom).trim();
  if (body.prenom !== undefined) u.prenom = String(body.prenom).trim();
  if (body.role !== undefined) u.role = normRole(body.role);
  if (body.photo !== undefined) u.photo = String(body.photo || '');
  save(); send(res, 200, publicUser(u));
});
add('POST', '/api/users/:id/password', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const u = db().users.find(x => x.id === +p.id); if (!u) return send(res, 404, { error: 'Compte introuvable.' });
  if (!body.password || String(body.password).length < 4) return send(res, 400, { error: 'Mot de passe trop court.' });
  Object.assign(u, makePw(body.password), { must_change: true }); save(); send(res, 200, { ok: true });
});
// Génère un code de réinitialisation à usage unique (valable 24h) à communiquer au membre.
add('POST', '/api/users/:id/reset-code', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const u = db().users.find(x => x.id === +p.id); if (!u) return send(res, 404, { error: 'Compte introuvable.' });
  const mc = makeResetCode();
  u.reset_salt = mc.salt; u.reset_hash = mc.hash; u.reset_exp = Date.now() + 24 * 3600 * 1000; save();
  send(res, 200, { code: mc.code, login: u.login });
});
// Réinitialisation par code (écran de connexion) — route ouverte.
add('POST', '/api/reset-password', (req, res, p, body) => {
  const login = (body.login || '').trim().toLowerCase();
  const u = db().users.find(x => x.login.toLowerCase() === login);
  const code = (body.code || '').trim().toUpperCase();
  if (!u || !u.reset_hash || !u.reset_exp || u.reset_exp < Date.now() || hashPw(code, u.reset_salt) !== u.reset_hash)
    return send(res, 400, { error: 'Identifiant ou code invalide, ou code expiré.' });
  if (!body.password || String(body.password).length < 4) return send(res, 400, { error: 'Nouveau mot de passe trop court (4 caractères min).' });
  Object.assign(u, makePw(body.password), { must_change: false });
  delete u.reset_hash; delete u.reset_salt; delete u.reset_exp; save();
  send(res, 200, { ok: true });
});
add('DELETE', '/api/users/:id', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const id = +p.id;
  if (user.id === id) return send(res, 400, { error: 'Vous ne pouvez pas supprimer votre propre compte.' });
  const u = db().users.find(x => x.id === id); if (!u) return send(res, 404, { error: 'Compte introuvable.' });
  if (u.role === 'admin' && db().users.filter(x => x.role === 'admin').length <= 1) return send(res, 400, { error: 'Impossible de supprimer le dernier administrateur.' });
  db().users = db().users.filter(x => x.id !== id); save(); send(res, 200, { ok: true });
});

/* =============================== ACTIVITÉ (admin) =============================== */
add('GET', '/api/activite', (req, res, p, body, query, user) => {
  if (!requireView(user, res)) return;
  const d = db();
  const now = Date.now();
  const users = d.users;
  const nameOf = u => u ? ((u.prenom + ' ' + u.nom).trim() || u.login) : '—';

  // En ligne maintenant (activité < fenêtre de présence).
  const presence = d.presence || {};
  const enLigne = users
    .map(u => ({ id: u.id, login: u.login, nom: nameOf(u), role: u.role, last_seen: presence[u.id] || null }))
    .filter(u => u.last_seen && (now - new Date(u.last_seen).getTime()) < PRESENCE_WINDOW)
    .sort((a, b) => (b.last_seen || '').localeCompare(a.last_seen || ''));

  // Connexions par jour (14 derniers jours), avec utilisateurs distincts.
  const logins = Array.isArray(d.logins) ? d.logins : [];
  const parJour = {};
  for (const l of logins) {
    const jour = (l.ts || '').slice(0, 10); if (!jour) continue;
    (parJour[jour] = parJour[jour] || { jour, total: 0, users: {} });
    parJour[jour].total++; parJour[jour].users[l.login] = true;
  }
  const connexions = Object.values(parJour)
    .map(j => ({ jour: j.jour, total: j.total, distincts: Object.keys(j.users).length, logins: Object.keys(j.users) }))
    .sort((a, b) => b.jour.localeCompare(a.jour)).slice(0, 14);

  // Dernière connexion par utilisateur.
  const derniere = {};
  for (const l of logins) if (!derniere[l.user_id] || l.ts > derniere[l.user_id]) derniere[l.user_id] = l.ts;
  const comptes = users.map(u => ({ id: u.id, login: u.login, nom: nameOf(u), role: u.role,
    derniere_connexion: derniere[u.id] || null,
    en_ligne: !!(presence[u.id] && (now - new Date(presence[u.id]).getTime()) < PRESENCE_WINDOW) }))
    .sort((a, b) => (b.derniere_connexion || '').localeCompare(a.derniere_connexion || ''));

  // Contributions (créations + modifs + suppressions) par utilisateur et par domaine.
  const activity = Array.isArray(d.activity) ? d.activity : [];
  const contrib = {};
  for (const a of activity) {
    const k = a.user_id;
    (contrib[k] = contrib[k] || { user_id: k, login: a.login, materiel: 0, reparation: 0 });
    if (a.entity === 'materiel') contrib[k].materiel++;
    else if (a.entity === 'reparations') contrib[k].reparation++;
  }
  const enrichContrib = list => list.map(c => {
    const u = users.find(x => x.id === +c.user_id);
    return { ...c, nom: u ? nameOf(u) : (c.login || '—'), total: c.materiel + c.reparation };
  });
  const all = enrichContrib(Object.values(contrib));
  const topInventaire = [...all].filter(c => c.materiel > 0).sort((a, b) => b.materiel - a.materiel);
  const topReparations = [...all].filter(c => c.reparation > 0).sort((a, b) => b.reparation - a.reparation);

  // 10 dernières actions (toutes rubriques surveillées confondues).
  const recent = activity.slice(-10).reverse().map(a => {
    const u = users.find(x => x.id === +a.user_id);
    return { ts: a.ts, login: a.login, nom: u ? nameOf(u) : (a.login || '—'), action: a.action, entity: a.entity, label: a.label || '' };
  });

  send(res, 200, { en_ligne: enLigne, connexions, comptes, contributions: all, top_inventaire: topInventaire, top_reparations: topReparations, recent, watch: config().watch });
});

/* ===================== RÉGLAGES, SAUVEGARDE & RESTAURATION ===================== */
add('GET', '/api/settings', (req, res) => send(res, 200, db().settings || {}));
add('PUT', '/api/settings', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const d = db(); d.settings = { ...(d.settings || {}), ...body }; save();
  send(res, 200, d.settings);
});
add('GET', '/api/backup', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  const d = db();
  send(res, 200, { wca_backup: 1, generatedAt: new Date().toISOString(), seq: d.seq, settings: d.settings || {},
    materiel: d.materiel, devis: d.devis, evenements: d.evenements, reparations: d.reparations, ventes: d.ventes, prets: d.prets, users: d.users, achats: d.achats, partenaires: d.partenaires, wip: d.wip, projets: d.projets, absences: d.absences, idees: d.idees,
    logins: d.logins || [], activity: d.activity || [], presence: d.presence || {} });
});
add('POST', '/api/restore', (req, res, p, body, query, user) => {
  if (!requireAdmin(user, res)) return;
  if (!body || !Array.isArray(body.materiel) || !Array.isArray(body.users))
    return send(res, 400, { error: 'Fichier de sauvegarde invalide.' });
  setData(body);
  send(res, 200, { ok: true });
});

/* ----------------------------- Statique ----------------------------- */
function serveStatic(req, res, pathname) {
  const file = path.join(PUBLIC, pathname === '/' ? 'index.html' : pathname);
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, dataBuf) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache, must-revalidate' });
    res.end(dataBuf);
  });
}

/* ----------------------------- Serveur ------------------------------ */
const OPEN_ROUTES = [ ['POST', '/api/login'], ['GET', '/api/session'], ['POST', '/api/reset-password'] ];
http.createServer((req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = url.pathname;
    // API publique (lecture seule, CORS) pour le site — AVANT l'authentification.
    if (pathname.startsWith('/api/public/') || pathname === '/api/public') return handlePublic(req, res, pathname, url.searchParams);
    if (!pathname.startsWith('/api/')) return serveStatic(req, res, pathname);
    const query = {};
    for (const [k, v] of url.searchParams) query[k] = v;
    let raw = '';
    req.on('data', c => (raw += c));
    req.on('end', () => {
      try {
        let body = {};
        if (raw) { try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'JSON invalide.' }); } }
        const user = currentUser(req);
        if (user) touchPresence(user); // présence best-effort (sauvegardée à la prochaine écriture)
        const open = OPEN_ROUTES.some(([m, pth]) => m === req.method && pth === pathname);
        if (!open && !user) return send(res, 401, { error: 'Non authentifié.' });
        // Niveau « lecture » : lecture seule (uniquement GET + déconnexion).
        if (user && roleNiveau(user.role) === 'lecture' && req.method !== 'GET' && !(req.method === 'POST' && pathname === '/api/logout'))
          return send(res, 403, { error: 'Mode lecture seule : modification non autorisée.' });
        for (const r of routes) {
          if (r.method !== req.method) continue;
          const params = matchRoute(r.pattern, pathname);
          if (params) return r.handler(req, res, params, body, query, user);
        }
        send(res, 404, { error: 'Route inconnue.' });
      } catch (e) { logFatal('request', e); try { send(res, 500, { error: 'Erreur serveur : ' + e.message }); } catch {} }
    });
  } catch (e) { logFatal('request-outer', e); try { send(res, 500, { error: 'Erreur serveur.' }); } catch {} }
}).listen(PORT, () => {
  // Filet de sécurité : garantit que toutes les collections existent (même si store.js est plus ancien).
  try {
    const d = db();
    ['materiel', 'devis', 'evenements', 'reparations', 'ventes', 'prets', 'users', 'achats', 'partenaires', 'wip', 'projets', 'absences', 'idees', 'articles', 'medias'].forEach(k => { if (!Array.isArray(d[k])) d[k] = []; });
    if (!Array.isArray(d.logins)) d.logins = [];
    if (!d.presence || typeof d.presence !== 'object') d.presence = {};
    if (!Array.isArray(d.activity)) d.activity = [];
    // Nettoyage : prénoms/noms parasites « undefined »/« null » stockés par d'anciens imports.
    (d.users || []).forEach(u => { if (u.prenom === 'undefined' || u.prenom === 'null') u.prenom = ''; if (u.nom === 'undefined' || u.nom === 'null') u.nom = ''; });
    // Rôle « Membre asso actif » (ajouté une fois ; ensuite l'admin le gère dans Groupes & permissions).
    if (d.settings && !d.settings._membre_role_v1) {
      if (!Array.isArray(d.settings.roles) || !d.settings.roles.length) d.settings.roles = DEFAULT_ROLES.map(r => ({ ...r }));
      if (!d.settings.roles.some(r => r.key === 'membre')) d.settings.roles.push({ key: 'membre', label: 'Membre asso actif', niveau: 'lecture' });
      d.settings._membre_role_v1 = true;
    }
    save();
  } catch (e) { logFatal('ensureCollections', e); }
  try { fs.mkdirSync(MEDIA_DIR, { recursive: true }); } catch (e) { logFatal('mediaDir', e); }
  try { migratePartners(); } catch (e) { logFatal('migratePartners', e); }
  try { ensureAdmin(); } catch (e) { logFatal('ensureAdmin', e); }
  try { ensureGuest(); } catch (e) { logFatal('ensureGuest', e); }
  console.log(`\n  West Coast Arcades — Gestion démarré → http://localhost:${PORT}\n`);
});
