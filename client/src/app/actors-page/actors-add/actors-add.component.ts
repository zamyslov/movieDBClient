import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActorsService} from "../../shared/services/actors.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../../shared/classes/material.service";
import {Actor} from "../../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

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
  actor: Actor;
  isNew: boolean = true;

  constructor(private actorService: ActorsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.actorService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (actor: Actor) => {
          if (actor) {
            this.actor = actor;
            this.form.patchValue({
              name: actor.name,
              surname: actor.surname,
              year: actor.year,
            });
            this.imagePreview = actor.photo;
            MaterialService.updateTextFields();
          }
        },
        error => MaterialService.toast(error.error.message)
      );
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'year': new FormControl(null, Validators.required)
    });
    if (!this.actor) {
      this.form.controls['year'].setValue('2000');
      MaterialService.updateTextFields();
    }
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
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.actorService.create(
        this.form.value['name'],
        this.form.value['surname'],
        this.form.value['year'],
        this.image
      )
    } else {
      obs$ = this.actorService.update(
        this.actor._id,
        this.form.value['name'],
        this.form.value['surname'],
        this.form.value['year'],
        this.image
      )
    }

    obs$.subscribe(
      () => this.router.navigate(['/actors']),
      error => {
        MaterialService.toast(error.error.message);
      }
    );
    this.form.enable();
  }
}
