# Note de mise à jour — West Coast Arcades Gestion

> Versionnage du **dépôt unique** : on repart à **V1.1**, +0.1 à chaque mise à jour.

**Version 2.8.27 — 15 juin 2026**
## Correctif majeur : modifications parfois « non prises en compte »
- Sur le serveur, plusieurs processus tournaient en parallèle, chacun avec sa copie des données en mémoire : après une modification (WIP, mais aussi inventaire, devis…), une partie des affichages montrait encore l'ancienne version (« 3 fois sur 4 », la modif « disparaissait » à la réouverture).
- Désormais, chaque requête **resynchronise automatiquement** les données avec le fichier : les modifications sont vues immédiatement et de façon fiable.

---

**Version 2.8.26 — 15 juin 2026**
## Accueil : espacement sous l'encart « Prochain WIP »
- Ajout d'un espace sous l'encart du prochain WIP, pour ne plus qu'il soit collé aux compteurs.

---

**Version 2.8.25 — 15 juin 2026**
## Correctif : médiathèque toujours au premier plan
- La médiathèque s'ouvrait **derrière** la fenêtre « Modifier le salon » (et d'autres fenêtres), ce qui bloquait l'écran. Elle s'affiche désormais **au-dessus de toutes les fenêtres**.

---

**Version 2.8.24 — 15 juin 2026**
## Médiathèque : vrai module avec dossiers
- Nouveau module **Médiathèque** dans Administration (entre Module Asso et Menus & modules).
- **Dossiers et sous-dossiers** (ex. Évènements / Games in Cholet 2025 / Photos) : créer, **renommer**, **déplacer** (renommer déplace aussi le contenu), **supprimer** (avec avertissement si le dossier contient des fichiers).
- Navigation par **arborescence** à gauche + **fil d'Ariane**. Pour chaque fichier : **importer** (bouton ou glisser-déposer, plusieurs à la fois), **renommer**, **déplacer**, **copier le lien**, **télécharger**, **supprimer** (avec confirmation), **rechercher**.
- Les images restent réutilisables partout via « Choisir une image ».

---

**Version 2.8.23 — 15 juin 2026**
## Salons : vraie page détail (façon affiche événement)
- Nouvelle **page détail** d'un salon sur le site (sombre, style arcade) : grand visuel en hero, titre, dates, contenu riche, billetterie, et boutons « Retour à nos salons / Voir les autres événements / Nous contacter ».
- Nouveau modèle **« Page événement (sombre) »** prérempli (introduction, cartes infos Date/Lieu/Type/Machines/Public, retour sur l'événement, cartes « ce que nous avons présenté », galerie, citation).
- Nouveaux blocs insérables : **Cartes infos**, **Cartes programme**, **Citation** (en plus de Section, Image+texte, Galerie, Bande, Bouton).
- L'éditeur passe en **thème sombre** pour ce modèle (aperçu fidèle). Choix par salon : **ouvrir une page détail** ou rester en popup.

---

**Version 2.8.22 — 15 juin 2026**
## Fiche salon : 2ᵉ modèle + couleur réglable + blocs
- Nouveau modèle **« Affiche événement »** (grand titre coloré, bande de couleur, programme, galerie…).
- **Couleur réglable à volonté** : un sélecteur de couleur applique l'accent à tout le modèle (titres, bandes, boutons), en direct, sur la fiche et sur le site.
- Boutons **« Insérer un bloc »** pour ajouter, où tu veux dans le contenu : **Section** (titre + texte), **Image + texte**, **Galerie**, **Bande colorée**, **Bouton**.

---

**Version 2.8.21 — 15 juin 2026**
## Fiche salon enrichie (création / modification)
- **Dates précises** : date + heure de début et de fin, avec un bouton **« Générer le sous-titre depuis les dates »** (ex. « Les 22 et 23 novembre 2025 », « Du 3 au 5 octobre 2025 »).
- **Éditeur enrichi** du contenu : titres, sous-titres, gras/italique, listes, **liens** et **images** (médiathèque).
- **Modèle de page** : un modèle « Salon classique » insérable en un clic (hero, infos pratiques, programme, galerie…), plus l'option **« Coller du HTML »**. Tu complètes ensuite librement avec tes propres zones de texte.
- **Dupliquer** un salon (copie en brouillon, masquée).
- **Prévisualiser** la fiche avant de valider.
- **Billetterie préparée** : activable par salon (texte du bouton, lien, intro, statut) — affichée sur le site quand elle est activée. *(Le paiement en ligne viendra plus tard.)*

---

**Version 2.8.20 — 15 juin 2026**
## Nos machines : « Louer cette borne » ouvre le formulaire en popup
- Sur la page **Nos Machines**, le bouton **« Louer cette borne »** ouvre une **popup** avec le **formulaire de contact** (les champs réglés dans Site internet › Contact), joliment mis en page, avec la **borne pré-remplie**.
- La popup ne se ferme qu'avec un **bouton « Fermer » rouge**, à côté du bouton **« Envoyer »**.

---

**Version 2.8.19 — 15 juin 2026**
## Nos salons : reprise automatique de l'ancienne page
- Bouton **« Importer les salons de l'ancienne page »** : reprend en un clic le **titre**, la **description** et les **11 salons** (année, titre, sous-titre, image) de l'ancienne page statique — plus besoin de tout ressaisir.
- **Sans doublon** : on peut relancer l'import sans risque (les salons déjà présents sont conservés, seuls les manquants sont ajoutés ; l'ordre que tu as réglé n'est pas réinitialisé).

---

**Version 2.8.18 — 15 juin 2026**
## Page « Nos salons » dynamique
- Nouvel onglet **Nos salons** dans Site internet (à côté de Nos machines).
- Modifiable : le **titre** et la **description** (texte enrichi) de la page.
- **Frise (timeline)** des salons : ajouter / modifier / supprimer / afficher-masquer / **réordonner au glisser-déposer**. Chaque salon : année, titre, sous-titre, image (médiathèque), contenu de la **popup** (texte enrichi) et lien optionnel vers un événement existant.
- Sur le site, la page **Nos salons** affiche tout ça dans l'ordre choisi, et le bouton ouvre une **popup** (image, date, titre, sous-titre, contenu) — fermable au clic, en dehors ou avec Échap, responsive.

---

**Version 2.8.17 — 15 juin 2026**
## Module Asso : suivi des cotisations plus clair
- Colonne **Cotisation** : badge **✅ À jour / ❌ Non cotisé**, **cliquable** pour basculer le paiement d'un clic (et **case à cocher « à jour »** dans la fiche du membre).
- Badge **Actif / Passif** sur chaque membre (réglable dans sa fiche), en plus du badge Compte/Extérieur.
- **Clic sur la ligne** = ouverture de la fiche du membre.
- Bandeau récap de l'année : **montant**, **période (début → fin)**, **échéance** et nouvelle date de **relance / renouvellement** (à régler dans l'onglet Association).

---

**Version 2.8.16 — 15 juin 2026**
## Module Asso : membres extérieurs + correctifs
- **Correctif « undefined »** : les prénoms parasites affichés dans la liste des membres sont nettoyés (à l'affichage et dans la base).
- Nouveau rôle **« Membre asso actif »** (compte avec accès, droits réglables dans Groupes & permissions).
- Nouveau **membre extérieur** : un cotisant **sans compte de connexion** (juste prénom, nom, adresse, contact et cotisations). Bouton « Membre extérieur » dans l'onglet Membres ; un badge distingue **Compte** et **Extérieur**.

---

**Version 2.8.15 — 14 juin 2026**
## Nouveau « Module Asso » (loi 1901)
Accessible depuis **Administration › Module Asso**, en trois onglets :
- **Association** : identité complète (nom, adresse, téléphone, email, IBAN, président/trésorier/secrétaire, article des statuts…) + **campagnes de cotisation** annuelles (montant fixé par l'AG, période, échéances).
- **Membres & cotisations** : chaque membre (= compte) avec adresse, téléphone, email et l'**historique de ses cotisations** (année, montant, date, mode, payé/non). Vue par année avec le nombre de membres à jour.
- **Assemblées générales** : historique des AG (date, type, présents, ordre du jour, **résolutions & votes**, décisions) avec un **espace documents** (fichiers joints **protégés** — non accessibles de l'extérieur — ou liens externes).
- **Génération PDF** (impression ou téléchargement) : **lettre d'appel à cotisation** (d'après ton modèle), **reçu de cotisation** et **procès-verbal d'AG**.

---

**Version 2.8.14 — 14 juin 2026**
## Alerte d'édition à plusieurs étendue
- Le garde-fou anti-écrasement (bandeau à l'ouverture + avertissement à l'enregistrement avec « Écraser / Annuler ») couvre maintenant aussi les **Devis**, les **Événements** et les **Réparations**, en plus de l'Inventaire.

---

**Version 2.8.13 — 14 juin 2026**
## Inventaire : alerte d'édition à plusieurs
- En ouvrant une fiche matériel **modifiée par quelqu'un d'autre**, un bandeau prévient : « ⚠️ Fiche modifiée par X, il y a … ».
- Surtout : **au moment d'enregistrer**, si la fiche a changé depuis que tu l'as ouverte, un message t'avertit (« modifiée par X depuis que tu l'as ouverte ») et te laisse **écraser ou annuler** — fini les modifications perdues sans le savoir.
- Chaque fiche garde désormais **qui l'a modifiée en dernier et quand**.

---

**Version 2.8.12 — 14 juin 2026**
## Petits conforts : recherche + Tarifs pliables
- Les **champs de recherche** ont un **bouton « × »** pour tout effacer d'un clic.
- Dans **Devis › Tarifs**, les rubriques (Périodes, Prix par matériel, Coûts, Éléments supplémentaires) sont des **bulles pliables** (même design qu'Affichage du site) : tout est replié au départ, sauf **Périodes de location**.

---

**Version 2.8.11 — 14 juin 2026**
## Module « Fiches produit PDF » (page Devis)
- Nouvel onglet **Fiches PDF** dans la page **Devis** (et ses onglets sont maintenant **réordonnables** au glisser-déposer).
- On choisit un **produit** (fiche matériel) et on **coche le contenu** à inclure : image, titre, description, lien internet, et n'importe quel champ existant (catégorie, état, prix…). On peut aussi **ajouter des champs et des images** personnalisés.
- **Entête type courrier** (logo + adresse + téléphone) en haut à gauche, **affichable/modifiable** avant génération, et **mémorisable par défaut**.
- **Aperçu en direct**, puis génération en **deux façons** : **Imprimer / Enregistrer en PDF** (qualité parfaite) ou **Télécharger le PDF** directement.
- Onglet **Historique léger** : on garde la trace des fiches générées (sans stocker de PDF, base légère et sécurisée) avec un bouton **Régénérer**.

---

**Version 2.8.10 — 14 juin 2026**
## Page Contact dynamique + onglets réordonnables
- Nouvel onglet **Contact** dans Site internet : le **formulaire de contact** est entièrement modifiable (titre, intro, bouton, et **les champs**).
- Chaque champ se règle : libellé, **type** (texte, email, téléphone, message long, ou **liste de choix « Objet »**), et requis ou non. On **ajoute / supprime / réordonne** les champs au glisser-déposer. Le champ **Objet** propose plusieurs choix modifiables à volonté.
- L'onglet **« Modules accueil » est renommé « Accueil »**.
- Les **onglets de Site internet se réordonnent** au glisser-déposer (Blog, Affichage, Nos machines, Accueil, Contact).
- *(Le destinataire de l'email reste défini dans contact.php, par sécurité.)*

---

**Version 2.8.9 — 14 juin 2026**
## Nouvel onglet « Nos machines » (Site internet)
- Nouvel onglet **Nos machines** dans Site internet, pilotable en dynamique.
- **Ordre d'affichage des bornes** sur la page, par **glisser-déposer** (poignée ⠿).
- **Boutons configurables** : « Louer cette borne » et un **second bouton** (ex. « Voir plus ») — texte, lien, ouverture (même fenêtre/onglet), **couleur** et **icône** au choix.
- **Bannière en haut de page** (sous l'en-tête) : image (médiathèque), **largeur max 80 %**, lien cliquable optionnel, activable/désactivable.

---

**Version 2.8.8 — 14 juin 2026**
## Fiche matériel : description enrichie (site + fiche produit)
- Nouveau champ **Description** en texte enrichi (gras, italique, listes), hauteur 150 px, **au-dessus des Notes** dans la fiche matériel.
- Cette description **remplace** l'ancien « Description (site public) » : elle sert à la fois au **site internet** (page Nos Machines) et à la **future fiche produit PDF**.
- La fiche vitrine renvoie désormais vers la fiche matériel pour la description (une seule source, plus de doublon).

---

**Version 2.8.7 — 14 juin 2026**
## Médiathèque : onglets + nettoyage des doublons
- Nouvelle **barre d'onglets** dans la médiathèque : **Tout voir** (vue actuelle, recherche + filtre dossier), **Par dossier** (images regroupées par dossier, classés par nom), et **Nettoyage** (admin).
- Onglet **Nettoyage** : analyse en **lecture seule** (aucune modification tant qu'on ne clique pas). Il détecte les **doublons identiques** (mêmes octets), les **images non utilisées** et les **fichiers manquants**.
- Bouton **« Fusionner les doublons »** : garde une seule copie, **réaffecte automatiquement les liens** vers elle (matériel, articles, accueil, partenaires… y compris à l'intérieur des articles) puis supprime les copies. **Sans risque visuel** : les images fusionnées sont strictement identiques. *(Un message conseille de faire une sauvegarde avant.)*

---

**Version 2.8.6 — 14 juin 2026**
## Utilisateurs : édition au clic + photo via médiathèque
- Dans **Utilisateurs › Comptes**, on peut désormais **cliquer directement sur une ligne** pour modifier le compte (le crayon reste disponible).
- Le bouton **« Choisir »** la photo d'un compte ouvre maintenant la **médiathèque** (au lieu d'un fichier local).

---

**Version 2.8.5 — 14 juin 2026**
## Compléments Contact accueil + glisser-déposer généralisé
- **Contact accueil** : on peut maintenant changer la **couleur de fond de la bande** (bleu pétrole par défaut) et choisir si le bouton **ouvre dans la même fenêtre ou un nouvel onglet**.
- Le **glisser-déposer** pour réordonner les rubriques est désormais disponible **partout où il y a ce système** : Affichage du site, **Modules accueil** et **Administration**.

---

**Version 2.8.4 — 14 juin 2026**
## Accueil du site : icônes & bande contact pilotables
- Nouveau module **« Liens icônes »** (Site internet › Modules accueil) : gère la rangée d'icônes cliquables sous le hero. On peut **ajouter / modifier / supprimer / réordonner** (glisser-déposer) chaque lien. Pour chacun : **choix de l'icône** (3 bibliothèques — icônes maison, Google Material Symbols, émojis), **couleur**, **titre** et **description** activables ou non, et le **lien** de destination.
- Nouveau module **« Contact accueil »** : la bande « Vous avez besoin de nous ? » devient modifiable (titre, **texte du bouton**, **icône**, **couleur de la pilule**, lien) — même design qu'avant.
- « Calendrier » renommé **« Agenda »** sur l'accueil.
- **Affichage du site** : les rubriques se **réordonnent par glisser-déposer** (poignée ⠿).

---

**Version 2.8.3 — 14 juin 2026**
## Administration en rubriques pliables + correctif médiathèque
- **Administration** adopte le même design que **Site internet › Affichage du site** : chaque réglage (Mon compte, Apparence, Mot de passe, Menus & modules, Sauvegarde, Activité, À propos) est désormais une **bulle horizontale qui s'ouvre d'un clic**. Plus clair, moins de scroll. *(Ce style devient la norme pour les futurs modules du même type.)*
- **Correctif médiathèque** : quand on ouvre la médiathèque depuis un formulaire (ex. « Choisir une photo » sur une borne) et qu'on clique **Fermer** sans rien choisir, seule la médiathèque se ferme — la fenêtre d'édition reste ouverte (avant, tout se fermait).

---

**Version 2.8.2 — 14 juin 2026**
## Médiathèque façon WordPress
- **Recherche** par nom et **filtre par dossier** dans la médiathèque.
- Chaque image affiche son **nom**, sa **taille** et son **dossier**, avec des boutons pour **renommer**, **ranger dans un dossier** et **supprimer**.
- Nouveau bouton **« Importer l'existant »** (admin) : récupère d'un coup toutes les images déjà utilisées (matériel, articles, accueil, partenaires, équipe, événements, projets…) et les transforme en fichiers réutilisables, rangés dans le dossier **Importées**.

---

**Version 2.8.1 — 14 juin 2026**
## Médiathèque branchée partout
- Tous les boutons **« Choisir une image »** (matériel, articles, hero, équipe, partenaires, événements, projets, vitrines, galerie, blog) ouvrent désormais la **médiathèque** : on choisit une image déjà téléversée **ou** on en ajoute une nouvelle depuis l'ordinateur (elle rejoint la médiathèque, réutilisable ensuite).
- *(Nouveau versionnage : +0.0.1 par mise à jour, récap utilisateurs toutes les 5 versions.)*

---

**Version 2.7 — 14 juin 2026**
## Éditeur d'article plus confortable
- La fenêtre de rédaction d'un article s'ouvre maintenant en **mode paysage (large)** et est **redimensionnable** (glisse le coin en bas à droite) — fini le scroll interminable sur les longs articles.

---

**Version 2.6 — 14 juin 2026**
## Réorganisation : Administration & Utilisateurs
- **Paramètres → renommé « Administration »**. Nouvelle section **« Menus & modules »** : activer/désactiver les fonctions, **et** régler l'affichage des menus de gauche (**Auto** = caché si vide / **Toujours afficher** / **Cacher**). Les menus vides (Projets, Ventes, Prêts…) se **cachent automatiquement** pour alléger le menu.
- **Utilisateurs** devient le hub des personnes : onglets **Comptes · Partenaires · Disponibilités · Groupes & permissions** (la gestion des rôles est désormais un onglet, admin uniquement).

---

**Version 2.5 — 14 juin 2026**
## Correctifs visibilité
- **Hamburger** blog/article : enfin bien visible (boîte sombre arrondie + barres blanches de largeur fixe).
- Bouton **Médiathèque** rendu bien visible (en violet) dans Site internet.

---

**Version 2.4 — 14 juin 2026**
## Médiathèque — étape 1 (le socle)
- Nouvelle **Médiathèque** : les images sont stockées comme de **vrais fichiers** sur le serveur (réutilisables, base extensible).
- Accès **« 🖼 Médiathèque »** dans Site internet : ajouter, voir, supprimer des images.
- *Prochaines étapes* : brancher « choisir depuis la médiathèque » dans tous les champs image, puis migrer les images existantes.

---

**Version 2.3 — 14 juin 2026**
## Correctif hamburger (blog & articles)
- Menu hamburger **remis à gauche** sur les pages Blog et Article, **barres blanches bien visibles** (ombre portée pour ressortir sur n'importe quel fond), fond transparent.

---

**Version 2.2 — 14 juin 2026**
## Harmonisation blog + regroupement des réglages
- **Page article harmonisée** : la bannière devient le **hero** en haut (comme la page Blog), **hamburger à droite**, **logo central redondant retiré**. Plus propre, plus cohérent.
- **Hamburger** du blog/article rendu **bien visible** (bordure).
- **Tous les réglages du blog regroupés** dans **Site internet → Affichage du site → Blog** : disposition, widgets, encart pub, bannière des articles **et** image de fond du hero — un seul endroit. La carte « Blog » en double dans « Modules accueil » a été retirée.

---

**Version 2.1 — 14 juin 2026**
## Page Blog : nouveau Hero
- Le haut de la page Blog devient un **hero en image** (au lieu du bandeau noir) : grande bannière de fond, **logo central retiré**, **menu hamburger déplacé à droite** (sur cette page uniquement) pour ne pas masquer le logo de la bannière.
- L'**image de fond du hero** se choisit dans **Site internet → Affichage du site → Blog** (nouvelle ligne). Tant qu'aucune image n'est mise, un fond noir « Le Blog » s'affiche.

---

**Version 2.0 — 14 juin 2026**
## Finitions blog
- **Bannière** de l'article réduite en **bandeau** (hauteur raisonnable, rognée proprement) au lieu de la pleine hauteur — moins imposant.
- **Éditeur d'article** : fond **blanc** (lisible quel que soit le thème de l'app) ; **insertion d'images** plus propre — image centrée sur sa propre ligne, format conservé (plus de recadrage carré), non déplaçable (évite les disparitions).

---

**Version 1.9 — 14 juin 2026**
## Correctifs thème sombre + bannière du blog
- **Thème sombre** : fini les fonds blancs et les cases à cocher transformées en gros rectangles vides — couleurs en dur remplacées par les variables de thème (corrigé à la racine, valable partout et pour l'avenir).
- **Bannière du blog** : téléversable **globalement** (Site internet → Blog) et **par billet** (éditeur d'article). Affichée en haut de l'article au format **paysage**, à la place de l'image carrée. Nouveau compresseur d'image qui **conserve le format** (plus de recadrage carré pour les bannières).

---

**Version 1.8 — 13 juin 2026**
## Partenaires sur projets/billets + Blog 2ᵉ vague
- **Partenaires participants** : sur un **projet** et sur un **billet de blog**, on coche les partenaires (base Partenaires). Encart **paysage** en bas de l'article (« Avec la participation de ») et de la page Projets (« Ils participent à nos projets »), logos cliquables vers leur site.
- **Matériel à vendre** : nouveau réglage « À vendre sur le site » + prix sur la fiche matériel ; widget **« À vendre »** activable dans la sidebar du blog.
- **Filtres par catégorie** : champ catégorie sur les articles ; les filtres horizontaux du blog passent en **catégories** (sinon par année).

---

**Version 1.7 — 13 juin 2026**
## Partenaires enrichis + Affichage repliable
- Fiche **partenaire** : nouveaux champs **Email**, **Téléphone** (+ « afficher sur le site » o/n), **Site internet**. Récupération automatique de l'existant : l'email saisi dans « Adresse » et le téléphone dans « Notes » sont déplacés dans les bons champs (sans rien perdre).
- **Site internet → Affichage du site** : les rubriques (événements, machines, projets, partenaires) sont maintenant **repliées par défaut** et s'ouvrent au clic — beaucoup moins chargé.

---

**Version 1.6 — 13 juin 2026**
## Blog du site — modes d'affichage + widgets (1ʳᵉ vague)
- Page **Blog** du site refondue : **2 modes** au choix dans l'appli (Site internet → Modules → Blog) — **Grille** ou **Sidebar** (à gauche ou à droite).
- **Widgets** activables : **Recherche** d'articles, **Encart publicitaire** (image/GIF ou vidéo YouTube + lien + titre).
- **Filtres horizontaux** par année en haut de la page.
- **« Blog »** ajouté au menu de toutes les pages du site.
- À venir (2ᵉ vague) : widget « Matériel à vendre » et filtres par catégorie (nécessitent de nouveaux champs).

---

**Version 1.5 — 13 juin 2026**
## Partenaires dans la page Utilisateurs
- La gestion des **partenaires** est désormais un **onglet** dans la page **Utilisateurs** (à côté de « Comptes » et « Disponibilités »), au lieu d'une fenêtre popup. Liste, ajout, modification, suppression et réglages de l'encart au même endroit.

---

**Version 1.4 — 13 juin 2026**
## Page d'accueil pilotable (Site internet → Modules accueil)
- Nouvel onglet **« Modules accueil »** dans Site internet, avec 3 modules éditables :
  - **🎬 Hero** : grand titre, texte d'accroche, image, bouton (texte + lien), vidéo de fond YouTube.
  - **🖼 Photos asso** : la galerie « L'association en quelques images… » (ajout/retrait de photos).
  - **👥 L'équipe** : « La fine équipe » (photo, nom, description par membre).
- La **page d'accueil du site devient dynamique** : ces 3 sections se remplissent depuis la gestion. Tant qu'un module n'est pas configuré, le site garde son contenu actuel (aucun risque de page vide).

---

**Version 1.3 — 13 juin 2026**
## Fiches vitrine des machines
- Dans **Site internet → Affichage**, chaque machine a un bouton **« Fiche vitrine »** : photo, grand titre, sous-titre, description, **sens d'affichage** (auto zigzag / image à gauche / texte à gauche) et publié o/n.
- La page **« Nos Machines »** du site affiche chaque borne publiée au format **grande photo + titre + sous-titre + description + bouton « Louer cette borne »**, dans le sens choisi.
- Bouton **« Vider la fiche »** pour retirer une borne du site (la photo d'inventaire est conservée).

---

**Version 1.2 — 13 juin 2026**
## Fiche événement enrichie
- Au clic sur un événement : la fiche affiche désormais le **matériel présent en visuel** (vignettes photo + nom + catégorie), cliquable pour ouvrir la fiche du matériel.
- Nouveau bloc **« Site internet »** dans la fiche : interrupteur **Affiché / Masqué** pour publier ou retirer l'événement de l'agenda du site, directement depuis la fiche.

---

**Version 1.1 — 13 juin 2026**
## Dépôt unique + Site internet
- Tout le projet (gestion + site) est désormais dans **un seul dépôt Git**, compartimenté. Fini les copies de dossiers et les fichiers `.js` recopiés à la main.
- Nouvelle section **« Site internet »** : éditeur de **blog** (visuel/WYSIWYG) + **tableau de bord d'affichage** (publier/masquer événements, machines, projets, partenaires en un clic).
- **API publique** (`/api/public/*`) branchée : le site westcoastarcades.fr lit les données publiées sans accès aux données internes.
- Fiche **matériel** : « Visible sur le site public » + « Description (site public) » (Phase 1bis intégrée).

---

**Version 3.3 — 9 juin 2026, 20:00** *(ancien versionnage, avant dépôt unique)*

## Bouton WIPPER
- Sur chaque **réparation** (onglet Interventions) et dans la fiche **Modifier le matériel** (entre Annuler et Enregistrer) : un bouton **WIPPER** (cyan/bleu clair).
- Au clic : choisir un **projet WIP existant** (le matériel y est ajouté comme équipe « Réparation »), ou **créer un nouveau projet WIP** pré-rempli avec ce matériel.

## Inventaire — fiche en un clic
- La **photo** et le **titre** de chaque ligne d'inventaire sont **cliquables** et ouvrent la fiche en popup (comme sur l'accueil). Les boutons d'action restent à part.

---

**Version 3.2 — 9 juin 2026, 19:30**

## Mot de passe oublié (écran de connexion)
- Lien **« Mot de passe oublié ? »** : on entre identifiant + **code de réinitialisation** + nouveau mot de passe.
- Les administrateurs **génèrent un code** (usage unique, 24h) depuis Utilisateurs (icône cadenas) à communiquer au membre. Fonctionne **sans email**.
- L'envoi par **email** est prévu en **module** activable (SMTP requis) — voir Modules.

## Système de modules (options du site)
- Nouveau dossier **MODULES/** (registre `modules.json`) et section **Paramètres → Modules** (admin) pour **activer/désactiver** : Devis, Événements, Partenaires, Réparations & WIP, Projets, Ventes, Prêts, Disponibilités, Activité, et « Réinitialisation par email » (à venir).
- Un module désactivé **masque sa page et ses fonctions**. Idéal pour un site **vitrine** avec options.
- Architecture extensible : déposez un module dans `modules.json` pour qu'il apparaisse dans Paramètres.

## Mise à jour des autres sites
- **Kit de mise à jour** fourni (script + paquet de code) pour mettre à jour vos autres sites de même structure **sans toucher à leurs données**.

---

**Version 3.1 — 9 juin 2026, 18:55**

## Accueil — encarts entièrement cliquables
- Dans tous les encarts personnalisés, **chaque ligne est cliquable** et ouvre directement la fiche de l'élément (ex. cliquer « Arcade Electronic » dans l'encart Inventaire ouvre sa fiche).
- Généralisé à : Inventaire, Réparations, Pièces à acheter, Événements, Projets WIP, Projets, Devis, Prêts.

---

**Version 3.0 — 9 juin 2026, 18:35**

## Accueil — homogénéité & sections
- Les bulles **À TRAITER EN URGENCE** et **PROCHAIN WIP** ont désormais la **même hauteur** (boutons alignés en bas).
- Le bouton **Personnaliser** gère maintenant aussi l'**affichage des sections** de l'accueil (OUI/NON) : Bandeau de bienvenue, Alertes, Statistiques (bulles), **Accès rapides (les cartes)**. Chacun masque/affiche à volonté, mémorisé par compte.

---

**Version 2.9 — 9 juin 2026, 18:15**

## Accueil — métriques cliquables
- Les bulles (Matériel total, Disponibles, Bloqués, Hors service, Devis actifs, Réparations, Prêts en cours, Événements) sont **cliquables** et ouvrent la page concernée (Hors service ouvre l'inventaire filtré HS).
- Disposition **4 par ligne** (2 sur mobile). Une bulle à **0 n'est plus affichée**.

## Accueil personnalisable par utilisateur
- Bouton **Personnaliser** : chaque utilisateur compose son accueil avec des **encarts** au choix, activables/désactivables, **ordonnables** (↑/↓), mémorisés pour son compte.
- Encarts disponibles : **Inventaire** (nombre d'articles + filtre catégorie + non fonctionnels), Réparations en cours, Pièces à acheter urgentes, Prochains événements, Projets WIP à venir, Projets en cours, Derniers devis, Prêts en cours.
- Chaque encart affiche un aperçu cliquable qui mène à la page complète.

---

**Version 2.8 — 9 juin 2026, 17:40**

## Encart partenaires (bas de page)
- Vignettes **réduites (~−40 %)** et **ligne centrée**.
- **Nombre réglable** (4 par défaut, de 1 à 12) dans « Gérer » (page Événements → Partenaires).
- Choix **Fixe / Aléatoire** conservé.
- Nouvel interrupteur **OUI/NON** pour **afficher ou masquer** l'encart en bas de toutes les pages.
- (Rappel : thème « Papier & pierre » — boutons verts remplacés par terracotta, V2.7.)

---

**Version 2.7 — 9 juin 2026, 17:10**

## Nouveau thème : Papier & pierre
- Thème **clair et chaleureux** : fonds crème/pierre, cartes papier, encre près du noir, plusieurs niveaux de **gris chauds** (taupe), menu en **ardoise foncée** pour contraster.
- **Boutons pastel** : vert sauge (actions principales / valider) et rouge terracotta (supprimer).
- **Nouvelles polices** sur ce thème : titres en **Fraunces** (serif élégante), texte en **Inter**.
- Cinq thèmes au total : Classique, Liquid Glass, Sombre (Discord), Nuit profonde, Papier & pierre.

---

**Version 2.6 — 9 juin 2026, 16:45**

## Nouveau thème : Nuit profonde (façon Divi / Elegant Themes)
- 2ᵉ thème sombre au choix : **noir bleuté profond**, cartes navy avec halo, **dégradé d'accent bleu→violet** (boutons et menu actif), accents colorés (turquoise, vert, ambre, rose).
- Quatre thèmes disponibles : Classique, Liquid Glass, Sombre (Discord), Nuit profonde.

---

**Version 2.5 — 9 juin 2026, 16:20**

## Thème Sombre (Discord) — corrections de contraste
- Badges **Hors service**, **Vendu**, **Bloqué** : fonds clairs remplacés par des teintes sombres lisibles.
- Badges **propriétaire** (Perso / Asso) et autres tags : texte éclairci.
- **Pièces à acheter** : l'encart d'une pièce urgente n'est plus blanc (fond rouge sombre), le sélecteur **« À acheter »** et les sélecteurs de statut (devis) deviennent gris sombre lisibles.
- **Bandeaux d'info** (Ventes, Devis) repris dans les teintes sombres.
- Le tout s'aligne sur le rendu des cartes **Projets** pris comme modèle.

---

**Version 2.4 — 9 juin 2026, 15:50**

## Nouveau thème : Sombre (Discord)
- Troisième thème dans Paramètres → Apparence : **Sombre façon Discord** — fonds gris-anthracite, menu noir, accent **blurple (#5865F2)**, textes clairs, badges et bulles assombris.
- Trois thèmes disponibles : Classique, Liquid Glass, Sombre (Discord). Chacun choisit le sien, mémorisé sur son appareil.

---

**Version 2.3 — 9 juin 2026, 15:30**

## Thèmes (Apparence)
- Nouveau module **Apparence** dans Paramètres : choix du thème, mémorisé par utilisateur sur son appareil (effet immédiat, aucune connexion requise).
- Deux thèmes :
  - **Classique** — le thème par défaut, clair et net.
  - **Liquid Glass** — variante translucide façon Apple : fond dégradé coloré, panneaux en **verre dépoli** (flou + vibrance), bordures lumineuses, ombres douces. S'applique partout (cartes, barre du haut, menu, modales, frise…).
- Architecture extensible : on peut ajouter d'autres thèmes facilement.

---

**Version 2.2 — 9 juin 2026, 14:55**

## Disponibilités des membres (frise type planning)
- Nouvel onglet **Disponibilités** dans **Utilisateurs**, accessible à **tout le monde** (l'onglet « Comptes » reste réservé aux admins).
- **Frise horizontale** à la manière d'un planning : photo + nom à gauche, barres colorées par type sur les jours, **aujourd'hui** surligné, week-ends grisés.
- **Types** (codes couleur) : Vacances (violet), Déplacement professionnel (corail), Télétravail (vert), Arrêt maladie (orange), Indisponible (gris), Disponible (turquoise).
- **Saisie rapide** : un petit formulaire (type + période + note), pas de calendrier. On peut aussi cliquer une case pour pré-remplir la date. Chacun gère **ses propres** disponibilités ; les admins gèrent tout le monde.
- Vues **Semaine / 2 semaines / Mois**, navigation précédent/suivant, recherche par nom.

## Photo de profil
- Ajout d'une **photo de profil** dans « Mon compte » (Paramètres) et dans la fiche utilisateur (admin). Elle s'affiche dans la frise, le menu et la liste des comptes.

---

**Version 2.1 — 9 juin 2026, 14:10**

## Projets — suite (tâches & sessions de travail)
- **Tâches** par projet : liste cochable avec barre de progression (X/Y). Les cases se cochent directement depuis la fiche du projet.
- **Sessions de travail (rendez-vous WIP)** : planifiez une ou plusieurs dates de session (avec note/lieu).
- **Alerte d'accueil** : une bulle **RENDEZ-VOUS PROJET** apparaît automatiquement **2 jours avant** chaque session, jusqu'au jour J.
- La fiche projet affiche la **prochaine session** et l'avancement des tâches.

---

**Version 2.0 — 9 juin 2026, 13:40**

## Inventaire — affichage PC
- Le tableau ne se coupe plus à droite quand toutes les colonnes sont affichées : **défilement horizontal** automatique sur ordinateur (le mode mobile reste en cartes).

## Nouvelle page PROJETS (entre Réparations et Ventes)
- Liste des projets en cours / à venir en **blocs de 50 %** : nom, description courte, date de début, intervenants.
- Bouton **Nouveau projet** avec : nom, date de début, **budget estimé** (optionnel), **intervenants** (sélecteur multiple, sans virgules), **ressources nécessaires** (ajout de lignes), **notes** et **fichiers joints** (plans, docs, PDF — jusqu'à ~4 Mo chacun, téléchargeables).
- Onglet **Actifs / Archivés** et archivage comme partout.
- *À venir (prévu) : gestionnaire de tâches accomplies + rendez-vous WIP avec alerte d'accueil 2 jours avant.*

---

**Version 1.9 — 9 juin 2026, 13:05**

## Projets WIP — calendrier
- Les **dates vides sont masquées** : l'agenda regroupe les séances par date (en-têtes de jour).
- En haut, **deux bulles** affichent les **2 prochaines séances** (date, code, lieu, participants), cliquables.

## Devis — deux nouveaux onglets
- **Tarifs** : périodes de location modifiables (Week-end, Semaine, +…), **prix par matériel et par période**, **coûts unitaires** (essence, conso camion, location camion, main d'œuvre, couchage, présence, maintenance) et **éléments supplémentaires** à volonté.
- **Calculatrice** : « Estimation des coûts d'une prestation » — dates départ/retour, matériel loué, transport (km, camions, essence), main d'œuvre, présence, couchage, maintenance et extras, **total calculé en direct**, puis bouton **Établir un devis** qui crée le devis pré-rempli.

## Inventaire
- Bouton de tri **⛔ Non fonctionnels** (pour préparer le travail des WIP).
- Badge **EN WIP** automatique quand un matériel est dans un projet WIP actif.

---

**Version 1.8 — 9 juin 2026, 12:25**

## Projets WIP — améliorations
- **Calendrier** : les jours avec une séance ressortent en **bleu-gris** (plus seulement une pastille).
- **État** : ajout de **« À venir »** en premier choix (couleur dédiée).
- **Présents** et **membres d'équipe** : fini les virgules — un **sélecteur** : on clique, on choisit dans la liste des personnes (utilisateurs + partenaires), une par une, en chips.
- **Lieu** ajouté à chaque séance.
- **Matériel manquant** : autant de **lignes** que voulu, via un bouton « + Ajouter un matériel ».

## Accueil — encarts
- La bulle **À TRAITER EN URGENCE** passe à **50 %** de largeur ; à côté, une deuxième bulle **PROCHAIN WIP** affiche la **date, le lieu et les participants** (en gélules). Elle vire à l'orange quand la séance est dans les 2 jours.

---

**Version 1.7 — 9 juin 2026, 11:50**

## Inventaire — Propriétaire
- Nouveau champ **Propriétaire** dans « Modifier le matériel » : type via une **liste gérable** (Perso, Asso, Partenaire, VIP, Autre…) modifiable dans **Gérer**, plus un **nom** choisi dans l'annuaire (utilisateurs + partenaires).
- Colonne **Propriétaire** activable via le bouton Colonnes.

## Réparations — onglet « Projets WIP »
- **Calendrier mensuel** simple : les séances apparaissent avec une pastille de couleur ; cliquer une date crée/ouvre une séance.
- Chaque projet a un **code** auto `WIP-JJ-MM-AAAA`, une **date**, les **présents**, le **matériel manquant**, et des **équipes** : chaque équipe a sa tâche, ses membres, son matériel (choisi dans l'inventaire) et ses **étapes** cochables au fil des journées.
- Bouton **Commander une pièce** (renvoie vers Pièces à acheter).
- **4 états** colorés : À faire (orange), En cours (bleu), Incomplet (rose/rouge), Terminé (vert). Bouton **Archiver**.

## Accueil — rappel
- Sous « À TRAITER EN URGENCE », une bulle **RAPPEL** apparaît **2 jours avant** toute séance WIP à venir.

---

**Version 1.6 — 9 juin 2026, 11:10**

## Corrections importantes
- **Menu mobile** réparé : il restait bloqué (double-déclenchement) — on pouvait plus revenir à l'accueil sans rafraîchir. Corrigé.
- **Rafraîchir une page** garde désormais la page en cours (au lieu de revenir systématiquement à l'Accueil).

## Inventaire
- Bouton **Dupliquer** sur chaque fiche produit (ouvre une copie pré-remplie à enregistrer).

## Archives (toutes les pages)
- Onglet **Actifs / Archivés** sur Inventaire, Devis, Événements, Réparations, Ventes et Prêts.
- Bouton **Archiver / Désarchiver** par fiche. Les éléments archivés sortent des listes actives et **ne bloquent plus le matériel** (la trace est conservée).

## Paramètres — traçabilité
- Bulle **10 dernières actions** (qui a fait quoi, quand, sur quelle rubrique).
- **Surveillance par rubrique** avec boutons **OUI / NON** : choisissez ce qui est consigné (Inventaire, Devis, Événements, Réparations, Ventes, Prêts).

---

**Version 1.5 — 9 juin 2026, 10:30**

## Accès invité corrigé
- L'invité voit désormais **toutes les pages** (y compris Utilisateurs et Activité) et peut **tout cliquer** pour explorer les fonctionnalités — mais **aucune modification** n'est possible (lecture seule). Idéal comme vitrine.

## Utilisateurs & rôles
- Bouton **Gérer les rôles** : ajouter / modifier / supprimer des rôles, chacun avec un **niveau d'accès** (Administrateur / Standard / Lecture seule). Supprimer un rôle réaffecte les comptes concernés.
- **Filtres par rôle** en pastilles, comme l'inventaire.

## Partenaires
- Encart **« Nos partenaires »** en bas de page : 6 logos carrés, en mode **fixe ou aléatoire**.
- Bouton **Partenaires** (page Événements) pour gérer chaque partenaire : logo carré, nom, adresse, notes.

## Événements
- **Hero du prochain événement** en haut de page : logo du partenaire, dates, description, et indication **matériel complet / incomplet**.
- Lien d'un événement à une **fiche partenaire** (le « prochain événement » du partenaire se calcule automatiquement).

## Inventaire
- Import photo **compressé automatiquement sous 60 Ko** (avec lien vers un compresseur gratuit en secours).

## Connexion
- Retrait de la mention « Premier accès : admin / arcade ».

---

**Version 1.4 — 9 juin 2026, 09:55**

## Accès invité (vitrine)
- Bouton **« Je suis invité »** sur l'écran de connexion : ouvre un formulaire login / mot de passe.
- Le compte invité est en **lecture seule** sur tout le site (idéal pour démontrer / louer l'application). Compte par défaut : `invite` / `invite` (modifiable dans Utilisateurs).

## Réparations
- **Étapes de réparation** par fiche : ajout, cochage (barre de progression) et suppression. Les étapes se cochent directement depuis la liste.
- Nouvel onglet **Pièces à acheter** : inventaire des achats avec **degrés d'urgence** (Normal / Urgent / Critique), fournisseur, coût, statut (À acheter / Commandé / Reçu) et lien vers une réparation ou un matériel.
- Les pièces **urgentes / critiques** ressortent en rouge.

## Accueil
- Bulle **« À TRAITER EN URGENCE »** listant les pièces urgentes à acheter (extensible à d'autres alertes plus tard).

## Versions
- Chaque version est désormais **archivée dans son propre dossier** (rollback possible). V1.3 conservée, V1.4 en cours.

---

**Version 1.3 — 9 juin 2026, 09:30**

## Inventaire
- **Photo par objet** : nouvelle colonne avant Dénomination, recadrage carré automatique à l'import. Taille d'affichage réglable (réglage global, dans « Gérer »).
- **Catégories** : ajouter / renommer / supprimer depuis le bouton « Gérer » (le matériel concerné est mis à jour automatiquement).
- **États** : liste modifiable (ajout de « À réviser » et « À démonter »), avec option « bloque » pour rendre le matériel indisponible.
- **Colonnes personnalisables** : chaque utilisateur choisit les colonnes à afficher (bouton « Colonnes »), mémorisé par compte sur son appareil.

---

**Version 1.2 — 9 juin 2026, 09:05**

---

## Inventaire
- Filtres par **catégorie** sous forme de pastilles (bulles) avec icônes, pour trier le matériel en un clic.
- Affichage corrigé en **mobile** : tableau lisible en cartes, toutes les infos visibles.

## Ventes
- Bouton **Vendu OUI / NON** (vert/rouge) entre Date et Prix. OUI = sorti du parc, NON = de nouveau disponible.

## Événements
- Rattachement du **matériel libre** à un événement : il est réservé (bloqué) pour la période.
- Bouton **Créer un devis** partenaire pré-rempli (matériel, dates, partenaire).
- Bouton **Vérifier la disponibilité** désormais refermable.
- Toggle **Validé OUI / NON** par événement.
- Affichage du **créateur** et de la **date de création** de chaque événement.

## Paramètres (admin)
- Suivi d'**activité** : utilisateurs en ligne en temps réel, connexions par jour, et classement des contributions Inventaire / Réparations.

## Divers
- Pied de page avec **numéro de version** et © Yann Gabel Solutions pour West Coast Arcades.

---
*© 2026 Yann Gabel Solutions pour West Coast Arcades*
