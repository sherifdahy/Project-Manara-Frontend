/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProgramSectionScheduleFormDialogComponent } from './program-section-schedule-form-dialog.component';

describe('ProgramSectionScheduleFormDialogComponent', () => {
  let component: ProgramSectionScheduleFormDialogComponent;
  let fixture: ComponentFixture<ProgramSectionScheduleFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSectionScheduleFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSectionScheduleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
