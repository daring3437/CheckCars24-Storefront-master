import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'checkcars-collapse-conatiner',
  templateUrl: './collapse-conatiner.component.html',
  styleUrls: ['./collapse-conatiner.component.css'],
})
export class CollapseConatinerComponent implements OnInit {
  @ContentChild('header', { static: false }) headerTemplateRef: TemplateRef<
    any
  >;
  @ContentChild('body', { static: false }) bodyTemplateRef: TemplateRef<any>;
  collapsed = true;
  constructor() {}

  ngOnInit() {}
}
