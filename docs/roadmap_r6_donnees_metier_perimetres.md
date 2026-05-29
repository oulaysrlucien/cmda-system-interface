# Roadmap R6 - Donnees metier et perimetres utilisateurs

## Objectif

Brancher les espaces crees en R5 sur les vraies donnees API et appliquer les perimetres metier selon le role connecte.

R5 a construit l'interface. R6 doit rendre cette interface vivante et coherente avec la base de donnees.

## Philosophie metier

La hierarchie reste :

```text
Province
  -> Regions
      -> Fraternites
          -> Membres
```

Chaque role voit uniquement son perimetre :

- `ADMIN` : toutes les donnees.
- `PROVINCIAL` : sa province, ses regions, les fraternites de ses regions, les membres rattaches.
- `REGIONAL` : sa region, ses fraternites, les membres rattaches.
- `BERGER` : sa fraternite et ses membres.

## Etapes definies

### R6-E1 - Audit des donnees metier et endpoints disponibles

Auditer le backend, les DTOs, les services Angular et les donnees statiques encore presentes dans R5.

Livrable : `roadmap_r6_e1_audit_donnees_metier.md`

### R6-E2 - Modele de perimetre utilisateur

Definir precisement ce que chaque role voit et quels endpoints doivent porter ce perimetre.

Livrables :

- matrice des perimetres `ADMIN`, `PROVINCIAL`, `REGIONAL`, `BERGER`.
- proposition d'endpoints "mon perimetre".
- implementation du contrat `GET /api/me/scope`.

Etat : termine.

Documentation : `roadmap_r6_e2_modele_perimetre_utilisateur.md`.

### R6-E3 - Services Angular dynamiques

Ajouter ou completer les services Angular pour remplacer les donnees statiques :

- `CurrentUserScopeService`
- `ProvinceService`
- `RegionService`
- `FraternityService`
- `CmdaMemberService`

Livrable : services types, prets pour les vues hierarchiques R5.

Etat : termine.

Documentation : `roadmap_r6_e3_services_angular_dynamiques.md`.

### R6-E4 - Espace Provincial dynamique

Brancher `/app/provincial/province` sur les vraies donnees de la province de l'utilisateur connecte.

Livrable : province, regions, metriques et cartes dynamiques.

Etat : termine.

Documentation : `roadmap_r6_e4_espace_provincial_dynamique.md`.

### R6-E5 - Espace Regional dynamique

Brancher `/app/regional/region` sur la vraie region de l'utilisateur connecte.

Livrable : region, fraternites, metriques et cartes dynamiques.

Etat : termine.

Documentation : `roadmap_r6_e5_espace_regional_dynamique.md`.

### R6-E6 - Espace Berger / Fraternite dynamique

Brancher `/app/berger/fraternity` sur la vraie fraternite de l'utilisateur connecte.

Livrable : fraternite, groupes/services si disponibles, metriques et acces membres dynamiques.

### R6-E7 - Liste membres par perimetre

Finaliser la liste membres selon le role connecte.

Livrables :

- `ADMIN` utilise `/members/all`.
- `PROVINCIAL`, `REGIONAL`, `BERGER` utilisent `/members`.
- recherche et filtres restent dans le perimetre backend.

### R6-E8 - Fiche detail membre securisee

Verifier que la fiche detail respecte le perimetre backend.

Livrables :

- `/app/members/:id` charge uniquement un membre visible par l'utilisateur connecte.
- gestion propre des cas hors perimetre.

### R6-E9 - Nettoyage des donnees statiques

Retirer progressivement les donnees mockees de `app-routing.module.ts`.

Livrables :

- routes reduites au mode ou aux informations minimales.
- composants alimentes par services API.

### R6-E10 - Tests et validation metier

Valider les parcours reels :

- Provincial -> regions -> fraternites -> membres.
- Regional -> fraternites -> membres -> detail.
- Berger -> fraternite -> membres -> detail.
- tentatives hors perimetre.

Livrable : validation manuelle documentee.

## Livrable R6 attendu

A la fin de R6, les ecrans R5 ne seront plus seulement des maquettes fonctionnelles :

- les regions proviendront de l'API.
- les fraternites proviendront de l'API.
- les membres seront charges selon le role.
- les filtres seront dynamiques.
- les perimetres seront respectes.
