export interface GradeSheetManeuver {
    id: number; 
    name: string; 
    rating: string | null;
    mifRequirement: string | null;
    flightDomain?: any;
    overallGrade: string | null;
  }
