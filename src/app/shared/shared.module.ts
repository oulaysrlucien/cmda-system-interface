import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { NotificationComponent } from './notifications/notification.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    UnauthorizedComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NotificationComponent
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
    NotificationComponent
  ]
})
export class SharedModule { }
