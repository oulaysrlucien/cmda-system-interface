# R7-E2 - Regles metier CRUD des structures hierarchiques

## Objectif

Definir les droits fonctionnels du MVP avant de securiser le backend et de construire les ecrans CRUD.

La hierarchie reste :

```text
Province
  -> Region
      -> Fraternite
          -> Membres
```

## Principe MVP

Pour le MVP, l'`ADMIN` est le seul role qui administre les structures et les comptes utilisateurs.

Les roles `PROVINCIAL`, `REGIONAL` et `BERGER` gerent les membres dans leur perimetre et consultent leur contexte hierarchique. Ils ne creent pas de structures et ne creent pas d'utilisateurs.

## Matrice des droits MVP

| Action | ADMIN | PROVINCIAL | REGIONAL | BERGER |
| --- | --- | --- | --- | --- |
| Consulter toutes les provinces | oui | non | non | non |
| Creer une province | oui | non | non | non |
| Modifier une province | oui | non | non | non |
| Supprimer ou archiver une province | oui, avec garde-fous | non | non | non |
| Consulter les regions de son perimetre | oui, toutes | oui, celles de sa province | oui, sa region | contexte uniquement |
| Creer une region | oui | non | non | non |
| Modifier une region | oui | non | non | non |
| Supprimer ou archiver une region | oui, avec garde-fous | non | non | non |
| Consulter les fraternites de son perimetre | oui, toutes | oui, celles de sa province | oui, celles de sa region | sa fraternite |
| Creer une fraternite | oui | non | non | non |
| Modifier une fraternite | oui | non | non | non |
| Supprimer ou archiver une fraternite | oui, avec garde-fous | non | non | non |
| Creer un utilisateur | oui | non | non | non |
| Affecter un responsable a son perimetre | oui | non | non | non |
| Gerer les membres | oui, tous | oui, membres de sa province | oui, membres de sa region | oui, membres de sa fraternite |

## Regles par role

### ADMIN

L'`ADMIN` pilote la plateforme complete :

- cree les provinces.
- cree les regions et les rattache a une province.
- cree les fraternites et les rattache a une region.
- cree les utilisateurs `PROVINCIAL`, `REGIONAL`, `BERGER` et `ADMIN` selon la politique retenue.
- affecte chaque responsable a son perimetre.
- consulte, modifie et supprime ou archive les structures avec garde-fous.
- gere tous les membres.

### PROVINCIAL

Le `PROVINCIAL` pilote son perimetre metier sans administrer la structure :

- consulte sa province.
- consulte les regions de sa province.
- consulte les fraternites de ses regions.
- gere les membres rattaches a sa province.
- ne cree, ne modifie et ne supprime aucune structure.
- ne cree aucun utilisateur.

### REGIONAL

Le `REGIONAL` pilote sa region sans administrer la structure :

- consulte sa region.
- consulte les fraternites de sa region.
- gere les membres rattaches a sa region.
- ne cree, ne modifie et ne supprime aucune structure.
- ne cree aucun utilisateur.

### BERGER

Le `BERGER` gere la vie de sa fraternite au niveau membres :

- consulte sa fraternite.
- gere les membres rattaches a sa fraternite.
- ne cree, ne modifie et ne supprime aucune structure.
- ne cree aucun utilisateur.

## SUPER_ADMIN apres le MVP

Le role `SUPER_ADMIN` est volontairement reporte apres le MVP.

Pour la livraison MVP :

- le porteur du projet utilise un compte `ADMIN`.
- l'extension future `SUPER_ADMIN` devra superviser les comptes `ADMIN`.
- les droits exacts du `SUPER_ADMIN` seront definis dans une evolution dediee, probablement en lien avec R11 multi-organisation / Hub mondial.

Hypothese de travail future :

- creer et desactiver des comptes `ADMIN`.
- superviser plusieurs organisations.
- conserver une vision globale transverse.
- acceder aux journaux d'activite et parametres sensibles.

## Regles complementaires retenues pour preparer l'implementation

### Rattachements obligatoires

- Une region appartient obligatoirement a une province.
- Une fraternite appartient obligatoirement a une region.
- Un `PROVINCIAL` est rattache a une province.
- Un `REGIONAL` est rattache a une region.
- Un `BERGER` est rattache a une fraternite.

### Autorite backend

Le backend reste l'autorite :

- masquer un bouton dans Angular ne suffit pas.
- chaque endpoint sensible doit verifier le role.
- les listes membres continuent a respecter les perimetres implementes en R6.

### Suppression et archivage

Pour eviter des pertes de donnees, les decisions MVP sont :

- utiliser l'archivage logique des structures.
- permettre la reactivation logique d'une structure archivee.
- utiliser l'archivage logique des membres.
- permettre la reactivation logique d'un membre archive.
- appliquer des garde-fous lors de l'archivage d'une structure qui contient des enfants.

Ces decisions devront etre implementees et validees dans R7-E3 et R7-E9 pour les structures, puis dans R8 pour les membres.

### Responsable apres archivage

Regle MVP :

- l'archivage d'une structure ne supprime pas le compte du responsable.
- l'affectation active a la structure archivee est retiree ou marquee inactive.
- l'utilisateur ne conserve aucun droit actif sur la structure archivee.
- le compte reste disponible pour une reaffectation manuelle par l'`ADMIN`.

## Decisions MVP confirmees

- un `ADMIN` ne cree pas un autre `ADMIN` depuis l'application.
- une structure archivee reste consultable dans un espace d'archives ADMIN.
- une structure archivee peut etre reactivee logiquement.
- les doublons Province / Region / Fraternite sont interdits dans un meme parent.
- deplacer une region vers une autre province est interdit pour le MVP.
- deplacer une fraternite vers une autre region est interdit pour le MVP.
- la journalisation avancee n'est pas obligatoire pour le MVP, mais doit etre prevue.

Referentiel transverse :

`../global/referentiel_regles_metier_mvp_et_evolutions.md`

## Impact sur les prochaines etapes R7

- R7-E3 doit securiser le CRUD ADMIN et ajouter les garde-fous.
- R7-E4 doit ajouter les methodes Angular CRUD pour l'ADMIN.
- R7-E5 doit construire l'ecran ADMIN Structures.
- R7-E6 et R7-E7 deviennent des etapes de consultation et de navigation perimetree pour Provincial et Regional, sans boutons de creation de structure.

## Etat

R7-E2 terminee.
