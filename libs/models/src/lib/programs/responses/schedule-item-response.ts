import { SubjectResponse } from "../../subjects/responses/subject-response";

export interface ScheduleItemResponse {
    subject : SubjectResponse;
    periodId : number;
    dayId : number;
}
