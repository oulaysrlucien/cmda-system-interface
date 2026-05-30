# Roadmap R5-E2 - Architecture des layouts Angular

## Objectif

Repenser l'architecture de navigation Angular pour separer clairement :

- L'experience publique : accueil, connexion, pages institutionnelles, erreurs.
- L'experience connectee : tableau de bord, membres, utilisateurs, actions metier.

Cette separation est indispensable pour construire un design responsive coherent :

- La page publique doit pouvoir reprendre le template d'accueil CMDA DEV sans sidebar.
- L'espace connecte doit avoir une navigation de travail avec header, sidebar et contenu.
- Les anciennes routes doivent rester accessibles temporairement pour ne pas casser l'existant.

## Changements realises

### 1. Layout public

**Composant ajoute**

- `PublicLayoutComponent`

**Composants lies**

- `PublicHeaderComponent`
- `PublicPageComponent`

**Role**

Le layout public contient :

- Un header public horizontal.
- Une zone centrale avec `router-outlet`.
- Un footer public.

Il encadre les routes :

```text
/
/login
/about
/resources
/contact
/unauthorized
/forbidden
/not-found
```

### 2. Layout connecte

**Composant ajoute**

- `AuthenticatedLayoutComponent`

**Composants lies**

- `AppHeaderComponent`
- `SidebarComponent`
- `DashboardComponent`

**Role**

Le layout connecte contient :

- Une sidebar de navigation.
- Un header applicatif avec profil utilisateur et deconnexion.
- Une zone de contenu avec `router-outlet`.
- Un comportement responsive avec sidebar en tiroir sur mobile/tablette.

Il encadre les routes :

```text
/app/dashboard
/app/members
/app/members/add
/app/members/:id/edit
/app/members/:id/delete
/app/users
```

### 3. AppComponent simplifie

Avant R5-E2, `AppComponent` portait directement :

- `app-sidebar`
- `app-notification`
- `router-outlet`

Apres R5-E2, il ne garde que :

```html
<app-notification></app-notification>
<router-outlet></router-outlet>
```

La sidebar n'est donc plus globale. Elle n'apparait que dans le layout connecte.

### 4. Routes restructurees

Les routes sont maintenant regroupees en deux branches :

- Branche publique avec `PublicLayoutComponent`.
- Branche connectee `/app` avec `AuthenticatedLayoutComponent` et `AuthGuard`.

La route utilisateurs reste protegee par :

- `AuthGuard` sur le parent `/app`.
- `RoleGuard` sur `/app/users`.
- `data: { roles: ['ADMIN'] }`.

### 5. Redirections legacy conservees

Les anciennes routes sont conservees sous forme de redirections :

```text
/cmdaMembers -> /app/members
/add -> /app/members/add
/edit/:id -> /app/members/:id/edit
/delete/:id -> /app/members/:id/delete
/admin-users -> /app/users
/user-management -> /app/users
```

Cette strategie permet de continuer a utiliser les anciens liens pendant la transition.

### 6. Sidebar modernisee

La sidebar actuelle a ete refondue pour devenir la navigation connectee :

- Identite `CMDA DEV`.
- Lien tableau de bord.
- Lien membres.
- Lien utilisateurs visible uniquement pour `ADMIN`.
- Lien deconnexion.
- Etat actif via `routerLinkActive`.
- Evenement `navigate` pour fermer le tiroir mobile apres clic.

### 7. Header connecte ajoute

Le header connecte affiche :

- Bouton menu sur tablette/mobile.
- Titre de l'espace connecte.
- Nom utilisateur issu du token.
- Bouton deconnexion.

### 8. Header public ajoute

Le header public affiche :

- Identite CMDA DEV.
- Navigation publique : Accueil, A propos, Ressources, Contact.
- Bouton `Se connecter`.

Les pages `A propos`, `Ressources` et `Contact` sont provisoires. Leur design detaille pourra etre traite apres la page d'accueil publique.

### 9. Redirection apres connexion mise a jour

`AuthService.getDefaultRouteForCurrentUser()` redirige maintenant :

- `ADMIN` vers `/app/users`.
- `PROVINCIAL`, `REGIONAL`, `BERGER` vers `/app/members`.
- Autres cas vers `/`.

Les dashboards dedies par role restent prevus pour R5-E5.

## Fichiers ajoutes

- `src/app/shared/layouts/public-layout/public-layout.component.ts`
- `src/app/shared/layouts/public-layout/public-layout.component.html`
- `src/app/shared/layouts/public-layout/public-layout.component.css`
- `src/app/shared/layouts/authenticated-layout/authenticated-layout.component.ts`
- `src/app/shared/layouts/authenticated-layout/authenticated-layout.component.html`
- `src/app/shared/layouts/authenticated-layout/authenticated-layout.component.css`
- `src/app/shared/header/public-header/public-header.component.ts`
- `src/app/shared/header/public-header/public-header.component.html`
- `src/app/shared/header/public-header/public-header.component.css`
- `src/app/shared/header/app-header/app-header.component.ts`
- `src/app/shared/header/app-header/app-header.component.html`
- `src/app/shared/header/app-header/app-header.component.css`
- `src/app/shared/dashboard/dashboard.component.ts`
- `src/app/shared/dashboard/dashboard.component.html`
- `src/app/shared/dashboard/dashboard.component.css`
- `src/app/shared/public-page/public-page.component.ts`
- `src/app/shared/public-page/public-page.component.html`
- `src/app/shared/public-page/public-page.component.css`

## Fichiers modifies

- `src/app/app-routing.module.ts`
- `src/app/app.component.html`
- `src/app/shared/shared.module.ts`
- `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/shared/sidebar/sidebar.component.html`
- `src/app/shared/sidebar/sidebar.component.css`
- `src/app/user-management/services/auth.service.ts`
- `src/app/cmda-member/list/list.component.ts`
- `src/app/cmda-member/list/list.component.html`
- `src/app/cmda-member/edit/edit.component.ts`
- `src/app/cmda-member/delete/delete.component.ts`

## Decisions pour la suite

### R5-E3

Reproduire le template de la page d'accueil dans la branche publique, sans sidebar.

### R5-E4

Affiner le header et la sidebar connectes :

- Menus par role.
- Etats actifs plus riches.
- Responsive final.
- Meilleure integration visuelle.

### R5-E5

Creer les espaces dedies :

- Admin.
- Provincial.
- Regional.
- Berger de fraternite.

### R5-E6 et R5-E7

Refondre la liste membres, puis transformer les details en grande fiche page paysage.

## Verifications

- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK

## Remarques

- Le build conserve les warnings non bloquants deja presents : budget initial depasse et deux selecteurs Bootstrap ignores.
- La verification visuelle via navigateur in-app n'a pas pu etre lancee car l'outil navigateur n'est pas expose dans cette session.
