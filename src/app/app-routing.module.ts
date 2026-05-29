import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './cmda-member/add/add.component';
import { DeleteComponent } from './cmda-member/delete/delete.component';
import { DetailsComponent } from './cmda-member/details/details.component';
import { EditComponent } from './cmda-member/edit/edit.component';
import { ListComponent } from './cmda-member/list/list.component';
import { AuthGuard } from './user-management/guards/auth.guard';
import { RoleGuard } from './user-management/guards/role.guard';
import { AdminUserManagementComponent } from './user-management/admin-user-management/admin-user-management.component';
import { LoginComponent } from './user-management/login/login.component';
import { LogoutComponent } from './user-management/logout/logout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ForbiddenComponent } from './shared/errors/forbidden/forbidden.component';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/errors/unauthorized/unauthorized.component';
import { AuthenticatedLayoutComponent } from './shared/layouts/authenticated-layout/authenticated-layout.component';
import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { PublicPageComponent } from './shared/public-page/public-page.component';
import { RoleDashboardComponent } from './shared/role-dashboard/role-dashboard.component';
import { PersonalSpaceComponent } from './shared/personal-space/personal-space.component';
import { HierarchySpaceComponent } from './shared/hierarchy-space/hierarchy-space.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      {
        path: 'about',
        component: PublicPageComponent,
        data: {
          title: 'A propos',
          description: 'Presentation de la communaute, de la province et de la mission CMDA DEV.'
        }
      },
      {
        path: 'resources',
        component: PublicPageComponent,
        data: {
          title: 'Ressources',
          description: 'Espace de ressources institutionnelles et communautaires a structurer.'
        }
      },
      {
        path: 'contact',
        component: PublicPageComponent,
        data: {
          title: 'Contact',
          description: 'Page de contact et d orientation vers les responsables de la plateforme.'
        }
      },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
  {
    path: 'app',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'admin/dashboard',
        component: RoleDashboardComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['ADMIN'],
          eyebrow: 'Espace administrateur',
          title: 'Piloter la plateforme CMDA DEV',
          scope: 'Plateforme complete',
          description: 'Supervision des utilisateurs, des membres, des structures et des actions transversales.',
          stats: [
            { label: 'Membres suivis', value: 'Tous', icon: 'bi-people' },
            { label: 'Utilisateurs', value: 'Admin', icon: 'bi-person-gear' },
            { label: 'Structures', value: '3 niveaux', icon: 'bi-diagram-3' },
            { label: 'Exports', value: 'Global', icon: 'bi-download' }
          ],
          actions: [
            { label: 'Gerer les utilisateurs', route: '/app/users', icon: 'bi-person-gear' },
            { label: 'Voir les membres', route: '/app/members', icon: 'bi-people' }
          ]
        }
      },
      {
        path: 'provincial/dashboard',
        component: RoleDashboardComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['PROVINCIAL'],
          eyebrow: 'Espace provincial',
          title: 'Suivre la province confiee',
          scope: 'Province rattachee',
          description: 'Vue de pilotage pour accompagner les regions, les fraternites et les membres de la province.',
          stats: [
            { label: 'Membres province', value: 'Province', icon: 'bi-people' },
            { label: 'Regions', value: 'Suivi', icon: 'bi-map' },
            { label: 'Fraternites', value: 'Coordination', icon: 'bi-house-heart' },
            { label: 'Exports', value: 'Province', icon: 'bi-download' }
          ],
          actions: [
            { label: 'Voir mes regions', route: '/app/provincial/province', icon: 'bi-geo-alt' },
            { label: 'Voir les membres', route: '/app/members', icon: 'bi-people' }
          ]
        }
      },
      {
        path: 'provincial/province',
        component: HierarchySpaceComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['PROVINCIAL'],
          mode: 'province',
          eyebrow: 'Province Europe',
          title: 'Bienvenue, Pere Antoine',
          subtitle: 'Ensemble, batissons une communaute unie dans la foi et l amour.',
          heroImage: 'assets/home/region-city.svg',
          managerTitle: 'Provincial',
          managerName: 'Pere Antoine Kouassi',
          collectionTitle: 'Mes regions',
          collectionSubtitle: 'Gerez et suivez les regions de votre province.',
          addLabel: 'Ajouter une region',
          metrics: [
            { label: 'Regions actives', value: '3', icon: 'bi-geo-alt' },
            { label: 'Fraternites au total', value: '24', icon: 'bi-house-heart' },
            { label: 'Membres au total', value: '562', icon: 'bi-people' },
            { label: 'Responsables engages', value: '48', icon: 'bi-person-check' }
          ],
          items: [
            {
              name: 'Region Saint Jean',
              location: 'France, Suisse',
              image: 'assets/home/region-alps.svg',
              description: 'Portes par l Esprit, avancent dans l unite et la mission.',
              metrics: ['9 fraternites', '215 membres', '15 responsables'],
              route: '/app/regional/region',
              actionLabel: 'Voir la region'
            },
            {
              name: 'Region Sainte Marie',
              location: 'Belgique, Allemagne',
              image: 'assets/home/region-city.svg',
              description: 'Vivons la charite et la communion au coeur des fraternites.',
              metrics: ['8 fraternites', '187 membres', '14 responsables'],
              route: '/app/regional/region',
              actionLabel: 'Voir la region'
            },
            {
              name: 'Region Saint Joseph',
              location: 'Italie, Espagne',
              image: 'assets/home/region-coast.svg',
              description: 'Servir avec joie, annoncer avec amour.',
              metrics: ['7 fraternites', '160 membres', '19 responsables'],
              route: '/app/regional/region',
              actionLabel: 'Voir la region'
            }
          ],
          events: [
            { date: '25 MAI', title: 'Recollection provinciale', subtitle: 'Samedi 25 mai 2024' },
            { date: '08 JUIN', title: 'Formation des responsables', subtitle: 'Paris, France' },
            { date: '15 JUIN', title: 'Journee de priere provinciale', subtitle: 'Bruxelles, Belgique' }
          ],
          documents: [
            { date: 'PDF', title: 'Rapport activites - Avril 2024.pdf', subtitle: 'PDF - 2.1 Mo' },
            { date: 'PDF', title: 'Synthese regions - 2024.pdf', subtitle: 'PDF - 1.8 Mo' }
          ]
        }
      },
      {
        path: 'regional/dashboard',
        component: RoleDashboardComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['REGIONAL'],
          eyebrow: 'Espace regional',
          title: 'Accompagner la region',
          scope: 'Region rattachee',
          description: 'Vue de suivi pour les fraternites et les membres rattaches a la region.',
          stats: [
            { label: 'Membres region', value: 'Region', icon: 'bi-people' },
            { label: 'Fraternites', value: 'Suivi', icon: 'bi-house-heart' },
            { label: 'Statuts', value: 'Actifs', icon: 'bi-check2-circle' },
            { label: 'Exports', value: 'Region', icon: 'bi-download' }
          ],
          actions: [
            { label: 'Voir mes fraternites', route: '/app/regional/region', icon: 'bi-house-heart' },
            { label: 'Voir les membres', route: '/app/members', icon: 'bi-people' }
          ]
        }
      },
      {
        path: 'regional/region',
        component: HierarchySpaceComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['REGIONAL', 'PROVINCIAL'],
          mode: 'region',
          eyebrow: 'Region rattachee',
          title: 'Region Saint Jean',
          subtitle: 'Ensemble, marchons a la suite du Christ.',
          heroImage: 'assets/home/region-alps.svg',
          managerTitle: 'Responsable regional',
          managerName: 'Fr. Jean-Baptiste N Guessan',
          collectionTitle: 'Mes fraternites',
          collectionSubtitle: 'Gerez et suivez les fraternites de votre region.',
          addLabel: 'Ajouter une fraternite',
          metrics: [
            { label: 'Fraternites actives', value: '12', icon: 'bi-house-heart' },
            { label: 'Membres au total', value: '245', icon: 'bi-people' },
            { label: 'Responsables', value: '18', icon: 'bi-person-check' },
            { label: 'Activites a venir', value: '8', icon: 'bi-calendar-event' }
          ],
          items: [
            {
              name: 'Fraternite Saint Paul',
              location: 'Lyon, France',
              image: 'assets/home/region-city.svg',
              description: 'Fraternite urbaine au service de la mission.',
              metrics: ['42 membres', 'Fr. Antoine Kouassi', 'Catechese, Priere'],
              route: '/app/berger/fraternity',
              actionLabel: 'Voir la fraternite'
            },
            {
              name: 'Fraternite Cana',
              location: 'Paris, France',
              image: 'assets/home/cmda-community-hero.png',
              description: 'Vie fraternelle, couples et familles.',
              metrics: ['38 membres', 'Sr. Marie Claire', 'Liturgie, Chorale'],
              route: '/app/berger/fraternity',
              actionLabel: 'Voir la fraternite'
            },
            {
              name: 'Fraternite Bethleem',
              location: 'Marseille, France',
              image: 'assets/home/region-alps.svg',
              description: 'Jeunes, formation et croissance spirituelle.',
              metrics: ['35 membres', 'Fr. Paul Koffi', 'Jeunes, Formation'],
              route: '/app/berger/fraternity',
              actionLabel: 'Voir la fraternite'
            }
          ],
          events: [
            { date: '25 MAI', title: 'Recollection regionale', subtitle: 'Lyon, France' },
            { date: '08 JUIN', title: 'Formation des responsables', subtitle: 'Paris, France' },
            { date: '15 JUIN', title: 'Journee de priere regionale', subtitle: 'Marseille, France' }
          ],
          documents: [
            { date: 'PDF', title: 'Guide du responsable regional.pdf', subtitle: 'PDF - 2.4 Mo' },
            { date: 'PDF', title: 'Plan action 2024 - Region.pdf', subtitle: 'PDF - 1.8 Mo' }
          ]
        }
      },
      {
        path: 'berger/dashboard',
        component: RoleDashboardComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['BERGER'],
          eyebrow: 'Espace berger',
          title: 'Servir la fraternite',
          scope: 'Fraternite rattachee',
          description: 'Vue simple pour suivre les membres de la fraternite et les actions utiles au service confie.',
          stats: [
            { label: 'Membres fraternite', value: 'Fraternite', icon: 'bi-people' },
            { label: 'Nouveaux membres', value: 'Ajout', icon: 'bi-person-plus' },
            { label: 'Statuts', value: 'Suivi', icon: 'bi-check2-circle' },
            { label: 'Fiche membre', value: 'Details', icon: 'bi-card-text' }
          ],
          actions: [
            { label: 'Voir ma fraternite', route: '/app/berger/fraternity', icon: 'bi-house-heart' },
            { label: 'Ajouter un membre', route: '/app/members/add', icon: 'bi-person-plus' }
          ]
        }
      },
      {
        path: 'berger/fraternity',
        component: HierarchySpaceComponent,
        canActivate: [RoleGuard],
        data: {
          roles: ['BERGER', 'REGIONAL', 'PROVINCIAL'],
          mode: 'fraternity',
          eyebrow: 'Ma fraternite',
          title: 'Fraternite Saint Paul',
          subtitle: 'Ensemble, marchons a la suite du Christ.',
          heroImage: 'assets/home/cmda-community-hero.png',
          managerTitle: 'Berger de fraternite',
          managerName: 'Fr. Antoine Kouassi',
          collectionTitle: 'Groupes et services',
          collectionSubtitle: 'Suivez la vie de votre fraternite avant la liste des membres.',
          addLabel: 'Ajouter un groupe',
          metrics: [
            { label: 'Membres', value: '42', icon: 'bi-people' },
            { label: 'Responsables', value: '6', icon: 'bi-person-check' },
            { label: 'Groupes', value: '3', icon: 'bi-collection' },
            { label: 'Activites', value: '8', icon: 'bi-calendar-event' }
          ],
          items: [
            {
              name: 'Jeunes Serviteurs',
              location: 'Groupe de service',
              image: 'assets/home/cmda-community-hero.png',
              description: 'Service des jeunes et accueil.',
              metrics: ['14 membres', '2 responsables', 'Actif'],
              actionLabel: 'Statique MVP'
            },
            {
              name: 'Chorale',
              location: 'Groupe liturgique',
              image: 'assets/home/region-city.svg',
              description: 'Animation des temps de priere.',
              metrics: ['11 membres', '1 responsable', 'Actif'],
              actionLabel: 'Statique MVP'
            },
            {
              name: 'Catechese',
              location: 'Formation',
              image: 'assets/home/region-alps.svg',
              description: 'Transmission et accompagnement.',
              metrics: ['17 membres', '3 responsables', 'Actif'],
              actionLabel: 'Statique MVP'
            }
          ],
          events: [
            { date: '12 MAR', title: 'Reunion de fraternite', subtitle: 'Salle paroissiale' },
            { date: '19 MAR', title: 'Temps de priere', subtitle: 'Chapelle Saint Paul' }
          ],
          documents: [
            { date: 'PDF', title: 'Charte de la fraternite.pdf', subtitle: 'PDF - 1.2 Mo' },
            { date: 'PDF', title: 'Planning des activites.pdf', subtitle: 'PDF - 640 Ko' }
          ]
        }
      },
      { path: 'members', component: ListComponent },
      { path: 'members/add', component: AddComponent },
      { path: 'members/:id', component: DetailsComponent },
      { path: 'members/:id/edit', component: EditComponent },
      { path: 'members/:id/delete', component: DeleteComponent },
      { path: 'personal-space', component: PersonalSpaceComponent },
      { path: 'account', component: PersonalSpaceComponent },
      {
        path: 'users',
        component: AdminUserManagementComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      }
    ]
  },
  { path: 'cmdaMembers', redirectTo: 'app/members', pathMatch: 'full' },
  { path: 'add', redirectTo: 'app/members/add', pathMatch: 'full' },
  { path: 'edit/:id', redirectTo: 'app/members/:id/edit', pathMatch: 'full' },
  { path: 'delete/:id', redirectTo: 'app/members/:id/delete', pathMatch: 'full' },
  { path: 'admin-users', redirectTo: 'app/users', pathMatch: 'full' },
  { path: 'user-management', redirectTo: 'app/users', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
