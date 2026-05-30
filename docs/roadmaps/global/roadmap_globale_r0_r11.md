# Roadmap globale CMDA DEV - R0 a R11

## Objectif

Donner une vue complete de la progression du projet CMDA DEV, depuis le cadrage initial jusqu'aux evolutions futures.

## Vue synthese

Le suivi coche / non coche est maintenu dans `roadmap_progress_r0_r11.md`.

| Roadmap | Statut | Theme | Objectif |
| --- | --- | --- | --- |
| R0 | A formaliser | Cadrage fonctionnel | Clarifier le metier, les roles, la hierarchie CMDA et les parcours principaux. |
| R1 | Termine | Socle API / Front | Mettre en place les bases Angular et Spring Boot, communication API et premiers modules. |
| R2 | Termine | Authentification JWT | Ajouter l'authentification, le token JWT et la gestion de session cote front. |
| R3 | Termine | Routes et roles | Proteger les routes Angular et filtrer les acces selon les roles. |
| R4 | Termine | Gestion des erreurs | Centraliser les erreurs, ajouter pages 401/403/404 et notifications UX. |
| R5 | V0 terminee | Architecture navigation | Layout public, layout connecte, accueil, espaces par role, hierarchie et fiche membre. |
| R6 | En cours - implementation E1 a E9 terminee | Donnees metier et perimetres | Brancher les espaces R5 sur les vraies donnees API selon Province, Region, Fraternite et role. |
| R7 | En cours - E6 terminee | CRUD structures | Finaliser CRUD Province, Region, Fraternite et relations hierarchiques. |
| R8 | A venir | Membres avances | Photo, fiche complete, historique, groupes/services, imports/exports consolides. |
| R9 | A venir | Tableaux de bord et statistiques | Indicateurs reels, graphiques, activites, documents et evenements. |
| R10 | A venir | Qualite, accessibilite, performance | Tests, responsive final, accessibilite, budgets, optimisation bundle. |
| R11 | A venir | Extension multi-organisation / Hub mondial | Generaliser le modele pour d'autres provinces, organisations et un hub mondial. |

## Roadmaps documentees

- `referentiel_regles_metier_mvp_et_evolutions.md`
- `../r1/roadmap_r1_socle_api_front.md`
- `../r2/roadmap_r2_auth_jwt.md`
- `../r3/roadmap_r3_routes_roles.md`
- `../r4/roadmap_r4_gestion_erreurs.md`
- `../r5/roadmap_r5_architecture_navigation.md`
- `../r5/roadmap_r5_e1_audit_navigation.md`
- `../r5/roadmap_r5_e2_architecture_layouts.md`
- `../r5/roadmap_r5_e3_accueil_public.md`
- `../r5/roadmap_r5_e4_header_sidebar_connectes.md`
- `../r5/roadmap_r5_e5_espaces_utilisateurs.md`
- `../r5/roadmap_r5_e6_espaces_hierarchiques_listes.md`
- `../r5/roadmap_r5_e7_fiche_detail_membre.md`
- `../r6/roadmap_r6_donnees_metier_perimetres.md`
- `../r6/roadmap_r6_e1_audit_donnees_metier.md`
- `../r7/roadmap_r7_structures_hierarchiques.md`
- `../r7/roadmap_r7_e1_audit_structures_existantes.md`
- `../r7/roadmap_r7_e2_regles_metier_crud.md`
- `../r7/roadmap_r7_e3_backend_crud_securise.md`
- `../r7/roadmap_r7_e5_services_angular_structures.md`
- `../r7/roadmap_r7_e6_ecran_admin_structures.md`

## R5 - V0 terminee

R5 a pose l'architecture visible de l'application :

- Layout public.
- Layout connecte.
- Page d'accueil publique.
- Header et sidebar connectes.
- Espaces par role.
- Vues hierarchiques Province, Region, Fraternite.
- Liste membres responsive.
- Fiche detail membre paysage.

## Suite immediate

La suite logique est R7-E7 : consolider la consultation des regions cote Provincial, tout en gardant R6-E10 pour les tests de validation metier.
