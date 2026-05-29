# R6-E8 - Fiche detail membre securisee

## Objectif

S'assurer que la fiche detail membre respecte le perimetre utilisateur, comme la liste membres.

La fiche ne doit jamais afficher durablement un membre qui n'est pas confirme par l'API.

## Backend

### Endpoint utilise

```text
GET /members/{id}
```

### Regles deja en place

Le backend utilise `getMemberByIdForCurrentUser`.

Le membre est retourne uniquement si :

- `ADMIN` : membre non archive ;
- `PROVINCIAL` : membre dans sa province ;
- `REGIONAL` : membre dans sa region ;
- `BERGER` : membre dans sa fraternite.

Sinon, la fiche retourne `404`, ce qui evite de reveler l'existence d'un membre hors perimetre.

### Modification membre

La mise a jour utilise deja `findMemberInCurrentUserScope`.

Cela garantit que l'edition inline de la fiche ne peut modifier qu'un membre du perimetre connecte.

## Frontend

### Composant modifie

`DetailsComponent`

### Renforcement R6-E8

Avant R6-E8, la fiche pouvait afficher temporairement un membre transmis par `history.state` depuis la liste.

Apres R6-E8 :

- la fiche attend toujours la confirmation API `GET /members/{id}` ;
- le `history.state` n'est plus utilise comme preuve d'acces ;
- en cas de `403`, la fiche affiche `Acces refuse` ;
- en cas de `404`, la fiche affiche `Fiche introuvable` ;
- le mode edition ne s'active que si le membre a ete charge par l'API.

## Etat

Termine.

