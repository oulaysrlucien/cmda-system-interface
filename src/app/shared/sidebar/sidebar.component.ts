import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../user-management/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  showMembersMenu(): boolean {
    return this.isAuthenticated();
  }

  get dashboardRoute(): string {
    if (this.hasRole('ADMIN')) {
      return '/app/admin/dashboard';
    }

    if (this.hasRole('PROVINCIAL')) {
      return '/app/provincial/province';
    }

    if (this.hasRole('REGIONAL')) {
      return '/app/regional/region';
    }

    if (this.hasRole('BERGER')) {
      return '/app/berger/fraternity';
    }

    return '/app/dashboard';
  }

  get primarySpaceLabel(): string {
    return 'Tableau de bord';
  }

  showUserManagementMenu(): boolean {
    return this.hasRole('ADMIN');
  }

  showStructureMenu(): boolean {
    return this.hasRole('ADMIN') || this.hasRole('PROVINCIAL');
  }

  showFraternityMenu(): boolean {
    return this.hasRole('ADMIN') || this.hasRole('PROVINCIAL') || this.hasRole('REGIONAL') || this.hasRole('BERGER');
  }

  get structuresRoute(): string {
    if (this.hasRole('ADMIN')) return '/app/admin/structures';
    if (this.hasRole('PROVINCIAL')) return '/app/provincial/province';
    return '/app/regional/region';
  }

  get structuresLabel(): string {
    if (this.hasRole('PROVINCIAL')) return 'Mes regions';
    if (this.hasRole('REGIONAL')) return 'Mes fraternites';
    return 'Structures';
  }

  get fraternitiesRoute(): string {
    if (this.hasRole('PROVINCIAL') || this.hasRole('REGIONAL')) return '/app/regional/region';
    return '/app/berger/fraternity';
  }

  get scopeLabel(): string {
    if (this.hasRole('ADMIN')) {
      return 'Plateforme complete';
    }

    if (this.hasRole('PROVINCIAL')) {
      return 'Province rattachee';
    }

    if (this.hasRole('REGIONAL')) {
      return 'Region rattachee';
    }

    if (this.hasRole('BERGER')) {
      return 'Fraternite rattachee';
    }

    return 'Espace personnel';
  }

  logout(): void {
    this.authService.logout();
    this.navigate.emit();
    this.router.navigate(['/login']);
  }
}
