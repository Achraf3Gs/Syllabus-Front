import { Instructor } from './Instructor';

export interface Student {
  id: number | undefined;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  grade: string;
  callSign?: number | string;
  instructor?: Instructor;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  joinDate?: string | Date;
  notes?: string;
  // Add any additional fields that might be needed
  [key: string]: any; // For any additional dynamic properties
}

// Helper function to create a default student
export function createDefaultStudent(overrides: Partial<Student> = {}): Student {
  return {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    grade: '',
    ...overrides
  };
}
