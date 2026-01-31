import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesStatistics } from './roles-statistics';

describe('RolesStatistics', () => {
  let component: RolesStatistics;
  let fixture: ComponentFixture<RolesStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesStatistics],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesStatistics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
