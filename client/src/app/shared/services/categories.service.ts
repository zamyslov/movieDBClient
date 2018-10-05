import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(`/api/category`, category)
  }

  update(category: Category): Observable<Category> {
    return this.http.patch<Category>(`/api/category/${category._id}`, category)
  }

  delete(category: Category): Observable<Category> {
    return this.http.delete<Category>(`/api/category/${category._id}`)
  }

}
