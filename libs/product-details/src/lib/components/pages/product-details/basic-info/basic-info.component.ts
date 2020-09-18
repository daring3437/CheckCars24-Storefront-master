import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'checkcars-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  @Input() vehicle;
  constructor() {}

  ngOnInit() {}
}
