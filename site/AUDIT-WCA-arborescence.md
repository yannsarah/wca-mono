# Audit du site West Coast Arcades & arborescence cible

**Source :** export WordPress `westcoastarcades.WordPress.2026-06-12.xml` (433 éléments)
**Site existant :** WordPress + Elementor (+ extensions Element Pack `extb_`, The Events Calendar `tribe_`, Forminator)
**Objectif :** refonte en site **codé sur mesure**, avec connecteurs futurs vers `gestion.westcoastarcades.fr`
**Date :** 12 juin 2026

---

## 1. Synthèse de l'existant

| Type de contenu | Quantité | À reprendre ? |
|---|---|---|
| Pages publiées | 19 (+2 brouillons) | Oui, en partie |
| Articles (blog) | 9 publiés (+4 brouillons) | Oui |
| Médias (images) | 311 fichiers | Oui (tri à faire) |
| Événements (The Events Calendar) | 5 | Oui → module agenda |
| Lieux d'événements | 5 | Oui (métadonnées) |
| Templates Elementor / Element Pack | ~50 (`elementor_library`, `extb_*`) | **Non** (abandonnés avec WP) |
| Formulaire (Forminator) | 1 | À recoder (contact) |
| Menu de navigation | 6 entrées | Refonte |

Répartition des médias : 119 `.jpeg`, 87 `.jpg`, 63 `.webp`, 33 `.png`, 9 `.svg`. Beaucoup de doublons probables (tailles Elementor générées) → un nettoyage réduira fortement le volume réel.

---

## 2. Arborescence actuelle (menu principal)

Le menu compte 6 entrées (certains libellés sont vides dans l'export mais pointent vers une page) :

1. **Accueil** → page 42
2. **Nos Machines** → page 2262
3. **Nos Salons** → page 3664 (avec sous-pages : LA BIF 2025, BOC AND GEEK 2025, MAZÉ-MILLON 2025, Salon du Livre et du Jeu 2025)
4. **Partenaires** → page 542
5. **(catégorie 14)** → Agenda / Blog
6. **Contacter l'Asso** → page 1466

À côté du menu, d'autres pages existent mais ne sont pas clairement reliées : Nos Projets, Projet Virtua Racing, Projet Virtua Fighter 2, WIP (bricolage), Calendrier, Games in Cholet 2024, La Fête du Jeu 2025, Politique de confidentialité, RGPD.

**Constat :** l'architecture est devenue floue. Des contenus forts (les projets de restauration, le WIP) ne sont pas mis en avant dans la navigation, et les pages « salon » se sont accumulées au fil des événements sans logique d'archivage.

---

## 3. Inventaire détaillé du contenu

### Pages clés (à conserver / refondre)

- **Accueil (42)** — présentation de l'association, mise en avant projet en cours (Virtua Fighter 2), accès rapides (Nos Machines, Calendrier, Nos Projets, la Chaîne), section « La fine équipe » (Cédric, Denis, Christophe, Stéphane, Christophe, Yannou, Marine, Alexis, Quentin), mission de préservation du patrimoine, appel à contact pour organiser un événement.
- **Nos Machines (2262)** — catalogue de bornes avec descriptif + bouton « Louer cette borne ». Machines présentes : **Borne Blast, Sega Rally, Daytona USA, Manx TT Superbike, Virtua Racing, Virtua Fighter 2, Borne DDR** (7 bornes louables).
- **Nos Projets (4900)** — restaurations en cours/terminées (Virtua Fighter 2, Virtua Racing) avec récit détaillé.
- **Projet Virtua Racing (4809)** — reportage photo de restauration (« projet terminé »), ton très narratif et passionné.
- **Projet Virtua Fighter 2 (3555)** — borne en cours.
- **WIP – le bricolage (5126)** — sticks (NéoGéo, Arcade) à louer, page encore en chantier (textes « Texte », « sous-titre » placeholder).
- **Nos Salons (3664)** + sous-pages BIF, Boc'n'Geek, Mazé-Millon, Salon du Livre et du Jeu, Fête du Jeu, Games in Cholet.
- **Partenaires (542)** — page quasi vide en texte (logos en images) ; **CRAZY FLIP** à mettre en avant comme partenaire majeur.
- **Contact (1466)** — formulaire Forminator.
- **Calendrier (2674)** — intégration The Events Calendar.
- **RGPD (5103)** + **Politique de confidentialité (5076)** — pages légales à conserver.

### Articles (blog) — 9 publiés

Comptes-rendus de salons et présentation de l'association : *La BIF 2025*, *Games in Cholet revient en 2025*, *Les préparatifs du Salon Games in Cholet 2025*, *La Fête du Jeu 2025 à Saint Paul du Bois*, *Le salon du Livre et du Jeu 2025 à Briançon*, *Mazé-Millon le mini salon*, *Breizh Retro Legend's*, *WestCoastArcades : une association dédiée à la préservation du jeu vidéo ancien*.

### Événements à venir (The Events Calendar)

| Événement | Dates | Lieu |
|---|---|---|
| BOC'N'GEEK 2025 | 20–21 sept. 2025 | Bocapol |
| Breizh Rétro Légend | 7–8 mars 2026 | Mordelles |
| La Fête du Jeu | 21 mars 2026 | Chemillé |
| CRAZY FLIP 2026 | 4–5 avr. 2026 | Challans |
| HFS Summer 2026 | 29–31 mai 2026 | Évreux |

---

## 4. Forces & faiblesses

**Forces du contenu actuel**
- Récits de restauration riches et authentiques (vrai différenciateur, à valoriser fortement).
- Ton chaleureux, identité d'équipe forte et sympathique.
- Vrai fonds documentaire photo (avant/après restauration).
- Activités concrètes et monétisables : location de bornes, présence salons.

**Faiblesses à corriger dans la refonte**
- Navigation confuse, contenus forts non mis en avant.
- Pages « événement » accumulées sans archivage → arborescence qui gonfle.
- Contenus placeholder visibles (page WIP : « Texte », « sous-titre »).
- Dépendance lourde à Elementor + multiples extensions (lenteur, dette technique) — d'où la refonte custom.
- Page Partenaires vide de texte (uniquement des logos), CRAZY FLIP pas assez valorisé alors que c'est un partenaire majeur.
- Pas de structure claire pour la fonction « location » alors que c'est centrale.

---

## 5. Plan de contenu / migration

**À garder et refondre (contenu fort)**
- Accueil, Nos Machines, Nos Projets (+ projets détaillés), Nos Salons, Blog, Contact, pages légales.

**À restructurer**
- Regrouper les pages « salon » et « projet » sous des rubriques avec un système de liste + fiche, plutôt qu'une page WordPress par item.
- Transformer la page Partenaires en vraie page éditoriale (mise en avant CRAZY FLIP + autres).
- Finir/réécrire la page WIP (supprimer les placeholders).

**À archiver**
- Anciens événements passés (2024/2025) → archive « éditions précédentes » plutôt que dans le menu principal.

**À recréer techniquement (pas migrable depuis l'export)**
- Templates Elementor/Element Pack, formulaire Forminator, intégration agenda → à recoder.

**Médias :** dédoublonner les 311 fichiers (les déclinaisons de tailles Elementor n'ont pas à être migrées), ne garder que les originaux, convertir en WebP optimisé.

---

## 6. Arborescence cible proposée (site custom)

```
Accueil
├── L'association
│   ├── Qui sommes-nous / Notre mission (préservation du patrimoine)
│   ├── L'équipe (la fine équipe)
│   └── Partenaires (CRAZY FLIP en tête)
├── Nos Machines  (catalogue filtrable : bornes + sticks)
│   └── Fiche machine (descriptif + photos + bouton « Louer »)
├── Location  (page service : comment louer une borne pour un événement)
├── Nos Projets  (restaurations)
│   ├── Projets en cours
│   └── Projets terminés → fiche projet (récit + galerie avant/après)
├── Événements
│   ├── Agenda (prochains salons)  ← connecteur possible vers gestion
│   └── Éditions précédentes (archives)
├── Blog / Actualités
├── Contact  (formulaire)
└── Mentions légales · RGPD · Politique de confidentialité (footer)
```

Points d'accroche pour les **connecteurs futurs vers `gestion.westcoastarcades.fr`** : catalogue/disponibilité des machines, agenda des événements, demandes de location, espace adhérents/bénévoles. → prévoir dès l'architecture une couche d'accès données (API) découplée du rendu.

---

## 7. Recommandations techniques (à valider)

- **Stack** : à arbitrer avec toi (ex. site statique + CMS headless, ou framework type Astro/Next) selon qui mettra à jour le contenu et le besoin de connexion à la gestion.
- **Contenu éditable** : l'asso publie régulièrement (salons, projets) → prévoir un moyen simple de mise à jour (CMS léger ou interface dédiée), idéalement mutualisé avec le site de gestion.
- **Médias** : pipeline d'optimisation (WebP, lazy-loading) — point faible actuel.
- **SEO / migration** : conserver les URLs existantes ou poser des redirections 301 (les pages sont bien indexées : `/nos-machines/`, `/nos-salons/...`, projets).
- **Identité** : charte graphique / logo / couleurs à fournir (en attente de ta réponse) ; le site reste *a priori* monolingue FR (à confirmer).
- **Réseaux sociaux** : intégrer liens Facebook + la chaîne vidéo + autres réseaux dans le header/footer.

---

## 8. Prochaines étapes

1. Tu valides l'**arborescence cible** (section 6) et me confirmes charte graphique + langue.
2. On choisit la **stack technique**.
3. Je produis les **wireframes** des pages clés (Accueil, Nos Machines + fiche, Nos Projets + fiche, Événements, Contact).
4. Intégration / développement du thème custom, puis branchement progressif des connecteurs vers le site de gestion.
