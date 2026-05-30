# R6-E1 - Audit donnees metier et endpoints disponibles

## Objectif

Verifier l'etat reel du front Angular et du backend Spring Boot avant de passer les espaces R5 du statique au dynamique.

R6-E1 repond a trois questions :

- quelles donnees metier existent deja ?
- quels endpoints peuvent etre utilises par les roles connectes ?
- quels ecrans R5 restent statiques et doivent etre branches a l'API ?

## Constat global

R5 a bien cree les parcours visibles :

- espace Provincial : `/app/provincial/province`
- espace Regional : `/app/regional/region`
- espace Berger : `/app/berger/fraternity`
- liste membres : `/app/members`
- fiche detail membre : `/app/members/:id`

Mais les espaces Province, Region et Fraternite sont encore alimentes par des donnees statiques dans `app-routing.module.ts`.

R6 doit donc transformer ces vues en espaces dynamiques, alimentes par le backend et limites par le perimetre du role connecte.

## Backend - endpoints existants

### Authentification

| Endpoint | Methode | Acces | Etat |
| --- | --- | --- | --- |
| `/api/authenticate` | POST | public | OK |

La connexion retourne un JWT. Le front stocke ce token et l'envoie ensuite via l'intercepteur d'authentification.

### Utilisateurs

| Endpoint | Methode | Acces | Usage actuel |
| --- | --- | --- | --- |
| `/api/users` | GET/POST | ADMIN | Administration utilisateurs |
| `/api/users/{id}` | GET/PUT/DELETE | ADMIN | Administration utilisateurs |
| `/api/users/role/{role}` | GET | ADMIN | Filtrage utilisateurs par role |

Les utilisateurs possedent deja un rattachement metier possible :

- `province`
- `region`
- `fraternity`

### Membres

| Endpoint | Methode | Acces | Etat R6 |
| --- | --- | --- | --- |
| `/members` | GET | authentifie | endpoint principal par perimetre |
| `/members/search` | GET | authentifie | recherche securisee par perimetre |
| `/members/{id}` | GET | authentifie | fiche detail securisee par perimetre |
| `/members/all` | GET | ADMIN | liste globale admin uniquement |
| `/members/archived` | GET | ADMIN | membres archives |
| `/members/inactive` | GET | ADMIN | membres inactifs |
| `/members/create` | POST | authentifie | creation membre |
| `/members/update/{id}` | PUT | authentifie | mise a jour membre |
| `/members/{id}/status` | PATCH | authentifie | changement statut |
| `/members/{id}/archive` | PATCH | authentifie | archivage |
| `/members/{id}/restore` | PATCH | ADMIN | restauration |

Les membres sont deja le module le plus avance pour R6.

Le backend impose le perimetre via `CurrentUserService` et `CmdaMemberService` :

- `ADMIN` : tous les membres non archives.
- `PROVINCIAL` : membres des fraternites de sa province.
- `REGIONAL` : membres des fraternites de sa region.
- `BERGER` : membres de sa fraternite.

Le front a deja ete corrige pour utiliser :

- `/members/all` pour `ADMIN`.
- `/members?page=0&size=100` pour `PROVINCIAL`, `REGIONAL`, `BERGER`.

### Provinces

| Endpoint | Methode | Acces actuel | Limite R6 |
| --- | --- | --- | --- |
| `/provinces/all` | GET | ADMIN | pas encore accessible au provincial pour sa province |
| `/provinces/{id}` | GET | ADMIN | pas encore perimetre utilisateur |
| `/provinces/create` | POST | ADMIN | CRUD admin |
| `/provinces/update/{id}` | PUT | ADMIN | CRUD admin |
| `/provinces/delete/{id}` | DELETE | ADMIN | CRUD admin |

Constat : pour rendre l'espace Provincial dynamique, il manque un endpoint metier du type `GET /provinces/me` ou `GET /scope/province`.

### Regions

| Endpoint | Methode | Acces actuel | Limite R6 |
| --- | --- | --- | --- |
| `/regions/all` | GET | ADMIN | pas accessible au provincial/regional |
| `/regions/{id}` | GET | ADMIN | pas encore perimetre utilisateur |
| `/regions/province/{provinceId}` | GET | ADMIN | pas encore perimetre utilisateur |
| `/regions/create` | POST | ADMIN | CRUD admin |
| `/regions/update/{id}` | PUT | ADMIN | CRUD admin |
| `/regions/delete/{id}` | DELETE | ADMIN | CRUD admin |

Constat : pour rendre l'espace Regional dynamique, il manque un endpoint metier du type `GET /regions/me`.

### Fraternites

| Endpoint | Methode | Acces actuel | Limite R6 |
| --- | --- | --- | --- |
| `/fraternities/all` | GET | ADMIN | pas accessible au regional/berger |
| `/fraternities/{id}` | GET | ADMIN | pas encore perimetre utilisateur |
| `/fraternities/region/{regionId}` | GET | ADMIN | pas encore perimetre utilisateur |
| `/fraternities/create` | POST | ADMIN | CRUD admin |
| `/fraternities/update/{id}` | PUT | ADMIN | CRUD admin |
| `/fraternities/delete/{id}` | DELETE | ADMIN | CRUD admin |

Constat : pour rendre l'espace Berger dynamique, il manque un endpoint metier du type `GET /fraternities/me`.

Pour l'espace Regional, il manque un endpoint du type `GET /fraternities/my-region`.

## Front Angular - etat actuel

### Services existants

| Service | Etat |
| --- | --- |
| `AuthService` | OK pour login, token, roles, route par defaut |
| `CmdaMemberService` | OK pour membres, recherche, detail, CRUD |
| `UserService` | contient users/provinces/regions/fraternities mais oriente ADMIN |

### Composants concernes

| Composant | Etat R6 |
| --- | --- |
| `HierarchySpaceComponent` | lit encore les donnees statiques depuis les routes |
| `ListComponent` | deja corrige pour utiliser `/members` hors ADMIN |
| `DetailsComponent` | charge `/members/:id`, donc perimetre backend respecte |
| `RoleDashboardComponent` | encore statique via route data |

### Donnees statiques identifiees

Dans `app-routing.module.ts`, les routes suivantes contiennent encore les donnees metier statiques :

- `/app/provincial/province`
- `/app/regional/region`
- `/app/berger/fraternity`
- dashboards role : admin, provincial, regional, berger

Donnees statiques a remplacer :

- titres et sous-titres.
- responsable affiche.
- image hero.
- metriques.
- listes de regions.
- listes de fraternites.
- groupes/services.
- evenements.
- documents.

## Corrections deja realisees autour de R6

Deux corrections importantes preparent R6 :

1. La liste membres n'appelle plus `/members/all` pour les roles non-admin.
2. L'intercepteur d'erreurs ne redirige plus automatiquement vers `/forbidden` pour les erreurs API backend.

Cela evite qu'un regional ou un berger soit sorti de son espace connecte a cause d'un `403` API.

## Points bloquants pour le passage complet au dynamique

### 1. Endpoints structures encore reserves ADMIN

Les endpoints `provinces`, `regions` et `fraternities` sont utiles pour l'administration, mais pas encore adaptes aux espaces connectes par role.

### 2. Pas encore d'endpoint "mon perimetre"

Il manque un endpoint synthetique pour recuperer le scope de l'utilisateur connecte :

```text
GET /me/scope
```

ou plusieurs endpoints dedies :

```text
GET /provinces/me
GET /regions/me
GET /fraternities/me
GET /fraternities/my-region
GET /regions/my-province
```

### 3. `HierarchySpaceComponent` depend encore de la route

Le composant doit passer de :

```text
route.data statique
```

a :

```text
mode route + service API + etats loading/error/empty
```

## Decisions pour R6-E2

R6-E2 doit definir le modele de perimetre utilisateur et les endpoints cibles avant implementation.

Decision recommandee :

- creer un endpoint backend de scope utilisateur connecte ;
- ajouter des endpoints structures perimetres ;
- creer cote front des services dedies :
  - `CurrentUserScopeService`
  - `ProvinceService`
  - `RegionService`
  - `FraternityService`

## Validation R6-E1

R6-E1 est valide si :

- les endpoints existants sont identifies ;
- les endpoints manquants sont listes ;
- les donnees statiques front sont localisees ;
- les corrections deja faites sur la liste membres sont connues ;
- la suite R6-E2 est claire.

Etat : termine.

