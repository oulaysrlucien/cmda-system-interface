import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { CmdaMember } from '../models/cmda-member.model';
import { CmdaMemberService } from '../services/cmda-member.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  member: CmdaMember | null = null;
  editableMember: CmdaMember | null = null;
  isLoading = true;
  isEditMode = false;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cmdaMemberService: CmdaMemberService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const stateMember = history.state?.member as CmdaMember | undefined;

    if (stateMember) {
      this.member = stateMember;
      if (this.route.snapshot.queryParamMap.get('edit') === 'true') {
        this.enableEdit();
      }
      this.isLoading = false;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.notificationService.showError('Identifiant membre invalide.');
      this.router.navigate(['/app/members']);
      return;
    }

    this.cmdaMemberService.getMemberById(id).subscribe(
      member => {
        this.member = member;
        if (this.route.snapshot.queryParamMap.get('edit') === 'true') {
          this.enableEdit();
        }
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement de la fiche membre', error);
        this.isLoading = false;

        if (!this.member) {
          this.notificationService.showError('Impossible de charger la fiche membre.');
        }
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/app/members']);
  }

  goToEdit(): void {
    this.enableEdit();
  }

  print(): void {
    window.print();
  }

  enableEdit(): void {
    if (!this.member) {
      return;
    }

    this.editableMember = { ...this.member };
    this.isEditMode = true;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { edit: true },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  cancelEdit(): void {
    this.editableMember = null;
    this.isEditMode = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { edit: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  saveEdit(): void {
    if (!this.editableMember) {
      return;
    }

    this.isSaving = true;
    this.cmdaMemberService.updateCmdaMember(this.editableMember).subscribe(
      member => {
        this.member = member;
        this.editableMember = null;
        this.isEditMode = false;
        this.isSaving = false;
        this.notificationService.showSuccess('Membre mis a jour avec succes.');
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { edit: null },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      },
      error => {
        console.error('Erreur lors de la mise a jour du membre', error);
        this.isSaving = false;
        this.notificationService.showError('Une erreur est survenue lors de la mise a jour du membre.');
      }
    );
  }

  get fullName(): string {
    return this.member ? `${this.member.firstName} ${this.member.lastName}` : '';
  }

  get initials(): string {
    if (!this.member) {
      return '';
    }

    return `${this.member.firstName?.[0] || ''}${this.member.lastName?.[0] || ''}`.toUpperCase();
  }

  get age(): number | null {
    if (!this.member?.birthday) {
      return null;
    }

    const birthday = new Date(this.member.birthday);

    if (Number.isNaN(birthday.getTime())) {
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDelta = today.getMonth() - birthday.getMonth();

    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthday.getDate())) {
      age -= 1;
    }

    return age;
  }
}
