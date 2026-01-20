import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordForm } from './new-password-form';

describe('NewPasswordForm', () => {
  let component: NewPasswordForm;
  let fixture: ComponentFixture<NewPasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPasswordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
