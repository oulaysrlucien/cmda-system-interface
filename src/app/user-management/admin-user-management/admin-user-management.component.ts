import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/user.dto';
import { ProvinceDTO } from '../models/province.dto';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service'; // Assurez-vous que cette ligne est présente

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {
  users: UserDTO[] = [];
  provinces: ProvinceDTO[] = [];

  user: UserDTO = {
    id: 0,
    username: '',
    role: '',
    provinceId: undefined,
    regionId: undefined,
    fraternityId: undefined,
    password: ''
  };

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getProvinces();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

/*
  getProvinces(): void {
    this.userService.getProvinces().subscribe(provinces => {
      this.provinces = provinces;
    });
  }*/

getProvinces(): void {
    this.userService.getProvinces().subscribe(
      provinces => {
        console.log('Provinces récupérées:', provinces); // Ajoutez ce log pour vérifier
        this.provinces = provinces;
      },
      error => {
        console.error('Erreur lors de la récupération des provinces', error);
      }
    );
}


  onSubmit(): void {

      console.log('Rôle sélectionné:', this.user.role);  // Vérifier le rôle sélectionné
      console.log('ID de la province:', this.user.provinceId); // Vérifier si provinceId est bien renseigné
      console.log('Nom d\'utilisateur:', this.user.username); // Vérifier si le nom d'utilisateur est renseigné

      // Vérifier que username et password ne sont pas undefined
      if (!this.user.username || !this.user.password) {
          alert('Veuillez remplir le nom d\'utilisateur et le mot de passe.');
          return; // Ne pas procéder si les champs sont vides
      }

      if (!this.authService.isAuthenticated()) {
          // Authentification de l'utilisateur
          this.authService.authenticate(this.user.username, this.user.password).subscribe(
              (response: { token: string }) => {
                  this.authService.saveToken(response.token); // Sauvegarder le token
                  this.createUser(); // Appeler la méthode pour créer l'utilisateur
              },
              (error: any) => {
                  console.error('Erreur d\'authentification', error);
                  alert('Échec de l\'authentification. Veuillez vérifier vos identifiants.');
              }
          );
      } else {
          this.createUser(); // Si déjà authentifié, créer directement l'utilisateur
      }
  }


  createUser(): void {
    console.log('Création de l\'utilisateur avec les données :', this.user);  // Log des données avant l'envoi
    this.userService.createUser(this.user).subscribe(
      response => {
        console.log('Utilisateur créé', response);
        this.getUsers();
        this.user = { id: 0, username: '', password: '', role: '', provinceId: undefined }; // Réinitialiser le formulaire
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur', error);
        alert('Une erreur est survenue lors de la création de l\'utilisateur.');
      }
    );
  }

  editUser(user: UserDTO): void {
    // Implémentez la logique pour modifier un utilisateur
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      console.log('Utilisateur supprimé');
      this.getUsers();
    });
  }
}
