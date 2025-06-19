import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerMotPassComponent } from './changer-mot-pass.component';

describe('ChangerMotPassComponent', () => {
  let component: ChangerMotPassComponent;
  let fixture: ComponentFixture<ChangerMotPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangerMotPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangerMotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
