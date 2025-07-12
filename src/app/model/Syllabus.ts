import { Student } from "./Student";

export interface Syllabus {
  id?: number;
  title: string;
  description?: string;
  code?: string;
  durationHours?: number;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  // Add any additional fields that might be needed
  [key: string]: any; // For any additional dynamic properties
}

// Helper function to create a default syllabus
export function createDefaultSyllabus(overrides: Partial<Syllabus> = {}): Syllabus {
  return {
    id: undefined,
    title: 'Untitled Syllabus',
    description: '',
    isActive: true,
    ...overrides
  };
}

// Type guard to check if an object is a valid Syllabus
export function isSyllabus(obj: any): obj is Syllabus {
  return (
    obj && 
    typeof obj === 'object' &&
    'title' in obj
  );
}
