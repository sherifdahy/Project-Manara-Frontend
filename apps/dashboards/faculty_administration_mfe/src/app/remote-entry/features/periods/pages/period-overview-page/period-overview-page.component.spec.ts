/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PeriodOverviewPageComponent } from './period-overview-page.component';

describe('PeriodOverviewPageComponent', () => {
  let component: PeriodOverviewPageComponent;
  let fixture: ComponentFixture<PeriodOverviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodOverviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
