import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrentUserScope } from '../models/current-user-scope.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserScopeService {
  private readonly scopeUrl = `${environment.apiBaseUrl}/api/me/scope`;
  private scope$?: Observable<CurrentUserScope>;

  constructor(private http: HttpClient) {}

  getScope(forceRefresh = false): Observable<CurrentUserScope> {
    if (!this.scope$ || forceRefresh) {
      this.scope$ = this.http.get<CurrentUserScope>(this.scopeUrl).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }

    return this.scope$;
  }

  clearCache(): void {
    this.scope$ = undefined;
  }
}
