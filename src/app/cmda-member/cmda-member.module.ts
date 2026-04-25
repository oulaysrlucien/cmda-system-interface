// src/app/cmda-member/cmda-member.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router'; // Importer RouterModule

//import {MatDialogModule} from '@angular/material/dialog';

import { ListComponent } from './list/list.component';
import { CmdaMemberService } from './services/cmda-member.service';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [
    ListComponent, // Ajout de ListComponent ici
    DetailsComponent, AddComponent, EditComponent, DeleteComponent //
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule, // Module nécessaire pour NgbModal (Bootstrap)
    RouterModule // Ajout de RouterModule dans les imports

  ],
  providers: [
    CmdaMemberService // Fournit le service dans le module
  ],
  exports: [
    ListComponent, // Exporte ListComponent pour l'utiliser ailleurs
    DetailsComponent, // Exporte DetailsComponent pour l'utiliser ailleurs
    EditComponent // Exporte EditComponent pour l'utiliser ailleurs
  ]
})
export class CmdaMemberModule {}
