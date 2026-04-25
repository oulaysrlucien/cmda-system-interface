import { Component } from '@angular/core';
import { CmdaMemberService } from '../services/cmda-member.service';
import { CmdaMember } from '../models/cmda-member.model';
import { Router } from '@angular/router';

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
    status: 'ACTIVE', // Valeur par défaut
    fraternityId: undefined,
    fraternityName: undefined
  };

  constructor(private cmdaMemberService: CmdaMemberService, private router: Router) { }

  onSubmit(): void {
    console.log('Formulaire soumis', this.newMember); // Log pour vérifier les données
    this.cmdaMemberService.addCmdaMember(this.newMember).subscribe(
      response => {
        console.log('Membre ajouté avec succès', response);
        this.router.navigate(['/cmdaMembers']);
      },
      error => {
        console.error('Erreur lors de l\'ajout du membre', error);
      }
    );
  }


  onCancel(): void {
    this.router.navigate(['/cmdaMembers']); // Redirigez vers la liste des membres
  }



}
