import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Actor, Category, Movie} from "../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MoviesService} from "../../shared/services/movies.service";
import {ActorsService} from "../../shared/services/actors.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

declare var M;

@Component({
  selector: 'app-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.css']
})
export class MoviesAddComponent implements OnInit, AfterViewInit {

  @ViewChild('selectActors') selectActorsRef: ElementRef;
  @ViewChild('selectCategories') selectCategoriesRef: ElementRef;
  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview = '';
  category: Category;
  categories: Category[];
  actorsList: Actor[] = [];
  actors: Actor[] = [];
  movie: Movie;
  isNew: boolean = true;


  constructor(private moviesService: MoviesService,
              private actorService: ActorsService,
              private categoryService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { actors: Actor[] }) => {
        this.actorsList = data.actors;
      });
    this.route.data
      .subscribe((data: { category: Category[] }) => {
        this.categories = data.category;
      });
    this.route.queryParams
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.moviesService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (movie: Movie) => {
          if (movie) {
            this.movie = movie;
            console.log(this.movie.actors);
            this.actors = this.movie.actors.map(id => this.actorsList.find((e) => e._id == id));
            this.imagePreview = this.movie.poster;
            this.form.patchValue({
              name: this.movie.name,
              year: this.movie.year,
              about: this.movie.about,
              actors: this.movie.actors
            });
            console.log(this.form.value['actors']);
            MaterialService.initializeMultiSelect(this.selectActorsRef);
          }
        },
        error => MaterialService.toast(error.error.message)
      );
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'year': new FormControl(null,),
      'category': new FormControl(null,),
      'actors': new FormControl(null,),
      'about': new FormControl(null, [Validators.required])
    });
    this.form.controls['year'].setValue(2000);
    MaterialService.updateTextFields();
  }

  ngAfterViewInit() {
    MaterialService.initializeMultiSelect(this.selectActorsRef);
    MaterialService.initializeMultiSelect(this.selectCategoriesRef);
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onCategoryChange() {
    this.categoryService.getById('' + this.form.value['category']).subscribe(
      (value) => {
        this.category = value;
      }
    );
  }

  onActorsChange() {
    this.actors = [];
    this.form.value['actors'].forEach((id) => this.actorService.getById(id)
      .subscribe((actor: Actor) => {
        this.actors.push(actor);
      }));
    console.log(this.form.value['actors']);
  }

  onSubmit() {
    console.log(this.form);
    this.form.disable();
    let obs$;
    if (this.isNew) {
      obs$ = this.moviesService.create(
        this.form.value['name'],
        this.form.value['year'],
        this.form.value['about'],
        this.category,
        this.actors,
        this.image
      );
    } else {
      obs$ = this.moviesService.update(
        this.movie._id,
        this.form.value['name'],
        this.form.value['year'],
        this.form.value['about'],
        this.category,
        this.actors,
        this.image
      );
    }
    obs$.subscribe(
      () => this.router.navigate(['/movies'], {}),
      error => {
        MaterialService.toast(error.error.message);
      }
    );
    this.form.enable();
  }

}
