# R7-E8+ - Separation Espace personnel / Mon compte

## Objectif

Separer deux usages transverses disponibles pour tous les roles connectes :

- `Espace personnel` : mission et perimetre communautaire.
- `Mon compte` : identite de connexion, session et securite.

Cette separation concerne l'ADMIN, le Provincial, le Regional et le Berger.

## Espace personnel

Route :

```text
/app/personal-space
```

Donnees dynamiques :

```text
GET /api/me/scope
```

Informations affichees :

- identifiant de l'utilisateur connecte.
- role metier.
- mission adaptee au role.
- province, region et fraternite rattachees.
- niveau d'acces.
- compteurs du perimetre.
- bouton vers l'espace metier principal.

Le role et le perimetre sont en lecture seule. Ils restent sous controle ADMIN.

## Mon compte

Route :

```text
/app/account
```

Informations affichees :

- identifiant de connexion.
- role.
- etat de session.
- date d'expiration du jeton JWT.
- deconnexion.
- preferences futures visibles mais desactivees.

## Limite backend constatee

Le backend n'expose pas encore d'endpoint securise permettant a l'utilisateur de modifier son propre mot de passe.

Le bouton correspondant est donc visible mais desactive. Aucun faux traitement frontend n'est implemente.

## Fichiers ajoutes

- `src/app/shared/account/account.component.ts`
- `src/app/shared/account/account.component.html`
- `src/app/shared/account/account.component.css`

## Fichiers modifies

- `src/app/shared/personal-space/personal-space.component.ts`
- `src/app/shared/personal-space/personal-space.component.html`
- `src/app/shared/personal-space/personal-space.component.css`
- `src/app/shared/shared.module.ts`
- `src/app/app-routing.module.ts`
- `src/app/shared/header/app-header/app-header.component.ts`

## Verification

```text
npm run build
```

## Etat

R7-E8+ terminee.
