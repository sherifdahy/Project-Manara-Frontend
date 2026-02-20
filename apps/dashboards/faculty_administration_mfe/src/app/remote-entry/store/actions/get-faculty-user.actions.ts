import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { FacultyDetailResponse, FacultyUserResponse } from "@project-manara-frontend/models";

export const getFacultyUserAction = createAction(
  '[Faculty User] Get Faculty User'
)

export const getFacultyUserSuccessAction = createAction(
  '[Faculty User] Get Faculty User Success',
  props<{ facultyUser: FacultyUserResponse }>()
)

export const getFacultyUserFaildAction = createAction(
  '[Faculty User] Get Faculty User Faild',
  props<{ error: HttpErrorResponse }>()
)
