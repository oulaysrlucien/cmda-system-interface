# R3-E1 - Audit routes et roles

## Objectif

Analyser l'etat actuel des routes Angular, des liens de navigation et des helpers d'authentification avant la mise en place de `AuthGuard`, `RoleGuard`, routes protegees et menus filtres.

## Classes et fichiers audites

- `AppRoutingModule`
- `SidebarComponent` template
- `AuthService`
- `LoginComponent`

## Routes Angular declarees

### Routes publiques actuelles

- `/`
- `/login`
- `/logout`

### Routes privees a proteger

- `/cmdaMembers`
- `/add`
- `/edit/:id`
- `/delete/:id`
- `/user-management`

### Route ADMIN a proteger par role

- `/user-management`

Cette route correspond a la gestion des utilisateurs et doit etre limitee au role `ADMIN`.

## Liens de navigation detectes

### Liens coherents avec une route existante

- `/cmdaMembers`
- `/logout`

### Liens incoherents ou non declares dans le routing Angular

- `/admin/dashboard`
- `/provincial/dashboard`
- `/regional/dashboard`
- `/berger/dashboard`
- `/admin-users`

`/admin-users` doit probablement etre remplace par `/user-management`, ou une route alias doit etre creee.

## Etat des protections

- Aucun `AuthGuard` n'est present.
- Aucun `RoleGuard` n'est present.
- Aucune route ne contient `canActivate`.
- Aucune route ne contient `data: { roles: [...] }`.
- Un utilisateur non connecte peut actuellement acceder directement aux pages membres et gestion utilisateurs cote front.

## Etat AuthService

Helpers disponibles :

- `isAuthenticated()`
- `getRoles()`
- `hasRole(role)`
- `getUsername()`
- `isTokenExpired()`

Ces helpers sont suffisants pour construire `AuthGuard` et `RoleGuard`.

## Etat LoginComponent

- Apres connexion, redirection fixe vers `/user-management`.
- Pas encore de redirection selon role.
- La redirection par role sera traitee en R3-E5.

## Decisions proposees pour la suite R3

### R3-E2 - AuthGuard

Creer `AuthGuard` pour proteger toutes les routes privees.

### R3-E3 - RoleGuard

Creer `RoleGuard` pour filtrer les routes selon `data.roles`.

### R3-E4 - Routes protegees

Ajouter `canActivate` sur les routes :

- `/cmdaMembers`
- `/add`
- `/edit/:id`
- `/delete/:id`
- `/user-management`

Ajouter `data: { roles: ['ADMIN'] }` sur `/user-management`.

### R3-E5 - Redirection login selon role

Ajouter une redirection intelligente apres login.

### R3-E6 - Menus filtres par role

Mettre a jour la sidebar :

- Afficher `Gestion des utilisateurs` seulement pour `ADMIN`.
- Afficher les liens membres aux utilisateurs connectes.
- Supprimer ou masquer les dashboards tant qu'ils ne sont pas implementes.
- Corriger `/admin-users` vers `/user-management`.

## Risques actuels

- Acces front non controle aux pages sensibles.
- Experience confuse avec des liens de menu qui redirigent vers l'accueil via wildcard.
- Gestion utilisateurs visible dans le menu sans controle role cote front.
- Redirection login inadaptee pour les roles non ADMIN.

