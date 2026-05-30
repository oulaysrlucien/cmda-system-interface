# Roadmap R7 - CRUD des structures hierarchiques

## Objectif

Rendre administrables les structures qui portent toute l'organisation CMDA DEV :

```text
Province
  -> Region
      -> Fraternite
```

R6 a branche les ecrans sur les vraies donnees. R7 doit permettre de creer, consulter, modifier, archiver et reactiver ces structures, avec les bons droits selon le role connecte.

## Philosophie MVP

Le design R5/R6 est conserve. R7 ne doit pas casser les espaces Province, Region et Fraternite deja valides.

Les actions CRUD doivent s'integrer naturellement :

- depuis l'ADMIN pour piloter toute la plateforme.
- depuis le Provincial pour consulter ses regions et les fraternites rattachees.
- depuis le Regional pour consulter les fraternites de sa region.
- sans donner aux roles Provincial, Regional et Berger la gestion des structures.

## Etapes definies

### R7-E1 - Audit des structures existantes

Verifier ce qui existe deja cote backend et frontend.

Livrables :

- etat des entites `Province`, `Region`, `Fraternity`.
- etat des endpoints CRUD.
- etat des services Angular.
- ecarts avant implementation.

Etat : termine.

Documentation : `roadmap_r7_e1_audit_structures_existantes.md`.

### R7-E2 - Regles metier et perimetres CRUD

Definir precisement qui peut creer, modifier, archiver ou reactiver chaque structure.

Livrables :

- matrice `ADMIN`, `PROVINCIAL`, `REGIONAL`, `BERGER`.
- regles d'archivage et de reactivation logique.
- regles de blocage si une structure contient des enfants.

Etat : termine.

Documentation : `roadmap_r7_e2_regles_metier_crud.md`.

### R7-E3 - Backend CRUD securise

Completer les services backend pour porter les regles metier.

Livrables :

- endpoints CRUD harmonises.
- validation des rattachements province/region/fraternite.
- controles de perimetre cote serveur.
- archivage/reactivation logique et controle des doublons.

Etat : termine.

Documentation : `roadmap_r7_e3_backend_crud_securise.md`.

### R7-E4 - Services Angular CRUD

Completer les services front :

- `ProvinceService`
- `RegionService`
- `FraternityService`

Livrables :

- `create`
- `update`
- `archive` et `restore`
- methodes par perimetre.

### R7-E5 - Ecran ADMIN Structures

Ajouter un ecran ADMIN dedie aux structures.

Livrables :

- vue globale Provinces / Regions / Fraternites.
- actions de creation et modification.
- navigation vers les espaces existants.

### R7-E6 - Consultation des regions cote Provincial

Permettre au Provincial de consulter les regions de sa province sans administrer la structure.

Livrables :

- liste des regions du perimetre.
- acces aux fraternites d'une region.
- absence de boutons CRUD structures.

### R7-E7 - Consultation des fraternites cote Regional

Permettre au Regional de consulter les fraternites de sa region sans administrer la structure.

Livrables :

- liste des fraternites du perimetre.
- acces a l'espace fraternite.
- absence de boutons CRUD structures.

### R7-E8 - Formulaires responsive

Construire les formulaires de creation/modification.

Livrables :

- formulaire Province.
- formulaire Region avec province rattachee.
- formulaire Fraternite avec region rattachee.
- validation et messages d'erreur.

### R7-E9 - Archivage, reactivation et garde-fous

Traiter les actions sensibles.

Livrables :

- confirmation utilisateur.
- traitement controle si enfants rattaches.
- reactivation explicite.
- messages clairs.

### R7-E10 - Tests et documentation

Valider les parcours CRUD.

Livrables :

- tests manuels par role.
- documentation finale R7.
- mise a jour du tableau de progression R0-R11.

## Livrable R7 attendu

A la fin de R7, les structures ne seront plus seulement visibles : elles seront administrables par l'ADMIN et consultables selon les perimetres metier des autres roles.
