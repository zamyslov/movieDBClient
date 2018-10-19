import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../../shared/classes/material.service";
import {of} from "rxjs/internal/observable/of";
import {switchMap} from "rxjs/operators";
import {Actor, Movie} from "../../shared/interfaces";
import {ActorsService} from "../../shared/services/actors.service";
import {MoviesService} from "../../shared/services/movies.service";

@Component({
  selector: 'app-actors-info',
  templateUrl: './actors-info.component.html',
  styleUrls: ['./actors-info.component.css']
})
export class ActorsInfoComponent implements OnInit {
  actor: Actor;
  actorsMoviesArray: Movie[] = [];

  constructor(private actorService: ActorsService,
              private movieService: MoviesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

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
            this.movieService.getByActorId(this.actor._id)
              .subscribe((movies: Movie[]) => {
                this.actorsMoviesArray = movies;
              })
          }
        },
        error => MaterialService.toast(error.error.message)
      );
  }

  deleteActor(id: string) {
    this.actorService.delete(id).subscribe(
      () => this.router.navigate(['/actors']),
      error => {
        MaterialService.toast(error.error.message);
      }
    );
  }

  updateActor(actor_id: string) {
    this.router.navigate(['/admin/actors/new'], {
      queryParams: {
        id: actor_id
      }
    })
  }

}
