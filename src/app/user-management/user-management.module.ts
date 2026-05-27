import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    AdminUserManagementComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
providers: [AuthService, UserService],
})
export class UserManagementModule { }
