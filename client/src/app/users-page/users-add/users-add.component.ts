import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {of} from "rxjs/internal/observable/of";
import {switchMap} from "rxjs/operators";
import {User} from "../../shared/interfaces";
import {UsersService} from "../../shared/services/users.service";
import {MaterialService} from "../../shared/classes/material.service";

declare var M;

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {
  form: FormGroup;
  user: User;
  isNew: boolean = true;
  changePassword: boolean = false;

  constructor(private userService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.userService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (user: User) => {
          if (user) {
            this.user = user;
            this.form.patchValue({
              name: this.user.name,
              login: this.user.login,
              password: this.user.password,
            });
            MaterialService.updateTextFields();
          }
        },
        error => MaterialService.toast(error.error.message)
      );
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, !this.isNew ? [] : [Validators.required, Validators.minLength(3)]),
      'newPassword': new FormControl(null, this.isNew ? [] : [Validators.required, Validators.minLength(3)]),
      'name': new FormControl(null, [Validators.required])
    });
  }

  onUpdateUserPassword() {
    this.changePassword = true;
    this.form.patchValue({
      newPassword: ''
    });
  }

  onSubmit() {
    let obs$;
    console.log(this.form);
    this.form.disable();
    if (this.isNew) {
      const user: User = {
        name: this.form.value['name'],
        login: this.form.value['login'],
        password: this.form.value['password'],
        isAdmin: false
      };
      obs$ = this.userService.create(user)
    } else {
      this.user.name = this.form.value['name'];
      this.user.login = this.form.value['login'];
      this.user.name = this.form.value['name'];
      if (this.changePassword) {
        this.user.password = this.form.value['newPassword'];
      }
      obs$ = this.userService.update(this.user);
    }

    obs$.subscribe(
      () => this.router.navigate(['/admin/users']),
      error => {
        MaterialService.toast(error.error.message);
      }
    );
    this.form.enable();
  }

}
