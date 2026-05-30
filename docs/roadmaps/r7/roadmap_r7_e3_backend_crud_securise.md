# R7-E3 - Backend CRUD securise des structures

## Objectif

Faire du backend l'autorite metier pour l'administration des structures :

```text
Province
  -> Region
      -> Fraternite
```

Le frontend ne devra pas pouvoir contourner les regles en appelant directement l'API.

## Fonctionnalites implementees

### Archivage logique

Les entites `Province`, `Region` et `Fraternity` portent maintenant :

- `archived`
- `archivedAt`

Les listes actives excluent par defaut les structures archivees.

### Reactivation logique

Chaque structure peut etre reactivee explicitement :

- une province peut etre reactivee directement.
- une region ne peut etre reactivee que si sa province est active.
- une fraternite ne peut etre reactivee que si sa region est active.

### Garde-fous d'archivage

La strategie MVP retenue est un blocage explicite :

- impossible d'archiver une province contenant des regions actives.
- impossible d'archiver une region contenant des fraternites actives.
- impossible d'archiver une fraternite contenant des membres non archives.

L'ADMIN doit donc traiter les enfants avant d'archiver le parent.

### Responsables

Lorsqu'une structure est archivee :

- le compte utilisateur du responsable n'est pas supprime.
- l'affectation directe a la structure est retiree.
- l'utilisateur ne conserve pas de droit actif sur le perimetre archive.
- le compte reste disponible pour une reaffectation manuelle par l'ADMIN.

### Doublons

Les noms sont normalises avant enregistrement :

- suppression des espaces inutiles en debut et fin.
- regroupement des espaces multiples.
- controle insensible a la casse via les repositories.

Les doublons sont interdits :

- Province : nom unique dans l'organisation MVP.
- Region : nom unique dans une meme province.
- Fraternite : nom unique dans une meme region.

### Deplacements interdits

Pour le MVP :

- une region ne peut pas etre deplacee vers une autre province.
- une fraternite ne peut pas etre deplacee vers une autre region.

### Utilisateurs

Le service utilisateurs verifie maintenant :

- impossible de creer un compte `ADMIN` depuis l'application.
- impossible de promouvoir un utilisateur existant vers `ADMIN`.
- impossible d'affecter un responsable a une structure archivee.
- un Berger recoit aussi les references region et province deduites de sa fraternite.

### Metriques R6

Les metriques de `/api/me/scope` ignorent maintenant :

- les provinces archivees.
- les regions archivees.
- les fraternites archivees.
- les membres archives.

Le contrat de perimetre a aussi ete corrige :

- `PROVINCIAL` gere uniquement `OWN_MEMBERS`.
- `REGIONAL` gere uniquement `OWN_MEMBERS`.
- les structures restent consultables selon le perimetre mais administrables uniquement par `ADMIN`.

## Endpoints ADMIN ajoutes

### Provinces

```text
GET   /provinces/archived
PATCH /provinces/{id}/archive
PATCH /provinces/{id}/restore
```

### Regions

```text
GET   /regions/archived
PATCH /regions/{id}/archive
PATCH /regions/{id}/restore
```

### Fraternites

```text
GET   /fraternities/archived
PATCH /fraternities/{id}/archive
PATCH /fraternities/{id}/restore
```

Les anciens endpoints `DELETE` restent exposes temporairement pour compatibilite, mais le service refuse maintenant la suppression physique et demande d'utiliser l'archivage logique.

## Fichiers backend modifies

### Entites

- `Province.java`
- `Region.java`
- `Fraternity.java`

### DTOs

- `ProvinceDTO.java`
- `RegionDTO.java`
- `FraternityDTO.java`

### Repositories

- `ProvinceRepository.java`
- `RegionRepository.java`
- `FraternityRepository.java`
- `CmdaMemberRepository.java`
- `UserRepository.java`

### Services

- `ProvinceService.java`
- `RegionService.java`
- `FraternityService.java`
- `CurrentUserScopeService.java`
- `UserService.java`

### Controllers

- `ProvincialController.java`
- `RegionalController.java`
- `BergerFraternityController.java`

## Verification

Compilation backend valide :

```text
mvn -DskipTests "-Dmaven.compiler.useIncrementalCompilation=false" "-Dmaven.compiler.outputDirectory=target/r7-classes" compile
```

Le dossier de sortie separe a ete utilise car le serveur Spring actif verrouillait certains fichiers dans `target/classes`.

## Collection Postman

Une collection Postman de reference a ete ajoutee :

```text
docs/postman/CMDA_Management.postman_collection.json
docs/postman/CMDA_Local.postman_environment.json
docs/postman/README.md
```

Elle regroupe les endpoints par domaine metier et contient les nouvelles requetes R7-E3 d'archivage/reactivation.

## Etat

R7-E3 terminee.
