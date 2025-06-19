import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSortiesTpyesComponent } from './page-sorties-tpyes.component';

describe('PageSortiesTpyesComponent', () => {
  let component: PageSortiesTpyesComponent;
  let fixture: ComponentFixture<PageSortiesTpyesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSortiesTpyesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSortiesTpyesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
