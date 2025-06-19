import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSortiesTypesComponent } from './new-sorties-types.component';

describe('NewSortiesTypesComponent', () => {
  let component: NewSortiesTypesComponent;
  let fixture: ComponentFixture<NewSortiesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSortiesTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSortiesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
