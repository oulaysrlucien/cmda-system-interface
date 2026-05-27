import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { ProvinceDTO } from '../models/province.dto';
import { UserCreationDTO } from '../models/user-creation.dto';
import { UserDTO } from '../models/user.dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {
  users: UserDTO[] = [];
  provinces: ProvinceDTO[] = [];

  user: UserCreationDTO = this.emptyUser();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getProvinces();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getProvinces(): void {
    this.userService.getProvinces().subscribe(
      provinces => {
        this.provinces = provinces;
      },
      error => {
        console.error('Erreur lors de la récupération des provinces', error);
        this.notificationService.showError('Impossible de charger les provinces.');
      }
    );
  }

  onSubmit(): void {
    if (!this.user.username || !this.user.password) {
      this.notificationService.showWarning('Veuillez remplir le nom d\'utilisateur et le mot de passe.');
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.notificationService.showWarning('Vous devez être connecté en tant qu\'administrateur pour créer un utilisateur.');
      return;
    }

    this.createUser();
  }

  createUser(): void {
    this.userService.createUser(this.user).subscribe(
      () => {
        this.getUsers();
        this.user = this.emptyUser();
        this.notificationService.showSuccess('Utilisateur créé avec succès.');
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur', error);
        this.notificationService.showError('Une erreur est survenue lors de la création de l\'utilisateur.');
      }
    );
  }

  editUser(user: UserDTO): void {
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.getUsers();
      this.notificationService.showSuccess('Utilisateur supprimé avec succès.');
    });
  }

  private emptyUser(): UserCreationDTO {
    return {
      username: '',
      password: '',
      role: '',
      provinceId: undefined,
      regionId: undefined,
      fraternityId: undefined
    };
  }
}
