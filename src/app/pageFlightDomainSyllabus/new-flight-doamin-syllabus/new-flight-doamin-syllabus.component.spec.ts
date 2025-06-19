import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlightDoaminSyllabusComponent } from './new-flight-doamin-syllabus.component';

describe('NewFlightDoaminSyllabusComponent', () => {
  let component: NewFlightDoaminSyllabusComponent;
  let fixture: ComponentFixture<NewFlightDoaminSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFlightDoaminSyllabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFlightDoaminSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
