import { TestBed } from '@angular/core/testing';

import { FlightDomainSyllabusService } from './flight-domain-syllabus.service';

describe('FlightDomainSyllabusService', () => {
  let service: FlightDomainSyllabusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightDomainSyllabusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
