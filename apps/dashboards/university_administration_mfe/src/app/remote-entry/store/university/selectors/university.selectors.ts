import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UniversityState } from "../states/university.state";

export const selectUniversityState = createFeatureSelector<UniversityState>('university');

export const selectUniversityIdState = createSelector(
  selectUniversityState,
  (state) => state.entity?.id
)
