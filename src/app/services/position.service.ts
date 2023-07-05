import {Injectable} from '@angular/core';
import {Position} from "../entities/position";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Position) {
    return this.http.post(`${environment.apiUrl}/position`, params);
  }

  getAll() {
    return this.http.get<Position[]>(`${environment.apiUrl}/position`);
  }

  getById(id: number) {
    return this.http.get<Position>(`${environment.apiUrl}/position/${id}`);
  }

  getByPlayerId(id: number) {
    return this.http.get<Position[]>(`${environment.apiUrl}/position/byPlayer/${id}`);
  }

  update(params: Position) {
    return this.http.put(`${environment.apiUrl}/position`, params);
  }

  delete(positionId: number) {
    return this.http.delete(`${environment.apiUrl}/position/${positionId}`);
  }
}
