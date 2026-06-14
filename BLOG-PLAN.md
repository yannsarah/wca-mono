# Plan — Refonte Blog vitrine + Partenaires + Affichage

## Phase A — Partenaires : champs manquants + récupération des données *(rapide)*
- Ajouter à la fiche **Modifier le partenaire** : **Email**, **Téléphone** (+ case « afficher sur le site »), **Site internet**.
- Récupérer l'existant sans tout refaire : aujourd'hui l'email est dans « Adresse » et le téléphone dans « Notes » → migration automatique (Adresse→Email, Notes→Téléphone) en gardant les anciens champs par sécurité.

## Phase B — « Affichage du site » repliable *(rapide)*
- Refondre l'onglet **Affichage du site** : cartes **repliées par défaut** (comme l'onglet « Modules accueil »), qui s'ouvrent au clic avec icône + description. Moins de données affichées d'un coup.

## Phase C — Partenaires liés aux projets / billets
- Sur un **projet** (et/ou billet de blog) affiché sur le site : cocher les **partenaires participants** (piochés dans la base Partenaires).
- Affichage d'un **encart partenaires paysage** en bas de la page concernée sur le site.

## Phase D — Refonte du BLOG vitrine *(le gros morceau, design)*
- Page blog **redesignée** : percutante, originale (expérimentation à partir des modèles fournis, ex. « Hazel »).
- **2 modes d'affichage**, choisis dans l'appli (avec icônes explicites) :
  - **Grille** (grid).
  - **Sidebar** (gauche **ou** droite, au choix).
- **Widgets** gérables dans l'appli (liste à activer/désactiver) :
  - **Encart publicitaire** : image / gif / vidéo YouTube + lien.
  - **Recherche** sur le blog.
  - **Matériel à vendre** : liste de X matériels issus de la rubrique **Ventes** de la gestion.
  - **Filtres horizontaux** en haut de la page des articles.
- **BLOG** ajouté dans le menu du site (en bas).

---
Ordre conseillé : A et B (gains rapides côté gestion) → C → D (le gros chantier blog).
Chaque phase = commits + version (+0.1) + déploiement.
