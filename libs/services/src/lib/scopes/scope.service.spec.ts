/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScopeService } from './scope.service';

describe('Service: Scope', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScopeService]
    });
  });

  it('should ...', inject([ScopeService], (service: ScopeService) => {
    expect(service).toBeTruthy();
  }));
});
