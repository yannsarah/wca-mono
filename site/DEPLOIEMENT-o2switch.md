# Déploiement du site WCA sur o2switch (Git via cPanel)

Ce guide met le site en ligne sur ton hébergement o2switch et permet de publier les mises à jour
en quelques commandes. Le site est déjà préparé pour ça.

---

## Ce qui est déjà prêt (fait pour toi)

- Un dépôt **Git** est initialisé dans ce dossier (branche `main`).
- `.cpanel.yml` : indique à cPanel comment déployer (copie les pages vers `public_html`, et l'accueil devient `index.html`).
- `.gitignore` : protège les fichiers sensibles (clés, export WordPress, fichiers macOS).
- Une **clé SSH de déploiement** dédiée a été générée dans `.deploy/` (la privée reste chez toi, ne la partage jamais).

**Ta clé SSH publique** (à coller dans cPanel à l'étape 1) :

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIP5UirdLaWEQIpNGUKoVla1o0HRmjtuXma/1WRZvDlTS deploy-wca-o2switch
```

---

## Étape 0 — Finaliser le commit (sur ton Mac)

Ouvre le **Terminal**, place-toi dans le dossier du site puis valide la dernière version :

```bash
cd "/Volumes/Extreme SSD/PRO - TRAVAIL/____ REFONTE DU SITE WCA/REFONTE SITE/REFONTE SITE WCA"
rm -f .git/index.lock        # au cas où un verrou traîne (sans risque)
git add -A
git commit -m "Site WCA — version à publier"
```

> Astuce : si Git dit « Another git process seems to be running » → c'est le verrou, la 1ʳᵉ ligne `rm -f .git/index.lock` le règle.

---

## Étape 1 — Autoriser la clé SSH dans cPanel

1. Connecte-toi à **cPanel** (o2switch).
2. Section **Sécurité → Accès SSH** (SSH Access) → **Gérer les clés SSH**.
3. **Importer une clé** : colle la clé publique ci-dessus dans le champ « Clé publique », laisse la clé privée vide, valide.
4. Reviens à la liste des clés → à côté de la clé importée, clique **Gérer → Autoriser** (Authorize).

---

## Étape 2 — Créer le dépôt sur le serveur

1. Dans cPanel : **Fichiers → Git™ Version Control**.
2. Clique **Créer**.
3. Laisse **Clone URL** *vide* (on pousse depuis ton Mac).
4. **Repository Path** : `repositories/wca-site`
5. **Repository Name** : `wca-site`
6. Clique **Créer**.
7. Une fois créé, ouvre **Gérer** : note l'**URL de clone** affichée (de la forme
   `ssh://TONUSER@TONSERVEUR.o2switch.net/home/TONUSER/repositories/wca-site`).

---

## Étape 3 — Relier ton dossier local au serveur et pousser

Dans le Terminal (toujours dans le dossier du site) :

```bash
git remote add o2 "COLLE_ICI_L_URL_DE_CLONE_CPANEL"
git push o2 main
```

> La clé SSH est déjà configurée pour ce dépôt (`core.sshCommand`), donc le push utilise
> automatiquement `.deploy/o2switch_deploy`. À la 1ʳᵉ connexion, réponds `yes` si on te demande de
> confirmer l'empreinte du serveur.
>
> Si cPanel attend la branche `master` plutôt que `main`, fais : `git push o2 main:master`.

---

## Étape 4 — Déployer vers le site public

1. Retourne dans cPanel → **Git™ Version Control** → dépôt `wca-site` → **Gérer**.
2. Onglet **Pull or Deploy** :
   - clique **Update from Remote** (récupère ton dernier push) ;
   - puis **Deploy HEAD Commit**.
3. cPanel exécute `.cpanel.yml` : tes pages sont copiées dans `public_html`, et l'accueil devient
   la page d'accueil du domaine.

➡️ Ton site est en ligne sur **https://www.westcoastarcades.fr** (accueil = `index.html`).

---

## Pour chaque mise à jour ensuite

```bash
# après avoir modifié des fichiers
git add -A
git commit -m "Décris ta modif"
git push o2 main
```

Puis dans cPanel → Git Version Control → `wca-site` → **Pull or Deploy → Deploy HEAD Commit**.
(C'est le seul clic à faire à chaque update.)

---

## Bon à savoir

- **Images** : pour l'instant les photos s'affichent depuis ta médiathèque WordPress existante
  (même domaine → ça fonctionne). Quand tu voudras, on rapatriera les images en local dans le dépôt
  pour être 100 % indépendant de l'ancien WordPress.
- **Cohabitation avec le WordPress actuel** : déployer écrase `index.html` mais ne touche pas à ton
  installation WordPress tant qu'elle répond. Avant de basculer définitivement, on planifiera la
  bascule proprement (sauvegarde + redirections).
- **Sécurité** : ne mets jamais le contenu de `.deploy/` (clé privée) en ligne ni sur un dépôt public.
  Le `.gitignore` l'exclut déjà.

---

## Dépannage rapide

| Problème | Solution |
|---|---|
| « Another git process… index.lock » | `rm -f .git/index.lock` puis recommence |
| « Permission denied (publickey) » | Vérifie que la clé est **Autorisée** dans cPanel (étape 1.4) |
| cPanel refuse la branche | `git push o2 main:master` |
| Page blanche / 403 | Vérifie que `index.html` est bien dans `public_html` après le déploiement |
