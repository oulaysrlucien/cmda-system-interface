# Roadmap R5-E5 - Espaces utilisateurs par role

## Objectif

Donner un vrai espace connecte a chaque role CMDA DEV apres la connexion :

- `ADMIN`
- `PROVINCIAL`
- `REGIONAL`
- `BERGER`

L'utilisateur ne doit plus arriver dans une page generique. Il est dirige vers un tableau de bord adapte a sa mission.

## Page de connexion

La page `/login` a ete refondue dans l'esprit du modele partage :

- Colonne gauche avec logo CMDA DEV, formulaire et liens d'aide.
- Colonne droite avec grand panneau visuel et message d'acces a l'espace personnel.
- Masquage du header/footer public sur `/login`.
- Bouton d'affichage du mot de passe.
- Design responsive mobile/tablette.

## Dashboards par role

Un composant reutilisable `RoleDashboardComponent` a ete cree.

Il est pilote par les donnees de route :

- Titre.
- Sous-titre.
- Perimetre.
- Statistiques de synthese.
- Actions rapides.

## Routes ajoutees

```text
/app/admin/dashboard
/app/provincial/dashboard
/app/regional/dashboard
/app/berger/dashboard
/app/personal-space
/app/account
```

Les dashboards par role sont proteges par `RoleGuard`.

## Redirection apres connexion

`AuthService.getDefaultRouteForCurrentUser()` redirige maintenant vers :

- `ADMIN` -> `/app/admin/dashboard`
- `PROVINCIAL` -> `/app/provincial/dashboard`
- `REGIONAL` -> `/app/regional/dashboard`
- `BERGER` -> `/app/berger/dashboard`

La route `/app/dashboard` reste un point d'entree technique qui redirige vers le bon espace selon le role.

## Menu profil connecte

`AppHeaderComponent` affiche maintenant un menu profil deroulant inspire du modele fourni :

- Espace personnel.
- Mon compte.
- Me deconnecter.

La deconnexion est effectuee directement via `AuthService.logout()`.

## Sidebar connectee

La sidebar utilise maintenant la route de dashboard adaptee au role :

- Admin.
- Provincial.
- Regional.
- Berger.

Elle reste prete pour les prochains menus de perimetre :

- Structures.
- Fraternites.
- Membres.

## Fichiers ajoutes

- `src/app/shared/role-dashboard/role-dashboard.component.ts`
- `src/app/shared/role-dashboard/role-dashboard.component.html`
- `src/app/shared/role-dashboard/role-dashboard.component.css`
- `src/app/shared/personal-space/personal-space.component.ts`
- `src/app/shared/personal-space/personal-space.component.html`
- `src/app/shared/personal-space/personal-space.component.css`
- `docs/roadmap_r5_e5_espaces_utilisateurs.md`

## Fichiers modifies

- `src/app/app-routing.module.ts`
- `src/app/shared/shared.module.ts`
- `src/app/shared/layouts/public-layout/public-layout.component.ts`
- `src/app/shared/layouts/public-layout/public-layout.component.html`
- `src/app/user-management/login/login.component.ts`
- `src/app/user-management/login/login.component.html`
- `src/app/user-management/login/login.component.css`
- `src/app/user-management/services/auth.service.ts`
- `src/app/user-management/guards/role.guard.ts`
- `src/app/shared/dashboard/dashboard.component.ts`
- `src/app/shared/header/app-header/app-header.component.ts`
- `src/app/shared/header/app-header/app-header.component.html`
- `src/app/shared/header/app-header/app-header.component.css`
- `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/shared/sidebar/sidebar.component.html`

## Verification

- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK
- Verification navigateur in-app DOM :
  - `/login` affiche la page de connexion R5-E5 : OK
  - `/login` n'affiche pas le header public global : OK
  - `/login` desktop et mobile sans debordement horizontal : OK
  - `/app/admin/dashboard` sans session redirige vers `/login?returnUrl=...` : OK

## Remarques de verification

- Le build conserve les warnings non bloquants deja connus : budget initial depasse et selecteurs Bootstrap ignores.
- Deux nouveaux warnings de budget CSS sont signales pour `login.component.css` et `role-dashboard.component.css`, sans bloquer le build.
- Les captures navigateur ont expire cote CDP pendant cette passe, mais les controles DOM ont confirme le comportement attendu.

## Suite logique

R5-E6 peut maintenant refondre la liste des membres selon le perimetre utilisateur :

- Tous les membres pour `ADMIN`.
- Membres de la province pour `PROVINCIAL`.
- Membres de la region pour `REGIONAL`.
- Membres de la fraternite pour `BERGER`.
