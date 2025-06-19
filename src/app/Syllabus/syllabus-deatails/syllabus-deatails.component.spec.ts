import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllabusDeatailsComponent } from './syllabus-deatails.component';

describe('SyllabusDeatailsComponent', () => {
  let component: SyllabusDeatailsComponent;
  let fixture: ComponentFixture<SyllabusDeatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyllabusDeatailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyllabusDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
