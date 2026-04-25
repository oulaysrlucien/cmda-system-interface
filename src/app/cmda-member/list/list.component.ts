import { Component, OnInit } from '@angular/core';
import { CmdaMemberService } from '../services/cmda-member.service';
import { CmdaMember } from '../models/cmda-member.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../details/details.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cmda-member-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cmdaMembers: CmdaMember[] = []; // Tableau pour stocker les membres
  selectedMember: CmdaMember | null = null; // Variable pour le membre sélectionné

  constructor(private cmdaMemberService: CmdaMemberService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.cmdaMemberService.getCmdaMembers().subscribe(
      (data) => {
        console.log('Membres récupérés', data);
        this.cmdaMembers = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des membres', error);
      }
    );
  }

  // Méthode pour ouvrir le modal de détails d'un membre
    openDetailsModal(member: CmdaMember): void {
      const modalRef = this.modalService.open(DetailsComponent, { size: 'lg' });
      modalRef.componentInstance.member = member; // Passe le membre sélectionné au composant de détails
    }


// Log de redirection pour le bouton "Ajouter un membre"
  goToAddMember(): void {
    console.log("Naviguer vers la page d'ajout d'un membre");
    this.router.navigate(['/add']); // Assurez-vous que ceci est bien appelé
  }



}
