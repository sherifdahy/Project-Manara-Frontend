/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgramScheduleService } from './program-schedule.service';

describe('Service: ProgramSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramScheduleService]
    });
  });

  it('should ...', inject([ProgramScheduleService], (service: ProgramScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
