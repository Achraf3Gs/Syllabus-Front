import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESyllabusComponent } from './e-syllabus.component';

describe('ESyllabusComponent', () => {
  let component: ESyllabusComponent;
  let fixture: ComponentFixture<ESyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ESyllabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ESyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
