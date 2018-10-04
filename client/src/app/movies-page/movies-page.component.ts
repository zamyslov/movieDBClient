import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../shared/services/movies.service";

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
  }

}
