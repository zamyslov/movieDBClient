import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";
import {of} from "rxjs/internal/observable/of";
import {switchMap} from "rxjs/operators";
import {UsersService} from "../../shared/services/users.service";
import {User} from "../../shared/interfaces";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {
  form: FormGroup;
  user: User;
  isNew: boolean = true;

  constructor(private userService: UsersService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            console.log(params);
            if (params['id']) {
              this.isNew = false;
              console.log(this.isNew);
              return this.userService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (user: User) => {
          if (user) {
            console.log(this.user);
            this.user = user;
            this.form.patchValue({
              name: this.user.name,
              login: this.user.login,
            });
          }
        },
        error => MaterialService.toast(error.error.message)
      );
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'name': new FormControl(null, [Validators.required])
    });
  }

}
