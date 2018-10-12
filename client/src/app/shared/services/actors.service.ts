import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Actor} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>('/api/actor')
  }

  getById(id: string): Observable<Actor> {
    return this.http.get<Actor>(`/api/actor/${id}`)
  }
}
