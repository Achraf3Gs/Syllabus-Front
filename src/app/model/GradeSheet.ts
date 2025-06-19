import { FlightDoaminSyllabus } from "./FlightDoaminSyllabus";

export type GradeSheet= {
  id?: number | undefined;
  name: string;
  block: number;
  flightDoaminSyllabus?: FlightDoaminSyllabus;
};
