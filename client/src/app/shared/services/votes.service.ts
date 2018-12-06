import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Vote} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getByMovieId(id: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`/api/vote/movie/${id}`)
  }

  getAverageMarkByMovieId(id: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`/api/vote/movie/${id}`);
  }

  getByMovieAndUserId(id: string): Observable<Vote> {
    return this.http.get<Vote>(`/api/vote/user/movie/${id}`, {
      params: new HttpParams({
        fromObject: {userId: this.authService.getUserId()}
      })
    });
  }

  create(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(`/api/vote`, vote)
  }

  update(vote: Vote): Observable<Vote> {
    return this.http.patch<Vote>(`/api/vote/${vote._id}`, vote)
  }

  delete(id: string): Observable<Vote> {
    return this.http.delete<Vote>(`/api/vote/${id}`)
  }

}
