import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CmdaMember } from '../models/cmda-member.model';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CmdaMemberService {
  private apiUrl = 'http://localhost:8080/members'; // Base URL du backend

  constructor(private http: HttpClient) { }

  // Récupérer tous les membres
  getCmdaMembers(): Observable<CmdaMember[]> {
    return this.http.get<CmdaMember[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un membre par son ID
  getMemberById(id: number): Observable<CmdaMember> {
    return this.http.get<CmdaMember>(`${this.apiUrl}/${id}`);
  }


  // Ajouter un membre
  addCmdaMember(member: CmdaMember): Observable<CmdaMember> {
      return this.http.post<CmdaMember>(this.apiUrl + "/create", member);
  }

  // Mettre à jour un membre
  updateCmdaMember(member: CmdaMember): Observable<CmdaMember> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Récupérer le token
    });
    return this.http.put<CmdaMember>(`${this.apiUrl}/${member.id}`, member, { headers });
  }




  // Supprimer un membre
  // src/app/cmda-member/services/cmda-member.service.ts
  deleteCmdaMember(id: number): Observable<void> {
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token') // Récupérer le token
      });
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
  }



}
