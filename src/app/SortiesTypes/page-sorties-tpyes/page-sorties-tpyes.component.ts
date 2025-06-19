import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { NgFor } from '@angular/common';
import { SortiesTypesDetailsComponent } from '../sorties-types-details/sorties-types-details.component';
import { SortiesTypesService } from '../../services/sorties-types.service';

@Component({
  selector: 'app-page-sorties-tpyes',
  standalone: true,
  imports: [
    SortiesTypesDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor,
  ],
  templateUrl: './page-sorties-tpyes.component.html',
  styleUrl: './page-sorties-tpyes.component.scss',
})
export class PageSortiesTpyesComponent implements OnInit {
  sortiesTypes: any;

  sortiesTypesService = inject(SortiesTypesService);
  router = inject(Router);
  ngOnInit(): void {
    this.sortiesTypesService.listSortiesType().subscribe((response) => {
      this.sortiesTypes = response;
      console.log('listofSortiesTypes:', this.sortiesTypes);
    });
  }
  goToNewSortiesType() {
    this.router.navigate(['dashboard/newsortiesType']);
  }
}
