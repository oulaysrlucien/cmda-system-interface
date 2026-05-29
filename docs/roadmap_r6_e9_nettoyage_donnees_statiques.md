# R6-E9 - Nettoyage des donnees statiques

## Objectif

Retirer progressivement les donnees mockees de `app-routing.module.ts` afin que les routes restent responsables uniquement de la navigation, des roles et du mode d'ecran.

Cette etape ne supprime pas le rendu MVP valide en R5. Elle deplace les valeurs de secours dans un fichier dedie et laisse les donnees metier venir des services dynamiques mis en place en R6.

## Perimetre traite

Les routes suivantes ont ete nettoyees :

- `/app/provincial/province`
- `/app/regional/region`
- `/app/berger/fraternity`

Avant R6-E9, ces routes contenaient directement :

- titres et sous-titres d'ecran.
- images hero.
- metriques mockees.
- listes de regions, fraternites, groupes/services.
- evenements et documents statiques.

Apres R6-E9, elles ne portent plus que :

- les roles autorises.
- le `mode` de l'ecran : `province`, `region` ou `fraternity`.

## Nouvelle organisation

### Routes allegees

`app-routing.module.ts` garde uniquement le contrat de navigation :

```ts
data: {
  roles: ['PROVINCIAL'],
  mode: 'province'
}
```

Le meme principe est applique aux espaces `region` et `fraternity`.

### Defaults dedies

Un fichier de secours a ete ajoute :

```text
src/app/shared/hierarchy-space/hierarchy-space.defaults.ts
```

Il contient les valeurs minimales necessaires pour que l'ecran reste coherent si l'API ne repond pas encore ou si un perimetre est vide.

### Donnees dynamiques conservees

Les donnees reelles restent chargees via les services R6 :

- Province : regions et compteurs depuis le perimetre provincial.
- Region : fraternites et compteurs depuis le perimetre regional.
- Fraternite : vraie fraternite du berger ou fraternite selectionnee dans le perimetre autorise.
- Groupes et services : conserves statiques pour le MVP, comme decide.

## Decisions MVP

Les evenements, documents et groupes/services restent des valeurs de secours statiques pour le moment.

Ce choix est volontaire : R6-E9 retire les mocks du routing sans ouvrir un chantier CRUD supplementaire. Les donnees structurelles principales sont deja dynamiques :

- regions.
- fraternites.
- membres.
- fiche detail membre.
- compteurs de perimetre.

## Fichiers modifies

- `src/app/app-routing.module.ts`
- `src/app/shared/hierarchy-space/hierarchy-space.component.ts`
- `src/app/shared/hierarchy-space/hierarchy-space.defaults.ts`

## Verification attendue

- Le build Angular doit rester valide.
- Les routes hierarchiques doivent continuer a s'afficher.
- Les donnees dynamiques doivent continuer a remplacer les defaults lorsque l'API repond.

## Etat

R6-E9 terminee.
