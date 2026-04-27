/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgramEnrollmentsService } from './program-enrollments.service';

describe('Service: ProgramEnrollments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramEnrollmentsService]
    });
  });

  it('should ...', inject([ProgramEnrollmentsService], (service: ProgramEnrollmentsService) => {
    expect(service).toBeTruthy();
  }));
});
