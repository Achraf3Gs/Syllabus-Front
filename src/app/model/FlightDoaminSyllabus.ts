import { Syllabus } from './Syllabus';
export type FlightDoaminSyllabus = {
  id?: number | undefined;
  name: string;
  block: number;
  syllabus?: Syllabus;
};
