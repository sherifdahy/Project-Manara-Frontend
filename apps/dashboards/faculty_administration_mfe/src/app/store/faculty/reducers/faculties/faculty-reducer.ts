import { createReducer, on } from "@ngrx/store";
import { initFacultyState } from "../../states/faculties/faculty.state";
import { getFacultyAction, getFacultyFaildAction, getFacultySuccessAction } from "../../actions/get-faculty.actions";

export const facultyReducer = createReducer(
  initFacultyState,
  on(getFacultyAction, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(getFacultySuccessAction, (state, { faculty }) => ({
    ...state,
    entity: faculty,
    loading: false,
    error: null,
  })),

  on(getFacultyFaildAction, (state, { error }) => ({
    ...state,
    entity: null,
    loading: false,
    error : error,
  }))
)
