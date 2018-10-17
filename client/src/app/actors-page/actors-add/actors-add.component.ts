import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActorsService} from "../../shared/services/actors.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-actors-add',
  templateUrl: './actors-add.component.html',
  styleUrls: ['./actors-add.component.css']
})
export class ActorsAddComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview = '';

  constructor(private actorService: ActorsService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'year': new FormControl(null, Validators.required)
    });
    this.form.controls['year'].setValue(2000);
    MaterialService.updateTextFields();
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
    this.actorService.create(
      this.form.value['name'],
      this.form.value['surname'],
      this.form.value['year'],
      this.image
    ).subscribe(
      () => this.router.navigate(['/actors'], {
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
