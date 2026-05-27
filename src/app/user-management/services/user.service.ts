import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FraternityDTO } from '../models/fraternity.dto';
import { ProvinceDTO } from '../models/province.dto';
import { RegionDTO } from '../models/region.dto';
import { UserCreationDTO } from '../models/user-creation.dto';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/users`;
  private readonly provincesUrl = `${environment.apiBaseUrl}/provinces`;
  private readonly regionsUrl = `${environment.apiBaseUrl}/regions`;
  private readonly fraternitiesUrl = `${environment.apiBaseUrl}/fraternities`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.baseUrl).pipe(
      catchError(err => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
        return throwError(() => err);
      })
    );
  }

  createUser(user: UserCreationDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.baseUrl, user).pipe(
      catchError(err => {
        console.error('Erreur lors de la création de l\'utilisateur', err);
        return throwError(() => err);
      })
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  getProvinces(): Observable<ProvinceDTO[]> {
    return this.http.get<ProvinceDTO[]>(`${this.provincesUrl}/all`);
  }

  getRegions(): Observable<RegionDTO[]> {
    return this.http.get<RegionDTO[]>(`${this.regionsUrl}/all`);
  }

  getRegionsByProvince(provinceId: number): Observable<RegionDTO[]> {
    return this.http.get<RegionDTO[]>(`${this.regionsUrl}/province/${provinceId}`);
  }

  getFraternities(): Observable<FraternityDTO[]> {
    return this.http.get<FraternityDTO[]>(`${this.fraternitiesUrl}/all`);
  }

  getFraternitiesByRegion(regionId: number): Observable<FraternityDTO[]> {
    return this.http.get<FraternityDTO[]>(`${this.fraternitiesUrl}/region/${regionId}`);
  }
}
