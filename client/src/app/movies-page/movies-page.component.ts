import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Movie, Vote} from "../shared/interfaces";
import {MoviesService} from "../shared/services/movies.service";
import {AuthService} from "../shared/services/auth.service";
import {VotesService} from "../shared/services/votes.service";
import {MaterialService} from "../shared/classes/material.service";


@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit, AfterViewInit {
  isAdmin: boolean;
  movies: Movie[];
  pages = [];
  currentPage = 1;
  loadedWithVotes = false;
  @ViewChild('selectMoviesView') selectMoviesViewRef: ElementRef;
  views = ['Плитка', 'Таблица'];
  currentMoviesView = 'Список';
  step = 1;

  constructor(private moviesService: MoviesService,
              private authService: AuthService,
              private voteService: VotesService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAll();
    this.currentPage = 1;
    this.isAdmin = this.authService.isAdmin();
  }

  ngAfterViewInit() {
    MaterialService.initializeMultiSelect(this.selectMoviesViewRef);
  }


  getAll() {
    const params = {
      offset: (this.currentPage - 1) * this.step,
      limit: this.step
    };
    this.moviesService.getAll(params).subscribe(res => {
        this.movies = res.movie;
        this.pages = new Array(Math.ceil(res.count / this.step));
        this.loadedWithVotes = false;
        this.movies.forEach((e) => {
          this.voteService.getAverageMarkByMovieId(e._id)
            .subscribe((votes: Vote[]) => {
                e.mark = votes.reduce((a, b) => a + b.mark, 0) / votes.length;
                this.loadedWithVotes = true;
              }
            );
        });
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage += 1;
      this.getAll();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getAll();
    }
  }

  Page(index: number) {
    this.currentPage = index;
    this.getAll();
  }

  onAddMovie() {
    this.router.navigate(['/admin/movies/new']);
  }

  onMoviesViewChange() {
    this.loadedWithVotes = false;
    this.currentPage = 1;
    if (this.currentMoviesView == "Таблица") {
      this.step = 20;
    } else {
      this.step = 1;
    }
    this.getAll();
  }


}
