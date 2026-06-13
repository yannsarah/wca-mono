# Plan des connecteurs — site ↔ gestion.westcoastarcades.fr

Objectif : relier le site public (`westcoastarcades.fr`) à l'application de gestion
(`gestion.westcoastarcades.fr`, projet « CLAUDE WEST COAST GESTION ») pour que le site
affiche/transmette des données réelles sans double saisie.

> État : **l'API de gestion n'est pas encore prête.** Ce document décrit l'architecture cible et
> ce qu'il faudra exposer côté gestion. À implémenter quand l'API existe.

## 0. DÉCISION D'ARCHITECTURE (validée juin 2026)

**Modèle « headless » : une seule base de données, gérée par l'app GESTION, exposée via une API ; le site ne fait qu'afficher (et écrit le strict minimum via l'API).**

- ✅ Retenu : **base unique** (propriété de gestion) + **API exposée par gestion** ; le site lit via cette API et n'accède **jamais directement** à la base (sécurité + une seule logique de données → pas de double développement).
- ❌ Écarté : **duplication du dossier + sync toutes les 30 min** (données en retard, désync, double stockage, ne gère pas les écritures du site).
- ❌ Écarté : accès direct du site à la base (identifiants exposés, logique dupliquée).
- **Hébergement** : gestion + site sur le même compte o2switch (sous-domaines), **une seule base réelle**. L'API reste joignable même si un jour les serveurs diffèrent.
- **Droits & modules** : des drapeaux en base (`publié_sur_le_site`, `module_visible`, ordre) pilotés depuis gestion décident de ce qui s'affiche sur le site.
- **Écritures du site** (contact, devis, adhésion, newsletter) : via endpoints API sécurisés (principe de `contact.php` + secret partagé).
- **Blog** : géré dans gestion ; le site affiche les articles publiés (remplace le système de fichiers statique actuel).

**Bloquant avant code** : connaître la techno exacte du backend gestion (PHP/Laravel ? Node ? Python ? + MySQL/PostgreSQL ?) et s'il expose déjà des routes. → ouvrir le projet « CLAUDE WEST COAST GESTION » / fournir composer.json|package.json + config DB.

## 1. Modules candidats (par priorité)

| # | Connecteur | Côté site | Source côté gestion | Sens |
|---|-----------|-----------|---------------------|------|
| 1 | **Catalogue + disponibilité des bornes** | page « Nos Machines » : badge Disponible / Réservé / En restauration | module Inventaire (parc de bornes + statut) | lecture |
| 2 | **Agenda des événements** | page « Agenda » + bloc accueil | module Événements | lecture |
| 3 | **Demande de location** | bouton « Louer cette borne » → formulaire | crée un Devis/Demande dans gestion | écriture |
| 4 | **Statut des projets / WIP** | pages Projets | module Projets / WIP | lecture |

## 2. Architecture recommandée

- **Lectures (modules 1, 2, 4)** : la gestion expose une **API REST en lecture seule**, renvoyant du
  **JSON public** (pas de données sensibles). Le site (statique) appelle ces endpoints en JavaScript
  (`fetch`) et affiche le résultat. Mise en cache courte recommandée (CDN/headers) pour la rapidité.
- **Écritures (module 3)** : pour ne pas exposer de clé d'API dans le navigateur, le site passe par un
  **petit proxy PHP** (même principe que `contact.php`) qui relaie la demande à la gestion avec un
  **secret partagé** stocké côté serveur. Anti-spam (honeypot) déjà en place.

```
[Navigateur] --fetch--> [API gestion /api/public/...]        (lecture, JSON public)
[Navigateur] --POST---> [site/relai.php] --clé secrète--> [API gestion /api/locations]   (écriture)
```

## 3. Contrats de données proposés (à valider côté gestion)

Exemple `GET /api/public/machines` :
```json
[
  { "slug":"daytona-usa", "nom":"Daytona USA", "annee":1994, "categorie":"course",
    "statut":"disponible", "photo":"https://.../daytona.jpg", "louable":true }
]
```
Exemple `GET /api/public/events` :
```json
[
  { "titre":"CRAZY FLIP 2026", "debut":"2026-04-04", "fin":"2026-04-05",
    "lieu":"Challans", "affiche":"https://.../crazyflip.jpg", "url":"..." }
]
```
Exemple `POST /api/locations` (via proxy PHP) :
```json
{ "machine":"daytona-usa", "nom":"…", "email":"…", "date_souhaitee":"…", "message":"…" }
```

## 4. À fournir par le projet « gestion » pour brancher

1. **URL de base** de l'API (ex. `https://gestion.westcoastarcades.fr/api`).
2. **Liste des endpoints** + format JSON exact de chaque réponse.
3. **Méthode d'authentification** pour les écritures (clé d'API / token) — à garder côté serveur.
4. **CORS** : autoriser l'origine `https://www.westcoastarcades.fr` sur les endpoints de lecture.
5. (optionnel) **Webhooks** si la gestion doit notifier le site (ex. nouvelle dispo).

## 5. Phasage proposé

- **Phase 1 (lecture)** : afficher les **disponibilités des bornes** et l'**agenda** depuis la gestion.
  Impact visuel immédiat, aucun risque (lecture seule).
- **Phase 2 (écriture)** : **demande de location** depuis le bouton « Louer » → crée une entrée dans la
  gestion (via proxy PHP + secret).
- **Phase 3** : statut projets/WIP, et éventuels webhooks.

## 6. Déjà prêt côté site

- Le site est **statique + PHP** sur o2switch (le proxy d'écriture peut réutiliser le même mécanisme que `contact.php`).
- Les pages « Nos Machines », « Agenda », « Projets » ont une structure prête à recevoir des données dynamiques.
