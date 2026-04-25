import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { UserDTO } from '../models/user.dto';
import { ProvinceDTO } from '../models/province.dto';
import { UserCreationDTO } from '../models/user-creation.dto';
import { AuthService } from './auth.service'; // Importez AuthService
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8080/api/users'; //

    constructor(private http: HttpClient, private authService: AuthService) {} // Ajoutez AuthService ici

    // Méthode pour récupérer tous les utilisateurs
    // Exemple d'ajout de gestion des erreurs
    getUsers(): Observable<UserDTO[]> {
        const token = this.authService.getToken(); // Récupérer le token depuis le service d'authentification
        //const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
        const headers = { Authorization: `Bearer ${token}` };
        return this.http.get<UserDTO[]>(this.baseUrl, { headers }).pipe(
            catchError(err => {
                console.error('Erreur lors de la récupération des utilisateurs', err);
                return throwError(err); // Propager l'erreur
            })
        );
    }


    // Méthode pour créer un utilisateur
    /*
   createUser(user: UserCreationDTO): Observable<UserDTO> {
           const headers = { Authorization: `Bearer ${this.authService.getToken()}` };
           return this.http.post<UserDTO>(this.baseUrl, user, { headers }).pipe(
               catchError(err => {
                   console.error('Erreur lors de la création de l\'utilisateur', err);
                   alert('Une erreur est survenue lors de la création de l\'utilisateur. Veuillez réessayer.');
                   return throwError(err); // Propager l'erreur
               })
           );
       }*/


  // Méthode pour créer un utilisateur
    /*
     createUser(user: UserCreationDTO): Observable<UserDTO> {
         const headers = {
             Authorization: `Bearer ${this.authService.getToken()}`  // Vérifiez que le token est bien inclus ici
         };

         return this.http.post<UserDTO>(this.baseUrl, user, { headers }).pipe(
             catchError(err => {
                 console.error('Erreur lors de la création de l\'utilisateur', err);

                 // Gestion spécifique des erreurs HTTP
                 if (err.status === 400) {
                     alert('Données invalides. Veuillez vérifier vos informations.');
                 } else if (err.status === 401) {
                     alert('Non autorisé. Vous devez être connecté pour créer un utilisateur.');
                 } else if (err.status === 500) {
                     alert('Erreur interne du serveur. Veuillez réessayer plus tard.');
                 } else {
                     alert('Une erreur est survenue lors de la création de l\'utilisateur.');
                 }

                 return throwError(err); // Propagation de l'erreur
             })
         );
     }*/


 // Méthode pour créer un utilisateur
  createUser(user: UserCreationDTO): Observable<UserDTO> {
      // Vérification de la présence des valeurs nécessaires avant de les envoyer
      if (!user.username || !user.password) {
          alert('Veuillez remplir le nom d\'utilisateur et le mot de passe.');
          return throwError('Nom d\'utilisateur ou mot de passe manquant'); // Retourner une erreur si les champs sont vides
      }

      return this.authService.authenticate(user.username, user.password).pipe(
          switchMap((authResponse: any) => {
              const token = authResponse.token;
              const headers = { Authorization: `Bearer ${token}` };

              return this.http.post<UserDTO>(this.baseUrl, user, { headers }).pipe(
                  catchError(err => {
                      console.error('Erreur lors de la création de l\'utilisateur', err);
                      alert('Une erreur est survenue lors de la création de l\'utilisateur. Veuillez réessayer.');
                      return throwError(err);  // Propager l'erreur
                  })
              );
          })
      );
  }



    // Méthode pour supprimer un utilisateur par ID
    deleteUser(userId: number): Observable<void> {
        const headers = { Authorization: `Bearer ${this.authService.getToken()}` }; // Ajoutez le token ici aussi
        return this.http.delete<void>(`${this.baseUrl}/${userId}`, { headers });
    }

    // Méthode pour récupérer les provinces
    /*
    getProvinces(): Observable<ProvinceDTO[]> {
        console.log('Récupération des provinces depuis le serveur...');
        const headers = { Authorization: `Bearer ${this.authService.getToken()}` }; // Ajoutez le token dans les headers
        return this.http.get<ProvinceDTO[]>('http://localhost:8080/provinces/all', { headers });
    }*/

  getProvinces(): Observable<ProvinceDTO[]> {
      const token = this.authService.getToken(); // Assurez-vous que vous récupérez bien le token
      const headers = {
          Authorization: `Bearer ${token}`
      };
      return this.http.get<ProvinceDTO[]>('http://localhost:8080/provinces/all', { headers });
  }


}
