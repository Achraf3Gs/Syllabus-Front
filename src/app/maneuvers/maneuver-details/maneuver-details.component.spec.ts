import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverDetailsComponent } from './maneuver-details.component';

describe('ManeuverDetailsComponent', () => {
  let component: ManeuverDetailsComponent;
  let fixture: ComponentFixture<ManeuverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManeuverDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManeuverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
