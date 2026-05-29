# R6-E5 - Espace Regional dynamique

## Objectif

Brancher `/app/regional/region` sur les vraies donnees de la region consultee, en conservant l'architecture visuelle validee en R5.

## Regle metier

Le regional pilote ses fraternites.

Il doit voir :

- sa region rattachee ;
- les fraternites de sa region ;
- le nombre de fraternites ;
- le nombre de membres rattaches a ces fraternites.

Quand il clique sur une fraternite, il est dirige vers l'espace Fraternite.

## Navigation depuis la Province

Depuis l'espace Provincial, une carte Region transmet maintenant :

```text
/app/regional/region?regionId={id}
```

Cela permet au provincial d'entrer dans une region precise de sa province.

Si un provincial arrive sur `/app/regional/region` sans `regionId`, l'ecran utilise la premiere region de sa province comme affichage de secours.

## Backend

### Endpoints ajoutes

```text
GET /api/me/region/fraternities
GET /api/me/regions/{regionId}/fraternities
```

Acces :

- `ADMIN`
- `REGIONAL`
- `PROVINCIAL` pour une region de sa province

Le service backend verifie que la region demandee appartient bien au perimetre de l'utilisateur.

## Frontend

### Services utilises

- `CurrentUserScopeService`
- `RegionService`
- `FraternityService`

### Composant branche

`HierarchySpaceComponent`, en mode `region`, charge maintenant :

- la region courante ou la region selectionnee via `regionId` ;
- les fraternites rattachees ;
- les metriques dynamiques ;
- les cartes fraternites issues de l'API.

Les cartes Fraternite transmettent aussi un `fraternityId` pour preparer R6-E6 :

```text
/app/berger/fraternity?fraternityId={id}
```

## Limite volontaire

R6-E5 ne branche pas encore l'espace Fraternite.

L'espace Fraternite sera traite en R6-E6. Les groupes/services resteront statiques pour le MVP, conformement a la decision metier.

## Etat

Termine.

