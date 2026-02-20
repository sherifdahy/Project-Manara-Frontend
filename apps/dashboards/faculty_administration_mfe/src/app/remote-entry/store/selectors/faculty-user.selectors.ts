import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FacultyUserState } from "../states/faculty-user.state";
import { selectFacultyState } from "./faculty.selectors";

export const selectFacultyUserState = createFeatureSelector<FacultyUserState>('facultyUser');

export const selectFacultyUser = createSelector(
  selectFacultyUserState,
  (state) => state.entity
)

export const selectFacultyUserError = createSelector(
  selectFacultyUserState,
  (state) => state.error
);

export const selectFacultyUserId = createSelector(
  selectFacultyState,
  (state) => state.entity?.id
);
