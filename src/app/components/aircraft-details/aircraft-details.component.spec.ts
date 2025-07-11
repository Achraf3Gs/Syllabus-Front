import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftDetailsComponent } from './aircraft-details.component';

describe('AircraftDetailsComponent', () => {
  let component: AircraftDetailsComponent;
  let fixture: ComponentFixture<AircraftDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AircraftDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AircraftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
