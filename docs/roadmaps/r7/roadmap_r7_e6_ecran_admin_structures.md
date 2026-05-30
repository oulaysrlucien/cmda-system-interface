# R7-E6 - Ecran ADMIN : gestion des structures

## Objectif

Creer un espace ADMIN dedie au pilotage de la hierarchie CMDA DEV :

```text
Province
  -> Region
      -> Fraternite
```

L'ecran reprend la philosophie visuelle du dashboard ADMIN de reference : lecture rapide, compteurs synthetiques et navigation claire.

## Route

```text
/app/admin/structures
```

Cette route est protegee par `RoleGuard` et reservee au role `ADMIN`.

## Donnees dynamiques

Le composant charge les vraies donnees avec :

- `ProvinceService.getAll()`
- `RegionService.getAll()`
- `FraternityService.getAll()`
- les trois methodes `getArchived()`

Les compteurs correspondent donc aux structures actives et archivees disponibles dans l'API.

## Navigation hierarchique

L'ecran presente trois niveaux visibles :

- Provinces
- Regions
- Fraternites

Un clic sur une province filtre les regions. Un clic sur une region filtre les fraternites. Une action permet d'effacer la selection et une autre d'actualiser les donnees.

## Integration ADMIN

- entree `Structures` activee dans la sidebar pour l'ADMIN.
- action rapide `Gerer les structures` ajoutee au dashboard ADMIN.
- titre du header adapte sur la route ADMIN Structures.
- comportement responsive : compteurs et niveaux empiles sur les ecrans etroits.

## Extension transverse : gestion des utilisateurs

L'ecran ADMIN Utilisateurs a egalement ete aligne sur l'architecture MVP de reference :

- compteurs dynamiques par role.
- recherche, filtres par role et par province.
- liste paginee et responsive.
- affectation visible selon le role.
- formulaire modal de creation avec selection progressive Province, Region et Fraternite.
- creation d'un autre `ADMIN` volontairement absente du formulaire MVP.
- exports utilisateurs, consultation detaillee et verrouillage affiches comme fonctionnalites a venir lorsque le backend les exposera.

## Limite volontaire

Le bouton `Ajouter une structure` est visible mais desactive. Les formulaires responsive de creation et modification sont planifies en R7-E9.

## Fichiers ajoutes

- `src/app/shared/admin-structures/admin-structures.component.ts`
- `src/app/shared/admin-structures/admin-structures.component.html`
- `src/app/shared/admin-structures/admin-structures.component.css`

## Fichiers modifies

- `src/app/app-routing.module.ts`
- `src/app/shared/shared.module.ts`
- `src/app/shared/sidebar/sidebar.component.html`
- `src/app/shared/header/app-header/app-header.component.ts`

## Verification

Build Angular valide :

```text
npm run build
```

Route front disponible :

```text
http://localhost:4200/app/admin/structures
```

## Etat

R7-E6 terminee.
