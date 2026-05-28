import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { CmdaMember } from '../models/cmda-member.model';
import { CmdaMemberService } from '../services/cmda-member.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  member: CmdaMember = {
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
    private route: ActivatedRoute,
    private cmdaMemberService: CmdaMemberService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.cmdaMemberService.getMemberById(id).subscribe(
      data => {
        this.member = data;
      },
      error => {
        console.error('Erreur lors de la récupération du membre', error);
        this.notificationService.showError('Impossible de charger le membre.');
      }
    );
  }

  onSubmit(): void {
    this.cmdaMemberService.updateCmdaMember(this.member).subscribe(
      () => {
        this.notificationService.showSuccess('Membre mis à jour avec succès.');
        this.router.navigate(['/app/members']);
      },
      error => {
        console.error('Erreur lors de la mise à jour du membre', error);
        this.notificationService.showError('Une erreur est survenue lors de la mise à jour du membre.');
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/app/members']);
  }
}
