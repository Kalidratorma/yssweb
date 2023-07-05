import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Club} from "../entities/club";

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Club) {
    return this.http.post(`${environment.apiUrl}/club`, params);
  }

  getAll() {
    return this.http.get<Club[]>(`${environment.apiUrl}/club`);
  }

  getById(id: number) {
    return this.http.get<Club>(`${environment.apiUrl}/club/${id}`);
  }

  update(params: Club) {
    return this.http.put(`${environment.apiUrl}/club`, params);
  }

  delete(clubId: number) {
    return this.http.delete(`${environment.apiUrl}/club/${clubId}`);
  }
}
