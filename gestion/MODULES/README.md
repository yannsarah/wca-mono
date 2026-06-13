# Modules

Ce dossier contient le **registre des modules** activables de l'application (`modules.json`).

## Activer / désactiver un module
Les administrateurs activent ou désactivent les modules dans **Paramètres → Modules**.
Un module désactivé masque sa page (menu de gauche) et ses fonctions associées.
Les sections de base (Accueil, Inventaire, Utilisateurs, Paramètres) ne sont pas désactivables.

## Ajouter un nouveau module (plus tard)
1. Ajoutez une entrée dans `modules.json` :
   `{ "key": "mon_module", "label": "Mon module", "desc": "…", "nav": ["mon_module"], "default": false }`
2. Développez la fonctionnalité dans `public/app.js` (nav, page de rendu, endpoints serveur si besoin).
3. Liez la page au module via la propriété `mod` de l'élément de navigation.
4. Le module apparaît automatiquement dans Paramètres → Modules (activable).

`key` = identifiant technique · `nav` = ids de menu contrôlés · `default` = activé par défaut · `core:true` = non désactivable.
