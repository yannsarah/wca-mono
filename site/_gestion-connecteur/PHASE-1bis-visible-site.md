# Phase 1bis — « Visible sur le site » + champs site (projet GESTION)

Objectif : pouvoir **publier une machine sur le site** (et lui donner une description publique) en un clic
depuis l'interface gestion, et permettre de **masquer** événements / projets / partenaires si besoin.
Testé : une fois `visible_site:true` posé sur une machine, `/api/public/machines` la renvoie.

> 2 fichiers à modifier dans le projet gestion : `west-coast/server.js` (persistance) et
> `west-coast/public/app.js` (la case dans le formulaire matériel).

---

## A. `server.js` — autoriser les nouveaux champs (4 petites modifs)

Remplace chaque ligne « avant » par la version « après » (on ajoute juste des champs aux listes blanches).

**1) Matériel** (≈ ligne 262)
```js
// AVANT
const MF = ['denomination', 'categorie', 'numero_serie', 'emplacement', 'valeur', 'notes', 'photo', 'etat', 'proprietaire', 'proprietaire_nom', 'tarifs'];
// APRÈS
const MF = ['denomination', 'categorie', 'numero_serie', 'emplacement', 'valeur', 'notes', 'photo', 'etat', 'proprietaire', 'proprietaire_nom', 'tarifs', 'visible_site', 'description_site'];
```

**2) Événements** (≈ ligne 565) — ajoute `visible_site` et `affiche` (affiche = image pour le site)
```js
// AVANT
const EF = ['nom', 'lieu', 'partenaire', 'contact', 'date_debut', 'date_fin', 'notes', 'description', 'consignes', 'photo'];
// APRÈS
const EF = ['nom', 'lieu', 'partenaire', 'contact', 'date_debut', 'date_fin', 'notes', 'description', 'consignes', 'photo', 'visible_site', 'affiche'];
```

**3) Projets** (≈ ligne 907)
```js
// AVANT
const PJF = ['nom', 'date_debut', 'budget', 'notes', 'description', 'consignes', 'photo'];
// APRÈS
const PJF = ['nom', 'date_debut', 'budget', 'notes', 'description', 'consignes', 'photo', 'visible_site'];
```

**4) Partenaires** (≈ ligne 808)
```js
// AVANT
const PTF = ['nom', 'adresse', 'logo', 'notes', 'ordre'];
// APRÈS
const PTF = ['nom', 'adresse', 'logo', 'notes', 'ordre', 'visible_site'];
```

> Rappel : événements / projets / partenaires sont **visibles par défaut** sur le site. Ces champs servent
> surtout à pouvoir en **masquer** un (mettre la case sur « Non »). Les **machines** sont **masquées par défaut**
> (opt-in) → c'est pour elles que la case ci-dessous est indispensable.

---

## B. `public/app.js` — case « Visible sur le site » dans la fiche Matériel (2 modifs)

**1) Ajouter le champ dans le formulaire.** Trouve la ligne du champ « Notes » du matériel :
```js
    <label class="field"><span>Notes</span><textarea id="f-notes">${esc(e.notes)}</textarea></label>
```
et **insère juste AVANT** :
```js
    <div class="row2">
      <label class="field"><span>Visible sur le site public</span><select id="f-vissite"><option value="0" ${e.visible_site?'':'selected'}>Non</option><option value="1" ${e.visible_site?'selected':''}>✅ Oui — affichée sur westcoastarcades.fr</option></select></label>
      <label class="field"><span>Description (site public)</span><input id="f-descsite" value="${esc(e.description_site||'')}" placeholder="texte court affiché sur le site"></label>
    </div>
```

**2) Envoyer les nouveaux champs.** Trouve la construction du `body` (≈ ligne 671) :
```js
    const body={ denomination:$('#f-denom').value.trim(), categorie:$('#f-cat').value, numero_serie:$('#f-serie').value.trim(), emplacement:$('#f-empl').value.trim(), valeur:$('#f-val').value, notes:$('#f-notes').value.trim(), fonctionnel:$('#f-fonc').value==='1', etat:$('#f-etat').value, proprietaire:$('#f-prop').value, proprietaire_nom:$('#f-propnom').value.trim(), photo:photoData };
```
et ajoute, avant le `};` final, les deux champs :
```js
    const body={ denomination:$('#f-denom').value.trim(), categorie:$('#f-cat').value, numero_serie:$('#f-serie').value.trim(), emplacement:$('#f-empl').value.trim(), valeur:$('#f-val').value, notes:$('#f-notes').value.trim(), fonctionnel:$('#f-fonc').value==='1', etat:$('#f-etat').value, proprietaire:$('#f-prop').value, proprietaire_nom:$('#f-propnom').value.trim(), photo:photoData, visible_site:$('#f-vissite').value==='1', description_site:$('#f-descsite').value.trim() };
```

---

## C. Tester
1. Redéploie l'app gestion.
2. Ouvre une fiche **Matériel** (ex. une borne), passe « Visible sur le site » sur **Oui**, remplis la description, enregistre.
3. Vérifie : `https://gestion.westcoastarcades.fr/api/public/machines` doit maintenant lister cette machine.

Ensuite, côté site, je brancherai la page **Nos Machines** sur `/api/public/machines` (Phase 2c) : tes bornes
cochées « visibles » s'afficheront automatiquement, avec leur description publique.
