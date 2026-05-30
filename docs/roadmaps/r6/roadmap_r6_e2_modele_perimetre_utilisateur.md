# R6-E2 - Modele de perimetre utilisateur

## Objectif

Definir et materialiser le contrat qui permet au front de savoir immediatement :

- qui est l'utilisateur connecte ;
- quel est son role ;
- quel est son niveau de perimetre ;
- quelle province, region ou fraternite lui est rattachee ;
- quels volumes il peut voir dans son perimetre.

Cette etape prepare le passage des espaces R5 du statique vers le dynamique.

## Matrice des perimetres

| Role | Niveau | Voit | Gere |
| --- | --- | --- | --- |
| `ADMIN` | `GLOBAL` | toutes les provinces, regions, fraternites, membres et utilisateurs | utilisateurs, structures et membres |
| `PROVINCIAL` | `PROVINCE` | sa province, ses regions, les fraternites de ses regions, les membres rattaches | regions, fraternites et membres de sa province |
| `REGIONAL` | `REGION` | sa region, ses fraternites, les membres rattaches | fraternites et membres de sa region |
| `BERGER` | `FRATERNITY` | sa fraternite, ses membres | membres de sa fraternite |

## Endpoint cree

```text
GET /api/me/scope
```

Acces : utilisateur authentifie.

Reponse attendue :

```json
{
  "userId": 14,
  "username": "Region_Test_V15id14",
  "role": "REGIONAL",
  "scopeLevel": "REGION",
  "province": {
    "id": 16,
    "name": "Province_V16"
  },
  "region": {
    "id": 14,
    "name": "Region_Test_V15"
  },
  "fraternity": null,
  "metrics": {
    "provincesCount": 1,
    "regionsCount": 1,
    "fraternitiesCount": 1,
    "membersCount": 1
  },
  "readableResources": ["OWN_REGION", "OWN_FRATERNITIES", "OWN_MEMBERS"],
  "manageableResources": ["OWN_FRATERNITIES", "OWN_MEMBERS"]
}
```

## Fichiers backend ajoutes

- `CurrentUserScopeDTO`
- `CurrentUserScopeService`
- `CurrentUserScopeController`

## Fichiers backend modifies

- `SecurityConfig` : ouverture authentifiee de `/api/me/**`.
- `RegionRepository` : compteur par province.
- `FraternityRepository` : compteurs par region et province.
- `CmdaMemberRepository` : compteurs par fraternite, region et province.

## Fichiers front ajoutes

- `CurrentUserScope` : modele TypeScript du contrat de perimetre.
- `CurrentUserScopeService` : service Angular centralise pour appeler `/api/me/scope`.

## Decision importante

R6-E2 ne remplace pas encore les donnees statiques des pages Province, Region et Fraternite.

La suite logique est R6-E3 : utiliser ce contrat dans des services Angular de donnees metier, puis brancher progressivement :

- R6-E4 : espace Provincial dynamique ;
- R6-E5 : espace Regional dynamique ;
- R6-E6 : espace Berger dynamique.

