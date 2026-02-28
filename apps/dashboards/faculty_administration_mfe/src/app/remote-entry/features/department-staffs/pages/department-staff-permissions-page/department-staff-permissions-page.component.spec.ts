/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepartmentStaffPermissionsPageComponent } from './department-staff-permissions-page.component';

describe('DepartmentStaffPermissionsPageComponent', () => {
  let component: DepartmentStaffPermissionsPageComponent;
  let fixture: ComponentFixture<DepartmentStaffPermissionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentStaffPermissionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentStaffPermissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
