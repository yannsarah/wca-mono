// Jeu de données d'exemple pour West Coast Arcades.
// Lancer : npm run seed   (écrase data.json — à n'utiliser qu'en démo)
import crypto from 'node:crypto';
import { db, save, nextId, setData } from './store.js';

function makePw(pw){ const salt=crypto.randomBytes(12).toString('hex'); return { salt, hash: crypto.scryptSync(String(pw),salt,32).toString('hex') }; }
const today = new Date();
const iso = d => d.toISOString().slice(0,10);
const plus = n => { const d=new Date(today); d.setDate(d.getDate()+n); return iso(d); };

setData({ materiel:[], devis:[], evenements:[], reparations:[], ventes:[], prets:[], users:[], seq:{}, settings:{} });
const d = db();

// Utilisateurs
const a=makePw('arcade'); d.users.push({ id:nextId('users'), login:'admin', nom:'Admin', prenom:'West Coast', role:'admin', ...a, must_change:false, created_at:new Date().toISOString() });
const t=makePw('tech'); d.users.push({ id:nextId('users'), login:'tech', nom:'Dupont', prenom:'Léo', role:'technicien', ...t, must_change:false, created_at:new Date().toISOString() });

// Matériel
const M=(denomination,categorie,emplacement,fonctionnel=true,valeur=0,numero_serie='')=>{ const id=nextId('materiel'); d.materiel.push({id,denomination,categorie,emplacement,fonctionnel,valeur,numero_serie,notes:'',photo:''}); return id; };
const pac   = M('Borne Pac-Man',"Borne d'arcade",'Local Marseille',true,1200,'PAC-001');
const sf2   = M('Borne Street Fighter II',"Borne d'arcade",'Local Marseille',true,1500,'SF2-014');
const addams= M('Flipper Addams Family','Flipper','Local Marseille',true,2800,'AF-220');
const tron  = M('Borne TRON',"Borne d'arcade",'Atelier',false,1800,'TRN-007');
const neo   = M('Borne Neo-Geo MVS',"Borne d'arcade",'Local Aix',true,1300,'NEO-045');
const snes  = M('Console Super Nintendo','Console rétro','Étagère B3',true,120,'SNES-1');
const crt   = M('Écran CRT 26"','Écran / TV','Réserve',true,200,'CRT-12');
M('Flipper Twilight Zone','Flipper','Local Aix',true,3200,'TZ-088');

// Réparation en cours → TRON bloqué
d.reparations.push({ id:nextId('reparations'), materiel_id:tron, panne:'Écran qui scintille, alim à vérifier', statut:'en_cours', technicien_id:2, date_entree:plus(-5), date_sortie:'', cout:0, notes:'' });

// Devis actif → réserve Pac-Man et Addams du +10 au +12
const dvId=nextId('devis');
d.devis.push({ id:dvId, numero:`D${today.getFullYear()}-${String(dvId).padStart(4,'0')}`, date_creation:iso(today),
  client_nom:'Mairie de Cassis', client_contact:'06 12 34 56 78', lieu:'Fête du port — Cassis',
  date_debut:plus(10), date_fin:plus(12), statut:'envoye', remise:0, notes:'Animation week-end',
  lignes:[ {materiel_id:pac,prix:250,quantite:1,designation:''}, {materiel_id:addams,prix:300,quantite:1,designation:''} ] });

// Prêt en cours → Neo-Geo prêté
d.prets.push({ id:nextId('prets'), materiel_id:neo, emprunteur:'Bar Le Flipper', contact:'04 91 00 00 00', date_debut:plus(-2), date_fin:plus(8), statut:'en_cours', notes:'' });

// Événement à venir
d.evenements.push({ id:nextId('evenements'), nom:'Festival rétro Marseille', lieu:'Parc Chanot', date_debut:plus(10), date_fin:plus(12), notes:'', materiel_ids:[] });

// Vente passée → SNES vendue
d.ventes.push({ id:nextId('ventes'), materiel_id:snes, client_nom:'Julien R.', client_contact:'', prix:150, date:plus(-20), notes:'' });

save();
console.log('✅ Données de démonstration créées.');
console.log('   Comptes : admin/arcade (administrateur), tech/tech (technicien)');
