/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LastViewedComponent } from './last-viewed.component';

describe('LastViewedComponent', () => {
  let component: LastViewedComponent;
  let fixture: ComponentFixture<LastViewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastViewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
