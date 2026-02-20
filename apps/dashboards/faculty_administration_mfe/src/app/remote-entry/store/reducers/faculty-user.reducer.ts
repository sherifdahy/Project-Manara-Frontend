import { createReducer, on } from "@ngrx/store";
import { initFacultyState } from "../states/faculty.state";
import { getFacultyAction, getFacultyFaildAction, getFacultySuccessAction } from "../actions/get-faculty.actions";
import { getFacultyUserAction, getFacultyUserFaildAction, getFacultyUserSuccessAction } from "../actions/get-faculty-user.actions";
import { initFacultyUserState } from "../states/faculty-user.state";

export const facultyUserReducer = createReducer(
  initFacultyUserState,
  on(getFacultyUserAction, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(getFacultyUserSuccessAction, (state, { facultyUser }) => ({
    ...state,
    entity: facultyUser,
    loading: false,
    error: null,
  })),

  on(getFacultyUserFaildAction, (state, { error }) => ({
    ...state,
    entity: null,
    loading: false,
    error: error,
  }))
)
