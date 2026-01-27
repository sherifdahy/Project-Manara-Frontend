import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sec2 } from './sec-2';

describe('Sec2', () => {
  let component: Sec2;
  let fixture: ComponentFixture<Sec2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sec2],
    }).compileComponents();

    fixture = TestBed.createComponent(Sec2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
