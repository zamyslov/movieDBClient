import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {ActorsService} from "./services/actors.service";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class ActorsListResolve implements Resolve<Observable<any>> {
  constructor(private actorService: ActorsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.actorService.getAll();
  }
}
