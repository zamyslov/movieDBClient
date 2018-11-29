import {Component, OnInit} from '@angular/core';
import {Actor} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActorsService} from "../shared/services/actors.service";
import {Router} from "@angular/router";

const STEP = 2;

@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.css']
})
export class ActorsPageComponent implements OnInit {
  isAdmin: boolean;
  actors: Actor[];
  pages = [];
  currentPage = 1;
  limit = STEP;

  constructor(private actorsService: ActorsService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAll();
    this.isAdmin = this.authService.isAdmin();
    this.currentPage = 1;
  }

  getAll() {
    const params = {
      offset: (this.currentPage - 1) * STEP,
      limit: this.limit
    };
    this.actorsService.getAll(params).subscribe(res => {
      console.log(res);
        this.actors = res.actor;
        this.pages = new Array(Math.ceil(res.count / STEP));
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage += 1;
      this.getAll();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getAll();
    }
  }

  Page(index: number) {
    this.currentPage = index;
    this.getAll();
  }

  onAddActor() {
    this.router.navigate(['/admin/actors/new']);
  }
}
