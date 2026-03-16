/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { YearsPageComponent } from './years-page.component';

describe('YearsPageComponent', () => {
  let component: YearsPageComponent;
  let fixture: ComponentFixture<YearsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
