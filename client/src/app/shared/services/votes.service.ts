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

  getAverageMarkByMovieId(id: string): number {
    const obj = this.http.get<Vote[]>(`/api/vote/movie/${id}`);
    let average = 0;
    obj.subscribe((votes: Vote[]) => {
        average = votes.reduce((a, b) => a + b.mark, 0) / votes.length;
      }
    );
    return average;
  }

  getByMovieAndUserId(id: string): number {
    const obj = this.http.get<Vote>(`/api/vote/user/movie/${id}`, {
      params: new HttpParams({
        fromObject: {userId: this.authService.getUserId()}
      })
    });
    let mark = 0;
    obj.subscribe((vote: Vote) => {
        mark = vote.mark;
      }
    );
    return mark;
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
