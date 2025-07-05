import { FlightDomain } from './FlightDomain';
import { ManeuverItem } from './maneuverItem';
import { Syllabus } from './Syllabus';

export type FlightDoaminSyllabus = {
  id?: number | undefined;
  name: string;
  block: number;
  syllabus?: Syllabus;
  maneuverItems?: ManeuverItem[];
  flightDomain?: FlightDomain;
};
