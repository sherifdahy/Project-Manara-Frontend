/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepartmentStaffBasicInfoPageComponent } from './department-staff-basic-info-page.component';

describe('DepartmentStaffBasicInfoPageComponent', () => {
  let component: DepartmentStaffBasicInfoPageComponent;
  let fixture: ComponentFixture<DepartmentStaffBasicInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentStaffBasicInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentStaffBasicInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
