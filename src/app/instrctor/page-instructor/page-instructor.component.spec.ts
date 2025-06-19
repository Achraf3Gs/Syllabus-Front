import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInstructorComponent } from './page-instructor.component';

describe('PageInstructorComponent', () => {
  let component: PageInstructorComponent;
  let fixture: ComponentFixture<PageInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
