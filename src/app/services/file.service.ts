import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ContentFile} from "../entities";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private static readonly BASE_PATH: string = environment.apiUrl + "/file";

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  uploadFile(params: FormData): Observable<HttpEvent<ContentFile[]>> {
    return this.http.post<ContentFile[]>(FileService.BASE_PATH, params, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getAll() {
    return this.http.get<ContentFile[]>(FileService.BASE_PATH);
  }

  delete(id: number) {
    return this.http.delete(`${FileService.BASE_PATH}/${id}`);
  }
}
