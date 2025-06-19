import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESyllabusDetaileComponent } from './e-syllabus-detaile.component';

describe('ESyllabusDetaileComponent', () => {
  let component: ESyllabusDetaileComponent;
  let fixture: ComponentFixture<ESyllabusDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ESyllabusDetaileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ESyllabusDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
