import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesGrid } from './roles-grid';

describe('RolesGrid', () => {
  let component: RolesGrid;
  let fixture: ComponentFixture<RolesGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
