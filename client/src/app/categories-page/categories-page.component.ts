import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit, OnDestroy, AfterViewInit {
  categories$: Observable<Category[]>;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.getAll()
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }


  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }


  onAddCategory() {
    this.modal.open();
  }

}
