import { Component, OnInit } from '@angular/core';
import {Category, User} from "../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {UsersService} from "../shared/services/users.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.users$ = this.userService.getAll();
  }

}
