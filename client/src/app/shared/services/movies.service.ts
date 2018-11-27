import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Category, Movie} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {
  }

  getAll(params: any = {}): Observable<any> {
    return this.http.get<Movie[]>('/api/movie',
      {
        params: new HttpParams({fromObject: params})
      })
  }

  getById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`/api/movie/${id}`)
  }

  getByActorId(id: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`/api/movie/actor/${id}`)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/admin/movie/${id}`)
  }

  static receiveFormData(name: string, year: number, about: string, category: Category, actors: any, image?: File): FormData {
    const fd = new FormData();
    if (image) {
      fd.append("image", image, image.name);
    }
    fd.append("name", name);
    fd.append("year", '' + year);
    fd.append("about", about);
    fd.append("category", JSON.stringify(category));
    fd.append("actors", JSON.stringify(actors));
    return fd;
  }

  create(name: string, year: number, about: string, category: Category, actors: any, image?: File): Observable<Movie> {
    const fd = MoviesService.receiveFormData(name, year, about, category, actors, image);
    return this.http.post<Movie>(`/api/admin/movie`, fd)
  }

  update(id: string, name: string, year: number, about: string, category: Category, actors: any, image?: File): Observable<Movie> {
    const fd = MoviesService.receiveFormData(name, year, about, category, actors, image);
    return this.http.patch<Movie>(`/api/admin/movie/${id}`, fd)
  }

}
