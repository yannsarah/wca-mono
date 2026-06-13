# Système de blog — West Coast Arcades

Blog statique, rapide et sans WordPress. Chaque article = un fichier HTML dans `/blog`.

## Ajouter un nouvel article

1. **Copier le modèle** : duplique `blog/_template-article.html` et renomme-le, par ex. `blog/mon-nouveau-salon.html` (utilise des tirets, pas d'accents ni d'espaces).
2. **Remplir** dans le fichier copié :
   - la balise `<title>` (onglet du navigateur),
   - la **date** et le **titre** dans `article-hero`,
   - l'**image principale** (`feat`) : place le fichier dans `/img` puis écris `src="../img/ton-image.jpg"`,
   - le **contenu** dans `article-body` (balises utiles : `<p>`, `<h2>`, `<img src="../img/...">`, `<ul><li>`, `<a href="">`).
3. **Référencer l'article sur la page Blog** : ouvre `blog.html` (à la racine) et copie un bloc `<a class="post-card">…</a>` existant, puis change le lien `href="blog/mon-nouveau-salon.html"`, l'image, la date, le titre et le résumé.

C'est tout : pas de base de données, pas de build. Le site reste rapide.

## Fichiers
- `blog.html` (racine) — page liste des articles (cartes).
- `blog/<slug>.html` — un fichier par article.
- `blog/_template-article.html` — modèle à copier.
- `blog/posts.json` — index machine des articles (pratique si tu veux plus tard automatiser la page liste).
- `assets/css/blog.css` — styles du blog (cartes + article).

## Astuce (optionnel, plus tard)
Si tu veux que la page liste se mette à jour automatiquement à partir de `posts.json`, on pourra brancher un petit script — à voir après la migration.
