import {Injectable} from '@angular/core';
import {Training} from "../entities";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Training) {
    return this.http.post(`${environment.apiUrl}/training`, params);
  }

  getAll() {
    return this.http.get<Training[]>(`${environment.apiUrl}/training`);
  }

  getByTrainingId(trainingId: number) {
    return this.http.get<Training>(`${environment.apiUrl}/training/${trainingId}`);
  }

  update(params: Training) {
    return this.http.put(`${environment.apiUrl}/training`, params);
  }

  delete(trainingId: number) {
    return this.http.delete(`${environment.apiUrl}/training/${trainingId}`);
  }
}
