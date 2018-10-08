import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../shared/services/movies.service";
import {Observable} from "rxjs/internal/Observable";
import {Movie} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  movies$: Observable<Movie[]>;
  isAdmin: boolean

  constructor(private moviesService: MoviesService,
              private authService: AuthService) { }

  ngOnInit() {
    this.movies$ = this.moviesService.getAll();
    this.isAdmin = this.authService.isAdmin();
  }

}
