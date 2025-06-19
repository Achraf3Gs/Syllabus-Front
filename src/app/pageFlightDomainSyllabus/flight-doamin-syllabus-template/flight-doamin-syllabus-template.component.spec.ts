import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDoaminSyllabusTemplateComponent } from './flight-doamin-syllabus-template.component';

describe('FlightDoaminSyllabusTemplateComponent', () => {
  let component: FlightDoaminSyllabusTemplateComponent;
  let fixture: ComponentFixture<FlightDoaminSyllabusTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDoaminSyllabusTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDoaminSyllabusTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
