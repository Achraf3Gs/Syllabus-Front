import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptycomponentComponent } from './emptycomponent.component';

describe('EmptycomponentComponent', () => {
  let component: EmptycomponentComponent;
  let fixture: ComponentFixture<EmptycomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptycomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptycomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
