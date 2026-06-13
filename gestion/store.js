// Stockage West Coast Arcades — base JSON unique, sans dépendance.
// Collections métier : matériel (inventaire), devis, événements, réparations,
// ventes, prêts, et utilisateurs (techniciens + admins).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = process.env.DATA_FILE || path.join(__dirname, 'data.json');

// Toutes les collections gérées par l'application.
const ALL = ['materiel', 'devis', 'evenements', 'reparations', 'ventes', 'prets', 'users', 'achats', 'partenaires', 'wip', 'projets', 'absences', 'idees', 'articles'];

let data = { seq: {}, settings: {} };
for (const k of ALL) { data[k] = []; data.seq[k] = 0; }
// Suivi d'activité (non métier) : connexions, présence, contributions.
data.logins = [];      // [{ ts, user_id, login }]
data.presence = {};    // { [user_id]: last_seen_iso }
data.activity = [];    // [{ ts, user_id, login, action, entity }]

function readJSON(f) {
  try { return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null; }
  catch (e) { console.error('Lecture', f, 'impossible :', e.message); return null; }
}

export function load() {
  const d = readJSON(FILE);
  if (d) Object.assign(data, d);
  for (const k of ALL) if (!Array.isArray(data[k])) data[k] = [];
  if (!data.seq || typeof data.seq !== 'object') data.seq = {};
  for (const k of ALL) if (typeof data.seq[k] !== 'number') data.seq[k] = 0;
  if (!data.settings || typeof data.settings !== 'object') data.settings = {};
  if (!Array.isArray(data.logins)) data.logins = [];
  if (!data.presence || typeof data.presence !== 'object') data.presence = {};
  if (!Array.isArray(data.activity)) data.activity = [];
}

export function save() {
  try {
    fs.writeFileSync(FILE, JSON.stringify(data));
  } catch (e) {
    console.error('Écriture de la base impossible :', e.message);
    try { fs.appendFileSync(path.join(__dirname, 'wca-error.log'), `[${new Date().toISOString()}] save: ${e.stack || e}\n`); } catch {}
  }
}

export function nextId(type) { data.seq[type] = (data.seq[type] || 0) + 1; return data.seq[type]; }
export function db() { return data; }

export function setData(d) {
  data = { seq: {}, settings: (d && typeof d.settings === 'object') ? d.settings : {} };
  for (const k of ALL) data[k] = Array.isArray(d[k]) ? d[k] : [];
  data.seq = {};
  for (const k of ALL) data.seq[k] = (d.seq && d.seq[k]) || data[k].reduce((mx, x) => Math.max(mx, x.id || 0), 0);
  data.logins = Array.isArray(d.logins) ? d.logins : [];
  data.presence = (d.presence && typeof d.presence === 'object') ? d.presence : {};
  data.activity = Array.isArray(d.activity) ? d.activity : [];
  save();
}

load();
