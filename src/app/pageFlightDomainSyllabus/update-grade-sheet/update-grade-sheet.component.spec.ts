import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGradeSheetComponent } from './update-grade-sheet.component';

describe('UpdateGradeSheetComponent', () => {
  let component: UpdateGradeSheetComponent;
  let fixture: ComponentFixture<UpdateGradeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGradeSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGradeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
