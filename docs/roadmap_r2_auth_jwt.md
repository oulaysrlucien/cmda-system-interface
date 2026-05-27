# Roadmap R2 - Authentification JWT

## Objectif

Centraliser et fiabiliser l'authentification JWT cote Angular : lecture du token, helpers JWT, logout, interceptor, expiration token et controles finaux.

## Perimetre fonctionnel

- Authentification via JWT
- Stockage token dans `localStorage`
- Lecture du payload JWT
- Roles disponibles cote front
- Deconnexion
- Injection automatique du header `Authorization`
- Controle d'expiration token

## Etapes realisees

### R2-E1 - Audit auth actuel

**Classes auditees**

- `AuthService`
- `LoginComponent`
- `UserService`
- `CmdaMemberService`
- `AppRoutingModule`
- `SidebarComponent`

**Actions**

- Identification des usages `localStorage`, `Authorization`, `Bearer`, `saveToken`, `logout`.
- Constat que les headers JWT etaient encore manuels.
- Constat que `/logout` existait dans le menu sans implementation.

### R2-E2 - Modele JWT cote front

**Classes ajoutees**

- `JwtPayloadDTO`

**Classes modifiees**

- `AuthService`

**Methodes ajoutees**

- `getTokenPayload()`
- `getUsername()`
- `getRoles()`
- `hasRole()`

**Methodes modifiees**

- `isAuthenticated()`

**Actions**

- Decodage du payload JWT sans dependance externe.
- Lecture du username via `sub`.
- Lecture des roles.
- Support des formats `ADMIN` et `ROLE_ADMIN`.

### R2-E3 - Logout propre

**Classes ajoutees**

- `LogoutComponent`

**Classes modifiees**

- `AuthService`
- `UserManagementModule`
- `AppRoutingModule`

**Methodes ajoutees**

- `clearToken()`
- `logout()`
- `ngOnInit()`

**Actions**

- Suppression du token local.
- Ajout de la route `/logout`.
- Redirection vers `/login` apres deconnexion.

### R2-E4 - Interceptor JWT

**Classes ajoutees**

- `AuthInterceptor`

**Classes modifiees**

- `AppModule`
- `UserService`
- `CmdaMemberService`

**Methodes ajoutees**

- `intercept()`

**Actions**

- Ajout automatique du header `Authorization: Bearer <token>`.
- Suppression des headers JWT manuels dans les services.
- Limitation de `localStorage` a `AuthService`.

### R2-E5 - Gestion expiration token

**Classes modifiees**

- `AuthService`
- `AuthInterceptor`

**Methodes ajoutees**

- `getTokenExpirationDate()`
- `isTokenExpired()`

**Methodes modifiees**

- `isAuthenticated()`
- `intercept()`

**Actions**

- Lecture de `exp` dans le payload JWT.
- Nettoyage de session si token expire.
- Non-envoi du header JWT si le token est expire.

### R2-E6 - Controle final R2

**Classes modifiees**

- `LoginComponent`

**Methodes modifiees**

- `onLogin()`

**Actions**

- Suppression de la double sauvegarde du token.
- Verification que `Authorization` est seulement dans l'interceptor.
- Verification que `localStorage` est seulement dans `AuthService`.
- Validation TypeScript et build Angular.

## Verifications

- Recherche JWT : OK
- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK

## Remarques

- Le build Angular passe avec les memes warnings non bloquants que R1.
- La redirection apres login reste provisoire vers `/user-management`; la redirection par role sera traitee dans R3.

