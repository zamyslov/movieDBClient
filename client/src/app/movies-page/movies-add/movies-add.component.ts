import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Actor, Category, Movie} from "../../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {MoviesService} from "../../shared/services/movies.service";
import {ActorsService} from "../../shared/services/actors.service";
import {CategoriesService} from "../../shared/services/categories.service";

declare var M;

@Component({
  selector: 'app-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.css']
})
export class MoviesAddComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('selectActors') selectActorsRef: ElementRef;
  @ViewChild('selectCategories') selectCategoriesRef: ElementRef;
  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview = '';
  actors: Actor[];
  aSub: Subscription;
  category: Category;
  categories: Category[];


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
        this.actors = data.actors;
      });
    this.route.data
      .subscribe((data: { category: Category[] }) => {
        this.categories = data.category;
      });
  }

  ngOnDestroy(): void {
    this.aSub.unsubscribe();
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

  onSubmit() {
    this.form.disable();
    let actors = [];
    this.form.value['actors'].forEach((id) => this.actorService.getById(id)
      .subscribe((actor) => {
        actors.push(actor);
      }));
    this.categoryService.getById(''+this.form.value['category']).subscribe(
      (cat) => {
        console.log(cat);
        this.category = cat;
      }
    );
    console.log(''+this.form.value['category']);
    console.log(actors);
    console.log(this.category);
    // const movie: Movie = {
    //   name: this.form.value['name'],
    //   year: this.form.value['year'],
    //   about: this.form.value['about'],
    //   category: this.form.value['category'],
    //   list: this.form.value['actors']
    // };
    // this.aSub = this.moviesService.create(movie).subscribe(
    //   () => this.router.navigate(['/movies'], {
    //     queryParams: {
    //       added: true
    //     }
    //   }),
    //   error => {
    //     MaterialService.toast(error.error.message);
    //     this.form.enable();
    //   }
    // )
  }

}
