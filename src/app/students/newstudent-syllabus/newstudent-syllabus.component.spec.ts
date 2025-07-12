import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstudentSyllabusComponent } from './newstudent-syllabus.component';

describe('NewstudentSyllabusComponent', () => {
  let component: NewstudentSyllabusComponent;
  let fixture: ComponentFixture<NewstudentSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewstudentSyllabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewstudentSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
