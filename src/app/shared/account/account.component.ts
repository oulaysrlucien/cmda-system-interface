import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../user-management/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get username(): string {
    return this.authService.getUsername() || 'Utilisateur';
  }

  get roleLabel(): string {
    return this.authService.getRoles().map(role => role.replace('ROLE_', '')).join(', ') || 'Utilisateur';
  }

  get sessionExpiration(): string {
    const expiration = this.authService.getTokenExpirationDate();
    return expiration ? expiration.toLocaleString('fr-FR') : 'Non disponible';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
