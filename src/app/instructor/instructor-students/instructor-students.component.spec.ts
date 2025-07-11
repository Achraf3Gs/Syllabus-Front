import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorStudentsComponent } from './instructor-students.component';

describe('InstructorStudentsComponent', () => {
  let component: InstructorStudentsComponent;
  let fixture: ComponentFixture<InstructorStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
