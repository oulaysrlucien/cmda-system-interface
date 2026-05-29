import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Fraternity } from '../models/organization-unit.model';
import { CurrentUserScopeService } from './current-user-scope.service';

@Injectable({
  providedIn: 'root'
})
export class FraternityService {
  private readonly fraternitiesUrl = `${environment.apiBaseUrl}/fraternities`;

  constructor(
    private http: HttpClient,
    private currentUserScopeService: CurrentUserScopeService
  ) {}

  getAll(): Observable<Fraternity[]> {
    return this.http.get<Fraternity[]>(`${this.fraternitiesUrl}/all`);
  }

  getById(id: number): Observable<Fraternity> {
    return this.http.get<Fraternity>(`${this.fraternitiesUrl}/${id}`);
  }

  getByRegion(regionId: number): Observable<Fraternity[]> {
    return this.http.get<Fraternity[]>(`${this.fraternitiesUrl}/region/${regionId}`);
  }

  getCurrentUserFraternity(): Observable<Fraternity | null> {
    return this.currentUserScopeService.getScope().pipe(
      map(scope => scope.fraternity ? {
        id: scope.fraternity.id,
        name: scope.fraternity.name,
        description: scope.fraternity.description,
        regionId: scope.region?.id
      } : null)
    );
  }
}
