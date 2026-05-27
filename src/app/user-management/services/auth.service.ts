import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponseDTO } from '../models/auth-response.dto';
import { JwtPayloadDTO } from '../models/jwt-payload.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = `${environment.apiBaseUrl}/api/authenticate`;

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(this.authUrl, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      }),
      catchError(err => {
        console.error('Erreur d\'authentification:', err);
        return throwError(() => err);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  logout(): void {
    this.clearToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getTokenPayload(): JwtPayloadDTO | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');

    if (tokenParts.length !== 3) {
      return null;
    }

    try {
      const base64Payload = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = decodeURIComponent(
        atob(base64Payload)
          .split('')
          .map(char => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join('')
      );

      return JSON.parse(payload) as JwtPayloadDTO;
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT:', error);
      return null;
    }
  }

  getUsername(): string | null {
    return this.getTokenPayload()?.sub ?? null;
  }

  getRoles(): string[] {
    const roles = this.getTokenPayload()?.roles;

    if (!roles) {
      return [];
    }

    if (Array.isArray(roles)) {
      return roles;
    }

    return roles.split(',').map(role => role.trim()).filter(Boolean);
  }

  hasRole(role: string): boolean {
    const normalizedRole = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
    return this.getRoles().includes(normalizedRole);
  }

  getDefaultRouteForCurrentUser(): string {
    if (this.hasRole('ADMIN')) {
      return '/user-management';
    }

    if (this.hasRole('PROVINCIAL') || this.hasRole('REGIONAL') || this.hasRole('BERGER')) {
      return '/cmdaMembers';
    }

    return '/';
  }

  getTokenExpirationDate(): Date | null {
    const exp = this.getTokenPayload()?.exp;

    if (!exp) {
      return null;
    }

    return new Date(exp * 1000);
  }

  isTokenExpired(): boolean {
    const expirationDate = this.getTokenExpirationDate();

    if (!expirationDate) {
      return true;
    }

    return expirationDate.getTime() <= Date.now();
  }

  isAuthenticated(): boolean {
    return this.getTokenPayload() !== null && !this.isTokenExpired();
  }
}
