import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {StatFieldPlayer} from "../entities";

@Injectable({
  providedIn: 'root'
})
export class StatFieldPlayerService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: StatFieldPlayer) {
    return this.http.post(`${environment.apiUrl}/statFieldPlayer`, params);
  }

  getAll() {
    return this.http.get<StatFieldPlayer[]>(`${environment.apiUrl}/statFieldPlayer`);
  }

  getById(id: number) {
    return this.http.get<StatFieldPlayer>(`${environment.apiUrl}/statFieldPlayer/${id}`);
  }

  getAllByPlayerId(id: number) {
    return this.http.get<StatFieldPlayer[]>(`${environment.apiUrl}/statFieldPlayer/byPlayer/${id}`);
  }

  getAllByGameId(id: number) {
    return this.http.get<StatFieldPlayer[]>(`${environment.apiUrl}/statFieldPlayer/byGame/${id}`);
  }

  getAllByGameIdAndPlayerId(gameId: number, playerId: number) {
    return this.http.get<StatFieldPlayer>(
      `${environment.apiUrl}/statFieldPlayer/byGame/${gameId}/byPlayer/${playerId}`);
  }

  update(params: StatFieldPlayer) {
    return this.http.put(`${environment.apiUrl}/statFieldPlayer`, params);
  }

  delete(statFieldPlayerId: number) {
    return this.http.delete(`${environment.apiUrl}/statFieldPlayer/${statFieldPlayerId}`);
  }
}
