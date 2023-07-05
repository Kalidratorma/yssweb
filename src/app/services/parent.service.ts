import {Injectable} from '@angular/core';
import {Parent} from "../entities/parent";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Parent) {
    return this.http.post(`${environment.apiUrl}/parent`, params);
  }

  getAll() {
    return this.http.get<Parent[]>(`${environment.apiUrl}/parent`);
  }

  getById(id: number) {
    return this.http.get<Parent>(`${environment.apiUrl}/parent/${id}`);
  }

  getByPlayerId(id: number) {
    return this.http.get<Parent[]>(`${environment.apiUrl}/parent/byPlayer/${id}`);
  }

  update(params: Parent) {
    return this.http.put(`${environment.apiUrl}/parent`, params);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/parent/${id}`);
  }
}
