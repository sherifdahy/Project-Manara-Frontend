/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepartmentUserService } from './department-user.service';

describe('Service: DepartmentUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentUserService]
    });
  });

  it('should ...', inject([DepartmentUserService], (service: DepartmentUserService) => {
    expect(service).toBeTruthy();
  }));
});
