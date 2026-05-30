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
import { AdminStructuresComponent } from './shared/admin-structures/admin-structures.component';

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
            { label: 'Gerer les structures', route: '/app/admin/structures', icon: 'bi-diagram-3' },
            { label: 'Voir les membres', route: '/app/members', icon: 'bi-people' }
          ]
        }
      },
      {
        path: 'admin/structures',
        component: AdminStructuresComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
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
          mode: 'province'
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
          mode: 'region'
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
          mode: 'fraternity'
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
