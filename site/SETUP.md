# Mise en place du site West Coast Arcades

Site statique (HTML/CSS/JS), rapide et sans WordPress. Voici comment le mettre en ligne.

## Contenu du paquet
- Pages racine : `index.html` (accueil) + `nos-machines.html`, `nos-salons.html`, `les-projets.html`,
  `projet-virtua-racing.html`, `projet-virtua-fighter-2.html`, `nos-partenaires.html`, `wip.html`,
  `contact.html`, `agenda.html`, `blog.html`, `rgpd.html`, `politique-de-confidentialite.html`.
- `assets/css/` : `site.css` (styles partagés), `blog.css`.
- `blog/` : les 9 articles + `_template-article.html` + `README.md` (système de blog).
- `img/` : se remplit via le script ci-dessous.
- `migrate-images.sh` : rapatrie les images en local.
- `.cpanel.yml` : déploiement automatique via Git cPanel (voir DEPLOIEMENT-o2switch.md).

## Étape 1 — Rapatrier les images (une seule fois)
Depuis le dossier du site, dans le Terminal :
```bash
bash migrate-images.sh
```
Le script télécharge toutes les images dans `/img` puis réécrit toutes les pages vers ces chemins
locaux. Le site devient alors 100 % autonome (plus aucune dépendance à l'ancien WordPress).

> Astuce : fais une copie du dossier avant, au cas où. Sous Linux, voir la note en bas de `migrate-images.sh`.

## Étape 2 — Vérifier
Ouvre `index.html` dans un navigateur et clique dans le menu : toutes les pages doivent s'afficher
avec les images locales.

## Étape 3 — Mettre en ligne sur o2switch
Deux options :
- **Simple** : copier tout le dossier dans `public_html` via le gestionnaire de fichiers cPanel ou FTP.
- **Git (recommandé)** : suivre `DEPLOIEMENT-o2switch.md` (le `.cpanel.yml` est déjà prêt et copie
  les pages, `assets/`, `img/` et `blog/` vers `public_html`).

## À faire plus tard (noté pour la suite)
- Brancher le **formulaire de contact** (envoi mail) — email asso : westcoastarcades.fr@gmail.com.
- **Connecteurs** vers l'application de gestion `gestion.westcoastarcades.fr` (catalogue des bornes,
  disponibilités, agenda).
- Compléter la page **Politique de confidentialité** (placeholders d'origine) avec le contenu de `rgpd.html`.
- Les anciennes maquettes (`maquette-*.html`, `page-*-WCA.html`) ne font pas partie du site final : à supprimer.
