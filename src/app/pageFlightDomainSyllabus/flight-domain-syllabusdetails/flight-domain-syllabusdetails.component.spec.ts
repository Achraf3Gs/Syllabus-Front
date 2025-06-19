import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDomainSyllabusdetailsComponent } from './flight-domain-syllabusdetails.component';

describe('FlightDomainSyllabusdetailsComponent', () => {
  let component: FlightDomainSyllabusdetailsComponent;
  let fixture: ComponentFixture<FlightDomainSyllabusdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDomainSyllabusdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDomainSyllabusdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
