import { TestBed } from '@angular/core/testing';

import { GradeSheetManeuverItemService } from './grade-sheet-maneuver-item.service';

describe('GradeSheetManeuverItemService', () => {
  let service: GradeSheetManeuverItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeSheetManeuverItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
