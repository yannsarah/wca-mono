# West Coast Arcades — Dépôt unique

Tout le code du projet vit ici, dans **un seul dépôt Git**, compartimenté en
dossiers indépendants. Fini les copies de dossiers (`V3.2`, `V3.3`…) et les
allers-retours manuels de fichiers `.js` entre projets.

## Structure

```
West Coast Gestion/
├── gestion/    → Le back-office (serveur Node + interface d'admin)
│                 Inventaire, devis, événements, réparations, ventes, prêts.
├── site/       → Le site public / l'affichage (à rapatrier depuis l'autre projet)
├── partage/    → Code COMMUN aux deux : modèles de données, client API,
│                 contrat d'API. À importer des deux côtés au lieu de copier.
└── _ARCHIVE/   → Toutes les anciennes versions (filet de sécurité, hors Git)
```

## Règle d'or pour ne plus rien casser

1. **Une seule version vivante.** On ne duplique plus de dossier. L'historique
   est dans Git.
2. **Chaque compartiment est isolé.** Modifier `gestion/` ne touche jamais
   `site/`, et inversement.
3. **Le code partagé vit dans `partage/`.** Si les deux interfaces ont besoin du
   même bout de code, il va là — on ne le copie pas.
4. **Avant de valider, on regarde le diff** (`git diff`) et on peut toujours
   revenir en arrière (`git revert` / `git checkout`).

## Commandes Git utiles

```bash
git status            # ce qui a changé
git diff              # le détail des changements
git add -A && git commit -m "message"   # enregistrer un point de sauvegarde
git log --oneline     # l'historique des versions
git revert <hash>     # annuler proprement un commit qui a cassé un truc
```

## Lancer la gestion

```bash
cd gestion
node server.js        # puis ouvrir http://localhost:3000 (voir server.js)
```
