import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../../shared/classes/material.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.css']
})
export class MoviesAddComponent implements OnInit, AfterViewInit {

  @ViewChild('select') selectRef: ElementRef;
  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview = '';

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  ngAfterViewInit() {
    MaterialService.initializeMultiSelect(this.selectRef);
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

  }

}
