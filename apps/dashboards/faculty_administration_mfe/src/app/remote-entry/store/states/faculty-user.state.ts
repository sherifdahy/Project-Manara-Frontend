import { FacultyDetailResponse, FacultyUserResponse } from "@project-manara-frontend/models";

export interface FacultyUserState {
  entity: FacultyUserResponse | null;
  loading: boolean;
  error: any;
}


export let initFacultyUserState: FacultyUserState = {
  entity: null,
  loading: false,
  error: null
}
