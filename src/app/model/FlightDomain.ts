import { ManeuverItem } from './maneuverItem';

export type FlightDomain = {
  id?: number | undefined;
  name: string;
  maneuverItems?: ManeuverItem[];
};
