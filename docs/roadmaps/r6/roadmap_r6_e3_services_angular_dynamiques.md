# R6-E3 - Services Angular dynamiques

## Objectif

Creer le socle de services Angular qui permettra de remplacer progressivement les donnees statiques des espaces R5 par les donnees API.

Cette etape ne bascule pas encore completement les ecrans Province, Region et Fraternite. Elle prepare les branchements des etapes suivantes :

- R6-E4 : espace Provincial dynamique ;
- R6-E5 : espace Regional dynamique ;
- R6-E6 : espace Berger dynamique.

## Precision metier conservee

Les espaces actuels sont valides pour le MVP et doivent conserver leur architecture.

Regles de navigation retenues :

- dans une province, une carte Region doit diriger vers l'espace Region ;
- dans une region, une carte Fraternite doit diriger vers l'espace Fraternite ;
- dans une fraternite, les cartes `Groupes et services` restent statiques pour le MVP ;
- le berger accede a ses membres depuis le menu lateral `Membres`, pas depuis les groupes/services.

## Services ajoutes

### `CurrentUserScopeService`

Service deja cree en R6-E2.

Role :

- consommer `GET /api/me/scope` ;
- centraliser le perimetre de l'utilisateur connecte ;
- exposer un cache simple reutilisable.

### `ProvinceService`

Role :

- preparer les appels province ;
- recuperer la province rattachee a l'utilisateur depuis le scope ;
- garder les endpoints admin existants disponibles pour les futurs ecrans autorises.

### `RegionService`

Role :

- preparer les appels region ;
- recuperer la region rattachee a l'utilisateur depuis le scope ;
- preparer les listes de regions par province pour R6-E4.

### `FraternityService`

Role :

- preparer les appels fraternite ;
- recuperer la fraternite rattachee a l'utilisateur depuis le scope ;
- preparer les listes de fraternites par region pour R6-E5.

### `HierarchySpaceDataService`

Role :

- transformer les donnees du scope en metriques affichables ;
- preparer la fusion progressive entre les donnees statiques R5 et les donnees dynamiques R6 ;
- eviter de casser l'architecture visuelle MVP pendant le branchement.

## Modeles ajoutes

- `organization-unit.model.ts`
  - `Province`
  - `Region`
  - `Fraternity`

- `hierarchy-space.model.ts`
  - `HierarchyMetric`
  - `HierarchyItem`
  - `HierarchySideItem`
  - `HierarchySpaceViewModel`

## Ajustements interface

`HierarchySpaceComponent` utilise maintenant les types partages.

Les cartes peuvent avoir :

- un `route` quand elles doivent naviguer ;
- aucun `route` quand elles doivent rester statiques.

Les groupes/services de l'espace Fraternite sont donc statiques pour le MVP.

## Limite volontaire R6-E3

Les services `ProvinceService`, `RegionService` et `FraternityService` exposent encore certains endpoints admin existants. Les endpoints backend perimetres structures seront ajustes dans les prochaines etapes si necessaire.

R6-E3 pose le socle front sans forcer un remplacement brutal des ecrans qui sont deja valides visuellement.

## Etat

Termine.

