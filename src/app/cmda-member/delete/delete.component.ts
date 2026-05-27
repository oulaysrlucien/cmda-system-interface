import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { CmdaMemberService } from '../services/cmda-member.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  memberId!: number;

  constructor(
    private route: ActivatedRoute,
    private cmdaMemberService: CmdaMemberService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.memberId = +this.route.snapshot.paramMap.get('id')!;
  }

  confirmDelete(): void {
    this.cmdaMemberService.deleteCmdaMember(this.memberId).subscribe(
      () => {
        this.notificationService.showSuccess('Membre supprimé avec succès.');
        this.router.navigate(['/cmdaMembers']);
      },
      error => {
        console.error('Erreur lors de la suppression du membre', error);
        this.notificationService.showError('Une erreur est survenue lors de la suppression du membre.');
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/cmdaMembers']);
  }
}
