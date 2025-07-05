import { ManeuverItem } from './maneuverItem';

export interface GradeSheetManeuverItem {
  id: number;
  maneuverItem: ManeuverItem;
  rating: string;
  mifRequirement: string;
}
