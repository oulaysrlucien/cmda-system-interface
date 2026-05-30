import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { NotificationComponent } from './notifications/notification.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PublicHeaderComponent } from './header/public-header/public-header.component';
import { AppHeaderComponent } from './header/app-header/app-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicPageComponent } from './public-page/public-page.component';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';
import { PersonalSpaceComponent } from './personal-space/personal-space.component';
import { HierarchySpaceComponent } from './hierarchy-space/hierarchy-space.component';
import { AdminStructuresComponent } from './admin-structures/admin-structures.component';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    SidebarComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NotificationComponent,
    PublicLayoutComponent,
    AuthenticatedLayoutComponent,
    PublicHeaderComponent,
    AppHeaderComponent,
    DashboardComponent,
    PublicPageComponent,
    RoleDashboardComponent,
    PersonalSpaceComponent,
    HierarchySpaceComponent,
    AdminStructuresComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NotificationComponent,
    PublicLayoutComponent,
    AuthenticatedLayoutComponent,
    PublicHeaderComponent,
    AppHeaderComponent,
    DashboardComponent,
    PublicPageComponent,
    RoleDashboardComponent,
    PersonalSpaceComponent,
    HierarchySpaceComponent,
    AdminStructuresComponent,
    AccountComponent
  ]
})
export class SharedModule { }
