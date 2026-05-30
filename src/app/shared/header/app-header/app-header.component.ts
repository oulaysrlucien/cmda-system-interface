import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../user-management/services/auth.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  profileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get username(): string {
    return this.authService.getUsername() || 'Utilisateur';
  }

  get pageTitle(): string {
    const url = this.router.url;

    if (url.includes('/app/users')) {
      return 'Gestion des utilisateurs';
    }

    if (url.includes('/app/admin/structures')) {
      return 'Gestion des structures';
    }

    if (url.includes('/app/provincial/province')) {
      return 'Espace provincial';
    }

    if (url.includes('/app/regional/region')) {
      return 'Espace regional';
    }

    if (url.includes('/app/berger/fraternity')) {
      return 'Espace fraternite';
    }

    if (url.includes('/app/members')) {
      return 'Gestion des membres';
    }

    return 'Tableau de bord';
  }

  get pageSubtitle(): string {
    if (this.authService.hasRole('ADMIN')) {
      return 'Vue administrateur de la plateforme';
    }

    if (this.authService.hasRole('PROVINCIAL')) {
      return 'Pilotage de la province';
    }

    if (this.authService.hasRole('REGIONAL')) {
      return 'Suivi de la region';
    }

    if (this.authService.hasRole('BERGER')) {
      return 'Suivi de la fraternite';
    }

    return 'Gestion communautaire';
  }

  get roleLabel(): string {
    if (this.authService.hasRole('ADMIN')) {
      return 'Admin';
    }

    if (this.authService.hasRole('PROVINCIAL')) {
      return 'Provincial';
    }

    if (this.authService.hasRole('REGIONAL')) {
      return 'Regional';
    }

    if (this.authService.hasRole('BERGER')) {
      return 'Berger';
    }

    return 'Utilisateur';
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  logout(): void {
    this.closeProfileMenu();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
