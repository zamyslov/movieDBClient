import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../shared/services/movies.service";
import {Observable} from "rxjs/internal/Observable";
import {Movie} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

const STEP = 2;

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  movies$: Observable<Movie[]>;
  isAdmin: boolean;
  offset = 0;
  limit = STEP;
  movies: Movie[];
  pages = [];

  constructor(private moviesService: MoviesService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAll();

    this.isAdmin = this.authService.isAdmin();
  }

  getAll() {
    const params = {
      offset: this.offset,
      limit: this.limit
    };
    this.moviesService.getAll(params).subscribe(res => {
        this.movies = res.movie;
        this.pages = new Array(Math.ceil(res.count/STEP));
      }
    );
  }

  nextPage() {
    this.offset += this.limit;
    this.getAll();
  }

  onAddMovie() {
    this.router.navigate(['/admin/movies/new']);
  }

}
