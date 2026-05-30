# R6-E4 - Espace Provincial dynamique

## Objectif

Brancher `/app/provincial/province` sur les vraies donnees du provincial connecte, en conservant l'architecture visuelle validee en R5.

## Regle metier

Le provincial pilote sa province.

Il doit voir :

- sa province rattachee ;
- les regions de cette province ;
- le nombre de regions ;
- le nombre de fraternites rattachees a ces regions ;
- le nombre de membres rattaches a ces fraternites.

Quand il clique sur une region, il est dirige vers l'espace Region.

## Backend

### Endpoint ajoute

```text
GET /api/me/province/regions
```

Acces :

- `ADMIN`
- `PROVINCIAL`

Role :

- retourner les regions de la province rattachee a l'utilisateur connecte ;
- retourner les fraternites et membres associes via les DTO existants afin de preparer les metriques des cartes.

### Fichiers modifies

- `CurrentUserScopeController`
- `CurrentUserScopeService`

## Frontend

### Services utilises

- `CurrentUserScopeService`
- `RegionService`

### Composant branche

`HierarchySpaceComponent` garde son rendu R5, mais pour le mode `province`, il charge maintenant :

- le scope utilisateur ;
- les regions de la province ;
- les compteurs dynamiques ;
- les cartes regions issues de l'API.

En cas d'erreur API, les donnees statiques de secours restent affichees pour ne pas casser l'ecran MVP.

## Limite volontaire

R6-E4 ne branche pas encore l'espace Region.

La navigation vers `/app/regional/region` reste en place, et le branchement dynamique de cet espace sera traite en R6-E5.

## Etat

Termine.

