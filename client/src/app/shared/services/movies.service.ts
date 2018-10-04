import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Movie} from "../interfaces";
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

}
