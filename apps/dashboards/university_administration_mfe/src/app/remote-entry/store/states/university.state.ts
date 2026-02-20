import { UniversityDetailResponse } from "@project-manara-frontend/models";

export interface UniversityState {
  entity: UniversityDetailResponse | null;
  loading: boolean;
  error: any;
}

export let initUniversityState: UniversityState = {
  entity: null,
  loading: false,
  error: null
}
