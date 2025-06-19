import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilghtDomainGradeSheetDetailsComponent } from './filght-domain-grade-sheet-details.component';

describe('FilghtDomainGradeSheetDetailsComponent', () => {
  let component: FilghtDomainGradeSheetDetailsComponent;
  let fixture: ComponentFixture<FilghtDomainGradeSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilghtDomainGradeSheetDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilghtDomainGradeSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
