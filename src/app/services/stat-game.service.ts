import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {StatGame} from "../entities";

@Injectable({
  providedIn: 'root'
})
export class StatGameService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: StatGame) {
    return this.http.post(`${environment.apiUrl}/statGame`, params);
  }

  getAll() {
    return this.http.get<StatGame[]>(`${environment.apiUrl}/statGame`);
  }

  getById(id: number) {
    return this.http.get<StatGame>(`${environment.apiUrl}/statGame/${id}`);
  }

  getByGameId(id: number) {
    return this.http.get<StatGame>(`${environment.apiUrl}/statGame/byGame/${id}`);
  }

  update(params: StatGame) {
    return this.http.put(`${environment.apiUrl}/statGame`, params);
  }

  delete(statGameId: number) {
    return this.http.delete(`${environment.apiUrl}/statGame/${statGameId}`);
  }
}
