import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { SortiesType } from '../../model/SortiesType';
import { SortiesTypesService } from '../../services/sorties-types.service';

@Component({
  selector: 'app-new-sorties-types',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './new-sorties-types.component.html',
  styleUrl: './new-sorties-types.component.scss',
})
export class NewSortiesTypesComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newSortiesType: SortiesType = {
    sortiesTypeName: '',
  };
  errorMessage: string = '';
  sortiesTypesService = inject(SortiesTypesService);
  router = inject(Router);

  onSave(): void {
    console.log("sortiesName:",this.newSortiesType.sortiesTypeName);
    this.sortiesTypesService.createSortiesType(this.newSortiesType).subscribe({
      next: () => {
        this.router.navigate(['dashboard/sortiesTypes']);
      },
      error: (error) => {
        console.error('Error creating SortiesType:', error);
        this.errorMessage = 'Failed to create SortiesType. Please try again.';
      },
    });
  }
}
