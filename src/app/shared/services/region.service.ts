import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Region, RegionPayload } from '../models/organization-unit.model';
import { CurrentUserScopeService } from './current-user-scope.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private readonly regionsUrl = `${environment.apiBaseUrl}/regions`;

  constructor(
    private http: HttpClient,
    private currentUserScopeService: CurrentUserScopeService
  ) {}

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.regionsUrl}/all`);
  }

  getById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.regionsUrl}/${id}`);
  }

  getByProvince(provinceId: number): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.regionsUrl}/province/${provinceId}`);
  }

  getArchived(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.regionsUrl}/archived`);
  }

  create(payload: RegionPayload): Observable<Region> {
    return this.http.post<Region>(`${this.regionsUrl}/create`, payload);
  }

  update(id: number, payload: RegionPayload): Observable<Region> {
    return this.http.put<Region>(`${this.regionsUrl}/update/${id}`, payload);
  }

  archive(id: number): Observable<Region> {
    return this.http.patch<Region>(`${this.regionsUrl}/${id}/archive`, {});
  }

  restore(id: number): Observable<Region> {
    return this.http.patch<Region>(`${this.regionsUrl}/${id}/restore`, {});
  }

  getCurrentUserProvinceRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${environment.apiBaseUrl}/api/me/province/regions`);
  }

  getCurrentUserRegion(): Observable<Region | null> {
    return this.currentUserScopeService.getScope().pipe(
      map(scope => scope.region ? {
        id: scope.region.id,
        name: scope.region.name,
        description: scope.region.description,
        provinceId: scope.province?.id
      } : null)
    );
  }
}
