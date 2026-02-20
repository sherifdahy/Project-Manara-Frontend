import { FacultyDetailResponse } from "@project-manara-frontend/models";

export interface FacultyState {
  entity: FacultyDetailResponse | null;
  loading: boolean;
  error: any;
}


export let initFacultyState: FacultyState = {
  entity: null,
  loading: false,
  error: null
}
