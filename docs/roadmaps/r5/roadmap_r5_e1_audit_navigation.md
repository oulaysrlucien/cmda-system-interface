# Roadmap R5-E1 - Audit navigation et composants actuels

## Objectif de l'audit

Identifier l'etat actuel de la navigation Angular avant la mise en place de l'architecture R5 :

- Separation future entre layout public et layout connecte.
- Organisation des routes.
- Role de la sidebar et du futur header.
- Etat de la page d'accueil publique.
- Etat des pages connectees membres.
- Preparation des espaces `ADMIN`, `PROVINCIAL`, `REGIONAL` et `BERGER`.

## Fichiers audites

- `src/app/app-routing.module.ts`
- `src/app/app.component.html`
- `src/app/app.module.ts`
- `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/shared/sidebar/sidebar.component.html`
- `src/app/shared/shared.module.ts`
- `src/app/welcome/welcome.component.html`
- `src/app/welcome/welcome.component.ts`
- `src/app/welcome/welcome.component.css`
- `src/app/user-management/login/login.component.html`
- `src/app/user-management/login/login.component.ts`
- `src/app/cmda-member/list/list.component.html`
- `src/app/cmda-member/list/list.component.ts`
- `src/app/cmda-member/details/details.component.html`
- `src/app/cmda-member/details/details.component.ts`
- `src/app/cmda-member/models/cmda-member.model.ts`
- `src/app/cmda-member/services/cmda-member.service.ts`
- `src/app/user-management/services/auth.service.ts`

## Etat actuel des routes

| Route | Composant | Protection | Observation |
| --- | --- | --- | --- |
| `/` | `WelcomeComponent` | Publique | Page d'accueil actuelle tres simple, encore orientee dashboard. |
| `/login` | `LoginComponent` | Publique | Connexion fonctionnelle, design minimal. |
| `/logout` | `LogoutComponent` | Publique | Route technique de deconnexion. |
| `/unauthorized` | `UnauthorizedComponent` | Publique | Page erreur R4. |
| `/forbidden` | `ForbiddenComponent` | Publique | Page erreur R4. |
| `/not-found` | `NotFoundComponent` | Publique | Page erreur R4. |
| `/cmdaMembers` | `ListComponent` | `AuthGuard` | Liste membres connectee, route encore legacy. |
| `/add` | `AddComponent` | `AuthGuard` | Route plate, a regrouper sous le domaine membres. |
| `/edit/:id` | `EditComponent` | `AuthGuard` | Route plate, a regrouper sous le domaine membres. |
| `/delete/:id` | `DeleteComponent` | `AuthGuard` | Route plate, a regrouper sous le domaine membres. |
| `/admin-users` | Redirection | - | Alias temporaire vers `/user-management`. |
| `/user-management` | `AdminUserManagementComponent` | `AuthGuard`, `RoleGuard ADMIN` | Gestion utilisateurs protegee. |
| `**` | Redirection | - | Redirige vers `/not-found`. |

## Constats principaux

### 1. Absence de layouts separes

`AppComponent` contient directement :

- `app-sidebar`
- `app-notification`
- `router-outlet`

La sidebar est donc chargee au niveau global, y compris pour les pages publiques comme l'accueil, la connexion et les pages erreurs.

**Impact**

- Impossible d'avoir une vraie page d'accueil publique plein ecran comme le template fourni.
- La navigation connectee est melangee avec l'experience publique.
- Le futur header public et le futur header connecte n'ont pas encore de zone dediee.

**Decision R5**

Creer deux layouts :

- `PublicLayoutComponent` pour l'accueil, la connexion et les pages institutionnelles.
- `AuthenticatedLayoutComponent` pour les pages connectees.

### 2. Sidebar fonctionnelle mais trop limitee

La sidebar actuelle affiche :

- Liste des membres si utilisateur connecte.
- Gestion des utilisateurs si role `ADMIN`.
- Deconnexion si utilisateur connecte.

**Points positifs**

- Elle utilise deja `AuthService`.
- Elle filtre deja certains menus selon l'authentification et le role.

**Limites**

- Pas de menu par espace utilisateur.
- Pas de dashboard par role.
- Pas de header connecte.
- Pas d'etat actif via `routerLinkActive`.
- Pas de comportement mobile.
- Design tres basique avec styles inline.
- Probleme d'encodage visible sur `Deconnexion`.

**Decision R5**

Refondre la sidebar dans le layout connecte avec :

- Menus `ADMIN`, `PROVINCIAL`, `REGIONAL`, `BERGER`.
- Icones et libelles courts.
- Etat actif.
- Version mobile en tiroir.
- Header connecte avec profil et bouton deconnexion.

### 3. Page d'accueil publique non conforme au template

`WelcomeComponent` affiche actuellement :

- Un titre `Bienvenue sur le Dashboard`.
- Un texte indiquant d'utiliser la navigation laterale.
- Aucun style CSS dedie.

**Impact**

La route `/` ressemble a une page connectee, alors qu'elle doit devenir la page publique principale CMDA DEV.

**Decision R5**

Transformer l'accueil en page publique inspiree du template fourni :

- Header public horizontal.
- Logo et identite CMDA DEV.
- Hero institutionnel.
- Boutons `Se connecter` et `Decouvrir la plateforme`.
- Sections regions, graces, mission et footer.
- Responsive mobile/tablette/desktop.

### 4. Login fonctionnel mais design minimal

`LoginComponent` :

- Authentifie via `AuthService.authenticate`.
- Garde le `returnUrl`.
- Redirige selon `AuthService.getDefaultRouteForCurrentUser`.
- Utilise `NotificationService`.

**Points positifs**

- La logique metier est deja propre.
- Les notifications R4 sont integrees.
- La redirection apres login existe deja.

**Limites**

- Template HTML tres simple.
- Pas d'integration visuelle avec le layout public.
- Pas de lien de retour a l'accueil.

**Decision R5**

Conserver la logique TypeScript et refaire uniquement l'habillage dans le layout public.

### 5. Redirection par role encore provisoire

`AuthService.getDefaultRouteForCurrentUser()` redirige :

- `ADMIN` vers `/user-management`.
- `PROVINCIAL`, `REGIONAL`, `BERGER` vers `/cmdaMembers`.
- Autres cas vers `/`.

**Impact**

Les roles non administrateurs arrivent tous sur la meme liste membres. Les espaces dedies n'existent pas encore.

**Decision R5**

Introduire des routes ciblees :

- `/app/dashboard` ou `/app/admin/dashboard`
- `/app/provincial/dashboard`
- `/app/regional/dashboard`
- `/app/berger/dashboard`
- `/app/members`

Conserver temporairement les routes actuelles comme alias ou redirections pendant la transition.

### 6. Liste membres trop large

`ListComponent` affiche une table avec 10 colonnes :

- ID
- Prenom
- Nom
- Email
- Telephone
- Date de naissance
- Profession
- Statut
- Fraternite
- Actions

**Impact**

- Peu lisible sur tablette.
- Non adaptee au mobile.
- Les informations importantes sont dispersees.
- Le bouton `Details` est present mais ouvre une modal.

**Point positif**

Le service `CmdaMemberService` possede deja :

- `getMembersForCurrentUser(page, size)`
- `searchMembers(searchParams)`
- `getMemberById(id)`

Ces methodes preparent bien la pagination, la recherche et la future page detail.

**Decision R5**

Refondre la liste autour de 5 colonnes maximum :

- Membre
- Contact
- Appartenance
- Statut
- Actions

Sur mobile, afficher des cartes compactes avec `Details` comme action principale.

### 7. Details membre sous forme de modal

`DetailsComponent` fonctionne comme contenu de modal avec :

- `@Input() member`
- `NgbActiveModal`
- Bouton de fermeture

**Impact**

- Pas de route detail partageable.
- Pas de grande fiche paysage.
- Pas de sections structurees.
- Pas de chargement direct par ID.
- Pas d'espace prevu pour la photo membre.

**Decision R5**

Transformer ou remplacer ce composant par une page detail :

- Route `/app/members/:id`.
- Chargement via `CmdaMemberService.getMemberById(id)`.
- Fiche paysage avec sections.
- Emplacement photo.
- Actions retour, modifier, imprimer/exporter si disponible.

### 8. Modele membre sans photo

`CmdaMember` contient :

- `id`
- `firstName`
- `lastName`
- `email`
- `phoneNumber`
- `birthday`
- `profession`
- `status`
- `fraternityId`
- `fraternityName`
- `regionId`
- `regionName`
- `provinceId`
- `provinceName`

**Limite**

Aucun champ `photoUrl` ou equivalent n'existe pour la fiche de renseignement.

**Decision R5**

Prevoir dans une etape ulterieure :

- Ajout optionnel de `photoUrl` cote front.
- Synchronisation avec le DTO/API cote back.
- Placeholder quand aucune photo n'est disponible.

## Architecture cible recommandee

### Routes publiques

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

### Routes connectees

```text
/app/dashboard
/app/members
/app/members/:id
/app/members/add
/app/members/:id/edit
/app/users
/app/provinces
/app/regions
/app/fraternities
```

### Routes legacy a conserver temporairement

```text
/cmdaMembers -> /app/members
/add -> /app/members/add
/edit/:id -> /app/members/:id/edit
/user-management -> /app/users
```

La route `/delete/:id` peut etre conservee temporairement si le composant de suppression reste une page dediee. A terme, la suppression peut devenir une action confirmee depuis la liste ou la fiche.

## Composants a creer en R5-E2

- `PublicLayoutComponent`
- `AuthenticatedLayoutComponent`
- `PublicHeaderComponent`
- `PublicFooterComponent`
- `AppHeaderComponent`
- `AppSidebarComponent` ou refonte de `SidebarComponent`

## Composants a refondre apres R5-E2

- `WelcomeComponent`
- `LoginComponent` HTML/CSS uniquement
- `ListComponent`
- `DetailsComponent`

## Risques identifies

- Rupture des anciennes routes si les redirections ne sont pas maintenues.
- Sidebar visible sur les pages publiques tant que les layouts ne sont pas crees.
- Refactor routes potentiellement sensible avec les guards R3.
- Encodage de certains textes a corriger lors de la refonte UI.
- La fiche details avec photo necessitera probablement un ajustement back/API.

## Conclusion

L'application dispose deja des bases utiles : routes protegees, guards, roles, notifications, service membres avec recherche et chargement par ID. Le principal manque est architectural et visuel : il faut separer clairement l'experience publique de l'espace connecte, puis reconstruire la navigation autour des roles.

R5-E2 peut demarrer sur une base claire : creation des layouts public/connecte, organisation des routes, et conservation temporaire des routes existantes pour securiser la transition.
