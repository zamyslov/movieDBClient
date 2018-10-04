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

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegisterPageComponent}
    ]},
  {path: 'admin', component: SiteLayoutComponent, canActivate: [AuthAdminGuard], children: [
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'users', component: UsersPageComponent}
    ]},
  {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent},
      {path: 'movies', component: MoviesPageComponent},
      {path: 'actors', component: ActorsPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
