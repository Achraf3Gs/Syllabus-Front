import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDomainDetailsComponent } from './flight-domain-details.component';

describe('FlightDomainDetailsComponent', () => {
  let component: FlightDomainDetailsComponent;
  let fixture: ComponentFixture<FlightDomainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDomainDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightDomainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
