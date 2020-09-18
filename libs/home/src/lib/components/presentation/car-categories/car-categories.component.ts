import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, ParameterService } from '@checkcars/shared';
import { environment } from '@checkcars/environment/environment';

@Component({
  selector: 'checkcars-car-categories',
  templateUrl: './car-categories.component.html',
  styleUrls: ['./car-categories.component.scss'],
})
export class CarCategoriesComponent implements OnInit {
  @Input() categories;
  @Output() categorySearch = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  searchForCategory({ queryParam }) {
    this.categorySearch.emit(queryParam);
  }
}
