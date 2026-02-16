import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { FacultyDetailResponse } from "@project-manara-frontend/models";

export const getFacultyAction = createAction(
  '[Faculty] Get Faculty'
)

export const getFacultySuccessAction = createAction(
  '[Faculty] Get Faculty Success',
  props<{ faculty: FacultyDetailResponse }>()
)

export const getFacultyFaildAction = createAction(
  '[Faculty] Get Faculty Faild',
  props<{ error: HttpErrorResponse }>()
)
