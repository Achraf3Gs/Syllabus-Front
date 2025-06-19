import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewphaseComponent } from './newphase.component';

describe('NewphaseComponent', () => {
  let component: NewphaseComponent;
  let fixture: ComponentFixture<NewphaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewphaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
