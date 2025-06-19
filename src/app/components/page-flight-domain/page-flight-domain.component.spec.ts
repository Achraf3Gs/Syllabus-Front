import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFlightDomainComponent } from './page-flight-domain.component';

describe('PageManeuverGroupComponent', () => {
  let component: PageFlightDomainComponent;
  let fixture: ComponentFixture<PageFlightDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFlightDomainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageFlightDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
