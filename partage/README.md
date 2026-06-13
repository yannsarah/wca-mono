# partage/ — Code commun

Tout ce qui est utilisé **à la fois** par `gestion/` et par `site/` vit ici, à
un seul endroit. Les deux côtés l'importent ; on ne copie plus jamais un fichier
d'un projet à l'autre.

Exemples de ce qui a sa place ici :

- **Modèles de données** : la forme d'une borne, d'un devis, d'une réparation…
- **Client / contrat d'API** : comment le site interroge les données de la gestion.
- **Constantes & utilitaires partagés** : catégories, statuts, formatage des prix.

> À remplir au fur et à mesure, quand on identifie un bout de code dont les deux
> interfaces ont besoin. Pour l'instant le dossier est vide, c'est normal.
