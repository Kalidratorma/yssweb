import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../entities/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/auth/enter`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/user`);
  }

  getByUsername(username: string) {
    return this.http.get<User>(`${environment.apiUrl}/user/${username}`);
  }

  update(username: string, params: any) {
    return this.http.put(`${environment.apiUrl}/user`, params)
      .pipe(map(x => {
        // update stored user if the logged-in user updated their own record
        if (username == this.userValue?.username) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(username: string) {
    return this.http.delete(`${environment.apiUrl}/user/${username}`)
      .pipe(map(x => {
        // auto logout if the logged-in user deleted their own record
        if (username == this.userValue?.username) {
          this.logout();
        }
        return x;
      }));
  }
}
