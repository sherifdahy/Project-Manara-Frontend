/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UniversityUserService } from './university-user.service';

describe('Service: UniversityUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversityUserService]
    });
  });

  it('should ...', inject([UniversityUserService], (service: UniversityUserService) => {
    expect(service).toBeTruthy();
  }));
});
