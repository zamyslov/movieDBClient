import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../shared/services/movies.service";
import {Movie} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

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
  limit = STEP;
  rate = 3.5;

  constructor(private moviesService: MoviesService,
              private authService: AuthService,
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
      limit: this.limit
    };
    this.moviesService.getAll(params).subscribe(res => {
        this.movies = res.movie;
        this.pages = new Array(Math.ceil(res.count / STEP));
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

  ratingComponentClick(clickObj: any): void {
    // const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    // if (!!item) {
    //   item.rating = clickObj.rating;
    //   this.ratingClicked = clickObj.rating;
    //   this.itemIdRatingClicked = item.company;
    // }

  }
}
