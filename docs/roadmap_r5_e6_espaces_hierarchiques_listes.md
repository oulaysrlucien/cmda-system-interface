# Roadmap R5-E6 - Refonte des listes et des espaces hierarchiques

## Objectif

Faire apparaitre clairement la hierarchie metier dans l'interface :

```text
Province
  -> Regions
      -> Fraternites
          -> Membres
```

Chaque role doit voir immediatement son niveau d'action :

- `PROVINCIAL` : pilote des regions.
- `REGIONAL` : pilote des fraternites.
- `BERGER` : gere les membres de sa fraternite.

## Philosophie UX retenue

### Provincial

Le provincial ne commence pas par une liste de membres. Il arrive sur une vue strategique de province :

- Bandeau province.
- Statistiques globales.
- Cartes regions.
- Evenements et documents.

### Regional

Le regional ne commence pas par les membres. Il arrive sur une vue organisationnelle de region :

- Bandeau region.
- Statistiques regionales.
- Cartes fraternites.
- Evenements et documents.

### Berger

Le berger est au bout de la hierarchie. Il arrive sur sa fraternite :

- Bandeau fraternite.
- Statistiques de fraternite.
- Groupes/services.
- Acces direct a la liste des membres.

## Composant hierarchique ajoute

`HierarchySpaceComponent` a ete cree pour poser un modele reutilisable :

- Province.
- Region.
- Fraternite.
- Hub mondial futur.
- Autres organisations futures.

Le composant est pilote par les donnees de route :

- `mode`
- `title`
- `subtitle`
- `managerName`
- `metrics`
- `items`
- `events`
- `documents`

## Routes ajoutees

```text
/app/provincial/province
/app/regional/region
/app/berger/fraternity
```

## Redirections par role

Les routes par defaut apres connexion sont maintenant plus metier :

- `PROVINCIAL` -> `/app/provincial/province`
- `REGIONAL` -> `/app/regional/region`
- `BERGER` -> `/app/berger/fraternity`

`ADMIN` conserve son dashboard administrateur.

## Sidebar adaptee

Le lien principal de sidebar change selon le role :

- `PROVINCIAL` : `Mes regions`
- `REGIONAL` : `Mes fraternites`
- `BERGER` : `Ma fraternite`
- `ADMIN` : `Tableau de bord`

Cette difference rend le perimetre visible immediatement.

## Liste membres refondue

L'ancienne table membres affichait trop de colonnes.

La nouvelle liste garde une structure compacte :

- Membre.
- Appartenance.
- Statut.
- Contact.
- Actions.

Le bouton `Details` reste l'action principale. Il ouvre encore la modal actuelle, en attendant la grande fiche paysage prevue en R5-E7.

## Responsive liste membres

Desktop :

- Table compacte.
- Peu de colonnes.
- Actions visibles.

Mobile :

- Cartes membres.
- Statut visible.
- Contact et profession.
- Actions `Details` et `Modifier`.

## Fichiers ajoutes

- `src/app/shared/hierarchy-space/hierarchy-space.component.ts`
- `src/app/shared/hierarchy-space/hierarchy-space.component.html`
- `src/app/shared/hierarchy-space/hierarchy-space.component.css`
- `docs/roadmap_r5_e6_espaces_hierarchiques_listes.md`

## Fichiers modifies

- `src/app/app-routing.module.ts`
- `src/app/shared/shared.module.ts`
- `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/shared/sidebar/sidebar.component.html`
- `src/app/user-management/services/auth.service.ts`
- `src/app/cmda-member/list/list.component.ts`
- `src/app/cmda-member/list/list.component.html`
- `src/app/cmda-member/list/list.component.css`

## Verification

- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK

## Remarques de verification

- Le build conserve les warnings non bloquants deja connus : budget initial depasse, selecteurs Bootstrap ignores et quelques budgets CSS de composants depasses en warning.
- Les routes connectees restent protegees par `AuthGuard`; une verification visuelle complete des espaces hierarchiques necessite une session authentifiee.

## Suite logique

R5-E7 doit transformer le bouton `Details` en route vers une grande fiche membre paysage :

- Photo membre en section 1.
- Identite.
- Contact.
- Appartenance CMDA.
- Parcours et responsabilites.
- Administration.
