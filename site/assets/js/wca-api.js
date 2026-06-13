/* =====================================================================
   West Coast Arcades — pont site ↔ app de gestion (lecture seule)
   Lit les données publiées par gestion.westcoastarcades.fr (API publique).
   ===================================================================== */
(function (w) {
  const API_BASE = 'https://gestion.westcoastarcades.fr/api/public';

  async function getJSON(route) {
    const r = await fetch(API_BASE + '/' + route, { headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }

  const MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const MOIS_AB = ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'];

  function parseISO(s) { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ''); return m ? { y:+m[1], mo:+m[2], d:+m[3] } : null; }

  // "7–8 mars 2026", "26 sept. 2026", "29 mai – 1 juin 2026"
  function dateRange(deb, fin) {
    const a = parseISO(deb), b = parseISO(fin);
    if (!a) return '';
    if (!b || (a.y===b.y && a.mo===b.mo && a.d===b.d)) return `${a.d} ${MOIS[a.mo-1]} ${a.y}`;
    if (a.mo===b.mo && a.y===b.y) return `${a.d}–${b.d} ${MOIS[a.mo-1]} ${a.y}`;
    if (a.y===b.y) return `${a.d} ${MOIS[a.mo-1]} – ${b.d} ${MOIS[b.mo-1]} ${a.y}`;
    return `${a.d} ${MOIS[a.mo-1]} ${a.y} – ${b.d} ${MOIS[b.mo-1]} ${b.y}`;
  }
  function dayMonth(deb) { const a = parseISO(deb); return a ? { jour: String(a.d).padStart(2,'0'), mois: MOIS_AB[a.mo-1] } : { jour:'', mois:'' }; }

  function esc(s) { return String(s==null?'':s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  w.WCA = { API_BASE, getJSON, dateRange, dayMonth, esc };
})(window);
