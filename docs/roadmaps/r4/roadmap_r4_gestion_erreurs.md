# Roadmap R4 - Gestion globale erreurs

## Objectif

Centraliser et ameliorer la gestion des erreurs cote Angular : pages dediees `401 / 403 / 404`, interceptor HTTP global, service de notifications UX et suppression des `alert()` dans les composants principaux.

## Perimetre fonctionnel

- Pages erreurs `/unauthorized`, `/forbidden`, `/not-found`.
- Redirection wildcard vers `/not-found`.
- Gestion HTTP centralisee pour `401`, `403`, `404`.
- Notifications UX globales.
- Remplacement des alertes bloquantes par des messages integres.

## Etapes realisees

### R4-E1 - Audit erreurs actuelles

**Classes auditees**

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

**Actions**

- Recherche des `alert()`, `console.error`, `catchError`, `throwError`.
- Identification de l'absence de pages `401 / 403 / 404`.
- Identification du wildcard vers l'accueil.
- Creation du diagnostic `roadmap_r4_e1_audit_erreurs.md`.

### R4-E2 - Pages erreurs 401 / 403 / 404

**Classes ajoutees**

- `UnauthorizedComponent`
- `ForbiddenComponent`
- `NotFoundComponent`

**Classes modifiees**

- `SharedModule`
- `AppRoutingModule`

**Actions**

- Ajout des routes `/unauthorized`, `/forbidden`, `/not-found`.
- Remplacement du wildcard vers `/not-found`.
- Declaration et export des composants erreurs dans `SharedModule`.

### R4-E3 - Handler HTTP centralise

**Classe ajoutee**

- `HttpErrorInterceptor`

**Classe modifiee**

- `AppModule`

**Methode ajoutee**

- `intercept()`

**Actions**

- `401` : logout et redirection `/unauthorized`.
- `403` : redirection `/forbidden`.
- `404` : redirection `/not-found`.
- Enregistrement de l'interceptor dans `HTTP_INTERCEPTORS`.

### R4-E4 - Service notifications UX

**Classes et types ajoutes**

- `NotificationService`
- `NotificationMessage`
- `NotificationType`

**Methodes ajoutees**

- `getMessages()`
- `showSuccess()`
- `showError()`
- `showInfo()`
- `showWarning()`
- `dismiss()`
- `clear()`

**Actions**

- Mise en place d'un `BehaviorSubject` pour les messages.
- Service injectable globalement.

### R4-E5 - Composant notifications

**Classe ajoutee**

- `NotificationComponent`

**Classes modifiees**

- `SharedModule`
- `AppComponent`

**Methodes ajoutees**

- `dismiss()`
- `trackByMessageId()`

**Actions**

- Affichage des messages dans le layout global.
- Integration au-dessus du `router-outlet`.

### R4-E6 - Remplacement alert par notifications

**Classes modifiees**

- `LoginComponent`
- `AdminUserManagementComponent`
- `ListComponent`
- `AddComponent`
- `EditComponent`
- `DeleteComponent`

**Actions**

- Remplacement des `alert()` par `NotificationService`.
- Ajout de messages de succes, erreur et avertissement.
- Conservation des `console.error` utiles au diagnostic developpeur.

### R4-E7 - Controle final R4 et documentation

**Actions**

- Verification des routes erreurs.
- Verification des interceptors.
- Verification de l'absence de `alert()` dans `src/app`.
- Verification TypeScript.
- Build Angular.
- Generation des documents R4 en CSV, Markdown et Excel.

## Verifications

- Recherche routes/interceptors/notifications : OK
- Recherche `alert(` : aucune occurrence dans `src/app`
- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK

## Remarques

- Le build Angular passe avec les warnings non bloquants deja constates sur le budget bundle et Bootstrap.
- Les pages erreurs sont volontairement simples; leur design final sera repris avec le design system et la navigation responsive.
- Les `console.error` restent presents pour le diagnostic developpeur.

