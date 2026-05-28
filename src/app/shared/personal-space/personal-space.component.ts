import { Component } from '@angular/core';
import { AuthService } from '../../user-management/services/auth.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.css']
})
export class PersonalSpaceComponent {
  constructor(private authService: AuthService) {}

  get username(): string {
    return this.authService.getUsername() || 'Utilisateur';
  }

  get roles(): string {
    return this.authService.getRoles().join(', ') || 'Aucun role detecte';
  }
}
