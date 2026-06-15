# Connexion Git → GitHub → o2switch — Notice de passation

*Document pour la nouvelle session Claude Code, afin de reproduire EXACTEMENT le déploiement qui fonctionne sur West Coast Arcades, sans galérer.*

---

## 0) En une phrase

Le port SSH (22) est **bloqué** sur le réseau → on **ne pousse pas en SSH direct** vers o2switch.
On passe par **GitHub en HTTPS** comme relais : `Mac → git push → GitHub (dépôt public) → o2switch tire via cPanel → .cpanel.yml déploie + redémarre Node`.

```
Mac  ──(git push HTTPS)──►  GitHub (dépôt PUBLIC)  ──(cPanel: Update from Remote + Deploy)──►  o2switch
```

---

## 1) Réponses aux 4 questions

**a) Nom du compte GitHub**
`yannsarah` (le dépôt West Coast est `https://github.com/yannsarah/wca-mono`).

**b) Le token (PAT)**
- ⚠️ Le token **n'est pas** écrit ici (un token = un mot de passe). Il faut en **créer un nouveau** pour le nouveau projet, ou réutiliser un token « classic » si tu en as déjà un avec la bonne portée.
- Chemin de création sur GitHub : **Settings → Developer settings → Personal access tokens**.
- **Quel type choisir ?**
  - **Token « classic » avec la permission `repo`** → fonctionne pour **TOUS** tes dépôts (WCA, Navilio, le nouveau…). Pratique si tu veux **un seul** token réutilisable. C'est le plus simple pour ne pas en refaire à chaque projet.
  - **Token « fine-grained »** limité à **un seul dépôt** → plus sûr mais **ne marchera PAS** pour un autre dépôt (il faut en refaire un par projet, ex. un pour Navilio, un pour le nouveau).
- **Recommandation** : pour le nouveau projet, soit créer un **fine-grained** limité à son dépôt (le plus propre), soit utiliser/créer un **classic `repo`** si tu veux un token unique pour tout.

**c) Commandes de push utilisées (West Coast, à adapter)**
```bash
# une seule fois, dans le dossier du projet :
git init                 # si pas déjà un dépôt
git add -A && git commit -m "Base initiale"
git branch -M master     # (West Coast est sur "master"; "main" marche aussi)
git remote add github https://github.com/yannsarah/wca-mono.git

# à chaque mise à jour :
git push github HEAD
```
> Le remote s'appelle **`github`** (et non `origin`). D'où `git push github HEAD`.
> À la **première** authentification, Git demande identifiant + mot de passe : mettre le **token** comme mot de passe. macOS le mémorise ensuite (Trousseau), plus besoin de le retaper.

**d) Le token noté quelque part ?**
- Ne le colle **pas** dans un fichier ni dans un dépôt. S'il a déjà servi en clair, **révoque-le** (GitHub → Developer settings → token → Revoke) et **régénère**-en un.
- La bonne méthode : laisser **Git + Trousseau macOS** le mémoriser (voir §4), ou utiliser un fine-grained par projet.

---

## 2) Côté GitHub (1 fois par projet)

1. Créer un dépôt **PUBLIC** (ex. `nouveauprojet-mono`).
   > On met en **public** parce que cPanel d'o2switch **refuse** un token dans l'URL de clone (« clone URL cannot include a password ») et que la génération de clé SSH cPanel **impose une passphrase**. Un dépôt public se clone **sans aucun secret** côté o2switch.
2. Pousser le code (voir §1c).

---

## 3) Côté o2switch (1 fois par projet)

Infos du compte o2switch utilisé pour West Coast :
- Hôte cPanel : **cola.o2switch.net** (port 2083)
- Utilisateur cPanel : **gaya9996**
- Dossier du dépôt de déploiement : `~/repositories/wca-mono`

Étapes :
1. Créer le **domaine** et/ou **sous-domaine** voulus, et pour la partie gestion (Node), la déclarer en **Application Node.js** (Setup Node.js App) : *Application root* = dossier du sous-domaine, *Startup file* = `server.js`.
2. cPanel → **Git Version Control** → **Create** :
   - *Clone URL* : `https://github.com/yannsarah/<dépôt>.git` (public → pas de token)
   - *Repository Path* : ex. `repositories/<dépôt>-deploy`
3. cPanel lit le fichier **`.cpanel.yml`** à la racine du dépôt (voir §5).

---

## 4) Le cycle de mise à jour (à CHAQUE déploiement)

1. Sur le Mac : `git push github HEAD`
2. cPanel → Git Version Control → **Update from Remote** (récupère le dernier commit depuis GitHub)
3. Puis **Deploy HEAD Commit** (exécute `.cpanel.yml` : copie les fichiers + redémarre Node)

> ⚠️ Les **DEUX** boutons sont nécessaires, dans cet ordre : *Update from Remote* PUIS *Deploy HEAD Commit*. Oublier le premier = on déploie l'ancienne version.

**Mémoriser le token sans le retaper (macOS) :**
```bash
git config --global credential.helper osxkeychain
# au prochain push, saisir identifiant GitHub + token (comme mot de passe) → mémorisé
```

---

## 5) Le fichier `.cpanel.yml` (à la racine du dépôt)

C'est lui qui copie les fichiers vers les bons dossiers et redémarre Node. Modèle West Coast (à adapter : noms de domaine/sous-domaine) :
```yaml
---
deployment:
  tasks:
    # ---- SITE PUBLIC ----
    - export SITEPATH=$HOME/<ton-domaine.fr>
    - /bin/cp -Rf site/. $SITEPATH/      # ou copie fichier par fichier
    - find $SITEPATH -type d -exec chmod 755 {} \;
    - find $SITEPATH -type f -exec chmod 644 {} \;
    # ---- GESTION (Node) ----
    - export GESTPATH=$HOME/<gestion.ton-domaine.fr>
    - /bin/cp -f gestion/server.js $GESTPATH/
    - /bin/cp -f gestion/store.js $GESTPATH/
    - /bin/cp -f gestion/package.json $GESTPATH/
    - /bin/cp -Rf gestion/public $GESTPATH/
    - /bin/cp -Rf gestion/MODULES $GESTPATH/
    - mkdir -p $GESTPATH/tmp
    - touch $GESTPATH/tmp/restart.txt    # redémarre l'app Node (Passenger)
```
> ⚠️ Ne **jamais** copier `data.json` au déploiement (il contient les données réelles + secrets). Il est dans `.gitignore` et vit uniquement sur le serveur.

---

## 6) Pièges déjà rencontrés (pour les éviter)

- **« clone URL cannot include a password »** → ne pas mettre de token dans l'URL de clone cPanel ; mettre le dépôt **public**.
- **Clé SSH cPanel impose une passphrase** → on ne l'utilise pas ; on reste sur le relais GitHub HTTPS.
- **SSH port 22 bloqué** (réseau maison + 4G) → ne pas tenter `git push o2 …` en direct.
- **La nouvelle version ne s'affiche pas** → on a cliqué *Deploy* sans faire *Update from Remote* avant. Refaire les **deux** étapes.
- **Cache navigateur** → penser à incrémenter `?v=` sur `styles.css`/`app.js` dans `public/index.html` à chaque version (déjà automatisé dans le projet West Coast).
- **Plusieurs processus Node (Passenger)** → si des modifs semblent « non prises en compte » 3 fois sur 4, c'est que chaque worker garde sa copie en mémoire ; le projet West Coast resynchronise désormais le fichier à chaque requête (`store.reloadIfChanged`). À reprendre dans le nouveau projet.

---

## 7) Récap des valeurs réelles (West Coast — référence)

| Élément | Valeur |
|---|---|
| Compte GitHub | `yannsarah` |
| Dépôt | `wca-mono` (public) |
| Remote Git | `github` → `https://github.com/yannsarah/wca-mono.git` |
| Branche | `master` |
| Commande de push | `git push github HEAD` |
| Hôte cPanel | `cola.o2switch.net` |
| Utilisateur o2switch | `gaya9996` |
| Déploiement | cPanel Git : *Update from Remote* → *Deploy HEAD Commit* |

> Pour le nouveau projet : nouveau **dépôt** (public), nouveau `.cpanel.yml` avec les **bons domaines**, et un **token** (de préférence créé pour l'occasion). Le reste est identique.
