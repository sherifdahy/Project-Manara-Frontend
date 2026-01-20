import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSeclectionForm } from './module-seclection-form';

describe('ModuleSeclectionForm', () => {
  let component: ModuleSeclectionForm;
  let fixture: ComponentFixture<ModuleSeclectionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleSeclectionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleSeclectionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
