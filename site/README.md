# site/ — Site public & affichage West Coast Arcades

Site rapatrié depuis l'ancien projet Claude « REFONTE SITE WCA » le 13 juin 2026.
Il vit désormais dans le **dépôt unique**, à côté de `gestion/`.

## Contenu

- Pages HTML statiques (`index.html`, `nos-machines.html`, `contact.html`, `blog/`…)
- `assets/` (css, js) et `img/` (95 images)
- `_gestion-connecteur/` → le **pont avec la gestion** (`public-api.js`) : c'est par là
  que le site lit les données de la gestion. À terme, à factoriser dans `../partage/`.
- Docs du projet : `MIGRATION_PLAN.md`, `DESIGN_REFERENCE.md`, `CONNECTEURS_PLAN.md`, `SETUP.md`

## Ce qui n'a PAS été copié (resté dans le dossier d'origine sur le SSD)

- `.git/` du site (son ancien historique, 403 Mo) → l'historique repart proprement
  ici, dans le dépôt unique.
- `.deploy/` et les clés SSH o2switch → **secrets, jamais versionnés**. Si tu veux
  déployer depuis ici, recopie-les à la main (ils restent gitignorés).

L'export WordPress (`*.xml`) et les archives (`*.zip`) sont présents sur le disque
mais exclus de Git (ce sont des sources, pas du code à publier).
