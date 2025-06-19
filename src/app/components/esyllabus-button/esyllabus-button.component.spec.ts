import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsyllabusButtonComponent } from './esyllabus-button.component';

describe('EsyllabusButtonComponent', () => {
  let component: EsyllabusButtonComponent;
  let fixture: ComponentFixture<EsyllabusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsyllabusButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsyllabusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
