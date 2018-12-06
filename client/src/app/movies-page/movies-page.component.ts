import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../shared/services/movies.service";
import {Movie, Vote} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {VotesService} from "../shared/services/votes.service";

const STEP = 1;

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  isAdmin: boolean;
  movies: Movie[];
  pages = [];
  currentPage = 1;
  loadedWithVotes = false;

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

  getAll() {
    const params = {
      offset: (this.currentPage - 1) * STEP,
      limit: STEP
    };
    this.moviesService.getAll(params).subscribe(res => {
        this.movies = res.movie;
        this.pages = new Array(Math.ceil(res.count / STEP));
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
}
