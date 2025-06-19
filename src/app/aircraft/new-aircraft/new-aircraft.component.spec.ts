import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAircraftComponent } from './new-aircraft.component';

describe('NewAircraftComponent', () => {
  let component: NewAircraftComponent;
  let fixture: ComponentFixture<NewAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAircraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
