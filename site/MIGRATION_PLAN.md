# MIGRATION_PLAN — West Coast Arcades

> Plan de reconstruction **fidèle** du site existant, à partir de `DESIGN_REFERENCE.md`.
> Principe : reproduire d'abord à l'identique, améliorer ensuite seulement sur demande explicite.
> **Aucun contenu n'est supprimé, aucune image n'est remplacée, aucun texte n'est réécrit sans validation.**

---

## A. Pré-requis bloquants (à régler avant de coder)

Ces éléments ne sont **pas** dans l'export et sont nécessaires à une reproduction réellement fidèle :

1. **CSS compilé du thème + Element Pack** (header/footer, boutons, espacements, hauteurs) — via dossier `/wp-content/themes/…` + CSS Element Pack, ou un **backup cPanel complet**, ou autorisation de **lecture du site rendu** (Claude in Chrome) pour relever les valeurs exactes.
2. Réponses aux `TODO` de `DESIGN_REFERENCE.md` §14 (police hero, libellé menu, footer, responsive, liens partenaires).

> Tant que (1) n'est pas fourni, l'implémentation reproduira fidèlement **couleurs, polices, tailles, ordre et contenu** (sources sûres), mais les **espacements/paddings/rayons exacts** seront approchés puis ajustés après comparaison visuelle (voir §F).

---

## B. Pages à reconstruire (ordre proposé)

| # | Page | Source contenu | Priorité |
|---|---|---|---|
| 1 | Accueil (`/`) | `_elementor_data` id 42 (14 sections, cf. DESIGN_REFERENCE §10) | Haute |
| 2 | Nos Machines (`/nos-machines/`) | id 2262 (7 bornes + boutons « Louer ») | Haute |
| 3 | Nos Salons (`/nos-salons/`) + sous-pages | id 3664 (+ BIF, Boc'n'Geek, Mazé-Millon, Salon du Livre) | Haute |
| 4 | Les Projets (`/les-projets-west-coast-arcades/`) | id 4900 | Moyenne |
| 5 | Projet Virtua Racing | id 4809 | Moyenne |
| 6 | Projet Virtua Fighter 2 | id 3555 | Moyenne |
| 7 | Partenaires (`/nos-partenaires/`) | id 542 (logos) | Moyenne |
| 8 | WIP / le bricolage | id 5126 | Basse |
| 9 | Calendrier | id 2674 (The Events Calendar) | Moyenne |
| 10 | Contact | id 1466 (Forminator) | Moyenne |
| 11 | Blog + articles (9) | posts | Moyenne |
| 12 | Politique de confidentialité / RGPD | id 5076 / 5103 | Basse |
| 13 | Pages évènement ponctuelles (Games in Cholet 2024, Fête du Jeu 2025…) | pages dédiées | Basse |

---

## C. Composants nécessaires (à construire une fois, réutilisables)

1. **Header** — version transparente (accueil) + version sticky noire (pages internes). Hamburger gauche, logo centré, nav horizontale.
2. **Footer** — bandes bleues `#467FF7`, mentions légales + RGPD (+ réseaux `TODO`).
3. **Bouton pilule** — variantes orange `#E2590F`, bleu `#467FF7`, bleu hero `#4057F7`.
4. **Bandeau CTA pleine largeur** (pétrole `#122E35` / bleu).
5. **Icon-box** d'accès rapide (grille 4 colonnes).
6. **Titre + souligné scribble rouge** (`#F10000`).
7. **Carte membre** (image carrée + nom 30px + description).
8. **Galerie d'images** en grille.
9. **Carte machine** (photo + nom + descriptif + bouton « Louer cette borne »).
10. **Liste évènements / cartes salon** (affiche + date + lieu).
11. **Timeline** (page histoire, si conservée — à valider, absente du site d'origine sous cette forme).
12. **Formulaire de contact** (reproduction du Forminator : champs nom, email, sujet, message).

---

## D. Contenus à récupérer (depuis l'export — déjà disponibles)

- Textes exacts de chaque page/section (extraits des `_elementor_data` / `content:encoded`).
- Descriptions des 7 machines (Blast, Sega Rally, Daytona, Manx TT, Virtua Racing, Virtua Fighter 2, DDR).
- Récits de restauration (Virtua Racing « projet terminé », Virtua Fighter 2 « en cours »).
- Texte « histoire » de l'asso (2014 → Games in Cholet).
- 9 membres + descriptions exactes.
- 5 évènements The Events Calendar (dates, lieux) + éditions passées.
- Mentions légales / RGPD / politique de confidentialité.

---

## E. Assets à copier

- **Logo** : `Logo-WCA-intro-350px.png`.
- **Photos** machines, portraits équipe, galeries restauration, affiches salons, logos partenaires (URLs listées dans `DESIGN_REFERENCE` §12).
- **Recommandation** : rapatrier les images en local (dossier `/assets/img`) plutôt que de hot-linker depuis `westcoastarcades.fr`, pour être indépendant de l'ancien WordPress et éviter une perte d'images à la bascule. → nécessite l'accès au dossier `/wp-content/uploads` (FTP/cPanel) ou téléchargement. `TODO`.
- Polices **Poppins** via Google Fonts (poids 300–700).

---

## F. Méthode d'implémentation (fidélité)

1. Construire les **composants partagés** (header, footer, boutons, tokens CSS = palette §1, type scale §3, breakpoints 768/1025).
2. Reconstruire **page par page**, section par section dans l'ordre exact.
3. Après chaque page : **comparer visuellement** au site d'origine (capture vs rendu) et ajuster espacements/proportions.
4. Les valeurs non confirmées (paddings, rayons) sont posées en **variables CSS** clairement nommées pour ajustement rapide après obtention du CSS d'origine.

---

## G. Différences connues entre l'ancien site et le nouveau projet

| Sujet | Ancien (WordPress) | Nouveau (cible) | Impact |
|---|---|---|---|
| Moteur | WordPress + Elementor + Element Pack | Site **codé en HTML/CSS/JS** | Pas de back-office WP ; mises à jour via fichiers/Git |
| Rendu header/footer | Element Pack builder + CSS compilé | Recodé à la main d'après la référence | Risque d'écart de pixels (cf. §H) |
| Galerie/posts dynamiques | Widgets dynamiques (posts, lightbox) | À recoder en statique ou JS léger | Comportement « Charger plus » à reproduire ou simplifier (à valider) |
| Agenda | The Events Calendar | À recoder (liste statique) ou connecteur futur vers `gestion.westcoastarcades.fr` | Fonctionnalité calendrier à arbitrer |
| Formulaire | Forminator (envoi mail) | Formulaire HTML à brancher (mail/API) | Backend d'envoi à définir |
| Multilingue | FR uniquement | FR (+ EN prévu plus tard, sur demande) | Hors périmètre fidélité v1 |

> ⚠️ **Maquettes précédentes** (`maquette-accueil-WCA-v2.html`, `page-*-WCA.html`) : créées avant cet audit, avec des **écarts** (police Montserrat au lieu de Poppins, bleu `#2f6df6` au lieu de `#467FF7`, sections réorganisées, timeline ajoutée). Elles **ne servent pas de référence** et seront soit corrigées soit refaites. Conservées pour l'instant (aucune suppression sans validation).

---

## H. Risques de perte visuelle (à surveiller)

1. **Espacements / paddings / hauteurs** non disponibles dans l'export → risque d'écart tant que le CSS d'origine n'est pas fourni (cf. §A). **Risque principal.**
2. **Border-radius et hover des boutons** (pilules) approchés.
3. **Police du hero** (mono ?) non tranchée.
4. **Comportements dynamiques** (lightbox galerie, « Charger plus », calendrier) : perte de fonctionnalité si recodés en statique sans validation.
5. **Footer Element Pack** (colonnes/réseaux) partiellement documenté.
6. **Images hot-linkées** : si l'ancien WordPress est désactivé avant rapatriement des médias → images cassées. Rapatrier avant bascule.
7. **Polices résiduelles** (Montserrat/Baloo 2) sur certaines pages : à vérifier individuellement pour ne pas uniformiser à tort.

---

## I. Prochaine étape

➡️ Validation de `DESIGN_REFERENCE.md` + `MIGRATION_PLAN.md` par le porteur du projet.
➡️ Fourniture (si possible) du **CSS du thème / backup cPanel** ou autorisation de lecture du site rendu, pour lever les `TODO` avant de coder.
➡️ Ensuite seulement : implémentation, en commençant par les composants partagés puis la page d'accueil.
