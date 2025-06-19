import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewflightDomainComponent } from './newflight-domain.component';

describe('NewflightDomainComponent', () => {
  let component: NewflightDomainComponent;
  let fixture: ComponentFixture<NewflightDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewflightDomainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewflightDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
