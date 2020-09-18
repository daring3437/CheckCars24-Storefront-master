import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'checkcars-equpment-flags',
  templateUrl: './equpment-flags.component.html',
  styleUrls: ['./equpment-flags.component.scss'],
})
export class EqupmentFlagsComponent implements OnInit {
  @Input() vehicle;
  constructor() {}

  ngOnInit() {}
}
