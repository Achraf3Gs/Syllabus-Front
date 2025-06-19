import { TestBed } from '@angular/core/testing';

import { GardeSheetService } from './garde-sheet.service';

describe('GardeSheetService', () => {
  let service: GardeSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardeSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
