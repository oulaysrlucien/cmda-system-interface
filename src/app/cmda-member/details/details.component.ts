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
  isLoading = true;

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
    if (this.member) {
      this.router.navigate(['/app/members', this.member.id, 'edit']);
    }
  }

  print(): void {
    window.print();
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
