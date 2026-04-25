import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import { ListComponent } from './cmda-member/list/list.component';
import { AddComponent } from './cmda-member/add/add.component';
import { EditComponent } from './cmda-member/edit/edit.component';
import { DeleteComponent } from './cmda-member/delete/delete.component';
import {AdminUserManagementComponent} from './user-management/admin-user-management/admin-user-management.component';
import { LoginComponent } from './user-management/login/login.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent }, // Page d'accueil, affiche le message de bienvenue
    { path: 'cmdaMembers', component: ListComponent }, // Liste des membres
    { path: 'add', component: AddComponent }, // Ajout de la route pour le composant AddComponent
    { path: 'edit/:id', component: EditComponent }, // Route pour l'édition d'un membre
    { path: 'delete/:id', component: DeleteComponent }, // Route pour le composant DeleteComponent
    { path: 'login', component: LoginComponent }, //
    { path: 'user-management', component: AdminUserManagementComponent }, // Ajout de la route pour AdminUserManagement

    // Ajoutez ici d'autres routes pour vos dashboards
    { path: '**', redirectTo: '' } // Redirige vers la page d'accueil si la route n'est pas trouvée

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
