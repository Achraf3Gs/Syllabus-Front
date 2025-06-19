import { TestBed } from '@angular/core/testing';

import { CtsService } from './cts.service';

describe('CtsService', () => {
  let service: CtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
