# R2-E1 - Audit Auth actuel

## Objectif

Analyser l'etat actuel de l'authentification JWT cote front avant les corrections R2.

## Classes auditees

- `AuthService`
- `LoginComponent`
- `UserService`
- `CmdaMemberService`
- `AppRoutingModule`
- `SidebarComponent` template

## Constats

### AuthService

- `authenticate(username, password)` appelle bien `POST /api/authenticate`.
- La reponse est typee avec `AuthResponseDTO`.
- Le token est stocke dans `localStorage` avec la cle `token`.
- `isAuthenticated()` verifie uniquement la presence du token.
- L'expiration JWT n'est pas encore controlee.

### LoginComponent

- Appelle `AuthService.authenticate()`.
- Sauvegarde une seconde fois le token alors que `AuthService.authenticate()` le fait deja.
- Redirige actuellement vers `/user-management` sans tenir compte du role.

### UserService

- Ajoute encore le header JWT manuellement via `authHeaders()`.
- Utilise `AuthService.getToken()`.

### CmdaMemberService

- Ajoute encore le header JWT manuellement via `authHeaders()`.
- Lit directement `localStorage.getItem('token')` au lieu de passer par `AuthService`.

### Routes et navigation

- Aucune route n'est protegee par guard.
- Le lien `/logout` existe dans la sidebar mais aucune route ni methode logout n'est encore implementee.

## Risques identifies

- Token expire considere comme valide par le front.
- Duplication de logique JWT dans les services.
- Deconnexion inexistante.
- Redirection apres login non adaptee aux roles.
- Injection manuelle du header `Authorization` fragile et repetee.

## Suite R2

- R2-E2 : creer les helpers JWT dans `AuthService`.
- R2-E3 : ajouter logout et clearToken.
- R2-E4 : ajouter l'interceptor JWT.
- R2-E5 : gerer l'expiration token.
- R2-E6 : controle final R2 et documentation CSV.
