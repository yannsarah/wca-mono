# Journal des mises à jour — West Coast Arcades

*Document écrit en langage simple. Les plus récentes sont en haut.*
*Dernière mise à jour : 16 juin 2026.*

---

## Logiciel de gestion (l'interface d'administration)

### Version 2.8.34 — Correction des balises dans les descriptions
**Le problème :** dans les fiches machines, du « code » bizarre (`<div>`, `<br>`) apparaissait au milieu du texte sur le site.
**Ce qui change :** les descriptions s'affichent maintenant proprement, et l'éditeur de texte enregistre un texte net (vrais paragraphes) au lieu de ce code. Vos anciennes fiches s'affichent aussi correctement, sans rien retoucher.

### Version 2.8.33 — Les modifications de salons s'enregistrent toutes seules
Quand vous modifiez, dupliquez, supprimez ou réorganisez un salon, c'est enregistré automatiquement. L'image que vous changez arrive bien sur le site. Une confirmation est demandée avant chaque suppression.

### Version 2.8.32 — Nouveau type de projet : « Restauration »
Dans les Projets, un onglet « Restauration » est ajouté entre « Actifs » et « Archivés ». À la création, vous choisissez « Projet classique » ou « Projet de restauration ». Une restauration permet de noter l'état avant, les travaux, le résultat et une photo « avant ». Le tout est affiché sur le site avec un comparatif avant / après.

### Version 2.8.31 — Le nouveau site peut lire les données de la gestion
Correction d'un blocage technique : le nouveau site (V2) affichait des sections vides. Il récupère désormais bien les machines, salons, etc. depuis la gestion.

### Version 2.8.30 — Carnet d'adresses, cotisations et améliorations du site
Plusieurs nouveautés regroupées : un carnet d'adresses, des cotisations simplifiées, la vidéo d'accueil qui ne clignote plus, la page « Nos salons » (bouton d'ajout en rouge bien visible, tri automatique par date, enregistrement automatique), et la page « Utilisateurs » présentée en blocs que l'on peut replier.

### Version 2.8.28 — Filtres d'inventaire et droits d'accès
L'inventaire a un filtre « Tous / Fonctionnels / Non fonctionnels ». Les droits sont mieux séparés : un technicien n'a plus accès aux devis ni au site ; un nouveau rôle « Webmaster » s'occupe du site.

### Version 2.8.27 — Fin des modifications « perdues »
Correction importante : avant, une modification sur quatre pouvait être ignorée. Le logiciel relit désormais les données à chaque action, donc vos changements sont toujours pris en compte.

### Version 2.8.26 — Petit réglage d'affichage
Espacement amélioré sous l'encart « Prochain WIP » sur la page d'accueil de la gestion.

### Version 2.8.25 — La fenêtre de choix d'image passe devant
Correction : quand vous choisissez une image, sa fenêtre s'affiche bien au-dessus du reste (elle se cachait derrière la fiche salon).

### Version 2.8.24 — Médiathèque
Une médiathèque pour ranger vos images dans des dossiers : créer, renommer, déplacer, supprimer, import par glisser-déposer, et recherche. Les images deviennent réutilisables partout.

---

## Site internet public (la nouvelle version « V2 »)

### Version 1.0.5 — Descriptions propres + clic sur tout
Les descriptions n'affichent plus de balises bizarres. Sur toutes les pages, cliquer sur une machine, un salon, une restauration, un projet, une photo ou un membre de l'équipe ouvre une fenêtre de détail (popup).

### Version 1.0.4 — Fenêtres de détail sur la page d'accueil
Sur l'accueil, tous les éléments deviennent cliquables et s'ouvrent en fenêtre popup, comme sur les autres pages.

### Version 1.0.3 — Package complet et vrai logo
Le site est livré en un seul dossier complet, vrai logo inclus (avant, un joystick s'affichait à la place quand le logo n'était pas envoyé).

### Versions 1.0.0 à 1.0.2 — Le nouveau site
Refonte complète aux couleurs vertes de l'association : logo qui tourne, menu « verre dépoli » façon Apple, grande bannière d'accueil, chiffres clés, section « La fine équipe », et toutes les pages (Machines, Salons, Restauration, Projets, Galerie, Association, Contact). Tout est alimenté automatiquement par la gestion.

---

## Comment lire les numéros de version

- **Gestion :** numéro affiché en bas de l'interface (ex. « 2.8.34 »). Il augmente de 0.0.1 à chaque mise à jour.
- **Site public :** numéro affiché en bas du site (ex. « Site V2 · v1.0.5 »). Même principe.
