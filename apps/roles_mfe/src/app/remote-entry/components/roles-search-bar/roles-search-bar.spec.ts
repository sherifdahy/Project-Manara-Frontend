import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesSearchBar } from './roles-search-bar';

describe('RolesSearchBar', () => {
  let component: RolesSearchBar;
  let fixture: ComponentFixture<RolesSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesSearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesSearchBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
