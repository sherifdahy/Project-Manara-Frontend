/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacultyUserService } from './faculty-user.service';

describe('Service: FacultyUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultyUserService]
    });
  });

  it('should ...', inject([FacultyUserService], (service: FacultyUserService) => {
    expect(service).toBeTruthy();
  }));
});
