# Roadmap R6 - Donnees metier et perimetres utilisateurs

## Objectif

Brancher les espaces crees en R5 sur les vraies donnees API et appliquer les perimetres metier selon le role connecte.

R5 a construit l'interface. R6 doit rendre cette interface vivante et coherente avec la base de donnees.

## Philosophie metier

La hierarchie reste :

```text
Province
  -> Regions
      -> Fraternites
          -> Membres
```

Chaque role voit uniquement son perimetre :

- `ADMIN` : toutes les donnees.
- `PROVINCIAL` : sa province, ses regions, les fraternites de ses regions, les membres rattaches.
- `REGIONAL` : sa region, ses fraternites, les membres rattaches.
- `BERGER` : sa fraternite et ses membres.

## Etapes proposees

### R6-E1 - Audit API et modeles metier

**Objectif**

Verifier les endpoints Spring Boot disponibles pour :

- Province.
- Region.
- Fraternity.
- CmdaMember.
- User.

**Livrable**

- Diagnostic des endpoints existants et manquants.

### R6-E2 - Services front Province / Region / Fraternity

**Objectif**

Ajouter ou completer les services Angular :

- `ProvinceService`
- `RegionService`
- `FraternityService`

**Livrable**

- Services typés, prets pour les vues hierarchiques R5.

### R6-E3 - Chargement reel des espaces hierarchiques

**Objectif**

Remplacer les donnees statiques de `HierarchySpaceComponent` par des donnees API.

**Livrable**

- Espace provincial avec vraies regions.
- Espace regional avec vraies fraternites.
- Espace berger avec vraie fraternite.

### R6-E4 - Liste membres selon perimetre utilisateur

**Objectif**

Utiliser les endpoints existants :

- `getMembersForCurrentUser`
- `searchMembers`

pour afficher les membres selon le role connecte.

**Livrable**

- `ADMIN` voit tout.
- `PROVINCIAL` voit son perimetre province.
- `REGIONAL` voit son perimetre region.
- `BERGER` voit sa fraternite.

### R6-E5 - Filtres dynamiques

**Objectif**

Brancher les filtres sur les donnees disponibles :

- Province.
- Region.
- Fraternite.
- Statut.
- Recherche texte.

**Livrable**

- Filtres coherents selon le role.

### R6-E6 - Gestion des etats UI

**Objectif**

Ajouter les etats :

- Chargement.
- Vide.
- Erreur.
- Acces refuse.

**Livrable**

- Ecrans propres quand il n'y a pas encore de donnees ou quand l'API echoue.

### R6-E7 - Verification securite perimetres

**Objectif**

Verifier que le front ne montre pas de donnees hors perimetre, et que le back bloque aussi ces acces.

**Livrable**

- Tests manuels et documentation des cas par role.

## Livrable R6 attendu

A la fin de R6, les ecrans R5 ne seront plus seulement des maquettes fonctionnelles :

- Les regions proviendront de l'API.
- Les fraternites proviendront de l'API.
- Les membres seront charges selon le role.
- Les filtres seront dynamiques.
- Les perimetres seront respectes.

