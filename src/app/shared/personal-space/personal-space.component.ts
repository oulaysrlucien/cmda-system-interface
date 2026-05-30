import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user-management/services/auth.service';
import { CurrentUserScope } from '../models/current-user-scope.model';
import { CurrentUserScopeService } from '../services/current-user-scope.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.css']
})
export class PersonalSpaceComponent implements OnInit {
  scope: CurrentUserScope | null = null;
  loading = true;
  loadError = '';

  constructor(
    private authService: AuthService,
    private currentUserScopeService: CurrentUserScopeService
  ) {}

  ngOnInit(): void {
    this.currentUserScopeService.getScope().subscribe({
      next: scope => {
        this.scope = scope;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.loadError = 'Impossible de charger votre perimetre utilisateur.';
      }
    });
  }

  get username(): string {
    return this.scope?.username || this.authService.getUsername() || 'Utilisateur';
  }

  get roleLabel(): string {
    switch (this.scope?.role) {
      case 'ADMIN': return 'Administrateur';
      case 'PROVINCIAL': return 'Provincial';
      case 'REGIONAL': return 'Regional';
      case 'BERGER': return 'Berger de fraternite';
      default: return 'Utilisateur';
    }
  }

  get scopeLabel(): string {
    return this.scope?.fraternity?.name || this.scope?.region?.name || this.scope?.province?.name || 'Plateforme complete';
  }

  get missionLabel(): string {
    switch (this.scope?.role) {
      case 'ADMIN': return 'Superviser la plateforme, les utilisateurs et les structures.';
      case 'PROVINCIAL': return 'Accompagner les regions, les fraternites et les membres de votre province.';
      case 'REGIONAL': return 'Piloter les fraternites et les membres de votre region.';
      case 'BERGER': return 'Servir votre fraternite et accompagner ses membres.';
      default: return 'Votre mission sera affichee apres affectation.';
    }
  }

  get primaryRoute(): string {
    return this.authService.getDefaultRouteForCurrentUser();
  }
}
