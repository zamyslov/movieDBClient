import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Actor} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) {
  }

  getAll(params: any = {}): Observable<any> {
    return this.http.get<Actor[]>('/api/actor',
      {
        params: new HttpParams({fromObject: params})
      })
  }

  getById(id: string): Observable<Actor> {
    return this.http.get<Actor>(`/api/actor/${id}`)
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`/api/admin/actor/${id}`)
  }

  static receiveFormData(name: string, surname: string, year: number, image?: File): FormData {
    const fd = new FormData();
    if (image) {
      fd.append("image", image, image.name);
    }
    fd.append("name", name);
    fd.append("surname", surname);
    fd.append("year", '' + year);
    return fd;
  }

  create(name: string, surname: string, year: number, image?: File): Observable<Actor> {
    const fd = ActorsService.receiveFormData(name, surname, year, image);
    return this.http.post<Actor>(`/api/admin/actor`, fd)
  }

  update(id: string, name: string, surname: string, year: number, image?: File): Observable<Actor> {
    const fd = ActorsService.receiveFormData(name, surname, year, image);
    return this.http.patch<Actor>(`/api/admin/actor/${id}`, fd)
  }
}
