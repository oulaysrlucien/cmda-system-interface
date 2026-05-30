import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Fraternity, FraternityPayload } from '../models/organization-unit.model';
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

  getArchived(): Observable<Fraternity[]> {
    return this.http.get<Fraternity[]>(`${this.fraternitiesUrl}/archived`);
  }

  create(payload: FraternityPayload): Observable<Fraternity> {
    return this.http.post<Fraternity>(`${this.fraternitiesUrl}/create`, payload);
  }

  update(id: number, payload: FraternityPayload): Observable<Fraternity> {
    return this.http.put<Fraternity>(`${this.fraternitiesUrl}/update/${id}`, payload);
  }

  archive(id: number): Observable<Fraternity> {
    return this.http.patch<Fraternity>(`${this.fraternitiesUrl}/${id}/archive`, {});
  }

  restore(id: number): Observable<Fraternity> {
    return this.http.patch<Fraternity>(`${this.fraternitiesUrl}/${id}/restore`, {});
  }

  getCurrentUserRegionFraternities(): Observable<Fraternity[]> {
    return this.http.get<Fraternity[]>(`${environment.apiBaseUrl}/api/me/region/fraternities`);
  }

  getScopedRegionFraternities(regionId: number): Observable<Fraternity[]> {
    return this.http.get<Fraternity[]>(`${environment.apiBaseUrl}/api/me/regions/${regionId}/fraternities`);
  }

  getCurrentUserFraternityDetails(): Observable<Fraternity> {
    return this.http.get<Fraternity>(`${environment.apiBaseUrl}/api/me/fraternity`);
  }

  getScopedFraternity(fraternityId: number): Observable<Fraternity> {
    return this.http.get<Fraternity>(`${environment.apiBaseUrl}/api/me/fraternities/${fraternityId}`);
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
