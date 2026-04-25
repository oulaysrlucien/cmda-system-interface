// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/authenticate';

  constructor(private http: HttpClient) {}

  // Méthode pour authentifier l'utilisateur
  /*
  authenticate(username: string, password: string): Observable<any> {
      return this.http.post<any>(this.authUrl, { username, password }).pipe(
          tap(response => {
              if (response.token) {
                  this.saveToken(response.token);
              }
          }),
          catchError(error => {
              console.error('Erreur d\'authentification:', error);
              return throwError(error);
          })
      );
  }
*/
authenticate(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>('http://localhost:8080/api/authenticate', body).pipe(
        tap(response => {
            if (response.token) {
                this.saveToken(response.token);
            }
        }),
        catchError(err => {
            console.error('Erreur d\'authentification:', err);
            return throwError(err);
        })
    );
}


  saveToken(token: string): void {
      localStorage.setItem('token', token);
  }

/*
  getToken(): string | null {
      return localStorage.getItem('token');
  }*/

getToken(): string | null {
   return localStorage.getItem('token'); // Vérifiez si cela renvoie un token valide
}



  isAuthenticated(): boolean {
      return this.getToken() !== null;
  }
}
