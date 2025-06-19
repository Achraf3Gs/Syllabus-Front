import { Instructor } from './Instructor';

export type Student = {
  id: number | undefined;
  firstName: string;
  lastName: string;
  grade: string;
  callSign: number | undefined;
  instructor: Instructor;
};
