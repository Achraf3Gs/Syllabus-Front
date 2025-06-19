import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDomainSyllabusComponent } from './flight-domain-syllabus.component';

describe('FlightDomainSyllabusComponent', () => {
  let component: FlightDomainSyllabusComponent;
  let fixture: ComponentFixture<FlightDomainSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDomainSyllabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDomainSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
