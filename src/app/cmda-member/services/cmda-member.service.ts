import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CmdaMember } from '../models/cmda-member.model';
import { PageResponse } from '../models/page-response.model';

export interface MemberSearchParams {
  keyword?: string;
  fraternityId?: number;
  regionId?: number;
  provinceId?: number;
  firstName?: string;
  lastName?: string;
  profession?: string;
  status?: string;
  page?: number;
  size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CmdaMemberService {
  private readonly apiUrl = `${environment.apiBaseUrl}/members`;

  constructor(private http: HttpClient) {}

  getCmdaMembers(): Observable<CmdaMember[]> {
    return this.getAllMembersForAdmin();
  }

  getAllMembersForAdmin(): Observable<CmdaMember[]> {
    return this.http.get<CmdaMember[]>(`${this.apiUrl}/all`);
  }

  getMembersForCurrentUser(page = 0, size = 10): Observable<PageResponse<CmdaMember>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<CmdaMember>>(this.apiUrl, { params });
  }

  searchMembers(searchParams: MemberSearchParams): Observable<PageResponse<CmdaMember>> {
    let params = new HttpParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.http.get<PageResponse<CmdaMember>>(`${this.apiUrl}/search`, { params });
  }

  getMemberById(id: number): Observable<CmdaMember> {
    return this.http.get<CmdaMember>(`${this.apiUrl}/${id}`);
  }

  addCmdaMember(member: CmdaMember): Observable<CmdaMember> {
    return this.http.post<CmdaMember>(`${this.apiUrl}/create`, member);
  }

  updateCmdaMember(member: CmdaMember): Observable<CmdaMember> {
    return this.http.put<CmdaMember>(`${this.apiUrl}/update/${member.id}`, member);
  }

  updateMemberStatus(id: number, status: string): Observable<CmdaMember> {
    return this.http.patch<CmdaMember>(`${this.apiUrl}/${id}/status`, { status });
  }

  archiveMember(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/archive`, null);
  }

  restoreMember(id: number): Observable<CmdaMember> {
    return this.http.patch<CmdaMember>(`${this.apiUrl}/${id}/restore`, null);
  }

  deleteCmdaMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
