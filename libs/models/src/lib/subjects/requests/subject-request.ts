export interface SubjectRequest {
  name:string;
  code:string;
  description:string;
  creditHours:number;
  prerequisiteIds: number[];
}
