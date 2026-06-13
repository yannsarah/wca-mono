# Connecteur site ↔ gestion — Phase 1 : API publique (lecture seule)

Ces fichiers s'installent dans le projet **CLAUDE WEST COAST GESTION** (l'app Node), pas dans le site.
Testé et fonctionnel contre `store.js` + données de démo.

## 1. Déposer le module
Copie `public-api.js` dans :
```
west-coast/MODULES/public-api.js
```

## 2. Brancher en 2 lignes dans `west-coast/server.js`

**a)** En haut du fichier, avec les autres `import` :
```js
import { handlePublic } from './MODULES/public-api.js';
```

**b)** Dans `http.createServer((req, res) => { … })`, **juste après** la ligne :
```js
const pathname = url.pathname;
```
ajoute :
```js
if (pathname.startsWith('/api/public/')) return handlePublic(req, res, pathname, url.searchParams);
```
> Important : cette ligne doit être **avant** le bloc d'authentification, pour que les routes publiques restent accessibles sans connexion.

## 3. Redémarrer / déployer l'app gestion
Puis tester (remplace par ton domaine) :
```
https://gestion.westcoastarcades.fr/api/public/evenements
https://gestion.westcoastarcades.fr/api/public/projets
https://gestion.westcoastarcades.fr/api/public/wip
https://gestion.westcoastarcades.fr/api/public/partenaires
https://gestion.westcoastarcades.fr/api/public/machines
```
Chaque route doit renvoyer du JSON.

## 4. Ce qui est exposé (et ce qui ne l'est pas)

| Route | Affiche | Champs renvoyés (sûrs) |
|---|---|---|
| `/api/public/evenements` | événements **à venir**, visibles par défaut | id, nom, lieu, date_debut, date_fin, affiche |
| `/api/public/projets` | projets visibles par défaut | id, nom, description, photo, date_debut |
| `/api/public/wip` | WIP visibles par défaut | id, code, date, lieu, statut |
| `/api/public/partenaires` | si l'encart partenaires est activé | id, nom, logo, ordre |
| `/api/public/machines` | **opt-in strict** (rien par défaut) | id, denomination, categorie, photo, fonctionnel, description |

**Jamais exposés** : prix d'achat, n° de série, emplacement, notes internes, contacts clients, utilisateurs, devis, ventes, prêts.

## 5. Piloter ce qui s'affiche sur le site (drapeau `visible_site`)
- **Événements, projets, WIP, partenaires** : visibles **par défaut**. Pour en **masquer** un, ajoute `visible_site: false` sur la fiche.
- **Machines** : masquées par défaut. Pour en **afficher** une, mets `visible_site: true` (et éventuellement `description_site` pour un texte public). C'est volontaire : l'inventaire reste privé.

> Pour l'instant ces drapeaux se règlent dans la donnée. **Phase 1bis (optionnel)** : j'ajouterai une case à cocher « Visible sur le site » dans l'interface gestion (events / projets / machines) pour que tu pilotes ça en un clic.

## 6. Sécurité
- **Lecture seule** : le module ne fait qu'appeler `db()`, aucune écriture.
- **CORS** restreint aux domaines du site (`westcoastarcades.fr` + localhost dev) — liste modifiable en haut de `public-api.js` (`ALLOW_ORIGINS`).
- Aucune route d'écriture ici : les envois du site (contact, devis, adhésion) feront l'objet d'une **Phase 4** dédiée et sécurisée.

## Étapes suivantes (côté site)
Une fois ces routes en ligne, je branche le site dessus (Phase 2) : l'agenda, les partenaires et les projets se rempliront automatiquement depuis gestion. Puis Phase 3 : ajout d'un module **Articles (blog)** dans gestion + affichage sur le site.
