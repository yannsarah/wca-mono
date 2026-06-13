# Plan — Section « SITE INTERNET » dans la gestion

Objectif : faire de la gestion le **poste de pilotage unique** de tout l'affichage
du site westcoastarcades.fr — blog, visibilité des rubriques, contenu des fiches —
sans jamais toucher au code du site à la main.

## Phase 1 — Fondations données (le socle)
- Ajouter la collection **`articles`** (blog) au modèle (`store.js` → tableau `ALL`).
- Ajouter sur le **matériel** : `visible_site` (publier oui/non) + `description_site` (texte public).
- Vérifier/compléter `visible_site` sur **événements, projets, partenaires** (les routes
  publiques le filtrent déjà ; il faut juste pouvoir le piloter).
- S'assurer que les endpoints d'update persistent ces nouveaux champs.

## Phase 2 — Nouvelle section admin « SITE INTERNET »
- Entrée dans `NAV` + module activable + fonction `renderSiteInternet()`.
- Deux sous-onglets :
  - **Blog** : liste des articles + éditeur complet (titre, slug, date, image,
    extrait, contenu, auteur, publié o/n). **Éditeur visuel (WYSIWYG)** : gras,
    titres, listes, liens, images, sans voir de code. CRUD → alimente
    `/api/public/articles` (route déjà existante et câblée sur `blog.html` + `article.html`).
  - **Affichage du site** : tableau de bord central pour cocher ce qui est publié
    (événements, machines, projets, partenaires) au même endroit.

## Phase 3 — Fiche détaillée au clic (modal)
- Clic sur un **événement** → fenêtre affichant tout son contenu (dates, lieu,
  affiche, description, **matériel de l'asso présent**, etc.).
- Même principe possible pour le matériel.

## Phase 4 — Vérif site & bout-en-bout
- Re-tester blog/article/machines avec le nouveau modèle de données.
- (Hors périmètre code) Déploiement gestion sur `gestion.westcoastarcades.fr`
  pour que tout s'allume en production.

---
Chaque phase = un ou plusieurs commits Git distincts (réversibles). On valide une
phase avant de passer à la suivante.
