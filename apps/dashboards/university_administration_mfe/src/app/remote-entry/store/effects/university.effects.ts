import { Actions, createEffect, ofType } from '@ngrx/effects'
import { UniversityService } from '@project-manara-frontend/services';
import { getUniversityAction, getUniversityFailedAction, getUniversitySuccessAction } from '../actions/get-university.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UniversityEffects {
  university$;
  constructor(actions$: Actions, universityService: UniversityService) {
    this.university$ = createEffect(() => {
      return actions$.pipe(
        ofType(getUniversityAction),
        switchMap(() => {
          return universityService.my().pipe(
            map(response => getUniversitySuccessAction({ university: response })),
            catchError(error => of(getUniversityFailedAction({ error }))),
          )
        })
      )
    })
  }
}
