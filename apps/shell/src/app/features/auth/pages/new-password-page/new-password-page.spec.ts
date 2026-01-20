import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordPage } from './new-password-page';

describe('NewPasswordPage', () => {
  let component: NewPasswordPage;
  let fixture: ComponentFixture<NewPasswordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPasswordPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
