import { Component } from '@angular/core';
import { AuthService } from '../../user-management/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  showMembersMenu(): boolean {
    return this.isAuthenticated();
  }

  showUserManagementMenu(): boolean {
    return this.hasRole('ADMIN');
  }
}
