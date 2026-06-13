# Déploiement en un seul `git push` 🚀

Fini le zip, l'upload, le dossier-transformé-en-fichier et le redémarrage manuel.
Une fois la config faite (5 min, une seule fois), déployer = **une commande**.

## Au quotidien (après la config ci-dessous)

Dans le dossier du dépôt :

```bash
git add -A
git commit -m "ce que j'ai changé"
git push o2 master
```

Et c'est tout. o2switch reçoit le code, copie le site dans `westcoastarcades.fr`,
la gestion dans `gestion.westcoastarcades.fr`, et **redémarre Node tout seul**.
`data.json` (tes données réelles) n'est jamais touché.

---

## Configuration (une seule fois)

### 1. Créer un dépôt Git dans cPanel
- cPanel → **Git™ Version Control** → **Créer**.
- **Cloner une URL** : laisse vide (dépôt vide).
- **Chemin du dépôt** : `repositories/wca-mono` (ou le nom que tu veux).
- **Nom** : `wca-mono`. → Créer.
- Note l'**URL de clone SSH** affichée (du type
  `ssh://gaya9996@gaya9996.odns.fr/home/gaya9996/repositories/wca-mono`).

### 2. Brancher le dépôt local dessus (une seule fois)
Dans le dossier `West Coast Gestion` :

```bash
git remote add o2 <URL_DE_CLONE_SSH_copiée>
git push o2 master
```

### 3. Activer le déploiement dans cPanel
- Retour dans **Git Version Control** → ton dépôt `wca-mono` → onglet **Pull or Deploy** → **Update from Remote** puis **Deploy HEAD Commit**.
- (Les fois suivantes, le déploiement se lance automatiquement à chaque `git push`.)

### Vérifier le chemin de la gestion
Le fichier `.cpanel.yml` suppose que le sous-domaine gestion est dans
`$HOME/gestion.westcoastarcades.fr`. Si ce n'est pas le cas (cPanel → Domaines →
Sous-domaines indique le « Document Root »), modifie la ligne `export GESTPATH=...`
dans `.cpanel.yml`.

> Astuce : la clé SSH `o2switch_deploy` que tu utilisais déjà pour le site fonctionne
> pour ce dépôt aussi (c'est le même serveur).
