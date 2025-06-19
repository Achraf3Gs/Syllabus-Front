import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortiesTypesDetailsComponent } from './sorties-types-details.component';

describe('SortiesTypesDetailsComponent', () => {
  let component: SortiesTypesDetailsComponent;
  let fixture: ComponentFixture<SortiesTypesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortiesTypesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortiesTypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
