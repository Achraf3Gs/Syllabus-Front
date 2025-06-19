import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardGradeSheetComponent } from './standard-grade-sheet.component';

describe('StandardGradeSheetComponent', () => {
  let component: StandardGradeSheetComponent;
  let fixture: ComponentFixture<StandardGradeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardGradeSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardGradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
