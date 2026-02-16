import { createReducer, on } from "@ngrx/store";
import { initUniversityState } from "../states/university.state";
import { getUniversityAction, getUniversityFailedAction, getUniversitySuccessAction } from "../actions/get-university.actions";

export const universityReducer = createReducer(
  initUniversityState,
  on(getUniversityAction, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(getUniversitySuccessAction, (state, { university }) => ({
    ...state,
    entity: university,
    loading: false,
    error: null,
  })),

  on(getUniversityFailedAction, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
)
