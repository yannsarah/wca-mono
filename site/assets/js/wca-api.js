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

  // --- Bibliothèque d'icônes (identique à la gestion) ---
  const ICONLIB = {
    gamepad:'<rect x="2" y="7" width="20" height="11" rx="3"/><circle cx="8" cy="12.5" r="1.4" fill="currentColor"/><path d="M16 11v3M14.5 12.5h3"/>',
    joystick:'<circle cx="12" cy="6" r="3"/><path d="M12 9v6"/><rect x="5" y="15" width="14" height="5" rx="2"/>',
    calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    pencil:'<path d="M14 7l3 3-8 8-3 1 1-3 7-9z"/><path d="M13 8l3 3"/>',
    video:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor"/>',
    cart:'<circle cx="9" cy="20" r="1.4" fill="currentColor"/><circle cx="17" cy="20" r="1.4" fill="currentColor"/><path d="M2 3h3l2.4 12h10l2-8H6"/>',
    bag:'<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    tag:'<path d="M3 12l9-9 9 9-9 9z"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor"/>',
    euro:'<circle cx="12" cy="12" r="9"/><path d="M15 8.5a4 4 0 1 0 0 7M7 11h6M7 13.5h5"/>',
    trophy:'<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M10 14h4M9 20h6M12 14v3"/>',
    star:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.8 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    heart:'<path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9z"/>',
    wrench:'<path d="M14.5 6a3.5 3.5 0 0 1 4.6 4.6l-9 9a2 2 0 0 1-2.8-2.8l9-9z"/><path d="M14.5 6l-3 3"/>',
    tools:'<path d="M4 20l6-6M14 4l6 6-3 3-6-6 3-3z"/><circle cx="6.5" cy="17.5" r="1" fill="currentColor"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.7"/>',
    user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>',
    phone:'<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L17 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
    pin:'<path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>',
    home:'<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    link:'<path d="M9 15l6-6"/><path d="M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18A14 14 0 0 1 12 3z"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
    book:'<path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2z"/><path d="M5 18a2 2 0 0 1 2-2h11"/>',
    ticket:'<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M14 6v10"/>',
    music:'<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    camera:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-2h5L16 7"/>',
    image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.8"/><path d="M5 18l5-5 4 3 3-3 3 3"/>',
    gift:'<rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 13h18M12 9v11M8 9a2.5 2.5 0 1 1 4-2 2.5 2.5 0 1 1 4 2"/>',
    chat:'<path d="M4 5h16v11H9l-4 3z"/>',
    search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    cup:'<path d="M5 8h11v5a5 5 0 0 1-10 0z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2M5 20h11"/>',
    facebook:'<path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1z"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    youtube:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
    twitch:'<path d="M4 3h16v11l-4 4h-4l-3 3v-3H4z"/><path d="M11 8v4M15 8v4"/>',
    discord:'<path d="M7 7a14 14 0 0 1 10 0l2 9a14 14 0 0 1-5 2l-1-2a18 18 0 0 1-4 0l-1 2a14 14 0 0 1-5-2z"/><circle cx="9.5" cy="13" r="1" fill="currentColor"/><circle cx="14.5" cy="13" r="1" fill="currentColor"/>'
  };
  function iconHTML(type, name, color) {
    const c = color ? 'color:' + esc(color) : '';
    if (type === 'emoji') return '<span style="font-size:1em;line-height:1;' + c + '">' + esc(name || '⭐') + '</span>';
    if (type === 'material') return '<span class="material-symbols-outlined" style="' + c + '">' + esc(name || 'star') + '</span>';
    const path = ICONLIB[name] || ICONLIB.star;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="' + c + '">' + path + '</svg>';
  }

  w.WCA = { API_BASE, getJSON, dateRange, dayMonth, esc, ICONLIB, iconHTML };
})(window);
