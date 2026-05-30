# Referentiel des regles metier CMDA DEV

## Objectif

Centraliser les regles fonctionnelles validees pour le MVP et les evolutions a prevoir pour construire un systeme durable, efficace et utile a l'organisation.

Ce document devient le referentiel metier transverse du projet. Les roadmaps techniques doivent rester coherentes avec ces regles.

## 1. Modele organisationnel

La hierarchie CMDA DEV est :

```text
Organisation CMDA
  -> Province
      -> Region
          -> Fraternite
              -> Membres
```

Pour le MVP, l'application gere une organisation CMDA. L'extension vers plusieurs organisations et un Hub mondial est prevue apres le MVP.

## 2. Roles MVP

### ADMIN

L'`ADMIN` pilote la plateforme complete.

Regles validees :

- cree les provinces.
- cree les regions et les rattache a une province.
- cree les fraternites et les rattache a une region.
- cree les utilisateurs `PROVINCIAL`, `REGIONAL` et `BERGER`.
- affecte les responsables a leur perimetre.
- consulte, modifie, archive et reactive les structures.
- gere tous les membres.
- archive et reactive les membres.
- consulte les listes globales.
- utilise les exports disponibles.

Limite MVP :

- un `ADMIN` ne cree pas un autre `ADMIN` depuis l'application.
- la creation d'un compte `ADMIN` reste manuelle.

### PROVINCIAL

Le `PROVINCIAL` pilote les membres de sa province.

Regles validees :

- consulte sa province.
- consulte les regions de sa province.
- consulte les fraternites rattachees a ses regions.
- gere les membres de sa province.
- ne cree, ne modifie et n'archive aucune structure.
- ne cree aucun utilisateur.

### REGIONAL

Le `REGIONAL` pilote les membres de sa region.

Regles validees :

- consulte sa region.
- consulte les fraternites de sa region.
- gere les membres de sa region.
- ne cree, ne modifie et n'archive aucune structure.
- ne cree aucun utilisateur.

### BERGER

Le `BERGER` gere les membres de sa fraternite.

Regles validees :

- consulte sa fraternite.
- gere les membres de sa fraternite.
- ne cree, ne modifie et n'archive aucune structure.
- ne cree aucun utilisateur.

## 3. Role SUPER_ADMIN apres le MVP

Le `SUPER_ADMIN` est reporte apres le MVP.

Pour la livraison MVP, le porteur du projet utilise un compte `ADMIN` cree manuellement.

Evolution a prevoir :

- creer, activer, desactiver et superviser les comptes `ADMIN`.
- superviser plusieurs organisations.
- gerer les parametres globaux sensibles.
- acceder aux journaux d'activite complets.
- suivre la securite et les actions d'administration.

Cette evolution est a rattacher a une roadmap post-MVP, en lien avec R11 multi-organisation / Hub mondial.

## 4. Rattachements obligatoires

Regles validees :

- une region appartient obligatoirement a une province.
- une fraternite appartient obligatoirement a une region.
- un `PROVINCIAL` est rattache a une province active.
- un `REGIONAL` est rattache a une region active.
- un `BERGER` est rattache a une fraternite active.
- un membre appartient a une fraternite.
- la province et la region d'un membre sont deduites de sa fraternite.

## 5. Perimetres de gestion des membres

Regles validees :

| Role | Membres visibles et gerables |
| --- | --- |
| ADMIN | tous les membres |
| PROVINCIAL | membres des fraternites de sa province |
| REGIONAL | membres des fraternites de sa region |
| BERGER | membres de sa fraternite |

Le backend reste l'autorite : masquer une action dans Angular ne suffit pas.

## 6. Archivage logique

### Membres

Regles validees :

- la suppression physique d'un membre est interdite pour le MVP.
- un membre est archive logiquement.
- un membre archive reste consultable depuis l'espace d'archives autorise.
- un membre archive peut etre reactive logiquement.
- la reactivation restaure sa disponibilite dans les listes actives.

### Structures

Regles validees :

- la suppression physique d'une structure n'est pas le parcours normal du MVP.
- une province, une region ou une fraternite peut etre archivee logiquement.
- une structure archivee peut etre reactivee logiquement.
- une structure archivee ne doit plus apparaitre dans les listes actives.
- une structure archivee reste consultable dans un espace d'archives ADMIN.

Garde-fous implementes en R7-E3 :

- une province ne peut pas etre archivee tant qu'elle contient des regions actives.
- une region ne peut pas etre archivee tant qu'elle contient des fraternites actives.
- une fraternite ne peut pas etre archivee tant qu'elle contient des membres non archives.
- l'application doit demander confirmation et expliquer les impacts avant archivage.

L'ADMIN traite donc les enfants avant le parent. Les confirmations frontend restent a construire en R7-E10.

## 7. Responsable apres archivage d'une structure

### Explication

Une structure peut avoir un responsable :

- un Provincial pour une province.
- un Regional pour une region.
- un Berger pour une fraternite.

Lorsqu'une structure est archivee, conserver l'affectation active du responsable serait incoherent : l'utilisateur garderait un role lie a un perimetre qui n'est plus actif.

Supprimer automatiquement son compte serait egalement dangereux : la personne peut encore appartenir a l'organisation et etre affectee ailleurs plus tard.

### Regle MVP retenue

- l'archivage d'une structure ne supprime pas le compte utilisateur du responsable.
- l'affectation active entre le responsable et la structure archivee est retiree ou marquee inactive.
- l'utilisateur ne conserve aucun droit actif sur la structure archivee.
- le compte reste disponible pour une reaffectation manuelle par l'`ADMIN`.
- l'`ADMIN` doit voir qu'un utilisateur est temporairement sans perimetre.
- une structure reactivee ne recupere pas automatiquement son ancien responsable.
- l'`ADMIN` choisit explicitement le responsable lors de la reactivation.

### Evolution recommandee

- conserver l'historique des affectations avec dates de debut et de fin.
- afficher les utilisateurs sans rattachement dans les alertes ADMIN.
- notifier l'`ADMIN` lorsqu'un archivage rend un utilisateur sans perimetre.

## 8. Doublons interdits

Regles validees :

- deux provinces ne peuvent pas avoir le meme nom dans une meme organisation.
- deux regions ne peuvent pas avoir le meme nom dans une meme province.
- deux fraternites ne peuvent pas avoir le meme nom dans une meme region.
- la comparaison doit etre insensible a la casse et aux espaces inutiles.

Exemples interdits dans une meme province :

```text
Region Saint Jean
region saint jean
 Region Saint Jean 
```

## 9. Deplacement des structures

Regles validees pour le MVP :

- deplacer une region vers une autre province est interdit.
- deplacer une fraternite vers une autre region est interdit.

Justification :

- un deplacement modifie indirectement le perimetre des responsables et des membres.
- il peut produire des incoherences d'autorisations.
- il merite un workflow dedie avec controle d'impact.

Evolution a prevoir apres le MVP :

- ecran de transfert securise.
- simulation des impacts.
- confirmation explicite.
- journalisation.
- mise a jour controlee des affectations.

## 10. Utilisateurs et responsables

Regles validees :

- seul l'`ADMIN` cree les comptes `PROVINCIAL`, `REGIONAL` et `BERGER`.
- l'`ADMIN` affecte le responsable a son perimetre.
- un responsable ne peut etre affecte qu'a un perimetre actif.
- un responsable ne doit pas conserver de droits sur une structure archivee.
- remplacer un responsable ne supprime pas automatiquement l'ancien compte.

Evolution recommandee :

- historique des affectations.
- periode de mandat.
- date de debut et date de fin.
- motif de remplacement.
- alertes de perimetres sans responsable.

## 11. Journalisation et audit

Regle MVP :

- la journalisation fonctionnelle avancee n'est pas obligatoire pour livrer le MVP.

Evolution fortement recommandee :

- enregistrer creation, modification, archivage et reactivation.
- enregistrer les changements d'affectation.
- enregistrer l'auteur, la date, l'action et l'objet concerne.
- permettre un export du journal d'activite.
- reserver la consultation complete aux futurs `SUPER_ADMIN` et aux `ADMIN` autorises.

## 12. Exports et reporting

Regles MVP :

- exploiter les exports Excel/PDF deja disponibles lorsqu'ils sont exposes par le backend.
- respecter les perimetres utilisateur pour les exports membres.
- reserver les exports globaux a l'`ADMIN`.

Evolutions recommandees :

- rapports par province, region et fraternite.
- statistiques mensuelles.
- historique des variations.
- planification de rapports periodiques.

## 13. Regles recommandees pour une meilleure organisation

### Integrite des donnees

- valider les champs obligatoires cote frontend et backend.
- normaliser les noms avant controle des doublons.
- ne jamais faire confiance uniquement a l'interface Angular.
- conserver des messages d'erreur clairs.

### Responsabilites

- afficher les structures sans responsable dans le dashboard ADMIN.
- afficher les utilisateurs sans perimetre.
- faciliter la reaffectation.
- conserver l'historique apres le MVP.

### Securite

- verifier le role sur chaque endpoint sensible.
- verifier le perimetre sur chaque lecture et modification de membre.
- limiter les exports aux donnees visibles par l'utilisateur.
- preparer la journalisation des actions sensibles.

### Evolution multi-organisation

- preparer un niveau `Organisation` au-dessus des provinces.
- eviter les contraintes globales qui bloqueraient plusieurs organisations.
- reserver le `SUPER_ADMIN` a la supervision transverse.
- permettre a terme un Hub mondial.

## 14. Decisions a implementer dans les roadmaps

| Decision | Roadmap cible |
| --- | --- |
| Archivage/reactivation logique des structures | R7-E3, R7-E10 |
| Doublons interdits par parent | R7-E3 |
| Responsable detache apres archivage | R7-E3, R7-E10 |
| Espace ADMIN Structures | R7-E6 |
| Archivage/reactivation logique des membres | R8 |
| Alertes ADMIN utilisateurs sans perimetre | R9 |
| Journalisation avancee | R9 ou R10 |
| Creation des ADMIN par SUPER_ADMIN | Post-MVP / R11 |
| Transfert securise de structures | Post-MVP |
| Multi-organisation et Hub mondial | R11 |

## Etat

Referentiel metier initial valide. Les garde-fous backend R7-E3, les services Angular R7-E5, l'ecran ADMIN Structures R7-E6, l'espace Provincial R7-E7 et l'espace Regional R7-E8 sont implementes ; la suite est R7-E9 cote ADMIN.
