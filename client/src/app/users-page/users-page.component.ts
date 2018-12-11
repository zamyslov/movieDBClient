import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../shared/interfaces";
import {UsersService} from "../shared/services/users.service";
import {MaterialService} from "../shared/classes/material.service";

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

  onDeleteUser(user: User) {
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
      );
    }
  }

  onUpdateUser(user_id: string) {
    this.router.navigate(['/admin/users/new'], {
      queryParams: {
        id: user_id
      }
    })
  }

  onAddUser() {
    this.router.navigate(['/admin/users/new']);
  }

}
