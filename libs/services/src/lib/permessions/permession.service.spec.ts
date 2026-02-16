/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermessionService } from './permession.service';

describe('Service: Permession', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermessionService]
    });
  });

  it('should ...', inject([PermessionService], (service: PermessionService) => {
    expect(service).toBeTruthy();
  }));
});
