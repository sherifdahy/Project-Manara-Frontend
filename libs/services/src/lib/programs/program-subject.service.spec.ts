/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgramSubjectService } from './program-subject.service';

describe('Service: ProgramSubject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramSubjectService]
    });
  });

  it('should ...', inject([ProgramSubjectService], (service: ProgramSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
