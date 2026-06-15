// =====================================================================
//  West Coast Arcades — API PUBLIQUE (lecture seule) pour le site web
//  À placer dans le projet GESTION : west-coast/MODULES/public-api.js
//
//  Rôle : exposer, SANS authentification et en CORS, uniquement les données
//  destinées au site public (westcoastarcades.fr) — événements, projets,
//  WIP, partenaires, machines — filtrées et nettoyées des champs internes.
//
//  Intégration (1 ligne) dans west-coast/server.js :
//    en haut du fichier, avec les autres imports :
//        import { handlePublic } from './MODULES/public-api.js';
//    dans http.createServer((req,res)=>{ ... }), JUSTE APRÈS la ligne
//        const pathname = url.pathname;
//    ajouter :
//        if (pathname.startsWith('/api/public/')) return handlePublic(req, res, pathname, url.searchParams);
//
//  Aucune écriture en base : ce module ne fait que LIRE (db()).
// =====================================================================
import { db } from '../store.js';

// --- Origines autorisées à lire l'API depuis le navigateur (CORS) ---
const ALLOW_ORIGINS = [
  'https://www.westcoastarcades.fr',
  'https://westcoastarcades.fr',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://127.0.0.1:5500', // Live Server (dev)
];

function cors(req, res) {
  const origin = req.headers.origin || '';
  const allow = ALLOW_ORIGINS.includes(origin) ? origin : ALLOW_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=120'); // cache léger 2 min
}

function sendJSON(res, code, data) {
  const body = JSON.stringify(data);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

const today = () => new Date().toISOString().slice(0, 10);
// "visible par défaut" : visible sauf si explicitement mis à false
const shown = (x) => x && x.visible_site !== false && !x.archive;
// "opt-in" : visible seulement si explicitement true (pour données sensibles)
const optIn = (x) => x && x.visible_site === true && !x.archive;
// Partenaires participants (liés à un projet ou un article), nettoyés pour l'affichage public.
function partnersOf(d, ids) {
  if (!Array.isArray(ids) || !ids.length) return [];
  return ids.map(Number)
    .map(id => (d.partenaires || []).find(p => p.id === id))
    .filter(Boolean)
    .map(p => ({ id: p.id, nom: p.nom, logo: p.logo || '', site_internet: p.site_internet || '' }));
}

// ---------------------------------------------------------------------
// Point d'entrée : renvoie true si la requête a été traitée.
export function handlePublic(req, res, pathname, searchParams) {
  cors(req, res);
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return true; }
  if (req.method !== 'GET') { sendJSON(res, 405, { error: 'Méthode non autorisée' }); return true; }

  const d = db();

  // ----- Événements (à venir, publiés) -----
  if (pathname === '/api/public/evenements') {
    const list = (d.evenements || [])
      .filter(e => shown(e) && (!e.date_fin || e.date_fin >= today() || (e.date_debut && e.date_debut >= today())))
      .sort((a, b) => (a.date_debut || '').localeCompare(b.date_debut || ''))
      .map(e => ({
        id: e.id, nom: e.nom, lieu: e.lieu || '',
        date_debut: e.date_debut || '', date_fin: e.date_fin || '',
        affiche: e.affiche || e.photo || '',
      }));
    return sendJSON(res, 200, list), true;
  }

  // ----- Projets (publiés) -----
  if (pathname === '/api/public/projets') {
    const list = (d.projets || [])
      .filter(shown)
      .sort((a, b) => (b.date_debut || '').localeCompare(a.date_debut || ''))
      .map(p => ({
        id: p.id, nom: p.nom, description: p.description || '',
        photo: p.photo || '', date_debut: p.date_debut || '',
        partenaires: partnersOf(d, p.partenaires_ids),
      }));
    return sendJSON(res, 200, list), true;
  }

  // ----- WIP (publiés) — champs minimaux, pas d'infos internes -----
  if (pathname === '/api/public/wip') {
    const list = (d.wip || [])
      .filter(shown)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .map(w => ({ id: w.id, code: w.code, date: w.date || '', lieu: w.lieu || '', statut: w.statut || '' }));
    return sendJSON(res, 200, list), true;
  }

  // ----- Partenaires (respecte le réglage global + visibilité par fiche) -----
  if (pathname === '/api/public/partenaires') {
    if (d.settings && d.settings.partenaires_visible === false) return sendJSON(res, 200, []), true;
    const list = (d.partenaires || [])
      .filter(p => p && p.visible_site !== false)
      .sort((a, b) => (a.ordre || 0) - (b.ordre || 0) || (a.nom || '').localeCompare(b.nom || ''))
      .map(p => ({
        id: p.id, nom: p.nom, logo: p.logo || '', ordre: p.ordre || 0,
        site_internet: p.site_internet || '',
        email: p.email || '',
        telephone: p.telephone_visible ? (p.telephone || '') : '',
      }));
    return sendJSON(res, 200, list), true;
  }

  // ----- Machines (OPT-IN strict : seulement materiel.visible_site === true) -----
  // Champs internes (valeur, n° série, emplacement, notes) JAMAIS exposés.
  if (pathname === '/api/public/machines') {
    const mp = (d.settings && d.settings.site && d.settings.site.machines_page) || {};
    const order = Array.isArray(mp.order) ? mp.order : [];
    const rank = id => { const i = order.indexOf(id); return i < 0 ? 9999 : i; };
    const list = (d.materiel || [])
      .filter(optIn)
      .sort((a, b) => rank(a.id) - rank(b.id) || (a.denomination || '').localeCompare(b.denomination || ''))
      .map(m => ({
        id: m.id, denomination: m.denomination, categorie: m.categorie || '',
        photo: m.photo || '', fonctionnel: !!m.fonctionnel,
        titre: m.titre_site || m.denomination || '',
        sous_titre: m.sous_titre_site || '',
        description: m.description_site || '',
        sens: m.sens_site || 'auto', // 'auto' | 'image-texte' | 'texte-image'
      }));
    return sendJSON(res, 200, list), true;
  }

  // ----- Matériel à vendre (opt-in : materiel.a_vendre === true) -----
  if (pathname === '/api/public/a-vendre') {
    const list = (d.materiel || [])
      .filter(m => m && m.a_vendre === true)
      .map(m => ({ id: m.id, denomination: m.denomination, categorie: m.categorie || '', photo: m.photo || '', prix: m.prix_vente || '' }));
    return sendJSON(res, 200, list), true;
  }

  // ----- Articles / Blog (publiés) -----
  if (pathname === '/api/public/articles') {
    const list = (d.articles || [])
      .filter(shown)
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .map(a => ({
        id: a.id, slug: a.slug || String(a.id), titre: a.titre || '',
        date: a.date || '', extrait: a.extrait || '', image: a.image || '',
        categorie: a.categorie || '',
      }));
    return sendJSON(res, 200, list), true;
  }
  // ----- Un article précis (par id ou slug) : ?id=12 ou ?slug=mon-article -----
  if (pathname === '/api/public/article') {
    const id = searchParams.get('id'), slug = searchParams.get('slug');
    const a = (d.articles || []).find(x => shown(x) && ((id && +x.id === +id) || (slug && x.slug === slug)));
    if (!a) return sendJSON(res, 404, { error: 'Article introuvable' }), true;
    return sendJSON(res, 200, {
      id: a.id, slug: a.slug || String(a.id), titre: a.titre || '', date: a.date || '',
      extrait: a.extrait || '', image: a.image || '', contenu: a.contenu || '', auteur: a.auteur || '',
      categorie: a.categorie || '', banniere: a.banniere || '',
      partenaires: partnersOf(d, a.partenaires_ids),
    }), true;
  }

  // ----- Page « Nos salons » (titre, description, timeline) -----
  if (pathname === '/api/public/salons') {
    const sp = (d.settings && d.settings.site && d.settings.site.salons_page) || {};
    const items = (Array.isArray(sp.items) ? sp.items : [])
      .filter(it => it && it.actif !== false)
      .sort((a, b) => (a.ordre || 0) - (b.ordre || 0))
      .map(it => {
        const tk = it.ticketing || {};
        return {
          id: it.id, annee: it.annee || '', titre: it.titre || '', sous_titre: it.sous_titre || '',
          image: it.image || '', popup_html: it.popup_html || '', event_id: it.event_id || null,
          template_color: it.template_color || '', as_page: it.as_page !== false,
          date_debut: it.date_debut || '', heure_debut: it.heure_debut || '', date_fin: it.date_fin || '', heure_fin: it.heure_fin || '',
          ticketing: tk.enabled ? { enabled: true, label: tk.label || 'Réserver', url: tk.url || '', intro: tk.intro || '', status: tk.status || 'ouverte' } : null,
        };
      });
    return sendJSON(res, 200, { title: sp.title || '', description: sp.description || '', items }), true;
  }

  // ----- Contenu de la page d'accueil (hero, photos asso, équipe) -----
  if (pathname === '/api/public/home') {
    const s = (d.settings && d.settings.site) || {};
    return sendJSON(res, 200, {
      hero: s.hero || null,
      photos: Array.isArray(s.photos) ? s.photos : [],
      equipe: Array.isArray(s.equipe) ? s.equipe : [],
      blog: s.blog || null,
      blog_hero: s.blog_hero || '',
      icon_links: Array.isArray(s.icon_links) ? s.icon_links : (s.icon_links && Array.isArray(s.icon_links.items) ? s.icon_links.items : []),
      contact_home: s.contact_home || null,
      machines_page: s.machines_page || null,
      contact_page: s.contact_page || null,
    }), true;
  }

  // ----- Index des routes publiques -----
  if (pathname === '/api/public' || pathname === '/api/public/') {
    return sendJSON(res, 200, {
      routes: ['/api/public/evenements', '/api/public/projets', '/api/public/wip', '/api/public/partenaires', '/api/public/machines', '/api/public/articles', '/api/public/article?id=', '/api/public/home'],
    }), true;
  }

  sendJSON(res, 404, { error: 'Route publique inconnue' });
  return true;
}
