import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../shared/services/notification.service';
import { DetailsComponent } from '../details/details.component';
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

  constructor(
    private cmdaMemberService: CmdaMemberService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cmdaMemberService.getCmdaMembers().subscribe(
      data => {
        this.cmdaMembers = data;
      },
      error => {
        console.error('Erreur lors de la récupération des membres', error);
        this.notificationService.showError('Impossible de charger la liste des membres.');
      }
    );
  }

  openDetailsModal(member: CmdaMember): void {
    const modalRef = this.modalService.open(DetailsComponent, { size: 'lg' });
    modalRef.componentInstance.member = member;
  }

  goToAddMember(): void {
    this.router.navigate(['/add']);
  }
}
