/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacultyService } from './faculty.service';

describe('Service: Faculty', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultyService]
    });
  });

  it('should ...', inject([FacultyService], (service: FacultyService) => {
    expect(service).toBeTruthy();
  }));
});
