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
    this.cmdaMemberService.addCmdaMember(this.newMember).subscribe(
      () => {
        this.notificationService.showSuccess('Membre ajouté avec succès.');
        this.router.navigate(['/cmdaMembers']);
      },
      error => {
        console.error('Erreur lors de l\'ajout du membre', error);
        this.notificationService.showError('Une erreur est survenue lors de l\'ajout du membre.');
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/cmdaMembers']);
  }
}
