# R6-E6 - Espace Berger / Fraternite dynamique

## Objectif

Brancher `/app/berger/fraternity` sur la vraie fraternite consultee, en conservant l'architecture MVP validee.

## Regle metier

Le berger gere les membres de sa fraternite depuis le menu lateral `Membres`.

Dans l'espace Fraternite :

- l'identite de la fraternite devient dynamique ;
- le nombre de membres devient dynamique ;
- les cartes `Groupes et services` restent statiques pour le MVP ;
- les groupes/services ne redirigent pas vers la liste des membres.

## Navigation depuis la Region

Depuis l'espace Regional, une carte Fraternite transmet maintenant :

```text
/app/berger/fraternity?fraternityId={id}
```

Cela permet a un regional ou a un provincial d'entrer dans une fraternite precise appartenant a son perimetre.

## Backend

### Endpoints ajoutes

```text
GET /api/me/fraternity
GET /api/me/fraternities/{fraternityId}
```

Acces :

- `GET /api/me/fraternity` : `BERGER`
- `GET /api/me/fraternities/{fraternityId}` : `ADMIN`, `PROVINCIAL`, `REGIONAL`, `BERGER`

Le service backend verifie que la fraternite demandee appartient bien au perimetre de l'utilisateur :

- provincial : fraternite dans sa province ;
- regional : fraternite dans sa region ;
- berger : sa fraternite uniquement.

## Frontend

### Services utilises

- `CurrentUserScopeService`
- `FraternityService`

### Composant branche

`HierarchySpaceComponent`, en mode `fraternity`, charge maintenant :

- la fraternite du berger si aucun `fraternityId` n'est fourni ;
- la fraternite selectionnee si `fraternityId` est present ;
- les metriques membres depuis les donnees API ;
- les groupes/services statiques du MVP.

## Limite volontaire

Les groupes/services ne sont pas encore un vrai module metier.

Ils restent une section de presentation dans le MVP. Leur exploitation dynamique pourra etre traitee dans une roadmap ulterieure.

## Etat

Termine.

