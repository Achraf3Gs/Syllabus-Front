import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageManeuverComponent } from './page-maneuver.component';

describe('PageManeuverComponent', () => {
  let component: PageManeuverComponent;
  let fixture: ComponentFixture<PageManeuverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageManeuverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageManeuverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
