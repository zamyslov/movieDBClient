import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MaterialService} from "../../classes/material.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/movies', name: 'Фильмы'},
    {url: '/actors', name: 'Актеры'},
    {url: '/ratings', name: 'Рейтинги'},
  ];

  ngOnInit() {
    if (this.auth.isAdmin()) {
      this.links.push(
        {url: '/admin/users', name: 'Пользователи'},
        {url: '/admin/categories', name: 'Категории'}
      )
    }
  }

  constructor(private auth: AuthService,
              private router: Router) {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
