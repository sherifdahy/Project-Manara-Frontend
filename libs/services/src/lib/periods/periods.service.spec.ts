/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PeriodsService } from './periods.service';

describe('Service: Periods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeriodsService]
    });
  });

  it('should ...', inject([PeriodsService], (service: PeriodsService) => {
    expect(service).toBeTruthy();
  }));
});
