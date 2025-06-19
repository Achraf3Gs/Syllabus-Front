import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSheetDetailsComponent } from './grade-sheet-details.component';

describe('GradeSheetDetailsComponent', () => {
  let component: GradeSheetDetailsComponent;
  let fixture: ComponentFixture<GradeSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeSheetDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
