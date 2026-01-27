import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sec3 } from './sec-3';

describe('Sec3', () => {
  let component: Sec3;
  let fixture: ComponentFixture<Sec3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sec3],
    }).compileComponents();

    fixture = TestBed.createComponent(Sec3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
