import {Injectable} from '@angular/core';
import {Contract} from "../entities/contract";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  create(params: Contract) {
    return this.http.post(`${environment.apiUrl}/contract`, params);
  }

  getAll() {
    return this.http.get<Contract[]>(`${environment.apiUrl}/contract`);
  }

  getById(id: number) {
    return this.http.get<Contract>(`${environment.apiUrl}/contract/${id}`);
  }

  getByPlayerId(id: number) {
    return this.http.get<Contract[]>(`${environment.apiUrl}/contract/byPlayer/${id}`);
  }

  getByParentId(id: number) {
    return this.http.get<Contract[]>(`${environment.apiUrl}/contract/byParent/${id}`);
  }

  update(params: Contract) {
    return this.http.put(`${environment.apiUrl}/contract`, params);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/contract/${id}`);
  }
}
