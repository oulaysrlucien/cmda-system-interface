# Roadmap R5-E7 - Fiche detail membre paysage

## Objectif

Remplacer la modal `Details` par une vraie page de fiche membre en disposition paysage :

- Route partageable.
- Photo ou avatar membre.
- Sections structurees.
- Actions de retour, modification et impression.
- Design responsive.

## Route ajoutee

```text
/app/members/:id
```

Le bouton `Details` de la liste membres navigue maintenant vers cette route.

## Modele membre

Le modele front `CmdaMember` prevoit maintenant :

```ts
photoUrl?: string;
```

Ce champ est optionnel pour rester compatible avec les donnees existantes. Si aucune photo n'est fournie, la fiche affiche un avatar avec les initiales du membre.

## Fiche paysage

`DetailsComponent` est transforme en page :

- Chargement par `id` via `CmdaMemberService.getMemberById(id)`.
- Utilisation du `history.state.member` quand le membre vient de la liste.
- Fallback visuel si l'API ne repond pas mais que l'etat de navigation existe.

## Sections creees

### Bandeau superieur

- Retour liste.
- Titre fiche de renseignement.
- Nom complet.
- Fraternite.
- Actions `Modifier` et `Imprimer`.

### Section photo / identite rapide

- Photo membre si `photoUrl` existe.
- Initiales sinon.
- Nom complet.
- Profession.
- Statut.
- Fraternite, region, province.

### Identite

- Prenom.
- Nom.
- Date de naissance.
- Age calcule.
- Profession.
- Statut.

### Contact

- Telephone.
- Email.
- Adresse future.

### Appartenance CMDA

- Province.
- Region.
- Fraternite.
- Responsable rattache futur.

### Parcours et responsabilites

- Service futur.
- Groupe futur.
- Notes internes futures selon autorisation.

### Administration

- Identifiant technique.
- Date de creation future.
- Derniere modification future.

## Liste membres

La liste membres n'ouvre plus une modal pour `Details`.

Elle appelle maintenant :

```ts
this.router.navigate(['/app/members', member.id], { state: { member } });
```

## Fichiers modifies

- `src/app/app-routing.module.ts`
- `src/app/cmda-member/models/cmda-member.model.ts`
- `src/app/cmda-member/details/details.component.ts`
- `src/app/cmda-member/details/details.component.html`
- `src/app/cmda-member/details/details.component.css`
- `src/app/cmda-member/list/list.component.ts`
- `src/app/cmda-member/list/list.component.html`

## Verification

- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK

## Remarques de verification

- Le build conserve les warnings non bloquants deja connus : budget initial depasse, selecteurs Bootstrap ignores et quelques budgets CSS de composants depasses en warning.
- La fiche detail depend de l'API `GET /members/:id` pour une ouverture directe par URL.
- Quand la navigation vient de la liste, le membre est aussi transmis via `history.state` pour permettre un affichage immediat.

## Suite logique

Les prochaines evolutions pourront brancher les champs back/API :

- URL photo reelle.
- Adresse.
- Date d'entree dans la communaute.
- Groupe/service.
- Responsable rattache.
- Dates de creation et derniere modification.
