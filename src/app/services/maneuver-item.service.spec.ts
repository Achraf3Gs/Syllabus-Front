import { TestBed } from '@angular/core/testing';

import { ManeuverItemService } from './maneuver-item.service';

describe('ManeuverItemService', () => {
  let service: ManeuverItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManeuverItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
