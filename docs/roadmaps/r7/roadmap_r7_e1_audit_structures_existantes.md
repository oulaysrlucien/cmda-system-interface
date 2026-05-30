# R7-E1 - Audit des structures existantes

## Objectif

Verifier l'existant backend et frontend avant de demarrer le CRUD des structures hierarchiques.

Structures concernees :

```text
Province
  -> Region
      -> Fraternite
```

## Synthese

Les bases existent deja cote backend :

- entites JPA presentes.
- repositories presents.
- DTOs presents.
- endpoints CRUD ADMIN presents.
- endpoints de lecture par perimetre deja ajoutes en R6.

Cote frontend, les services de lecture existent, mais les services et ecrans CRUD ne sont pas encore finalises.

## Backend audite

### Entites

| Structure | Fichier | Etat |
| --- | --- | --- |
| Province | `Province.java` | presente, relation `OneToMany` vers regions |
| Region | `Region.java` | presente, rattachee a une province |
| Fraternity | `Fraternity.java` | presente, rattachee a une region, relation vers membres |

Constat :

- La hierarchie metier est bien modelisee.
- Les relations parent/enfant existent.
- Il n'y a pas encore de champ standard d'archivage sur ces structures.

### DTOs

| DTO | Etat |
| --- | --- |
| `ProvinceDTO` | contient regions |
| `RegionDTO` | contient `provinceId` et fraternites |
| `FraternityDTO` | contient `regionId` et membres |

Constat :

- Les DTOs permettent deja de retourner une structure complete.
- Pour les formulaires R7, il faudra peut-etre des DTOs plus legers afin d'eviter de charger trop de membres lors des ecrans de gestion.

### Repositories

| Repository | Capacites observees |
| --- | --- |
| `ProvinceRepository` | `findByName`, `findByNameContaining` |
| `RegionRepository` | `findByProvinceId`, `countByProvinceId`, recherche par nom |
| `FraternityRepository` | `findByRegionId`, compteurs, controle region/province |

Constat :

- Les recherches par rattachement existent.
- Les controles utiles au perimetre R6 existent deja pour les fraternites.
- Il manque des helpers explicites pour certaines futures verifications CRUD, par exemple detecter les doublons dans un meme parent.

### Services backend

| Service | Etat CRUD |
| --- | --- |
| `ProvinceService` | create, getAll, getById, update, delete |
| `RegionService` | create, getAll, getById, update, delete, getByProvince |
| `FraternityService` | create, getAll, getById, update, delete, getByRegion |

Constat :

- Le CRUD de base existe.
- Les suppressions sont physiques.
- Les controles metier restent minimaux.
- Les methodes de consultation doivent continuer a respecter les perimetres `PROVINCIAL` et `REGIONAL`.

### Controllers backend

| Controller | Routes | Securite observee |
| --- | --- | --- |
| `ProvincialController` | `/provinces/create`, `/provinces/all`, `/provinces/{id}`, `/provinces/update/{id}`, `/provinces/delete/{id}` | `ADMIN` |
| `RegionalController` | `/regions/create`, `/regions/all`, `/regions/{id}`, `/regions/update/{id}`, `/regions/delete/{id}`, `/regions/province/{provinceId}` | `ADMIN` |
| `BergerFraternityController` | `/fraternities/create`, `/fraternities/all`, `/fraternities/{id}`, `/fraternities/update/{id}`, `/fraternities/delete/{id}`, `/fraternities/region/{regionId}` | `ADMIN` |

Constat :

- L'ADMIN peut deja gerer les structures via API.
- Les routes sont fonctionnelles mais pas encore harmonisees REST (`/create`, `/update/{id}`, `/delete/{id}`).
- Les roles `PROVINCIAL` et `REGIONAL` disposent de lectures perimetrees R6 ; R7-E2 confirme qu'ils n'auront pas de CRUD structures pour le MVP.

## Frontend audite

### Modeles

Fichier : `src/app/shared/models/organization-unit.model.ts`

Les interfaces existent :

- `Province`
- `Region`
- `Fraternity`

Constat :

- Suffisant pour l'affichage R6.
- A completer pour les formulaires R7 si on ajoute des champs comme responsable, statut, archivage ou localisation.

### Services Angular

| Service | Lecture | Creation | Modification | Suppression |
| --- | --- | --- | --- | --- |
| `ProvinceService` | oui | non | non | non |
| `RegionService` | oui | non | non | non |
| `FraternityService` | oui | non | non | non |
| `UserService` | lit provinces, regions, fraternites pour les formulaires utilisateur | non | non | non |

Constat :

- Les services R6 sont principalement orientes lecture.
- R7-E4 devra ajouter les methodes `create`, `update`, `delete` ou `archive`.

### Ecrans Angular

Ecrans deja presents :

- espace Provincial dynamique : `/app/provincial/province`.
- espace Regional dynamique : `/app/regional/region`.
- espace Fraternite dynamique : `/app/berger/fraternity`.
- gestion utilisateurs ADMIN : `/app/users`.

Ecrans manquants pour R7 :

- ecran ADMIN de gestion des structures.
- formulaire Province.
- formulaire Region.
- formulaire Fraternite.
- ecrans ou modes edition integres aux espaces Provincial/Regional.

### Sidebar

La sidebar contient deja les entrees visuelles :

- `Structures`
- `Fraternites`

Mais elles sont encore des elements desactives.

Constat :

- R7 pourra transformer ces entrees en vraies routes.
- Pour ADMIN, il faudra probablement detailler Provinces, Regions, Fraternites, comme dans le dashboard cible partage.

## Ecarts principaux avant implementation

1. Les endpoints CRUD existent surtout pour `ADMIN`.
2. Les lectures perimetrees `PROVINCIAL` et `REGIONAL` doivent rester disponibles sans exposer de CRUD structures.
3. Les suppressions sont physiques ; il faut decider suppression ou archivage.
4. Les services Angular n'ont pas encore les methodes CRUD.
5. Les ecrans CRUD structures n'existent pas encore.
6. Les routes frontend des sections `Structures` et `Fraternites` sont encore inactives.
7. Les DTOs peuvent etre trop lourds pour certains ecrans de gestion.

## Recommandations pour R7-E2

R7-E2 doit commencer par la matrice de droits :

| Role | Province | Region | Fraternite |
| --- | --- | --- | --- |
| ADMIN | CRUD complet | CRUD complet | CRUD complet |
| PROVINCIAL | lecture de sa province | lecture de ses regions | lecture des fraternites rattachees |
| REGIONAL | lecture contexte | lecture de sa region | lecture des fraternites rattachees |
| BERGER | lecture contexte | lecture contexte | lecture de sa fraternite |

Decision confirmee en R7-E2 : seul l'`ADMIN` administre les structures pour le MVP.

Points a trancher :

- archivage logique et reactivation des structures.
- blocage si une region contient des fraternites.
- blocage si une fraternite contient des membres.
- gestion des responsables rattaches aux structures.
- besoin d'un ecran ADMIN structures avant les ecrans Provincial/Regional.

## Etat

R7-E1 terminee.
