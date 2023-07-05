import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Game} from "../entities/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Game) {
    return this.http.post(`${environment.apiUrl}/game`, params);
  }

  getAll() {
    return this.http.get<Game[]>(`${environment.apiUrl}/game`);
  }

  getById(id: number) {
    return this.http.get<Game>(`${environment.apiUrl}/game/${id}`);
  }

  update(params: Game) {
    return this.http.put(`${environment.apiUrl}/game`, params);
  }

  delete(gameId: number) {
    return this.http.delete(`${environment.apiUrl}/game/${gameId}`);
  }
}
