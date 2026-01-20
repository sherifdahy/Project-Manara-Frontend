import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSelectionPage } from './module-selection-page';

describe('ModuleSelectionPage', () => {
  let component: ModuleSelectionPage;
  let fixture: ComponentFixture<ModuleSelectionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuleSelectionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleSelectionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
