import {Component, OnInit} from '@angular/core';
import {User} from "../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {UsersService} from "../shared/services/users.service";
import {MaterialService} from "../shared/classes/material.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.users$ = this.userService.getAll();
  }

  deleteUser(user: User) {
    console.log(user.name);
    console.log(user.name === 'User');
    if (user.login === 'User' || user.login === 'Admin') {
      MaterialService.toast('Этого пользователя нельзя удалить!');
    } else {
      this.userService.delete(user._id).subscribe(
        () => this.users$ = this.userService.getAll(),
        error => {
          MaterialService.toast(error.error.message);
        }
      )
      ;
    }
  }


}
