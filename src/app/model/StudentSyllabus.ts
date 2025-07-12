export interface StudentSyllabus {
  id: number;
  syllabusId: number;
  syllabusName: string;
  assignedDate: string | Date;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'NOT_STARTED' | string;
  // Additional properties that might be present in the response
  completionDate?: string | Date | null;
  progress?: number;
  notes?: string;
}

// Type guard to check if an object is a valid StudentSyllabus
export function isStudentSyllabus(obj: any): obj is StudentSyllabus {
  return (
    obj && 
    typeof obj === 'object' &&
    'id' in obj &&
    'syllabusId' in obj &&
    'syllabusName' in obj &&
    'assignedDate' in obj &&
    'status' in obj
  );
}

// Helper function to ensure a StudentSyllabus has all required fields
export function ensureStudentSyllabus(obj: Partial<StudentSyllabus> = {}): StudentSyllabus {
  const defaultSyllabus: StudentSyllabus = {
    id: 0,
    syllabusId: 0,
    syllabusName: 'Unknown Syllabus',
    assignedDate: new Date(),
    status: 'NOT_STARTED',
    progress: 0,
    notes: ''
  };

  // Merge the defaults with the provided object
  const result: StudentSyllabus = {
    ...defaultSyllabus,
    ...obj,
    // Ensure dates are properly handled
    assignedDate: obj.assignedDate ? new Date(obj.assignedDate) : new Date(),
    completionDate: obj.completionDate ? new Date(obj.completionDate) : null
  };

  return result;
}
