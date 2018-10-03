import {Injectable} from '@angular/core'
import {User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import decode from 'jwt-decode';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private token = null;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  setToken(token: String) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isAdmin(): boolean {
    if (this.isAuthenticated()) {
      const tokenPayload = decode(this.token);
      return tokenPayload.isAdmin;
    }
    return false;
  }

  logout() {
    this.token = null;
    localStorage.clear();
  }

}
