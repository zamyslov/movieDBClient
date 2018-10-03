import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь можете зайти в систему');
      } else if (params['accessDenied']) {
        MaterialService.toast('Авторизируйтесь в системе');
      } else if (params['sessionFailed']) {
        MaterialService.toast('Заново авторизируйтесь в системе');
      }
    })
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )
  }
}
