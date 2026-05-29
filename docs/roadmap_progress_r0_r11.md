# Progression Roadmap CMDA DEV - R0 a R11

## Suivi de validation

Ce fichier sert de tableau de progression officiel. Une roadmap est cochee uniquement lorsqu'elle est validee fonctionnellement et documentee.

| Validation | Roadmap | Statut | Theme | Documentation |
| --- | --- | --- | --- | --- |
| [ ] | R0 | A formaliser | Cadrage fonctionnel | A creer |
| [x] | R1 | Validee | Socle API / Front | `roadmap_r1_socle_api_front.md` |
| [x] | R2 | Validee | Authentification JWT | `roadmap_r2_auth_jwt.md` |
| [x] | R3 | Validee | Routes et roles | `roadmap_r3_routes_roles.md` |
| [x] | R4 | Validee | Gestion des erreurs | `roadmap_r4_gestion_erreurs.md` |
| [x] | R5 | Validee V0 | Architecture navigation et espaces utilisateurs | `roadmap_r5_architecture_navigation.md` |
| [ ] | R6 | Prochaine etape | Donnees metier et perimetres utilisateurs | `roadmap_r6_donnees_metier_perimetres.md` |
| [ ] | R7 | A venir | CRUD structures hierarchiques | A creer |
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
