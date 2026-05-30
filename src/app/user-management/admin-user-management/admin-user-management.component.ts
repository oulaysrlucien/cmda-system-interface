import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { FraternityDTO } from '../models/fraternity.dto';
import { ProvinceDTO } from '../models/province.dto';
import { RegionDTO } from '../models/region.dto';
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
  regions: RegionDTO[] = [];
  fraternities: FraternityDTO[] = [];
  user: UserCreationDTO = this.emptyUser();
  searchTerm = '';
  roleFilter = '';
  provinceFilter = '';
  currentPage = 1;
  readonly pageSize = 8;
  loading = true;
  formOpen = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get filteredUsers(): UserDTO[] {
    const search = this.searchTerm.trim().toLowerCase();
    return this.users.filter(user => {
      const matchesSearch = !search || user.username.toLowerCase().includes(search);
      const matchesRole = !this.roleFilter || user.role === this.roleFilter;
      const matchesProvince = !this.provinceFilter || this.getProvinceId(user) === Number(this.provinceFilter);
      return matchesSearch && matchesRole && matchesProvince;
    });
  }

  get paginatedUsers(): UserDTO[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredUsers.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get availableRegions(): RegionDTO[] {
    return !this.user.provinceId
      ? this.regions
      : this.regions.filter(region => region.provinceId === Number(this.user.provinceId));
  }

  get availableFraternities(): FraternityDTO[] {
    return !this.user.regionId
      ? this.fraternities
      : this.fraternities.filter(fraternity => fraternity.regionId === Number(this.user.regionId));
  }

  loadData(): void {
    this.loading = true;
    forkJoin({
      users: this.userService.getUsers(),
      provinces: this.userService.getProvinces(),
      regions: this.userService.getRegions(),
      fraternities: this.userService.getFraternities()
    }).subscribe({
      next: response => {
        this.users = response.users;
        this.provinces = response.provinces;
        this.regions = response.regions;
        this.fraternities = response.fraternities;
        this.loading = false;
        this.currentPage = Math.min(this.currentPage, this.totalPages);
      },
      error: () => {
        this.loading = false;
        this.notificationService.showError('Impossible de charger les utilisateurs.');
      }
    });
  }

  onSubmit(): void {
    if (!this.user.username || !this.user.password || !this.user.role) {
      this.notificationService.showWarning('Veuillez renseigner les champs obligatoires.');
      return;
    }

    if (!this.authService.isAuthenticated()) {
      this.notificationService.showWarning('Vous devez etre connecte en tant qu administrateur.');
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.closeForm();
        this.loadData();
        this.notificationService.showSuccess('Utilisateur cree avec succes.');
      },
      error: () => this.notificationService.showError('Impossible de creer cet utilisateur.')
    });
  }

  editUser(user: UserDTO): void {
    this.notificationService.showInfo(`La modification de ${user.username} sera finalisee dans le parcours CRUD utilisateurs.`);
  }

  deleteUser(userId: number): void {
    if (!window.confirm('Supprimer cet utilisateur ? Cette action doit rester exceptionnelle.')) {
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.loadData();
        this.notificationService.showSuccess('Utilisateur supprime avec succes.');
      },
      error: () => this.notificationService.showError('Impossible de supprimer cet utilisateur.')
    });
  }

  openForm(): void {
    this.user = this.emptyUser();
    this.formOpen = true;
  }

  closeForm(): void {
    this.formOpen = false;
    this.user = this.emptyUser();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.roleFilter = '';
    this.provinceFilter = '';
    this.currentPage = 1;
  }

  applyFilters(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onRoleChange(): void {
    this.user.provinceId = undefined;
    this.user.regionId = undefined;
    this.user.fraternityId = undefined;
  }

  onProvinceChange(): void {
    this.user.regionId = undefined;
    this.user.fraternityId = undefined;
  }

  onRegionChange(): void {
    this.user.fraternityId = undefined;
  }

  countByRole(role: string): number {
    return this.users.filter(user => user.role === role).length;
  }

  getInitials(username: string): string {
    return username.slice(0, 2).toUpperCase();
  }

  getAssignment(user: UserDTO): string {
    if (user.role === 'ADMIN') {
      return 'Plateforme complete';
    }
    return user.province?.name || user.region?.name || user.fraternity?.name || user.warningMessage || 'Perimetre a affecter';
  }

  getProvinceId(user: UserDTO): number | undefined {
    if (user.province?.id) return user.province.id;
    if (user.region?.provinceId) return user.region.provinceId;
    return this.regions.find(region => region.id === user.fraternity?.regionId)?.provinceId;
  }

  getRoleLabel(role: string): string {
    return role === 'REGIONAL' ? 'Regional' : role.charAt(0) + role.slice(1).toLowerCase();
  }

  getRoleClass(role: string): string {
    return `role-badge--${role.toLowerCase()}`;
  }

  private emptyUser(): UserCreationDTO {
    return { username: '', password: '', role: '' };
  }
}
