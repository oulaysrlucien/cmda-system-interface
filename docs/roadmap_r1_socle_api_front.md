# Roadmap R1 - Socle API Front

## Objectif

Mettre en place un socle API front propre pour Angular : URL backend centralisee, services API alignes avec Spring Boot, DTO TypeScript coherents et endpoints corriges.

## Perimetre fonctionnel

- Authentification initiale via `/api/authenticate`
- Utilisateurs ADMIN via `/api/users`
- Membres via `/members`
- Referentiels province, region, fraternite
- Preparation des appels utiles aux futurs formulaires par role

## Etapes realisees

### R1-E1 - AuthService et environnement API

**Classes ajoutees**

- `AuthResponseDTO`

**Classes modifiees**

- `AuthService`

**Methodes modifiees**

- `authenticate()`
- `saveToken()`
- `getToken()`
- `isAuthenticated()`

**Actions**

- Ajout de `environment.apiBaseUrl`.
- Typage de la reponse login avec `AuthResponseDTO`.
- Remplacement de l'URL hardcodee par l'environnement Angular.
- Nettoyage du service d'authentification.

### R1-E2 - UserService API utilisateurs

**Classes modifiees**

- `UserService`

**Methodes ajoutees**

- `authHeaders()`

**Methodes modifiees**

- `getUsers()`
- `createUser()`
- `deleteUser()`
- `getProvinces()`

**Actions**

- Centralisation des URLs utilisateurs.
- Correction du flux de creation utilisateur.
- Suppression de l'authentification du nouvel utilisateur a creer.

### R1-E3 - CmdaMemberService API membres

**Classes ajoutees**

- `PageResponse`
- `MemberSearchParams`

**Classes modifiees**

- `CmdaMemberService`

**Methodes ajoutees**

- `getAllMembersForAdmin()`
- `getMembersForCurrentUser()`
- `searchMembers()`
- `updateMemberStatus()`
- `archiveMember()`
- `restoreMember()`
- `authHeaders()`

**Methodes modifiees**

- `getCmdaMembers()`
- `getMemberById()`
- `addCmdaMember()`
- `updateCmdaMember()`
- `deleteCmdaMember()`

**Actions**

- Correction de `PUT /members/{id}` vers `PUT /members/update/{id}`.
- Ajout des endpoints pagines et recherches.
- Preparation des actions statut, archive et restauration.

### R1-E4 - Alignement DTO front/backend

**Classes ajoutees**

- `RegionDTO`
- `FraternityDTO`

**Classes modifiees**

- `CmdaMember`
- `UserDTO`
- `UserCreationDTO`
- `ProvinceDTO`
- `AdminUserManagementComponent`

**Actions**

- Ajout des champs region/province au modele membre.
- Separation entre `UserDTO` et `UserCreationDTO`.
- Suppression du champ `password` de `UserDTO`.
- Ajout des DTO region et fraternite.

### R1-E5 - Referentiels API

**Classes modifiees**

- `UserService`

**Methodes ajoutees**

- `getRegions()`
- `getRegionsByProvince()`
- `getFraternities()`
- `getFraternitiesByRegion()`

**Actions**

- Ajout des appels API necessaires aux listes deroulantes province, region et fraternite.
- Preparation des formulaires par role.

### R1-E6 - Controle final R1

**Classes modifiees**

- `AdminUserManagementComponent`

**Methodes ajoutees**

- `emptyUser()`

**Methodes modifiees**

- `onSubmit()`
- `createUser()`
- `deleteUser()`

**Actions**

- Verification des anciennes URLs hardcodees.
- Correction finale du flux creation utilisateur.
- Validation TypeScript et build Angular.

## Verifications

- `rg` anciens endpoints : OK
- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK

## Remarques

- Le build Angular passe avec des warnings non bloquants sur le budget bundle et des selecteurs Bootstrap.
- Les headers JWT manuels etaient encore presents a la fin de R1 et ont ete centralises ensuite dans R2.

