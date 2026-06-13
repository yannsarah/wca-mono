# DESIGN_REFERENCE — West Coast Arcades

> Référence de reproduction **fidèle** du site WordPress/Elementor existant.
> Source : export `westcoastarcades.WordPress.2026-06-12.xml` (contenu + données Elementor `_elementor_data` + builder Element Pack `extend_builder`).
> Objectif : reproduire à l'identique avant toute amélioration. **Aucune valeur n'est inventée** : tout ce qui n'a pas pu être confirmé est marqué `TODO`.

---

## 0. Stack d'origine (constaté)

- **WordPress** + **Elementor** (pages construites en `_elementor_data`).
- **Element Pack Pro** (`extb_*`) : header builder, footer builder, et widgets (`extb_post_header`, `extb_post_footer`, `extb_post_json`, `extb_post_main`, `extb_post_sidebar`).
- **The Events Calendar** (`tribe_events`, `tribe_venue`, `tribe_organizer`) pour l'agenda.
- **Forminator** (`forminator_forms`) pour le formulaire de contact.
- Kit Elementor laissé sur ses **réglages par défaut** (couleurs Roboto/#6EC1E4) → le design réel est défini **élément par élément**, pas dans les globales. Les valeurs ci-dessous sont donc extraites empiriquement de l'ensemble des blocs.

---

## 1. Palette de couleurs exacte

Fréquence = nombre d'occurrences dans les données Elementor (indicateur d'importance).

| Rôle | Hex | Fréq. | Usage constaté |
|---|---|---|---|
| Blanc | `#FFFFFF` | 159 | Texte sur fonds sombres, fonds de sections claires |
| **Bleu principal** | `#467FF7` | 118 | Boutons, footer, accents — couleur signature |
| Noir | `#000000` | 89 | Bandes header/hero |
| **Navy titres** | `#1C244B` | 73 | Titres, textes sombres |
| Navy secondaire | `#324A6D` | 58 | Sous-titres, textes |
| Bleu profond | `#1A2A83` | 21 | Variantes/dégradés |
| Gris clair | `#EBEBEB` `#F0F0F0` `#E9E9E9` `#EEEBEB` | 19/11/9/5 | Fonds, séparateurs, bordures |
| **Rouge accent** | `#D32710` `#E01919` `#CB3522` `#C22424` `#FF0101` `#F10000` | 11/8/5/5/3/— | Soulignés « scribble », accents (ex. divider « LA FINE ÉQUIPE » = `#F10000`) |
| Noir header | `#0B0B0B` | 6 | Fond header/zone sombre |
| **Jaune** | `#FDC300` `#FFD37B` | 5/4 | Accents, surbrillances |
| Bleu nuit | `#011640` | 5 | Fonds très sombres |
| Brun | `#6F4100` | 4 | Texte sur jaune |
| Bleu alt. | `#4057F7` | 3 | Bouton « Projet en cours » du hero |
| **Pétrole** | `#122E35` | 3 | Bande « Vous avez besoin de nous ? » |
| **Orange CTA** | `#E2590F` | 3 | Bouton « Contactez-nous dès maintenant » |

> Note : les couleurs Roboto par défaut (`#6EC1E4`, `#54595F`, `#7A7A7A`, `#61CE70`) apparaissent encore à la marge (héritage du kit non personnalisé) — **ne pas les reproduire** comme couleurs de marque.

---

## 2. Typographies détectées

> ⚠️ **CORRIGÉ par la mesure du site rendu (cf. §15) — c'est la §15 qui fait foi.**
> Les données Elementor indiquaient « Poppins » (police posée sur des widgets), mais le **thème `digitala` impose Heebo par défaut**, et c'est **Heebo** qui s'affiche réellement sur l'accueil. Poppins n'apparaît que sur certaines pages internes (titres de la page Machines) ; les icon-boxes de l'accueil sont en **Tahoma**. La police varie selon les pages — voir §15.

- **Police réellement rendue (défaut thème) : Heebo** — poids chargés 400 / 500 / 700.
- **Poppins** : titres de certaines pages internes (ex. page Machines, 42px, navy #1C244B).
- **Tahoma** : titres des icon-boxes de l'accueil (22px / 500).
- Police générique de repli : **Sans-serif**.
- Données Elementor (intention de design, non rendue) : Poppins (141), Montserrat (6), Baloo 2 (2). À ne PAS prendre comme vérité de rendu.
- ✅ Résolu : le paragraphe hero n'est **pas** monospace → **Heebo 16px** (illusion sur la capture).

---

## 3. Échelle typographique (tailles constatées, en px)

| Niveau | Taille | Constat |
|---|---|---|
| H1 hero | **65px** | « Association Arcades, Flippers, Retrogaming, Makers… » (blanc) |
| Très grands titres | 71 / 54 / 50px | titres de sections imposants |
| Grands titres section | 42 / 43px | titres de section |
| Titre moyen | 34px | divider « LA FINE ÉQUIPE » |
| Titre / nom | 30 / 31 / 32px | noms équipe (30px), « 2 Derniers Salons » (32px) |
| Sous-titre | 23 / 24 / 26 / 28px | intertitres, « Quel est notre objectif » (28px) |
| Accroche | 17px | « Vous avez besoin de nous ? » |
| Corps | **16px** | texte courant (93 occ.) |
| Petit | 14px | mentions |

---

## 4. Style des boutons

Boutons « pilule » (très arrondis) constatés :

- **CTA principal orange** : fond `#E2590F`, texte blanc, ex. « CONTACTEZ-NOUS DÈS MAINTENANT ».
- **Bouton bleu** : fond `#467FF7`, texte `#FFFFFF`, 16px, ex. « Contactez-nous ! ».
- **Bouton hero** : fond `#4057F7`, ex. « Projet en cours - VIRTUA FIGHTER 2 ».
- `TODO` — rayon de bordure exact, padding, hover : non présents dans l'export (définis dans le CSS Element Pack compilé / thème). Les captures montrent des **pilules pleines** (border-radius très élevé). À mesurer sur le site rendu.

---

## 5. Structure du header

Deux variantes Element Pack distinctes :

- **Header page d'accueil** (`header_front_page`, id 44/49) : `overlap = true` → header **transparent superposé** au hero noir. Non sticky.
- **Header pages internes** (`header_post`, id 54) : **sticky** (`h-navigation_sticky animated`, `slideInDown`), sticky aussi sur mobile/tablette, `overlap = true`.

Disposition constatée (captures + builder) :
- **Hamburger / menu** à gauche.
- **Logo rond WCA centré**.
- Navigation **horizontale** (`type: horizontal`).
- Fond **noir** (`#000000` / `#0B0B0B`).
- `TODO` — hauteur exacte du header, taille du logo, espacements internes : dans le CSS compilé Element Pack (posts `styleRefs`), non décompilé ici. À confirmer.

---

## 6. Structure du footer

Footer Element Pack (`footer_post`, id 59/67). Sur la page d'accueil, le pied de page est rendu par :
- **Section bleue** `#467FF7` : « © All Rights Reserved. » (blanc, 16px).
- **Section bleue** `#467FF7` : boutons « Politique de confidentialité » et « RGPD ».
- `TODO` — colonnes/réseaux sociaux exacts du footer Element Pack : structure dans les posts `styleRefs`/json non entièrement décompilés. À confirmer sur le rendu.

---

## 7. Menus

Menu principal (issu des `nav_menu_item`, dans l'ordre) :

1. **Accueil** → page 42 (`/`)
2. **Nos Machines** → page 2262 (`/nos-machines/`)
3. **Nos Salons** → page 3664 (`/nos-salons/`)
4. **Partenaires** → page 542 (`/nos-partenaires/`)
5. **(Agenda / Blog)** → catégorie 14 *(libellé exact à confirmer, `TODO`)*
6. **Contacter l'Asso** → page 1466 (`/contact-avec-lassociation-wca/`)

Accès rapides supplémentaires (section 4 de l'accueil, icon-boxes) : **NOS MACHINES · CALENDRIER · NOS PROJETS · LA CHAÎNE**.

---

## 8. Pages existantes (publiées)

| Titre | Slug |
|---|---|
| Accueil | `/` |
| Nos Machines | `/nos-machines/` |
| Nos Salons | `/nos-salons/` (+ sous-pages : la-bif-2025, le-geek-2025, maze-millon-2025, le-salon-du-livre-et-du-jeu-2025) |
| Les Projets West Coast Arcades | `/les-projets-west-coast-arcades/` |
| Projet Virtua Racing | `/projet-virtua-racing/` |
| Projet Virtua Fighter 2 | `/projet-virtua-fighter-2/` |
| WIP - le bricolage | `/wip-work-in-progress-le-bricolage-westcoastarcades/` |
| Partenaires | `/nos-partenaires/` |
| Calendrier | `/calendrier-west-coast-arcades/` |
| Le Salon Games in Cholet 2024 | `/le-salon-games-in-cholet-2024/` |
| La Fête du Jeu 2025 - Saint Paul du Bois | `/la-fete-du-jeu-2025-saint-paul-du-bois/` |
| Contact | `/contact-avec-lassociation-wca/` |
| Politique de confidentialité | `/politique-de-confidentialite/` |
| RGPD | `/rgpd/` |
| Blog | `/blog/` |

Articles (9 publiés) : comptes-rendus de salons (BIF 2025, Games in Cholet, Fête du Jeu, Salon du Livre, Mazé-Millon, Breizh Retro Legend's, présentation de l'asso).

---

## 9. Composants récurrents

- **Bandeau CTA pleine largeur** (fond pétrole `#122E35` ou bleu) + bouton pilule orange/bleu + phrase « Vous souhaitez organiser un évènement… contactez-nous ! ».
- **Icon-boxes** d'accès rapide (4 colonnes).
- **Titre + souligné « scribble » rouge** (`#F10000`) façon dessin à main levée (ex. « LA FINE ÉQUIPE »).
- **Cartes membres** : image carrée + nom (30px) + description.
- **Galerie d'images** en grille.
- **Widget « posts »** (Charger plus) pour les derniers salons (dynamique).
- **Bandes bleues** `#467FF7` de pied de page.

---

## 10. Sections de la page d'accueil (ordre EXACT constaté)

1. Bande noire `#000000` (zone header/hero – image).
2. Bande noire `#000000`.
3. **Hero** (sur fond image, transparent) : H1 blanc 65px « Association Arcades, Flippers, Retrogaming, Makers… » + paragraphe 16px + image (borne) + bouton `#4057F7` « Projet en cours - VIRTUA FIGHTER 2 ».
4. Fond blanc : 4 **icon-boxes** « NOS MACHINES / CALENDRIER / NOS PROJETS / LA CHAÎNE ».
5. **Bande pétrole** `#122E35` : « Vous avez besoin de nous ? » (17px) + bouton orange `#E2590F` « CONTACTEZ-NOUS DÈS MAINTENANT ».
6. **« 2 Derniers Salons »** (32px) — widget posts dynamique « Charger plus ».
7. **« L'association en quelques images… »** + galerie.
8. **Divider « LA FINE ÉQUIPE »** (rouge `#F10000`, 34px).
9. **Équipe (1/2)** : Cédric, Denis, Christophe (pixels), Stéphane, Christophe (DDR), Yannou.
10. **Équipe (2/2)** : Marine, Alexis, Quentin.
11. **« Quel est notre objectif ? »** + paragraphe 28px (mission de préservation).
12. **Bloc objectif** : image + image-box (titre `#1C244B`) + bouton bleu `#467FF7` « Contactez-nous ! ».
13. Footer — bande bleue `#467FF7` : « © All Rights Reserved. ».
14. Footer — bande bleue `#467FF7` : boutons « Politique de confidentialité » + « RGPD ».

> **Équipe = 9 personnes** (deux « Christophe »). Pas de « Mika ».

---

## 11. Styles mobile / tablette / desktop

- **Breakpoints Elementor** (du kit) : `viewport_md = 768px`, `viewport_lg = 1025px`.
  - Mobile : < 768px ; Tablette : 768–1024px ; Desktop : ≥ 1025px.
- Header sticky activé sur mobile ET tablette (header pages internes).
- Colonnes Element Pack avec réglages `media.mobile` (ex. ordre des colonnes, largeur `flexgrow` sur mobile) → comportement responsive géré par colonne.
- `TODO` — valeurs responsives détaillées (tailles de police mobiles, paddings par breakpoint) : dans le CSS compilé, à confirmer sur rendu.

---

## 12. Images et logos utilisés

- **Logo principal** : `https://www.westcoastarcades.fr/wp-content/uploads/2025/03/Logo-WCA-intro-350px.png` (cercle noir, « West Coast Arcades », palmier vert, Pac-Man, « ARCADE · FLIPPER · RETRO GAMING »).
- **Photos machines** : `borne-blast`, `sega-rally-1-arcade-machine`, `daytona-USA-Upright`, `sega-manxx-TT…Grande`, `sega-virtua-Racing-restauration-*`, `borne-virtua-fighter-2`, `Dance-dance-revolution`.
- **Portraits équipe** : `cedric-…Moyenne`, `denis-…Moyenne`, `papa-pixel-2-Moyenne`, `stephane-…Moyenne`, `mika-…Moyenne` (= 2ᵉ Christophe), `yannnou…`, `marine-…`, `alexis1-…Moyenne`, `quentinAlone-…`.
- **Logos partenaires** : crazyflip, RGV, logo-atelier-du-pincab, NEOGEOFANS, flipperled, legrandjeu, houseOfTheGeek, ben_factory, nintendoz, nicoflip.
- **Affiches salons** : breizh-retro-legends-2026, crazyflip, la-fete-du-jeu-chemille-2025, la-bif-2025, boc_n_geek_2025, salon-du-livre…2025, west-coast-arcades-Maze-Millon-2025, West-coast-Arcades-GamesInCholet-2023, West_Coast-games-in-cholet-2024-intro, salon-FREEPLAY-2014, salon-Freeplay-2018.
- 311 médias au total (beaucoup de doublons de tailles WordPress).

---

## 13. Éléments à reproduire STRICTEMENT

- Police **Poppins** (avec la gamme de poids 300→700) partout.
- Bleu signature **`#467FF7`** (boutons + bandes pied de page), navy titres **`#1C244B`**, pétrole **`#122E35`**, orange CTA **`#E2590F`**, rouge souligné **`#F10000`**, noir header **`#000000/#0B0B0B`**.
- **Header noir, hamburger à gauche, logo rond centré, nav horizontale** ; transparent sur l'accueil, sticky sur les pages internes.
- **Ordre des sections de l'accueil** (section 1→14 ci-dessus) inchangé.
- Titres : hero **65px**, sections **30–42px**, corps **16px**.
- Boutons **pilule** (orange / bleu / `#4057F7`).
- **9 membres** d'équipe, libellés et descriptions exacts.
- Souligné **« scribble » rouge** sous les titres de section.
- Footer **bleu `#467FF7`** avec mentions légales / RGPD.
- Conserver les **slugs/URLs** d'origine (SEO).

---

## 14. Points à confirmer (état après mesure rendu)

1. ✅ **Résolu** : valeurs de rendu (header, boutons, conteneurs, typo, footer) mesurées — voir §15.
2. ✅ **Résolu** : paragraphe hero = Heebo 16px (pas monospace).
3. `TODO` — **Libellé exact de l'entrée de menu « catégorie 14 »** : menu en off-canvas (hamburger) non déplié lors du relevé → à confirmer en ouvrant le menu.
4. `TODO` — **Réseaux sociaux du footer** : non détectés dans le DOM au relevé → à confirmer.
5. `TODO` — **Valeurs responsives détaillées** (mobile/tablette) : relevé fait en desktop ; à mesurer aux largeurs 768/1025 si besoin de fidélité mobile.
6. `TODO` — **Liens externes des partenaires** (non stockés dans l'export, à fournir).

---

## 15. Valeurs MESURÉES sur le site rendu (Claude in Chrome) — **FONT DE VÉRITÉ**

> Relevé des styles calculés (`getComputedStyle`) sur le site en ligne. Ces valeurs priment sur les §1–§13.

### Thème & polices
- **Thème WordPress : `digitala`** (`/wp-content/themes/digitala/`).
- **Police rendue par défaut : Heebo** (Google Fonts), poids chargés **400 / 500 / 700**.
- **Poppins** : titres page Machines (et probablement d'autres pages internes).
- **Tahoma** : titres icon-boxes de l'accueil.
- **Couleur de texte courante : `#17252A`** (rgb 23,37,42).
- Corps : **16px**, `line-height: 24px`.

### Conteneur (largeur max) — VARIABLE selon les pages
- Accueil : **1140px** (`min(100%, 1140px)`).
- Page Machines : **1280px**.
- → Largeur de conteneur non homogène ; à reproduire page par page.

### Header
- Fond **noir `#000000`**, hauteur **≈190–210px**, padding 10px.
- **Logo 150×150px** (`cropped-cropped-Logo-WCA-intro-350px-2-150x150.png`), centré.
- **Menu en hamburger / off-canvas** (pas de menu horizontal visible, même en desktop) — propulsé par le plugin **Superfly Menu** (`sfm-style-full`, `sfm-sidebar-full`, `sfm-toggle-click`, `sfm-blur`). Panneau latéral plein, ouverture au clic, fond flouté. Libellés du menu : voir §7 (issus de l'export).
- Accueil : header en `overlap` (transparent au-dessus du hero noir). Pages internes : header noir (sticky via Element Pack au scroll d'après les réglages builder).

### Boutons (styles RÉELS, hétérogènes — à reproduire tels quels)
| Bouton | Fond | Texte | Radius | Padding | Police/Taille |
|---|---|---|---|---|---|
| Hero « Projet en cours – VF2 » | `#4057F7` | blanc | **30px** | 12px 24px | Heebo 15px / 400 |
| CTA « CONTACTEZ-NOUS DÈS MAINTENANT » | `#E2590F` | blanc | **22px** | 12px 24px | Heebo 15px |
| « Contactez-Nous ! » (accueil) | `#467FF7` | blanc | **100px** (pilule pleine) | 16px 55px | Poppins 16px |
| Footer « Politique… » / « RGPD » | `#467FF7` | blanc | **3px** | 12px 24px | Heebo 15px |
| « Louer cette borne » (Machines) | **`#1A2A83`** | blanc | **3px** (rectangulaire) | 12px 24px | Heebo 15px |

### Échelle typographique mesurée
- **Accueil (Heebo)** : hero H2 **65px/700** blanc · « Vous avez besoin de nous ? » 17px/700 · « 2 DERNIERS SALONS » 32px/500 · « LA FINE ÉQUIPE » 34px/700 · noms équipe 30px/600 · corps 16px/400. Tous couleur `#17252A` (sauf blanc sur fond sombre).
- **Page Machines (Poppins)** : titres machine **42px/700** navy **`#1C244B`** · sous-titres 24px/700.
- Icon-boxes accueil (Tahoma) : 22px/500, `line-height 27.5px`.

### Sections
- Padding au niveau section : **10px** (souvent horizontal seul `0 10px`) → l'espacement vertical vient des marges des widgets/colonnes internes, pas du padding de section.
- Bande pétrole « Vous avez besoin de nous ? » : **`#122E35`** (rgb 18,46,53).

### Footer
- Bande bleue **`#467FF7`** : « © 2026 Tous droits réservés » (hauteur ≈45px, padding `0 37px`).
- Boutons « Politique de confidentialité » + « RGPD » (radius 3px).
- Réseaux sociaux : non détectés au relevé (`TODO`).

### Constat transversal important
Le site **n'est pas homogène** d'une page à l'autre (police Heebo↔Poppins, conteneur 1140↔1280, boutons pilule↔rectangulaires). Pour une reproduction fidèle, **conserver ces différences par page** plutôt que d'uniformiser. Une harmonisation éventuelle sera une amélioration **à valider explicitement** (hors périmètre « fidélité v1 »).
