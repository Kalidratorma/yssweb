import {Injectable} from '@angular/core';
import {Player} from "../entities/player";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Player) {
    return this.http.post(`${environment.apiUrl}/player`, params);
  }

  getAll() {
    return this.http.get<Player[]>(`${environment.apiUrl}/player`);
  }

  getById(id: number) {
    return this.http.get<Player>(`${environment.apiUrl}/player/${id}`);
  }

  getByParentId(id: number) {
    return this.http.get<Player[]>(`${environment.apiUrl}/player/byParent/${id}`);
  }

  update(params: Player) {
    return this.http.put(`${environment.apiUrl}/player`, params);
  }

  delete(playerId: number) {
    return this.http.delete(`${environment.apiUrl}/player/${playerId}`);
  }
}
