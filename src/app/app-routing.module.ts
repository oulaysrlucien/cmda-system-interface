import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './cmda-member/add/add.component';
import { DeleteComponent } from './cmda-member/delete/delete.component';
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

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'cmdaMembers', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: DeleteComponent, canActivate: [AuthGuard] },
  { path: 'admin-users', redirectTo: 'user-management', pathMatch: 'full' },
  {
    path: 'user-management',
    component: AdminUserManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
