import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManeuverItemComponent } from './new-maneuverItem.component';

describe('NewManeuverItemComponent', () => {
  let component: NewManeuverItemComponent;
  let fixture: ComponentFixture<NewManeuverItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewManeuverItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewManeuverItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
