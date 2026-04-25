import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Pour rediriger après la connexion
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 username: string = ''; // Initialise avec une chaîne vide
 password: string = ''; // Initialise avec une chaîne vide


  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
      if (!this.username || !this.password) {
          alert('Veuillez entrer votre nom d\'utilisateur et votre mot de passe.');
          return;
      }

      this.authService.authenticate(this.username, this.password).subscribe(
          response => {
              console.log('Utilisateur authentifié', response);
              this.authService.saveToken(response.token);
              this.router.navigate(['/user-management']); // Redirige vers la page de gestion des utilisateurs
          },
          error => {
              console.error('Erreur lors de l\'authentification', error);
              alert('Échec de l\'authentification. Veuillez vérifier vos identifiants.');
          }
      );
  }




}
