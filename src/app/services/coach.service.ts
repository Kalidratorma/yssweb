import {Injectable} from '@angular/core';
import {Coach} from "../entities/coach";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Coach) {
    return this.http.post(`${environment.apiUrl}/coach`, params);
  }

  getAll() {
    return this.http.get<Coach[]>(`${environment.apiUrl}/coach`);
  }

  getById(id: number) {
    return this.http.get<Coach>(`${environment.apiUrl}/coach/${id}`);
  }

  update(params: Coach) {
    return this.http.put(`${environment.apiUrl}/coach`, params);
  }

  delete(coachId: number) {
    return this.http.delete(`${environment.apiUrl}/coach/${coachId}`);
  }
}
