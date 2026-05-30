# R4-E1 - Audit erreurs actuelles

## Objectif

Analyser la gestion actuelle des erreurs cote Angular avant la mise en place des pages `401 / 403 / 404`, d'un interceptor d'erreurs HTTP et d'un systeme de notifications UX.

## Classes et fichiers audites

- `AuthInterceptor`
- `AuthService`
- `LoginComponent`
- `AdminUserManagementComponent`
- `UserService`
- `CmdaMemberService`
- `ListComponent`
- `AddComponent`
- `EditComponent`
- `DeleteComponent`
- `AppRoutingModule`

## Constats globaux

- Aucune page dediee `401`, `403` ou `404` n'existe actuellement.
- Aucun interceptor global de gestion d'erreurs HTTP n'est present.
- Le wildcard Angular redirige vers `/` au lieu d'une vraie page `404`.
- Les erreurs sont gerees de facon dispersee dans les composants et services.
- Les messages utilisateur passent encore par `alert()`.
- Plusieurs erreurs sont seulement journalisees via `console.error`.

## Alertes detectees

### LoginComponent

- Champs login vides.
- Echec d'authentification.

### AdminUserManagementComponent

- Champs utilisateur vides.
- Utilisateur non authentifie lors de la creation.
- Erreur lors de la creation utilisateur.

## console.error detectes

### AuthService

- Erreur d'authentification.
- Erreur de decodage JWT.

### UserService

- Erreur recuperation utilisateurs.
- Erreur creation utilisateur.

### AdminUserManagementComponent

- Erreur recuperation provinces.
- Erreur creation utilisateur.

### CmdaMember components

- `ListComponent` : erreur recuperation membres.
- `AddComponent` : erreur ajout membre.
- `EditComponent` : erreur recuperation membre, erreur mise a jour membre.
- `DeleteComponent` : erreur suppression membre.

## catchError detectes

### AuthService

- `authenticate()` capture l'erreur puis la propage.

### UserService

- `getUsers()` capture l'erreur puis la propage.
- `createUser()` capture l'erreur puis la propage.

### CmdaMemberService

- Aucun `catchError` local.
- Les erreurs API membres sont gerees uniquement dans les composants consommateurs.

## Gestion HTTP actuelle

### 401

- Pas de page dediee.
- Pas de redirection centralisee.
- `AuthInterceptor` nettoie le token expire mais ne gere pas les reponses HTTP 401.

### 403

- Pas de page dediee.
- `RoleGuard` redirige temporairement vers `/`.
- Les erreurs backend 403 ne sont pas centralisees.

### 404

- Pas de page dediee.
- Wildcard actuel : `{ path: '**', redirectTo: '' }`.
- Les erreurs backend 404 ne sont pas centralisees.

## Besoins pour R4-E2

Creer les pages :

- `UnauthorizedComponent` pour `/unauthorized`
- `ForbiddenComponent` pour `/forbidden`
- `NotFoundComponent` pour `/not-found`

Remplacer le wildcard par une redirection vers `/not-found`.

## Besoins pour R4-E3

Creer un interceptor d'erreurs HTTP :

- `401` : nettoyer la session et rediriger vers `/unauthorized` ou `/login`.
- `403` : rediriger vers `/forbidden`.
- `404` : rediriger vers `/not-found` si erreur globale.
- Propager l'erreur apres traitement si necessaire.

## Besoins pour R4-E4 et R4-E5

Creer un systeme de notifications :

- `NotificationService`
- `NotificationComponent`

Objectif : remplacer progressivement les `alert()` par des messages UX integres.

## Besoins pour R4-E6

Remplacer progressivement les `alert()` et harmoniser les messages dans :

- `LoginComponent`
- `AdminUserManagementComponent`
- `AddComponent`
- `EditComponent`
- `DeleteComponent`
- `ListComponent`

## Risques actuels

- Experience utilisateur brutale avec `alert()`.
- Erreurs 401/403/404 peu lisibles pour l'utilisateur.
- Redirections silencieuses vers l'accueil.
- Logique d'erreur dupliquee et dispersee.
- Difficulte a diagnostiquer les erreurs API sans politique globale.

