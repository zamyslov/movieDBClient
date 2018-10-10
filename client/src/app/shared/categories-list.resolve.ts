import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {CategoriesService} from "./services/categories.service";

@Injectable()
export class CategoriesListResolve implements Resolve<Observable<any>> {
  constructor(private categoriesService: CategoriesService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.categoriesService.getAll();
  }
}
