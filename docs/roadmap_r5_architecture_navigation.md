# Roadmap R5 - Architecture navigation, layouts et espaces utilisateurs

## Objectif

Mettre en place une architecture de navigation claire et responsive pour CMDA DEV :

- Une page d'accueil publique a reproduire a partir du template fourni.
- Un layout public distinct du layout connecte.
- Un layout connecte avec header, sidebar, zone de contenu et navigation filtree par role.
- Des espaces utilisateurs adaptes aux profils `ADMIN`, `PROVINCIAL`, `REGIONAL` et `BERGER`.
- Une liste de membres plus lisible, avec peu de colonnes et un bouton `Details`.
- Une grande page de fiche membre en disposition paysage, structuree par sections, avec emplacement photo.

## Vision design

Le template d'accueil devient la direction visuelle principale :

- Couleurs dominantes : violet profond, or, blanc chaud.
- Typographie : titres institutionnels avec forte presence, textes courants sobres.
- Navigation publique horizontale : Accueil, Fonctionnalites, A propos, Ressources, Contact, Connexion.
- Hero public : logo, nom CMDA DEV, province, phrase forte, boutons d'action, image communautaire.
- Sections publiques : regions, graces, mission, liens sociaux et pied de page.
- Design responsive : hero empile sur mobile, cartes en une colonne, navigation compacte.

## Architecture proposee

### 1. Layout public

**Usage**

- Pages visibles sans connexion.
- Page d'accueil.
- Page de connexion.
- Pages institutionnelles futures : A propos, Ressources, Contact.

**Structure**

- `PublicLayoutComponent`
- `PublicHeaderComponent`
- `PublicFooterComponent`
- `router-outlet` public

**Routes candidates**

- `/` : accueil publique
- `/login` : connexion
- `/about` : a propos
- `/resources` : ressources
- `/contact` : contact

**Definition**

Le layout public doit rester immersif et institutionnel. Il reprend le template partage : grand hero, cartes regions, cartes graces, footer identitaire. La connexion reste accessible depuis le header et depuis le bouton principal du hero.

### 2. Layout connecte

**Usage**

- Toutes les pages apres authentification.
- Tableaux de bord par role.
- Gestion des membres.
- Gestion utilisateurs.
- Fiches details.

**Structure**

- `AuthenticatedLayoutComponent`
- `AppHeaderComponent`
- `AppSidebarComponent`
- `BreadcrumbComponent`
- `router-outlet` connecte

**Comportement responsive**

- Desktop : sidebar fixe a gauche, header en haut, contenu a droite.
- Tablette : sidebar reduite avec icones et libelles courts.
- Mobile : sidebar en tiroir ouvrable depuis le header.

**Definition**

Le layout connecte doit etre plus operationnel que marketing : navigation claire, contenu lisible, actions proches des listes, moins d'ornement. Il garde les couleurs CMDA mais avec une interface de travail plus dense.

### 3. Espaces utilisateurs

#### Espace ADMIN

**Objectif**

Superviser la plateforme et gerer les utilisateurs.

**Navigation**

- Tableau de bord
- Membres
- Utilisateurs
- Provinces
- Regions
- Fraternites
- Exports
- Parametres

**Indicateurs**

- Nombre total de membres.
- Nombre d'utilisateurs actifs.
- Repartition par province, region, fraternite.
- Derniers ajouts ou modifications.

#### Espace PROVINCIAL

**Objectif**

Piloter la province et visualiser les regions rattachees.

**Navigation**

- Tableau de bord provincial
- Membres de la province
- Regions
- Fraternites
- Exports

**Regle d'acces**

Le provincial voit les membres de sa province, avec filtres par region et fraternite.

#### Espace REGIONAL

**Objectif**

Piloter une region et suivre les fraternites rattachees.

**Navigation**

- Tableau de bord regional
- Membres de la region
- Fraternites
- Exports

**Regle d'acces**

Le regional voit les membres de sa region, avec filtre par fraternite.

#### Espace BERGER

**Objectif**

Gerer la fraternite confiee.

**Navigation**

- Tableau de bord fraternite
- Membres de ma fraternite
- Ajouter un membre
- Exports limites

**Regle d'acces**

Le berger voit uniquement les membres de sa fraternite.

## Liste des membres

### Probleme actuel

La table actuelle affiche trop de colonnes : ID, prenom, nom, email, telephone, date de naissance, profession, statut, fraternite, actions. Sur mobile et tablette, cette structure devient difficile a lire.

### Proposition R5

Reduire la liste aux informations essentielles :

- Membre : nom, prenom, identite courte.
- Contact : telephone ou email principal.
- Appartenance : province / region / fraternite selon le role connecte.
- Statut.
- Actions : Details, Modifier, Supprimer si autorise.

### Variante desktop

Table responsive avec 5 colonnes maximum :

- Membre
- Contact
- Appartenance
- Statut
- Actions

### Variante mobile

Affichage en cartes compactes :

- Nom du membre en titre.
- Fraternite ou region en sous-titre.
- Statut sous forme de badge.
- Bouton `Details` visible.
- Menu d'actions secondaire pour modifier ou supprimer.

### Filtres

Les filtres doivent etre au-dessus de la liste :

- Recherche texte.
- Province, region, fraternite selon le role.
- Statut.
- Pagination.
- Export si autorise.

## Fiche details membre

### Objectif

Remplacer la modal de details par une vraie page de fiche membre, plus complete, lisible et imprimable.

### Route candidate

- `/members/:id`

Une route alias peut etre conservee temporairement si necessaire :

- `/cmdaMembers/:id`

### Disposition paysage

La fiche doit etre pensee comme une fiche de renseignement en largeur :

- Bandeau superieur : photo, nom complet, statut, appartenance, actions.
- Colonne gauche : photo membre et informations rapides.
- Zone principale : sections structurees.
- Actions persistantes : retour, modifier, exporter PDF, imprimer.

### Sections proposees

#### Identite

- Nom
- Prenom
- Date de naissance
- Age calcule si disponible
- Profession
- Statut

#### Contact

- Email
- Telephone
- Adresse future si ajoutee au modele

#### Appartenance CMDA

- Province
- Region
- Fraternite
- Responsable rattache
- Date d'entree future si ajoutee au modele

#### Parcours et responsabilites

- Fonction ou service dans la communaute.
- Historique futur si ajoute au modele.
- Notes internes futures si autorisees.

#### Administration

- Identifiant technique.
- Date de creation future si disponible.
- Derniere modification future si disponible.

### Photo membre

Le modele actuel ne contient pas encore de champ photo. R5 doit prevoir :

- `photoUrl` cote front dans `CmdaMember`.
- Champ API correspondant dans `CmdaMemberDTO`.
- Stockage ou reference fichier cote back.
- Image de remplacement si aucune photo n'est fournie.

## Etapes R5 proposees

### R5-E1 - Audit navigation et composants actuels

**Actions**

- Auditer `AppRoutingModule`, `SidebarComponent`, `WelcomeComponent`, `LoginComponent`, `ListComponent`, `DetailsComponent`.
- Relever les routes publiques et connectees.
- Identifier les composants a deplacer ou encapsuler dans des layouts.

**Livrable**

- Diagnostic court `roadmap_r5_e1_audit_navigation.md`.

### R5-E2 - Architecture des layouts Angular

**Actions**

- Creer `PublicLayoutComponent`.
- Creer `AuthenticatedLayoutComponent`.
- Deplacer le header public dans le layout public.
- Deplacer sidebar/header connectes dans le layout connecte.
- Organiser les routes en blocs publics et prives.

**Livrable**

- Routes plus lisibles et separation claire public/connecte.

### R5-E3 - Reproduction de la page d'accueil publique

**Actions**

- Reproduire le template partage dans `WelcomeComponent` ou une page `HomeComponent`.
- Integrer logo, navigation, hero, regions, graces, footer.
- Prevoir images responsive et textes institutionnels.
- Remplacer les textes temporaires du dashboard actuel.

**Livrable**

- Accueil public conforme a la direction visuelle du template.

### R5-E4 - Header et sidebar connectes responsive

**Actions**

- Creer un header connecte avec titre de page, profil utilisateur, deconnexion.
- Refaire la sidebar avec menus filtres par role.
- Ajouter le comportement mobile en tiroir.
- Ajouter etats actifs, icones, libelles courts.

**Livrable**

- Navigation connectee utilisable desktop, tablette et mobile.

### R5-E5 - Espaces utilisateurs par role

**Actions**

- Creer des dashboards dedies : admin, provincial, regional, berger.
- Rediriger apres connexion vers le bon espace.
- Adapter les menus selon les roles.
- Preparer les filtres de donnees selon le perimetre utilisateur.

**Livrable**

- Chaque profil arrive sur un espace coherent avec sa mission.

### R5-E6 - Refonte de la liste membres

**Actions**

- Reduire les colonnes de la table.
- Ajouter une version cartes sur mobile.
- Ajouter filtres, recherche, pagination et actions claires.
- Mettre le bouton `Details` comme action principale.

**Livrable**

- Liste membres lisible et responsive.

### R5-E7 - Page fiche details membre

**Actions**

- Remplacer la modal details par une page dediee.
- Ajouter route `/members/:id`.
- Construire la fiche paysage par sections.
- Prevoir la photo membre.
- Ajouter actions retour, modifier, export PDF/impression si disponible.

**Livrable**

- Grande fiche de renseignement structuree.

### R5-E8 - Ajustements modele photo et API

**Actions**

- Ajouter `photoUrl` au modele front.
- Ajouter le champ DTO/API si valide cote back.
- Prevoir placeholder visuel.
- Verifier la compatibilite avec les membres existants.

**Livrable**

- Fiche membre prete pour afficher une photo.

### R5-E9 - Verification responsive et accessibilite

**Actions**

- Tester desktop, tablette, mobile.
- Verifier que les textes ne debordent pas.
- Verifier les etats actifs, focus clavier et contrastes.
- Verifier build Angular.

**Livrable**

- Interface stable et propre sur les tailles principales.

## Routes ciblees

```text
/
/login
/about
/resources
/contact

/app/dashboard
/app/members
/app/members/:id
/app/members/add
/app/members/:id/edit
/app/users
/app/provinces
/app/regions
/app/fraternities
```

## Priorite de realisation

1. Architecture layouts et routes.
2. Accueil public selon template.
3. Header/sidebar connectes.
4. Espaces utilisateurs par role.
5. Liste membres responsive.
6. Fiche details paysage avec photo.
7. Ajustements API photo.
8. Verification responsive et build.

## Points d'attention

- Conserver temporairement les anciennes routes si besoin pour eviter une rupture brutale.
- Ne pas charger la sidebar dans les pages publiques.
- Ne pas afficher trop de colonnes dans les listes membres.
- Garder le bouton `Details` visible et prioritaire.
- Prevoir la fiche details comme page, pas comme simple modal.
- Respecter les roles deja securises par R3.
- Garder les pages erreurs de R4 dans une zone accessible sans layout connecte lourd.
