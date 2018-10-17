import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Actor, Category} from "../../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {MoviesService} from "../../shared/services/movies.service";
import {ActorsService} from "../../shared/services/actors.service";
import {CategoriesService} from "../../shared/services/categories.service";

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


  constructor(private moviesService: MoviesService,
              private actorService: ActorsService,
              private categoryService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'year': new FormControl(null,),
      'category': new FormControl(null,),
      'actors': new FormControl(null,),
      'about': new FormControl(null, [Validators.required])
    });
    this.route.data
      .subscribe((data: { actors: Actor[] }) => {
        this.actorsList = data.actors;
      });
    this.route.data
      .subscribe((data: { category: Category[] }) => {
        this.categories = data.category;
      });
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
  }

  onSubmit() {
    this.form.disable();
    console.log(this.actors);
    this.moviesService.create(
      this.form.value['name'],
      this.form.value['year'],
      this.form.value['about'],
      this.category,
      this.actors,
      this.image
    ).subscribe(
      () => this.router.navigate(['/movies'], {
        queryParams: {
          added: true
        }
      }),
      error => {
        MaterialService.toast(error.error.message);
      }
    );
    this.form.enable();
  }

}
