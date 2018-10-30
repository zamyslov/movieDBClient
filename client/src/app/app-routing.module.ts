import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {MoviesPageComponent} from "./movies-page/movies-page.component";
import {ActorsPageComponent} from "./actors-page/actors-page.component";
import {AuthAdminGuard} from "./shared/classes/auth-admin.guard";
import {CategoriesPageComponent} from "./categories-page/categories-page.component";
import {UsersPageComponent} from "./users-page/users-page.component";
import {MoviesInfoComponent} from "./movies-page/movies-info/movies-info.component";
import {ActorsInfoComponent} from "./actors-page/actors-info/actors-info.component";
import {MoviesAddComponent} from "./movies-page/movies-add/movies-add.component";
import {ActorsListResolve} from "./shared/actors-list.resolve";
import {CategoriesListResolve} from "./shared/categories-list.resolve";
import {ActorsAddComponent} from "./actors-page/actors-add/actors-add.component";
import {UsersAddComponent} from "./users-page/users-add/users-add.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegisterPageComponent}
    ]
  },
  {
    path: 'admin', component: SiteLayoutComponent, canActivate: [AuthAdminGuard], children: [
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'categories/new', component: CategoriesPageComponent},
      {path: 'categories/:id', component: CategoriesPageComponent},
      {
        path: 'movies/new',
        component: MoviesAddComponent,
        resolve: {actors: ActorsListResolve, category: CategoriesListResolve}
      },
      {path: 'actors/new', component: ActorsAddComponent},
      {path: 'users', component: UsersPageComponent},
      {path: 'users/new', component: UsersAddComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent},
      {path: 'movies', component: MoviesPageComponent},
      {path: 'movies/:id', component: MoviesInfoComponent},
      {path: 'actors', component: ActorsPageComponent},
      {path: 'actors/:id', component: ActorsInfoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
