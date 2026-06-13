# Mettre « West Coast Arcades — Gestion » en ligne sur o2switch

Objectif : accéder à l'interface depuis n'importe où, à une adresse du type
**https://gestion.westcoastarcades.fr**, protégée par identifiant + mot de passe.

⏱️ Compte 20-30 minutes la première fois. Aucune commande compliquée.

---

## Étape 1 — Créer un sous-domaine

Dans le **cPanel** o2switch :

1. Bloc **Domaines** → **Sous-domaines**.
2. Crée le sous-domaine : `gestion` (le domaine `westcoastarcades.fr` est déjà sélectionné).
3. Note le **dossier racine** proposé (souvent `/home/TONCOMPTE/gestion.westcoastarcades.fr`).
4. Valide. (Le HTTPS/SSL gratuit s'active automatiquement en quelques minutes.)

## Étape 2 — Envoyer les fichiers de l'app

1. Compresse le dossier `WestCoast-Gestion` en `.zip` sur ton ordinateur.
2. Bloc **Fichiers** → **Gestionnaire de fichiers**, va dans le dossier racine du sous-domaine.
3. **Téléverser** le zip, puis clic droit → **Extraire**.
4. Vérifie que tu vois bien `server.js`, `store.js`, `seed.js`, `package.json`
   et le dossier `public/` **directement** dans le dossier racine.
   (Si tout est dans un sous-dossier, remonte les fichiers d'un niveau.)

## Étape 3 — Créer l'application Node.js

1. Bloc **Logiciel** → **Setup Node.js App**.
2. **Create Application** :
   - **Node.js version** : **22** (la plus récente).
   - **Application mode** : **Production**.
   - **Application root** : le dossier des fichiers (ex. `gestion.westcoastarcades.fr`).
   - **Application URL** : sélectionne **gestion.westcoastarcades.fr**.
   - **Application startup file** : **`server.js`**.
3. Clique **Create**.

Le mode **Production** active le cookie de session sécurisé (HTTPS).
Aucune variable d'environnement n'est nécessaire.

## Étape 4 — Démarrer

1. Clique **Restart** (ou **Start**).
2. Au premier démarrage, un compte administrateur est créé automatiquement :
   identifiant **`admin`** / mot de passe **`arcade`**.
   - *(Optionnel — démo)* Pour charger des données d'exemple : bouton
     **Run JS script** → **`seed`**. ⚠ cela **écrase** les données existantes.

## Étape 5 — Se connecter

Ouvre **https://gestion.westcoastarcades.fr** : la page de connexion s'affiche.

- Premier accès : **`admin`** / **`arcade`**.
- **Change ce mot de passe immédiatement** (Paramètres → Mon compte).
- Crée les comptes des techniciens (Utilisateurs → Nouvel utilisateur, rôle « Technicien »).

---

## Fonctionnement

- **Inventaire** : chaque matériel a un état **OUI / NON** (vert/rouge) cliquable. Un
  matériel « NON » est automatiquement marqué hors service et indisponible.
- **Devis** : créer un devis (brouillon / envoyé / accepté) **bloque** le matériel
  listé sur sa période. Passer le devis en **Refusé** libère le matériel.
- **Événements** : l'écran « Vérifier la disponibilité » indique, pour une période
  donnée, quel matériel est libre ou occupé (et pourquoi : devis, prêt, réparation, vente).
- **Réparations** : un matériel « à faire » ou « en cours » est bloqué jusqu'à « Terminé ».
- **Ventes** : un matériel vendu sort définitivement du parc disponible.
- **Prêts** : bloquent le matériel sur la période, jusqu'au bouton « Marquer rendu ».

## Sauvegarde

Paramètres → **Télécharger la sauvegarde** (admin) exporte tout dans un fichier `.json`.
Le bouton **Restaurer** réinjecte une sauvegarde. Toutes les données vivent dans
`data.json` à la racine — fais-en une copie régulièrement.

> ⚠️ Lors des **mises à jour** : ré-téléverse uniquement le **code** (`server.js`,
> `store.js`, `public/…`). Ne remplace **jamais** `data.json` sur le serveur, sinon
> tu écrases les données réelles.

## En cas de souci

- **Erreur 503 / au démarrage** : *Setup Node.js App* → vérifie *startup file* =
  `server.js` et *Node version* = 22, puis **Restart**.
- **Les modifications ne s'enregistrent pas** : vérifie que `data.json` est présent
  à la racine et inscriptible (permissions 644).
- **Adresse « non sécurisée »** : attends l'AutoSSL, ou *Sécurité → SSL/TLS Status*
  → **Run AutoSSL**.
