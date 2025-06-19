import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAircraftComponent } from './page-aircraft.component';

describe('PageAircraftComponent', () => {
  let component: PageAircraftComponent;
  let fixture: ComponentFixture<PageAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAircraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
