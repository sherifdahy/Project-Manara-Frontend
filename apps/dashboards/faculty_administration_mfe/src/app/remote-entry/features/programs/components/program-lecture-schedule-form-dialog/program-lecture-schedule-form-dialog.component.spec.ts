/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProgramLectureScheduleFormDialogComponent } from './program-lecture-schedule-form-dialog.component';

describe('ProgramLectureScheduleFormDialogComponent', () => {
  let component: ProgramLectureScheduleFormDialogComponent;
  let fixture: ComponentFixture<ProgramLectureScheduleFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramLectureScheduleFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramLectureScheduleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
