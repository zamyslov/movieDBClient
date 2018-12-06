import {Component, Input, OnInit} from '@angular/core';
import {Actor, Category, Movie, Vote} from "../../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MoviesService} from "../../shared/services/movies.service";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../shared/classes/material.service";
import {ActorsService} from "../../shared/services/actors.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {VotesService} from "../../shared/services/votes.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-movies-info',
  templateUrl: './movies-info.component.html',
  styleUrls: ['./movies-info.component.css']
})
export class MoviesInfoComponent implements OnInit {
  @Input() rate = 4;
  movie: Movie;
  actors: Actor[] = [];
  category: Category = {name: ''};
  vote: Vote;

  constructor(private moviesService: MoviesService,
              private actorsService: ActorsService,
              private categoriesService: CategoriesService,
              private voteService: VotesService,
              private authService: AuthService,
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
            this.voteService.getByMovieAndUserId(movie._id).subscribe((vote: Vote) => {
              if (vote) {
                this.vote = vote;
                this.rate = vote.mark;
              }
            });
            const array = this.movie.actors;
            this.categoriesService.getById('' + this.movie.category)
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

  createVote() {
    if (this.vote) {

    } else {
      console.log(this.rate);
      const vote: Vote = {
        movie: this.movie._id,
        user: this.authService.getUserId(),
        mark: +this.rate
      };
      console.log(vote);
      this.voteService.create(vote).subscribe(
        () => {
        },
        error => {
          MaterialService.toast(error.error.message);
        })
    }
  }

  updateMovie(movie_id: string) {
    this.router.navigate(['/admin/movies/new'], {
      queryParams: {
        id: movie_id
      }
    })
  }

}
