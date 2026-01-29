import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsOverview } from './statistics-overview';

describe('StatisticsOverview', () => {
  let component: StatisticsOverview;
  let fixture: ComponentFixture<StatisticsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
