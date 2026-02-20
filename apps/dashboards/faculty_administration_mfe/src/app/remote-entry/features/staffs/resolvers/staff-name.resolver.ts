// mfe-dashboard/modules/staff/resolvers/staff-name.resolver.ts

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { FacultyUserService } from '@project-manara-frontend/services';
import { map } from 'rxjs/operators';

export const staffNameResolver: ResolveFn<string> = (
  route: ActivatedRouteSnapshot
) => {
  const facultyUserService = inject(FacultyUserService);
  const id = Number(route.paramMap.get('id')!);

  return facultyUserService.get(id).pipe(
    map(staff => staff.name)
  );
};
