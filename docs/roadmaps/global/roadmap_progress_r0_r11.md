# Progression Roadmap CMDA DEV - R0 a R11

## Suivi de validation

Ce fichier sert de tableau de progression officiel. Une roadmap est cochee uniquement lorsqu'elle est validee fonctionnellement et documentee.

| Validation | Roadmap | Statut | Theme | Documentation |
| --- | --- | --- | --- | --- |
| [ ] | R0 | A formaliser | Cadrage fonctionnel | A creer |
| [x] | R1 | Validee | Socle API / Front | `../r1/roadmap_r1_socle_api_front.md` |
| [x] | R2 | Validee | Authentification JWT | `../r2/roadmap_r2_auth_jwt.md` |
| [x] | R3 | Validee | Routes et roles | `../r3/roadmap_r3_routes_roles.md` |
| [x] | R4 | Validee | Gestion des erreurs | `../r4/roadmap_r4_gestion_erreurs.md` |
| [x] | R5 | Validee V0 | Architecture navigation et espaces utilisateurs | `../r5/roadmap_r5_architecture_navigation.md` |
| [ ] | R6 | En cours - E9 terminee | Donnees metier et perimetres utilisateurs | `../r6/roadmap_r6_donnees_metier_perimetres.md` |
| [ ] | R7 | En cours - E6 terminee | CRUD structures hierarchiques | `../r7/roadmap_r7_structures_hierarchiques.md` |
| [ ] | R8 | A venir | Membres avances | A creer |
| [ ] | R9 | A venir | Tableaux de bord et statistiques | A creer |
| [ ] | R10 | A venir | Qualite, accessibilite, performance | A creer |
| [ ] | R11 | A venir | Extension multi-organisation / Hub mondial | A creer |

## Derniere validation

R5 V0 est consideree terminee avec :

- Layout public et layout connecte.
- Restructuration des routes.
- Accueil public CMDA DEV.
- Header et sidebar connectes.
- Espaces Berger, Regional et Provincial.
- Listes membres responsive.
- Fiche detail membre en disposition paysage.
- Harmonisation R5-E7+ : modification inline depuis la fiche et refonte de l'ajout membre.
- Documentation R5-E1 a R5-E7+.

## Prochaine validation attendue

R6 doit brancher les ecrans R5 sur les vraies donnees metier et verrouiller les perimetres d'acces par role :

- Berger : membres de sa fraternite.
- Regional : fraternites et membres de sa region.
- Provincial : regions, fraternites et membres de sa province.

## Avancement R6

- [x] R6-E1 - Audit donnees metier et endpoints disponibles.
- [x] R6-E2 - Modele de perimetre utilisateur et endpoint `/api/me/scope`.
- [x] R6-E3 - Services Angular dynamiques.
- [x] R6-E4 - Espace Provincial dynamique.
- [x] R6-E5 - Espace Regional dynamique.
- [x] R6-E6 - Espace Berger / Fraternite dynamique.
- [x] R6-E7 - Liste membres par perimetre.
- [x] R6-E8 - Fiche detail membre securisee.
- [x] R6-E9 - Nettoyage des donnees statiques.
- [ ] R6-E10 - Tests et validation metier.

## Avancement R7

- [x] R7-E1 - Audit des structures existantes.
- [x] R7-E2 - Regles metier et perimetres CRUD.
- [x] R7-E3 - Backend CRUD securise.
- [x] R7-E4 - Endpoints API des structures, realises avec R7-E3.
- [x] R7-E5 - Services Angular des structures.
- [x] R7-E6 - Ecran ADMIN Structures.
- [ ] R7-E7 - Consultation des regions cote Provincial.
- [ ] R7-E8 - Consultation des fraternites cote Regional.
- [ ] R7-E9 - Formulaires responsive.
- [ ] R7-E10 - Archivage, reactivation et garde-fous.
- [ ] R7-E11 - Tests et documentation.
