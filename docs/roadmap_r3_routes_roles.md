# Roadmap R3 - Securite routes et roles

## Objectif

Mettre en place la securite front des routes Angular : protection des routes privees, controle d'acces par role et filtrage de la navigation selon l'utilisateur connecte.

## Perimetre fonctionnel

- Protection des routes privees par authentification.
- Protection de la gestion utilisateurs par role `ADMIN`.
- Redirection vers login avec `returnUrl`.
- Redirection apres login selon role.
- Sidebar filtree selon connexion et role.

## Etapes realisees

### R3-E1 - Audit routes et roles

**Classes auditees**

- `AppRoutingModule`
- `SidebarComponent`
- `AuthService`
- `LoginComponent`

**Actions**

- Inventaire des routes Angular.
- Inventaire des `routerLink`.
- Identification des routes privees.
- Identification de la route ADMIN.
- Creation du diagnostic `roadmap_r3_e1_audit_routes_roles.md`.

### R3-E2 - AuthGuard

**Classe ajoutee**

- `AuthGuard`

**Classe modifiee**

- `AppRoutingModule`

**Methode ajoutee**

- `canActivate()`

**Actions**

- Protection de `/cmdaMembers`, `/add`, `/edit/:id`, `/delete/:id`, `/user-management`.
- Redirection des utilisateurs non connectes vers `/login`.
- Conservation de l'URL demandee via `returnUrl`.

### R3-E3 - RoleGuard

**Classe ajoutee**

- `RoleGuard`

**Classe modifiee**

- `AppRoutingModule`

**Methode ajoutee**

- `canActivate()`

**Actions**

- Lecture des roles autorises via `route.data.roles`.
- Verification via `AuthService.hasRole()`.
- Protection de `/user-management` avec `data: { roles: ['ADMIN'] }`.

### R3-E4 - Routes protegees et harmonisees

**Classe modifiee**

- `AppRoutingModule`

**Actions**

- Verification des routes privees protegees.
- Ajout d'un alias temporaire `/admin-users` vers `/user-management`.
- Conservation des routes existantes pour eviter de casser les composants actuels.

### R3-E5 - Redirection login selon role

**Classes modifiees**

- `AuthService`
- `LoginComponent`

**Methode ajoutee**

- `getDefaultRouteForCurrentUser()`

**Methode modifiee**

- `onLogin()`

**Actions**

- Prise en compte de `returnUrl` apres login.
- Redirection par defaut selon role.
- `ADMIN` vers `/user-management`.
- `PROVINCIAL`, `REGIONAL`, `BERGER` vers `/cmdaMembers`.

### R3-E6 - Menus filtres par role

**Classe modifiee**

- `SidebarComponent`

**Methodes ajoutees**

- `isAuthenticated()`
- `hasRole()`
- `showMembersMenu()`
- `showUserManagementMenu()`

**Actions**

- Suppression des liens dashboards inexistants.
- Affichage du menu membres seulement aux utilisateurs connectes.
- Affichage de la gestion utilisateurs seulement au role `ADMIN`.
- Affichage de la deconnexion seulement aux utilisateurs connectes.

### R3-E7 - Controle final R3 et documentation

**Actions**

- Controle des guards et routes protegees.
- Controle du menu filtre.
- Verification TypeScript.
- Build Angular.
- Generation des documents R3 en CSV, Markdown et Excel.

## Verifications

- Recherche routes et guards : OK
- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK

## Remarques

- `/admin-users` reste present uniquement comme alias temporaire vers `/user-management`.
- La redirection des refus de role pointe temporairement vers `/`; une page 403 sera traitee dans R4.
- Les dashboards par role ne sont pas encore crees; les roles non ADMIN sont rediriges vers la liste membres.
- Le build Angular passe avec les warnings non bloquants deja constates sur le budget bundle et Bootstrap.

