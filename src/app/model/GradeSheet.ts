import { FlightDoaminSyllabus } from "./FlightDoaminSyllabus";
import { GradeSheetManeuver } from "./GradeSheetManeuver";

export interface GradeSheet {
  id?: number;
  name: string;
  block: number;
  date: Date;
  studentId: number;
  instructorId: number;
  overAllGrade: string;
  flightDomainSyllabusId: number;
  maneuverItems: GradeSheetManeuver[];
  gradeSheetManeuverItems?: GradeSheetManeuver[];
  overallRating?: number | null;
};
