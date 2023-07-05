import {Injectable} from '@angular/core';
import {ClubTeam} from "../entities/club-team";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClubTeamService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: ClubTeam) {
    return this.http.post(`${environment.apiUrl}/clubTeam`, params);
  }

  getAll() {
    return this.http.get<ClubTeam[]>(`${environment.apiUrl}/clubTeam`);
  }

  getById(id: number) {
    return this.http.get<ClubTeam>(`${environment.apiUrl}/clubTeam/${id}`);
  }

  update(params: ClubTeam) {
    return this.http.put(`${environment.apiUrl}/clubTeam`, params);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/clubTeam/${id}`);
  }
}
