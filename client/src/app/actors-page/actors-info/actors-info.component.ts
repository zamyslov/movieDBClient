import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Actor, Movie} from "../../shared/interfaces";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../shared/classes/material.service";
import {switchMap} from "rxjs/operators";
import {ActorsService} from "../../shared/services/actors.service";

@Component({
  selector: 'app-actors-info',
  templateUrl: './actors-info.component.html',
  styleUrls: ['./actors-info.component.css']
})
export class ActorsInfoComponent implements OnInit {
  actor: Actor;

  constructor( private actorService: ActorsService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              return this.actorService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (actor: Actor) => {
          if (actor) {
            this.actor = actor;
          }
        },
        error => MaterialService.toast(error.error.message)
      );
  }

}
