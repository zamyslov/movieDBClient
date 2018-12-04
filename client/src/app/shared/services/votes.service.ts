import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Vote} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private http: HttpClient) {
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

  getByMovieAndUserId(id: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`/api/vote/user/movie/${id}`)
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
