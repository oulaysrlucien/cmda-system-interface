# R7-E7 - Espace Provincial : gestion des regions

## Objectif

Rendre l'espace Provincial reellement operationnel, dynamique et responsive tout en respectant les regles metier MVP :

- le Provincial consulte les regions de sa province.
- il ouvre une region pour consulter ses fraternites.
- il peut ensuite ouvrir une fraternite de son perimetre.
- il ne cree, ne modifie et n'archive pas les structures.

## Route principale

```text
/app/provincial/province
```

## Donnees dynamiques

La vue Province utilise :

- `GET /api/me/scope`
- `GET /api/me/province/regions`
- `GET /api/me/regions/{regionId}/fraternities`

Chaque region est enrichie avec ses fraternites reelles avant affichage. Les compteurs des cartes Region ne dependent donc plus uniquement de donnees imbriquees eventuellement incompletes.

## Parcours Provincial

```text
Province
  -> carte Region : Voir la region
      -> liste dynamique des fraternites
          -> carte Fraternite : Voir la fraternite
```

La liste membres reste accessible dans la sidebar et continue de respecter le perimetre du Provincial.

## Interface

- titre Province personnalise avec l'identifiant du Provincial connecte.
- compteurs dynamiques Province, regions, fraternites et membres.
- cartes Region avec images, description et compteurs reels.
- chargement adapte au niveau courant.
- boutons de creation et menu d'options masques pour le Provincial.
- sidebar active avec acces `Mes regions` et `Fraternites`.
- comportement responsive conserve sur ordinateur, tablette et mobile.

## Fichiers modifies

- `src/app/shared/hierarchy-space/hierarchy-space.component.ts`
- `src/app/shared/hierarchy-space/hierarchy-space.component.html`
- `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/shared/sidebar/sidebar.component.html`
- `src/app/shared/header/app-header/app-header.component.ts`

## Verification

```text
npm run build
```

## Etat

R7-E7 terminee.
