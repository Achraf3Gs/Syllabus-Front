import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSylabusComponent } from './page-sylabus.component';

describe('PageSylabusComponent', () => {
  let component: PageSylabusComponent;
  let fixture: ComponentFixture<PageSylabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSylabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSylabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
