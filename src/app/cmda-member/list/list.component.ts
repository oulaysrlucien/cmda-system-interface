import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  searchTerm = '';
  statusFilter = '';

  constructor(
    private cmdaMemberService: CmdaMemberService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.hasRole('ADMIN')) {
      this.cmdaMemberService.getAllMembersForAdmin().subscribe(
        data => {
          this.cmdaMembers = data;
        },
        error => this.handleMembersLoadError(error)
      );
      return;
    }

    this.cmdaMemberService.getMembersForCurrentUser(0, 100).subscribe(
      page => {
        this.cmdaMembers = page.content;
      },
      error => this.handleMembersLoadError(error)
    );
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
    const search = this.searchTerm.trim().toLowerCase();

    return this.cmdaMembers.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      const contact = `${member.email || ''} ${member.phoneNumber || ''}`.toLowerCase();
      const organization = `${member.fraternityName || ''} ${member.regionName || ''} ${member.provinceName || ''}`.toLowerCase();
      const matchesSearch = !search || fullName.includes(search) || contact.includes(search) || organization.includes(search);
      const matchesStatus = !this.statusFilter || member.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  getStatusClass(status: string): string {
    return status === 'ACTIVE' ? 'is-active' : 'is-inactive';
  }

  getMemberInitials(member: CmdaMember): string {
    return `${member.firstName?.[0] || ''}${member.lastName?.[0] || ''}`.toUpperCase();
  }

  private handleMembersLoadError(error: unknown): void {
    console.error('Erreur lors de la recuperation des membres', error);
    this.notificationService.showError('Impossible de charger la liste des membres.');
  }
}
