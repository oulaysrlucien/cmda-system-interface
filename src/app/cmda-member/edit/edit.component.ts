import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmdaMemberService } from '../services/cmda-member.service';
import { CmdaMember } from '../models/cmda-member.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  member: CmdaMember; // L'objet membre à modifier

  constructor(
    private route: ActivatedRoute,
    private cmdaMemberService: CmdaMemberService,
    private router: Router
  ) {
    // Initialisation de l'objet member
    this.member = {
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
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID à partir des paramètres de route
    this.cmdaMemberService.getMemberById(id).subscribe(
      (data) => {
        this.member = data; // Remplir l'objet membre avec les données récupérées
      },
      (error) => {
        console.error('Erreur lors de la récupération du membre', error);
      }
    );
  }


  onSubmit(): void {
    this.cmdaMemberService.updateCmdaMember(this.member).subscribe(
      response => {
        console.log('Membre mis à jour avec succès', response);
        this.router.navigate(['/cmdaMembers']); // Rediriger vers la liste des membres après mise à jour
      },
      error => {
        console.error('Erreur lors de la mise à jour du membre', error);
        // Affichez un message d'erreur ici si nécessaire
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/cmdaMembers']); // Rediriger vers la liste des membres
  }
}
