# R7-E8 - Espace Regional : gestion des fraternites

## Objectif

Rendre l'espace Regional operationnel, dynamique et responsive selon la philosophie MVP :

- le Regional pilote les fraternites de sa region.
- il consulte les membres de son perimetre.
- il ouvre une fraternite pour consulter son espace.
- il ne cree, ne modifie et n'archive pas les structures.

## Route principale

```text
/app/regional/region
```

## Donnees dynamiques

La vue Regional utilise :

- `GET /api/me/scope`
- `GET /api/me/regions/{regionId}/fraternities`

Les compteurs et les cartes sont construits depuis les fraternites reelles de la region rattachee.

## Parcours Regional

```text
Region
  -> liste dynamique des fraternites
      -> carte Fraternite : Voir la fraternite
  -> bouton Voir les membres
      -> liste membres perimetree a la region
```

## Interface

- photo reelle dans le bandeau Regional.
- compteurs dynamiques fraternites et membres.
- cartes Fraternite avec image, description et nombre de membres.
- etat vide clair lorsqu'aucune fraternite active n'existe.
- acces direct `Voir les membres`.
- suppression des faux boutons CRUD pour le Regional.
- sidebar simplifiee : `Tableau de bord`, `Membres`, `Fraternites`.
- comportement responsive conserve.

## Fichiers modifies

- `src/app/shared/hierarchy-space/hierarchy-space.component.ts`
- `src/app/shared/hierarchy-space/hierarchy-space.component.html`
- `src/app/shared/hierarchy-space/hierarchy-space.defaults.ts`
- `src/app/shared/sidebar/sidebar.component.ts`

## Verification

```text
npm run build
```

## Etat

R7-E8 terminee.
