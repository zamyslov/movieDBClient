import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit, OnDestroy, AfterViewInit {
  categories$: Observable<Category[]>;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  form: FormGroup;
  category: Category;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
    this.categories$ = this.categoriesService.getAll();
  }

  ngOnDestroy(): void {
    this.category = null;
    this.modal.destroy();
  }

  onSelectCategory(category: Category) {
    this.category = category;
    this.form.patchValue({
      name: category.name
    });
    this.modal.open();
    MaterialService.updateTextFields();
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onAddCategory() {
    this.modal.open();
  }

  onSubmit() {
    let obs$;
    const category: Category = {
      name: this.form.value['name']
    };
    if (this.category) {
      category._id = this.category._id;
    }
    if (this.category) {
      obs$ = this.categoriesService.update(category);
    } else {
      obs$ = this.categoriesService.create(category);
    }
    obs$.subscribe(
      () => {
        this.categories$ = this.categoriesService.getAll();
        this.form.reset();
        this.modal.close();
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  onCancel() {
    this.form.reset();
    this.modal.close();
    this.category = null;
  }

}
