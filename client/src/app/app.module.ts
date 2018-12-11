import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BarRatingModule} from "ngx-bar-rating";

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {MoviesPageComponent} from './movies-page/movies-page.component';
import {ActorsPageComponent} from './actors-page/actors-page.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {UsersPageComponent} from './users-page/users-page.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {MoviesInfoComponent} from './movies-page/movies-info/movies-info.component';
import {ActorsInfoComponent} from './actors-page/actors-info/actors-info.component';
import {MoviesAddComponent} from './movies-page/movies-add/movies-add.component';
import {ActorsListResolve} from "./shared/actors-list.resolve";
import {CategoriesListResolve} from "./shared/categories-list.resolve";
import {ActorsAddComponent} from './actors-page/actors-add/actors-add.component';
import {UsersAddComponent} from './users-page/users-add/users-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    MoviesPageComponent,
    ActorsPageComponent,
    CategoriesPageComponent,
    UsersPageComponent,
    LoaderComponent,
    MoviesInfoComponent,
    ActorsInfoComponent,
    MoviesAddComponent,
    ActorsAddComponent,
    UsersAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BarRatingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }, ActorsListResolve, CategoriesListResolve],
  bootstrap: [AppComponent]
})
export class AppModule {
}
