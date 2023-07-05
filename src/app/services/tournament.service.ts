import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Tournament} from "../entities/tournament";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Tournament) {
    return this.http.post(`${environment.apiUrl}/tournament`, params);
  }

  getAll() {
    return this.http.get<Tournament[]>(`${environment.apiUrl}/tournament`);
  }

  getById(id: number) {
    return this.http.get<Tournament>(`${environment.apiUrl}/tournament/${id}`);
  }

  update(params: Tournament) {
    return this.http.put(`${environment.apiUrl}/tournament`, params);
  }

  delete(tournamentId: number) {
    return this.http.delete(`${environment.apiUrl}/tournament/${tournamentId}`);
  }
}
