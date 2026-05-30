# Postman - CMDA Management

## Objectif

Ce dossier contient la collection Postman de reference du backend CMDA DEV, en complement de Swagger.

Swagger reste la source technique des routes reellement exposees. La collection Postman sert de document de travail organise par domaine metier et de support pour les tests manuels.

## Fichiers

```text
docs/postman/
  CMDA_Management.postman_collection.json
  CMDA_Local.postman_environment.json
  README.md
```

## Import Dans Postman

1. Redemarrer le backend Spring Boot.
2. Dans Postman, cliquer sur `Import`.
3. Importer `CMDA_Management.postman_collection.json`.
4. Importer `CMDA_Local.postman_environment.json`.
5. Selectionner l'environnement `CMDA Local`.
6. Renseigner `username` et `password`.
7. Executer `AUTHENTICATION / Authenticate`.

Le script Postman copie automatiquement le JWT recu dans la variable `jwtToken`.

## Swagger

Swagger UI :

```text
http://localhost:8080/swagger-ui/index.html
```

Specification OpenAPI :

```text
http://localhost:8080/v3/api-docs
```

Les deux liens sont egalement presents dans le dossier Postman `REFERENCE`.

## Organisation De La Collection

```text
CMDA Management
  AUTHENTICATION
  USERS
  PROVINCES
    CRUD METIER
    ARCHIVAGE
    COMPATIBILITE - SUPPRESSION REFUSEE
  REGIONS
    CRUD METIER
    ARCHIVAGE
    COMPATIBILITE - SUPPRESSION REFUSEE
  FRATERNITIES
    CRUD METIER
    ARCHIVAGE
    COMPATIBILITE - SUPPRESSION REFUSEE
  MEMBERS
    CRUD METIER
    ADMINISTRATION METIER
    SEARCH & FILTER
    EXPORT
  CURRENT USER SCOPE
  REFERENCE
```

## Variables D'environnement

| Variable | Utilite |
| --- | --- |
| `baseUrl` | URL du backend Spring Boot |
| `username` | utilisateur de test |
| `password` | mot de passe de test |
| `jwtToken` | JWT stocke automatiquement apres authentification |
| `userId` | utilisateur cible |
| `provinceId` | province cible |
| `regionId` | region cible |
| `fraternityId` | fraternite cible |
| `memberId` | membre cible |
| `role` | filtre role utilisateur |

## Parcours De Test R7-E3

### Doublons

1. Creer une province `Province Demo`.
2. Rejouer la meme requete avec des differences de casse ou espaces.
3. Verifier le refus.
4. Faire de meme pour une region dans la meme province.
5. Faire de meme pour une fraternite dans la meme region.

### Archivage Et Garde-fous

1. Tenter d'archiver une fraternite qui contient des membres non archives.
2. Verifier le refus.
3. Archiver les membres.
4. Archiver la fraternite.
5. Tenter d'archiver sa region si elle contient encore une autre fraternite active.
6. Verifier le refus.
7. Archiver les enfants, puis le parent.

### Reactivation

1. Tenter de reactiver une fraternite alors que sa region est archivee.
2. Verifier le refus.
3. Reactiver la region.
4. Reactiver la fraternite.

### Roles

Executer les requetes CRUD structures avec plusieurs tokens :

| Token | Resultat attendu |
| --- | --- |
| `ADMIN` | autorise |
| `PROVINCIAL` | refuse pour CRUD structures |
| `REGIONAL` | refuse pour CRUD structures |
| `BERGER` | refuse pour CRUD structures |

## Maintenance

Lorsqu'une route backend change :

1. verifier Swagger apres redemarrage du serveur.
2. mettre a jour la requete Postman concernee.
3. conserver les requetes de compatibilite dans un sous-dossier clairement nomme.
4. ajouter les nouvelles variables dans l'environnement si necessaire.
5. mettre a jour ce README si un nouveau domaine ou parcours metier apparait.

Les futures roadmaps doivent maintenir cette collection en parallele du code backend.
