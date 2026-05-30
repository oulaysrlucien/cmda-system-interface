# Roadmap R5-E4 - Header et sidebar connectes responsive

## Objectif

Stabiliser la navigation apres la creation des layouts R5-E2 et la page d'accueil R5-E3 :

- Corriger la duplication du logo sur la page d'accueil publique.
- Garder l'accueil conforme au template : un seul bloc identite dans le hero.
- Renforcer le header connecte avec titre de page, role et profil.
- Refondre la sidebar connectee avec navigation claire, etats actifs et comportement responsive.
- Preparer la navigation par roles sans casser les routes existantes.

## Corrections public realisees

### 1. Suppression du double logo sur `/`

Sur le template de reference, le coin gauche ne contient qu'un seul bloc identite :

- Logo.
- `CMDA DEV`.
- `Communaute Catholique Mere du Divin Amour`.
- `Province Europe`.

Avant R5-E4, ce bloc etait duplique :

- Une fois dans `PublicHeaderComponent`.
- Une fois dans le hero de `WelcomeComponent`.

La correction R5-E4 fait que :

- Sur `/`, le header public n'affiche plus le bloc logo/nom.
- Le bloc identite complet reste uniquement dans le hero.
- Sur les autres pages publiques, le header peut conserver une identite compacte.

## Header connecte

### Changements realises

`AppHeaderComponent` affiche maintenant :

- Bouton menu mobile.
- Titre contextualise selon la route :
  - `Tableau de bord`.
  - `Gestion des membres`.
  - `Gestion des utilisateurs`.
- Sous-titre contextualise selon le role :
  - Admin.
  - Provincial.
  - Regional.
  - Berger.
- Nom utilisateur issu du token.
- Badge de role.
- Bouton deconnexion.

### Objectif design

Le header connecte devient une barre de travail :

- Plus sobre que l'accueil public.
- Lisible en desktop.
- Compact en mobile.
- Toujours visible en haut via `position: sticky`.

## Sidebar connectee

### Changements realises

`SidebarComponent` a ete refondu :

- Logo CMDA local.
- Perimetre utilisateur affiche sous le nom.
- Section `Principal`.
- Lien `Tableau de bord`.
- Lien `Membres`.
- Lien `Utilisateurs` visible uniquement pour `ADMIN`.
- Section `Perimetre` preparee pour les futures structures et fraternites.
- Etats actifs via `routerLinkActive`.
- Deconnexion directe via `AuthService.logout()`.

### Preparation par roles

La sidebar expose maintenant des methodes dediees :

- `showMembersMenu()`
- `showUserManagementMenu()`
- `showStructureMenu()`
- `showFraternityMenu()`
- `scopeLabel`

Ces methodes preparent R5-E5, ou les espaces seront specialises pour :

- `ADMIN`
- `PROVINCIAL`
- `REGIONAL`
- `BERGER`

## Responsive

Le comportement responsive reste porte par `AuthenticatedLayoutComponent` :

- Desktop : sidebar fixe a gauche.
- Tablette/mobile : sidebar en tiroir.
- Le header connecte affiche un bouton menu sous `900px`.
- Un clic sur un lien ferme la sidebar mobile via l'evenement `navigate`.

## Fichiers modifies

- `src/app/shared/header/public-header/public-header.component.ts`
- `src/app/shared/header/public-header/public-header.component.html`
- `src/app/shared/header/public-header/public-header.component.css`
- `src/app/shared/header/app-header/app-header.component.ts`
- `src/app/shared/header/app-header/app-header.component.html`
- `src/app/shared/header/app-header/app-header.component.css`
- `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/shared/sidebar/sidebar.component.html`
- `src/app/shared/sidebar/sidebar.component.css`

## Verifications

- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK
- Verification navigateur in-app sur `/` :
  - Aucun bloc identite dans le header public de l'accueil : OK
  - Un seul bloc identite visible dans le hero : OK
  - Bouton `Se connecter` visible dans le header : OK
  - Responsive mobile sans debordement horizontal : OK
- Capture desktop :
  - `docs/screenshots/r5-e4-home-no-duplicate-logo.png`

## Limite de verification navigateur

La session connectee `/app/...` n'a pas pu etre forcee visuellement depuis le navigateur in-app, car l'API de verification disponible ne permet pas d'ecrire un token de test dans `localStorage`. La partie connectee a donc ete validee par compilation Angular, verification TypeScript et controle des templates/routes.

## Suite logique

R5-E5 peut maintenant se concentrer sur les vrais espaces par roles :

- Dashboard admin.
- Dashboard provincial.
- Dashboard regional.
- Dashboard berger de fraternite.
