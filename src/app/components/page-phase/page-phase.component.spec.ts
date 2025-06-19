import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePhaseComponent } from './page-phase.component';

describe('PagePhaseComponent', () => {
  let component: PagePhaseComponent;
  let fixture: ComponentFixture<PagePhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePhaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
