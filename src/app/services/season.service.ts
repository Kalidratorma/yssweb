import {Injectable} from '@angular/core';
import {Season} from "../entities/season";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Season) {
    return this.http.post(`${environment.apiUrl}/season`, params);
  }

  getAll() {
    return this.http.get<Season[]>(`${environment.apiUrl}/season`);
  }

  getById(id: number) {
    return this.http.get<Season>(`${environment.apiUrl}/season/${id}`);
  }

  getByPlayerId(id: number) {
    return this.http.get<Season[]>(`${environment.apiUrl}/season/byPlayer/${id}`);
  }

  update(params: Season) {
    return this.http.put(`${environment.apiUrl}/season`, params);
  }

  delete(seasonId: number) {
    return this.http.delete(`${environment.apiUrl}/season/${seasonId}`);
  }
}
