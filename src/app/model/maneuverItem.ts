import { FlightDomain } from './FlightDomain';

export type ManeuverItem = {
  id: number;
  name: string;
  mifRequirement?: string;
  cts: {
    unsatisfactoryCriteria: Record<string, string[]>;
    fairCriteria: Record<string, string[]>;
    goodCriteria: Record<string, string[]>;
    excellentCriteria: Record<string, string[]>;
    noGradeCriteria: Record<string, string[]>;
  };

  flightDomain: FlightDomain;
};
