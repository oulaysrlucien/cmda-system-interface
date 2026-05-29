# Roadmap R5-E7+ - Harmonisation Ajouter / Modifier membre

## Objectif

Consolider l'experience membre avant de poursuivre R6, sans casser les ecrans valides du MVP :

- conserver la fiche detail membre comme page principale de consultation ;
- modifier un membre directement depuis cette fiche, sans redirection vers une page separee ;
- permettre au crayon de la liste d'ouvrir la fiche detail directement en mode editable ;
- refaire l'ecran `Ajouter un membre` dans l'architecture connectee et responsive ;
- garder les anciennes routes en compatibilite temporaire.

## Decisions fonctionnelles

### Modification membre

La modification ne doit plus sortir l'utilisateur de la fiche.

Deux entrees sont conservees :

- depuis la fiche detail : bouton `Modifier`, puis les champs deviennent editables ;
- depuis la liste membres : icone crayon, puis ouverture de la fiche detail en mode edition.

La route technique `/app/members/:id/edit` reste disponible temporairement, mais elle redirige vers :

```text
/app/members/:id?edit=true
```

### Ajout membre

L'ecran d'ajout doit reprendre l'ambiance du layout connecte :

- bandeau d'introduction avec retour, titre et action principale ;
- colonne gauche d'aide contextuelle ;
- formulaire en sections ;
- boutons d'action en bas ;
- mise en page responsive.

### Limite R5-E7+

Les champs encore absents du modele metier restent prepares visuellement, mais ne sont pas persistes si l'API ne les expose pas encore. R6 traitera la partie dynamique et le perimetre metier complet.

## Taches realisees

- Ajout du mode edition inline dans la fiche detail.
- Branchement du crayon de la liste vers la fiche detail editable.
- Refonte de l'ecran Ajouter membre.
- Redirection de l'ancienne page modifier vers la nouvelle experience.
- Mise a jour du suivi documentaire R5.

