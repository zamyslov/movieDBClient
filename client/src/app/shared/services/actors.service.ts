import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Actor, Category, Movie} from "../interfaces";
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

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/admin/actor/${id}`)
  }

  create(name: string, surname: string, year: number, image?: File): Observable<Actor> {
    const fd = new FormData();
    if (image) {
      fd.append("image", image, image.name);
    }
    fd.append("name", name);
    fd.append("surname", surname);
    fd.append("year", ''+year);
    return this.http.post<Actor>(`/api/admin/actor`, fd)
  }
}
