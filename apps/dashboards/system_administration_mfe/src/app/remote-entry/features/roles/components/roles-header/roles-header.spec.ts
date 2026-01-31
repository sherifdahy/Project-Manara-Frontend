import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesHeader } from './roles-header';

describe('RolesHeader', () => {
  let component: RolesHeader;
  let fixture: ComponentFixture<RolesHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
