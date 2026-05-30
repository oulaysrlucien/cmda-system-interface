# R7-E8++ - Securite du compte utilisateur : modification du mot de passe

## Statut

Etape planifiee. Traitement reporte apres la pause projet.

## Objectif

Permettre a chaque utilisateur connecte de modifier son propre mot de passe depuis :

```text
/app/account
```

Cette fonctionnalite est transverse :

- ADMIN
- PROVINCIAL
- REGIONAL
- BERGER

## Backend a implementer

Prevoir un endpoint securise :

```text
PATCH /api/me/password
```

Regles attendues :

- utilisateur obligatoirement authentifie.
- verification de l'ancien mot de passe.
- saisie du nouveau mot de passe.
- confirmation cote frontend.
- regles minimales de robustesse.
- hachage BCrypt cote serveur.
- message explicite en cas d'echec.
- deconnexion ou renouvellement du jeton JWT apres modification.

## Frontend a implementer

Activer dans `Mon compte` le bouton :

```text
Modifier mon mot de passe
```

Ajouter un formulaire responsive :

- ancien mot de passe.
- nouveau mot de passe.
- confirmation.
- affichage ou masquage des champs.
- validation avant envoi.
- notification de succes ou d'erreur.

## Evolutions ulterieures

- mot de passe oublie par email.
- reinitialisation encadree par l'ADMIN.
- double authentification.
- historique des connexions.
- journalisation des changements sensibles.

## Etat

R7-E8++ documentee et affectee. Implementation en attente.
