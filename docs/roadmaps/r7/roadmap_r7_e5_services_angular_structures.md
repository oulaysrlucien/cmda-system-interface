# R7-E5 - Services Angular des structures

## Objectif

Finaliser les services Angular `Province`, `Region` et `Fraternity` afin de preparer l'ecran ADMIN Structures.

Les composants Angular pourront utiliser une API typee et coherente sans appeler directement `HttpClient`.

## Modeles partages

Le fichier :

```text
src/app/shared/models/organization-unit.model.ts
```

porte maintenant :

- `Province`
- `Region`
- `Fraternity`
- `ProvincePayload`
- `RegionPayload`
- `FraternityPayload`

Les structures exposees par l'API contiennent aussi :

```text
archived?: boolean
```

Les DTOs utilises par la gestion des utilisateurs ont ete alignes sur ce champ.

## Services finalises

### ProvinceService

Methodes disponibles :

```text
getAll()
getById(id)
getArchived()
create(payload)
update(id, payload)
archive(id)
restore(id)
getCurrentUserProvince()
```

### RegionService

Methodes disponibles :

```text
getAll()
getById(id)
getByProvince(provinceId)
getArchived()
create(payload)
update(id, payload)
archive(id)
restore(id)
getCurrentUserProvinceRegions()
getCurrentUserRegion()
```

### FraternityService

Methodes disponibles :

```text
getAll()
getById(id)
getByRegion(regionId)
getArchived()
create(payload)
update(id, payload)
archive(id)
restore(id)
getCurrentUserRegionFraternities()
getScopedRegionFraternities(regionId)
getCurrentUserFraternityDetails()
getScopedFraternity(fraternityId)
getCurrentUserFraternity()
```

## Correspondance Backend

| Operation Angular | Endpoint backend |
| --- | --- |
| `getAll()` | `GET /.../all` |
| `getById(id)` | `GET /.../{id}` |
| `getArchived()` | `GET /.../archived` |
| `create(payload)` | `POST /.../create` |
| `update(id, payload)` | `PUT /.../update/{id}` |
| `archive(id)` | `PATCH /.../{id}/archive` |
| `restore(id)` | `PATCH /.../{id}/restore` |

## Fichiers modifies

- `src/app/shared/models/organization-unit.model.ts`
- `src/app/shared/services/province.service.ts`
- `src/app/shared/services/region.service.ts`
- `src/app/shared/services/fraternity.service.ts`
- `src/app/user-management/models/province.dto.ts`
- `src/app/user-management/models/region.dto.ts`
- `src/app/user-management/models/fraternity.dto.ts`

## Verification

Build Angular valide :

```text
npm run build
```

## Etat

R7-E5 terminee.
