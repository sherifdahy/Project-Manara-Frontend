import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FacultyState } from "../states/faculties/faculty.state";

export const selectFacultyState = createFeatureSelector<FacultyState>('faculty');

export const selectFaculty = createSelector(
  selectFacultyState,
  (state) => state.entity
)

export const selectFacultyError = createSelector(
  selectFacultyState,
  (state) => state.error
);

export const selectFacultyId = createSelector(
  selectFacultyState,
  (state) => state.entity?.id
);
