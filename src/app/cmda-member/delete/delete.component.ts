// src/app/cmda-member/delete/delete.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
        private router: Router
    ) {}

    ngOnInit(): void {
        this.memberId = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID du membre à supprimer
    }

    confirmDelete(): void {
        this.cmdaMemberService.deleteCmdaMember(this.memberId).subscribe(
            () => {
                console.log('Membre supprimé avec succès');
                this.router.navigate(['/cmdaMembers']); // Rediriger vers la liste après suppression
            },
            (error) => {
                console.error('Erreur lors de la suppression du membre', error);
            }
        );
    }

    cancel(): void {
        this.router.navigate(['/cmdaMembers']); // Rediriger vers la liste des membres
    }
}
