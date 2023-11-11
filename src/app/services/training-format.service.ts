import {Injectable} from '@angular/core';
import {TrainingFormat} from "../entities";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrainingFormatService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: TrainingFormat) {
    return this.http.post(`${environment.apiUrl}/trainingFormat`, params);
  }

  getAll() {
    return this.http.get<TrainingFormat[]>(`${environment.apiUrl}/trainingFormat`);
  }

  getByTrainingFormatId(trainingFormatId: number) {
    return this.http.get<TrainingFormat>(`${environment.apiUrl}/trainingFormat/${trainingFormatId}`);
  }

  update(params: TrainingFormat) {
    return this.http.put(`${environment.apiUrl}/trainingFormat`, params);
  }

  delete(trainingFormatId: number) {
    return this.http.delete(`${environment.apiUrl}/trainingFormat/${trainingFormatId}`);
  }
}
