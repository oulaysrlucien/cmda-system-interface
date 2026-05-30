# R6-E7 - Liste membres par perimetre

## Objectif

Finaliser la liste des membres selon le role connecte.

La liste doit rester la meme interface MVP, mais les donnees doivent respecter strictement le perimetre backend :

- `ADMIN` : vue globale ;
- `PROVINCIAL` : membres de sa province ;
- `REGIONAL` : membres de sa region ;
- `BERGER` : membres de sa fraternite.

## Backend

### Endpoints utilises

```text
GET /members/all
GET /members
GET /members/search
```

### Regles

- `/members/all` reste reserve a `ADMIN`.
- `/members` retourne les membres visibles selon le role connecte.
- `/members/search` applique les filtres dans le perimetre backend.

### Amelioration R6-E7

Le endpoint `/members/search` accepte maintenant :

```text
keyword
```

Ce mot-cle cherche dans :

- prenom ;
- nom ;
- email ;
- telephone ;
- profession.

Le mot-cle ne peut pas elargir le perimetre de l'utilisateur.

## Frontend

### Composant modifie

`ListComponent`

### Comportement

Au chargement :

- `ADMIN` sans filtre appelle `/members/all` ;
- les autres roles appellent `/members` ;
- le titre affiche le perimetre courant depuis `CurrentUserScopeService`.

Lorsqu'un filtre est applique :

- la liste appelle `/members/search` ;
- le backend garde la responsabilite du perimetre ;
- la recherche texte utilise `keyword` ;
- le statut utilise `status`.

### UI

La liste conserve :

- peu de colonnes ;
- le bouton `Details` ;
- le crayon vers la fiche detail en mode edition ;
- la version cartes sur mobile.

Ajouts :

- etat de chargement ;
- etat vide ;
- bouton de reinitialisation ;
- compteur de membres visibles.

## Etat

Termine.

