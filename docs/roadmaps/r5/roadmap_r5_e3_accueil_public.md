# Roadmap R5-E3 - Reproduction de la page d'accueil publique

## Objectif

Transformer la route publique `/` en page d'accueil CMDA DEV inspiree du template fourni :

- Identite visuelle CMDA DEV et Province Europe.
- Hero institutionnel avec message fort, actions et visuel communautaire.
- Sections regions et graces.
- Footer public enrichi.
- Rendu responsive desktop, tablette et mobile.

## Changements realises

### 1. Refonte de `WelcomeComponent`

L'ancien placeholder :

```text
Bienvenue sur le Dashboard
Utilisez la navigation laterale...
```

a ete remplace par une vraie page publique :

- Bloc identite CMDA DEV.
- Titre hero.
- Texte de presentation.
- Boutons `Se connecter` et `Decouvrir la plateforme`.
- Indicateurs de confiance : acces securise, donnees protegees, service de la communaute.
- Visuel hero avec citation Jean 17,21.
- Cartes des 3 regions.
- Cartes des 3 graces.

### 2. Donnees de presentation

`WelcomeComponent` contient maintenant deux listes de presentation :

- `regions`
- `graces`

Ces listes alimentent les cartes de la page avec `*ngFor`.

### 3. Assets ajoutes

**Image generee**

- `src/assets/home/cmda-community-hero.png`

Cette image sert de visuel principal pour le hero public.

**Assets vectoriels locaux**

- `src/assets/home/cmda-logo.svg`
- `src/assets/home/region-alps.svg`
- `src/assets/home/region-city.svg`
- `src/assets/home/region-coast.svg`

Ces assets structurent l'identite et les cartes regions sans dependance externe.

### 4. Header public ajuste

Le header public utilise maintenant :

- Le logo CMDA local.
- Une navigation publique plus proche du template.
- Un lien `Fonctionnalites` vers la section des regions/graces.
- Un bouton `Se connecter`.

### 5. Footer public ajuste

Le footer public affiche maintenant :

- Logo CMDA DEV.
- Nom de la communaute.
- Devise `A Jesus, dans les pas de Marie`.
- Liens sociaux visuels.

### 6. Styles responsive

Les styles de la page d'accueil sont prefixes en `home-...` et places dans `src/styles.css`.

Cette decision evite de depasser le budget CSS tres strict du composant Angular, tout en gardant des classes specifiques a l'accueil.

## Fichiers ajoutes

- `src/assets/home/cmda-logo.svg`
- `src/assets/home/cmda-community-hero.png`
- `src/assets/home/region-alps.svg`
- `src/assets/home/region-city.svg`
- `src/assets/home/region-coast.svg`
- `docs/roadmap_r5_e3_accueil_public.md`

## Fichiers modifies

- `src/app/welcome/welcome.component.ts`
- `src/app/welcome/welcome.component.html`
- `src/app/welcome/welcome.component.css`
- `src/styles.css`
- `src/app/shared/header/public-header/public-header.component.html`
- `src/app/shared/header/public-header/public-header.component.css`
- `src/app/shared/layouts/public-layout/public-layout.component.html`
- `src/app/shared/layouts/public-layout/public-layout.component.css`

## Verification

- `npx tsc -p tsconfig.app.json --noEmit` : OK
- `npm run build` : OK
- Verification navigateur in-app desktop `1440x900` : OK
- Verification navigateur in-app mobile `390x844` : OK
- Absence de sidebar sur `/` : OK
- Absence de debordement horizontal mobile : OK
- Captures :
  - `docs/screenshots/r5-e3-home-desktop-viewport.png`
  - `docs/screenshots/r5-e3-home-mobile-viewport.png`

## Remarques

- Le build conserve les warnings non bloquants deja presents : budget initial depasse et selecteurs Bootstrap ignores.
- Le visuel hero a ete genere avec l'outil image integre, puis copie dans le workspace afin que l'application ne depende pas du dossier Codex temporaire.
- La prochaine etape peut affiner les images definitives si la communaute fournit des photos officielles.
