import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSheetComponent } from './grade-Sheet.component';

describe('ESyllabusComponent', () => {
  let component: GradeSheetComponent;
  let fixture: ComponentFixture<GradeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeSheetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
