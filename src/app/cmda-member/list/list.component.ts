import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserScope } from '../../shared/models/current-user-scope.model';
import { CurrentUserScopeService } from '../../shared/services/current-user-scope.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthService } from '../../user-management/services/auth.service';
import { CmdaMember } from '../models/cmda-member.model';
import { CmdaMemberService } from '../services/cmda-member.service';

@Component({
  selector: 'app-cmda-member-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cmdaMembers: CmdaMember[] = [];
  selectedMember: CmdaMember | null = null;
  currentScope: CurrentUserScope | null = null;
  searchTerm = '';
  statusFilter = '';
  isLoading = false;
  hasLoaded = false;
  totalElements = 0;
  readonly pageSize = 100;

  constructor(
    private cmdaMemberService: CmdaMemberService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private currentUserScopeService: CurrentUserScopeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserScopeService.getScope().subscribe({
      next: scope => {
        this.currentScope = scope;
      },
      error: error => {
        console.error('Erreur lors du chargement du perimetre utilisateur', error);
      }
    });

    this.loadMembers();
  }

  loadMembers(): void {
    this.isLoading = true;

    if (this.authService.hasRole('ADMIN') && !this.hasActiveFilters) {
      this.cmdaMemberService.getAllMembersForAdmin().subscribe(
        data => {
          this.cmdaMembers = data;
          this.totalElements = data.length;
          this.isLoading = false;
          this.hasLoaded = true;
        },
        error => this.handleMembersLoadError(error)
      );
      return;
    }

    if (!this.hasActiveFilters) {
      this.cmdaMemberService.getMembersForCurrentUser(0, this.pageSize).subscribe(
        page => {
          this.cmdaMembers = page.content;
          this.totalElements = page.totalElements;
          this.isLoading = false;
          this.hasLoaded = true;
        },
        error => this.handleMembersLoadError(error)
      );
      return;
    }

    this.cmdaMemberService.searchMembers({
      keyword: this.searchTerm.trim(),
      status: this.statusFilter,
      page: 0,
      size: this.pageSize
    }).subscribe(
      page => {
        this.cmdaMembers = page.content;
        this.totalElements = page.totalElements;
        this.isLoading = false;
        this.hasLoaded = true;
      },
      error => this.handleMembersLoadError(error)
    );
  }

  applyFilters(): void {
    this.loadMembers();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.loadMembers();
  }

  openDetails(member: CmdaMember): void {
    this.router.navigate(['/app/members', member.id], { state: { member } });
  }

  openEdit(member: CmdaMember): void {
    this.router.navigate(['/app/members', member.id], {
      queryParams: { edit: true },
      state: { member }
    });
  }

  goToAddMember(): void {
    this.router.navigate(['/app/members/add']);
  }

  get filteredMembers(): CmdaMember[] {
    return this.cmdaMembers;
  }

  get hasActiveFilters(): boolean {
    return Boolean(this.searchTerm.trim() || this.statusFilter);
  }

  get scopeLabel(): string {
    if (!this.currentScope) {
      return 'Perimetre en cours de chargement';
    }

    switch (this.currentScope.role) {
      case 'ADMIN':
        return 'Vue globale administrateur';
      case 'PROVINCIAL':
        return this.currentScope.province?.name || 'Province rattachee';
      case 'REGIONAL':
        return this.currentScope.region?.name || 'Region rattachee';
      case 'BERGER':
        return this.currentScope.fraternity?.name || 'Fraternite rattachee';
      default:
        return 'Perimetre utilisateur';
    }
  }

  getStatusClass(status: string): string {
    return status === 'ACTIVE' ? 'is-active' : 'is-inactive';
  }

  getMemberInitials(member: CmdaMember): string {
    return `${member.firstName?.[0] || ''}${member.lastName?.[0] || ''}`.toUpperCase();
  }

  private handleMembersLoadError(error: unknown): void {
    console.error('Erreur lors de la recuperation des membres', error);
    this.cmdaMembers = [];
    this.totalElements = 0;
    this.isLoading = false;
    this.hasLoaded = true;
    this.notificationService.showError('Impossible de charger la liste des membres.');
  }
}
