import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Actor, Category, Movie} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: |HttpClient) {
  }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/api/movie')
  }

  getById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`/api/movie/${id}`)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/admin/movie/${id}`)
  }

  create(name: string, year: number, about: string, category: Category, actors: any, image?: File): Observable<Movie> {
    const fd = new FormData();
    if (image) {
      fd.append("image", image, image.name);
    }
    fd.append("name", name);
    fd.append("year", ''+year);
    fd.append("about", about);
    fd.append("category", JSON.stringify(category));
    fd.append("actors", JSON.stringify(actors));
    console.log(actors);
    return this.http.post<Movie>(`/api/admin/movie`, fd)
  }

}
