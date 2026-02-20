import { HttpErrorResponse } from '@angular/common/http'
import { createAction, props } from '@ngrx/store'
import { UniversityDetailResponse } from '@project-manara-frontend/models'

export const getUniversityAction = createAction(
  '[University] Get University'
)

export const getUniversitySuccessAction = createAction(
  '[University] Get University Success',
  props<{ university: UniversityDetailResponse }>()
)

export const getUniversityFailedAction = createAction(
  '[University] Get University Failed',
  props<{ error: HttpErrorResponse }>()
)
