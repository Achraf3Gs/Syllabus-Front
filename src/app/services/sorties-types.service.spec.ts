import { TestBed } from '@angular/core/testing';

import { SortiesTypesService } from './sorties-types.service';

describe('SortiesTypesService', () => {
  let service: SortiesTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortiesTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
