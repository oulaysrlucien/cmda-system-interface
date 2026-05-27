import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.notificationService.showWarning('Veuillez entrer votre nom d\'utilisateur et votre mot de passe.');
      return;
    }

    this.authService.authenticate(this.username, this.password).subscribe(
      () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.notificationService.showSuccess('Connexion réussie.');
        this.router.navigateByUrl(returnUrl || this.authService.getDefaultRouteForCurrentUser());
      },
      error => {
        console.error('Erreur lors de l\'authentification', error);
        this.notificationService.showError('Échec de l\'authentification. Veuillez vérifier vos identifiants.');
      }
    );
  }
}
