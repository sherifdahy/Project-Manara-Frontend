/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScopesService } from './scopes.service';

describe('Service: Scopes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScopesService]
    });
  });

  it('should ...', inject([ScopesService], (service: ScopesService) => {
    expect(service).toBeTruthy();
  }));
});
