import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Province } from '../models/organization-unit.model';
import { CurrentUserScopeService } from './current-user-scope.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private readonly provincesUrl = `${environment.apiBaseUrl}/provinces`;

  constructor(
    private http: HttpClient,
    private currentUserScopeService: CurrentUserScopeService
  ) {}

  getAll(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.provincesUrl}/all`);
  }

  getById(id: number): Observable<Province> {
    return this.http.get<Province>(`${this.provincesUrl}/${id}`);
  }

  getCurrentUserProvince(): Observable<Province | null> {
    return this.currentUserScopeService.getScope().pipe(
      map(scope => scope.province ? {
        id: scope.province.id,
        name: scope.province.name,
        description: scope.province.description
      } : null)
    );
  }
}
