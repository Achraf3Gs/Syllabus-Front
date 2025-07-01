import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDomainGradeSheetComponent } from './flight-domain-grade-sheet.component';

describe('FlightDomainGradeSheetComponent', () => {
  let component: FlightDomainGradeSheetComponent;
  let fixture: ComponentFixture<FlightDomainGradeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDomainGradeSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDomainGradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
