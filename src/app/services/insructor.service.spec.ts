import { TestBed } from '@angular/core/testing';

import { InsructorService } from './insructor.service';

describe('InsructorService', () => {
  let service: InsructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
