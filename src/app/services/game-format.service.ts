import { Injectable } from '@angular/core';
import {GameFormat} from "../entities/game-format";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameFormatService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: GameFormat) {
    return this.http.post(`${environment.apiUrl}/gameFormat`, params);
  }

  getAll() {
    return this.http.get<GameFormat[]>(`${environment.apiUrl}/gameFormat`);
  }

  getByGameFormatId(gameFormatId: number) {
    return this.http.get<GameFormat>(`${environment.apiUrl}/gameFormat/${gameFormatId}`);
  }

  update(params: GameFormat) {
    return this.http.put(`${environment.apiUrl}/gameFormat`, params);
  }

  delete(gameFormatId: number) {
    return this.http.delete(`${environment.apiUrl}/gameFormat/${gameFormatId}`);
  }
}
