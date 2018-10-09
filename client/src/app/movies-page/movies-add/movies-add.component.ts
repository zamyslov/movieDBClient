import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.css']
})
export class MoviesAddComponent implements OnInit, AfterViewInit {

  @ViewChild('select') selectRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    MaterialService.initializeMultiSelect(this.selectRef);
  }

}
