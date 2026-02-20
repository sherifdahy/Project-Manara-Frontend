/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasePermissionService } from './base-permission.service';

describe('Service: BasePermission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasePermissionService]
    });
  });

  it('should ...', inject([BasePermissionService], (service: BasePermissionService) => {
    expect(service).toBeTruthy();
  }));
});
