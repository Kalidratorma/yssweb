import {Injectable} from '@angular/core';
import {TeamYear} from "../entities/team-year";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeamYearService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: TeamYear) {
    return this.http.post(`${environment.apiUrl}/teamYear`, params);
  }

  getAll() {
    return this.http.get<TeamYear[]>(`${environment.apiUrl}/teamYear`);
  }

  getById(id: number) {
    return this.http.get<TeamYear>(`${environment.apiUrl}/teamYear/${id}`);
  }

  getByPlayerId(id: number) {
    return this.http.get<TeamYear[]>(`${environment.apiUrl}/teamYear/byPlayer/${id}`);
  }

  update(params: TeamYear) {
    return this.http.put(`${environment.apiUrl}/teamYear`, params);
  }

  delete(teamYearId: number) {
    return this.http.delete(`${environment.apiUrl}/teamYear/${teamYearId}`);
  }
}
