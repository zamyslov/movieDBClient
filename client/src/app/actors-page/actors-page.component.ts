import {Component, OnInit} from '@angular/core';
import {Actor} from "../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {AuthService} from "../shared/services/auth.service";
import {ActorsService} from "../shared/services/actors.service";

@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.css']
})
export class ActorsPageComponent implements OnInit {
  actors$: Observable<Actor[]>;
  isAdmin: boolean;

  constructor(private actorsService: ActorsService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.actors$ = this.actorsService.getAll();
    this.isAdmin = this.authService.isAdmin();
  }

}
