import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {Actor, Category, Movie, Vote} from "../../shared/interfaces";
import {MoviesService} from "../../shared/services/movies.service";
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
  @Input() movieRate = 0;
  @Input() userRate = 0;
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
                this.userRate = vote.mark;
              }
            });
            this.voteService.getAverageMarkByMovieId(movie._id)
              .subscribe((votes: Vote[]) => {
                  this.movieRate = votes.reduce((a, b) => a + b.mark, 0) / votes.length;
                }
              );
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
      this.vote.mark = +this.userRate;
      this.voteService.update(this.vote).subscribe(
        () => {
        },
        error => {
          MaterialService.toast(error.error.message);
        })
    } else {
      this.vote = {
        movie: this.movie._id,
        user: this.authService.getUserId(),
        mark: +this.userRate
      };
      this.voteService.create(this.vote).subscribe(
        () => {
        },
        error => {
          MaterialService.toast(error.error.message);
        })
    }
  }

  changeVote() {
    this.vote.mark = 0;
    this.userRate = 0;
  }

  updateMovie(movie_id: string) {
    this.router.navigate(['/admin/movies/new'], {
      queryParams: {
        id: movie_id
      }
    })
  }

}
