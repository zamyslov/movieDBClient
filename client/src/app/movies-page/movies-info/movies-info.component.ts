import {Component, OnInit} from '@angular/core';
import {Actor, Movie} from "../../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params} from "@angular/router";
import {MoviesService} from "../../shared/services/movies.service";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../shared/classes/material.service";
import {ActorsService} from "../../shared/services/actors.service";

@Component({
  selector: 'app-movies-info',
  templateUrl: './movies-info.component.html',
  styleUrls: ['./movies-info.component.css']
})
export class MoviesInfoComponent implements OnInit {
  movie: Movie;
  actors: Actor[] = [];

  constructor(private moviesService: MoviesService,
              private actorService: ActorsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              return this.moviesService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (movie: Movie) => {
          if (movie) {
            this.movie = movie;
            this.movie.list.forEach((obj) => this.actorService.getById('' + obj['id'])
              .subscribe((actor) => {
                this.actors.push(actor);
              }));
            this.movie.list = this.actors;
          }
        },
        error => MaterialService.toast(error.error.message)
      );
  }

}