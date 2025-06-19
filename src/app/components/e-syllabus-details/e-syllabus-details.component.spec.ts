import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESyllabusDetailsComponent } from './e-syllabus-details.component';

describe('ESyllabusDetailsComponent', () => {
  let component: ESyllabusDetailsComponent;
  let fixture: ComponentFixture<ESyllabusDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ESyllabusDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ESyllabusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
