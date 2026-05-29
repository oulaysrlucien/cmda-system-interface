import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { CmdaMember } from '../models/cmda-member.model';
import { CmdaMemberService } from '../services/cmda-member.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  isSaving = false;

  newMember: CmdaMember = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    profession: '',
    status: 'ACTIVE',
    fraternityId: undefined,
    fraternityName: undefined
  };

  constructor(
    private cmdaMemberService: CmdaMemberService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isSaving = true;
    this.cmdaMemberService.addCmdaMember(this.newMember).subscribe(
      () => {
        this.isSaving = false;
        this.notificationService.showSuccess('Membre ajoute avec succes.');
        this.router.navigate(['/app/members']);
      },
      error => {
        console.error('Erreur lors de l ajout du membre', error);
        this.isSaving = false;
        this.notificationService.showError('Une erreur est survenue lors de l ajout du membre.');
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/app/members']);
  }

  get calculatedAge(): number | null {
    if (!this.newMember.birthday) {
      return null;
    }

    const birthday = new Date(this.newMember.birthday);

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
