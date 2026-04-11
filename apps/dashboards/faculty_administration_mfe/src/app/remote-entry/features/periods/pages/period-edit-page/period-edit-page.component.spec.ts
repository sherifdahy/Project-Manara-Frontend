/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PeriodEditPageComponent } from './period-edit-page.component';

describe('PeriodEditPageComponent', () => {
  let component: PeriodEditPageComponent;
  let fixture: ComponentFixture<PeriodEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
