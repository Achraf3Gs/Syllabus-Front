import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGradeSheetComponent } from './new-grade-sheet.component';

describe('NewGradeSheetComponent', () => {
  let component: NewGradeSheetComponent;
  let fixture: ComponentFixture<NewGradeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGradeSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
