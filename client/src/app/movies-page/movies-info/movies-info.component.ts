import {Component, OnInit} from '@angular/core';
import {Actor, Category, Movie} from "../../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MoviesService} from "../../shared/services/movies.service";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../shared/classes/material.service";
import {ActorsService} from "../../shared/services/actors.service";
import {CategoriesService} from "../../shared/services/categories.service";

@Component({
  selector: 'app-movies-info',
  templateUrl: './movies-info.component.html',
  styleUrls: ['./movies-info.component.css']
})
export class MoviesInfoComponent implements OnInit {
  movie: Movie;
  actors: Actor[] = [];
  category: Category = {name: ''};

  constructor(private moviesService: MoviesService,
              private actorsService: ActorsService,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router) {
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
      .subscribe((movie: Movie) => {
          if (movie) {
            this.movie = movie;
            const array = this.movie.actors;
            console.log(this.movie.category);
            this.categoriesService.getById(''+this.movie.category)
              .subscribe((category: Category) => this.category = category);
            this.movie.actors = [];
            array.forEach((id: string) => this.actorsService.getById(id)
              .subscribe((actor: Actor) => {
                this.movie.actors.push(actor);
              }));
          }
        },
        error => MaterialService.toast(error.error.message)
      );
  }

  deleteMovie(movie_id: string) {
    this.moviesService.delete(movie_id).subscribe(
      () => this.router.navigate(['/movies']),
      error => {
        MaterialService.toast(error.error.message);
      }
    );
  }

  updateMovie(movie_id: string) {
    this.router.navigate(['/admin/movies/new'], {
      queryParams: {
        id: movie_id
      }
    })
  }

}
