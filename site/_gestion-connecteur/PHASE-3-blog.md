# Phase 3 — Module Blog / Articles (projet GESTION)

Ajoute la gestion d'**articles de blog** dans l'app gestion : stockage + API CRUD (admin) + lecture publique
pour le site. Testé contre `store.js`.

3 fichiers à toucher dans le projet gestion : `store.js`, `server.js`, et copier `MODULES/public-api.js`
(version mise à jour, contient déjà `/api/public/articles`). + une page d'admin `public/blog-admin.html`.

---

## 1. `store.js` — ajouter la collection `articles`
Trouve la ligne `const ALL = [...]` et ajoute `'articles'` à la fin :
```js
// AVANT
const ALL = ['materiel', 'devis', 'evenements', 'reparations', 'ventes', 'prets', 'users', 'achats', 'partenaires', 'wip', 'projets', 'absences', 'idees'];
// APRÈS
const ALL = ['materiel', 'devis', 'evenements', 'reparations', 'ventes', 'prets', 'users', 'achats', 'partenaires', 'wip', 'projets', 'absences', 'idees', 'articles'];
```

## 2. `server.js` — routes CRUD articles (réservées admin)
Colle ce bloc parmi les autres routes (par ex. juste après le bloc PROJETS) :
```js
/* =============================== ARTICLES (blog) =============================== */
function slugify(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);}
const ARTF = ['titre','extrait','contenu','image','date','auteur','visible_site','slug'];
add('GET', '/api/articles', (req,res) => { send(res,200,[...(db().articles||[])].sort((a,b)=>(b.date||'').localeCompare(a.date||''))); });
add('GET', '/api/articles/:id', (req,res,p) => { const r=(db().articles||[]).find(x=>x.id===+p.id); r?send(res,200,r):send(res,404,{error:'Article introuvable.'}); });
add('POST', '/api/articles', (req,res,p,body,query,user) => {
  if(!requireAdmin(user,res)) return;
  if(!body.titre) return send(res,400,{error:'Le titre est obligatoire.'});
  if(!db().articles) db().articles=[];
  const row={ id:nextId('articles'), date: body.date||new Date().toISOString().slice(0,10), auteur: body.auteur||(user?user.login:''), visible_site: body.visible_site!==false };
  ARTF.forEach(f=>{ if(body[f]!==undefined) row[f]=body[f]; });
  row.slug = slugify(body.slug||body.titre);
  db().articles.push(row); save(); send(res,200,row);
});
add('PUT', '/api/articles/:id', (req,res,p,body,query,user) => {
  if(!requireAdmin(user,res)) return;
  const row=(db().articles||[]).find(x=>x.id===+p.id);
  if(!row) return send(res,404,{error:'Article introuvable.'});
  ARTF.forEach(f=>{ if(body[f]!==undefined) row[f]=body[f]; });
  if(body.slug!==undefined||body.titre!==undefined) row.slug=slugify(body.slug||body.titre||row.titre);
  save(); send(res,200,row);
});
add('DELETE', '/api/articles/:id', (req,res,p,body,query,user) => {
  if(!requireAdmin(user,res)) return;
  const d=db(); d.articles=(d.articles||[]).filter(x=>x.id!==+p.id); save(); send(res,200,{ok:true});
});
```
> ⚠️ Si le copier-coller abîme la regex des accents dans `slugify`, remplace-la par la forme sûre :
> `.replace(/[̀-ͯ]/g, '')`
>
> Ces routes sont protégées : seul un **admin** peut créer/modifier/supprimer (via `requireAdmin`, déjà présent).
> La lecture publique pour le site passe par `/api/public/articles` (déjà dans `public-api.js`).

## 3. `MODULES/public-api.js`
Remplace ton fichier par la **nouvelle version** fournie (elle ajoute `/api/public/articles` et `/api/public/article?id=` ou `?slug=`). Aucune autre modif nécessaire.

## 4. (Optionnel) `MODULES/modules.json` — activer/désactiver le module
Ajoute dans le tableau `modules` :
```json
{ "key": "articles", "label": "Blog / Actualités", "desc": "Articles publiés sur le site public", "nav": [], "default": true }
```

## 5. Page d'admin du blog
Copie `blog-admin.html` (fourni) dans `west-coast/public/blog-admin.html`.
Tu y accèdes (connecté en admin) via `https://gestion.westcoastarcades.fr/blog-admin.html` :
création / édition / suppression d'articles (titre, date, image, extrait, contenu, « publié sur le site »).

> Plus tard (Phase 3b) on pourra intégrer un onglet « Blog » directement dans le menu de l'app si tu veux.

## 6. Tester
- Ouvre `blog-admin.html`, crée un article « publié ».
- Vérifie : `https://gestion.westcoastarcades.fr/api/public/articles` le liste.
- Côté site (déployé), la page **Blog** affichera automatiquement les articles publiés.
