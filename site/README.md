# site/ — Site public & affichage

Ce dossier est **réservé au site public / à l'affichage**, actuellement dans
l'autre projet Claude.

## Pour le rapatrier ici (à faire une fois)

Copie le contenu de l'autre projet dans ce dossier `site/`. Tu peux :

- soit glisser les fichiers de l'autre projet dans ce dossier depuis le Finder,
- soit me demander : « rapatrie le site depuis l'autre projet » une fois que
  tu as connecté ce dossier-là, et je m'en occupe.

Une fois le site ici, les deux interfaces partagent le même dépôt Git : plus
aucune copie manuelle de `.js`, et mes modifications dans `gestion/` ne
peuvent plus écraser tes modifications dans `site/`.

## Données partagées

Si le site doit afficher des données de la gestion (bornes dispo, prix, etc.),
il les lira via le **code commun de `partage/`** — pas en dupliquant la logique.
