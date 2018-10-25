import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/admin/user')
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`/api/admin/user/${id}`)
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`/api/admin/user`, user)
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`/api/admin/user/${user._id}`, user)
  }

  delete(user: User): Observable<User> {
    return this.http.delete<User>(`/api/admin/user/${user._id}`)
  }

}
