import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faUsersViewfinder,
  faRocket,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { SortiesTypesService } from '../../services/sorties-types.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sorties-types-details',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, NgIf],
  templateUrl: './sorties-types-details.component.html',
  styleUrl: './sorties-types-details.component.scss',
})
export class SortiesTypesDetailsComponent {
  @Input() sortiesType: any;
  @Output() sortiesTypeDeleted = new EventEmitter<number>();

  // Assign icons to class properties for template binding
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faUsersViewfinder = faUsersViewfinder;
  faRocket = faRocket;
  faTrash = faTrash;
  sortiesTypeService = inject(SortiesTypesService);
  router = inject(Router);

  deleteSortiesType(sortiesTypeId: number): void {
    if (confirm('Are you sure you want to delete this SortiesType?')) {
      this.sortiesTypeService.deleteSortiesType(sortiesTypeId).subscribe({
        next: (response) => {
          console.log('Maneuver item deleted successfully');

          // Reload the page or trigger parent reload
          window.location.reload(); // Simple but not elegant

          // OR emit to parent (preferred)
          this.sortiesTypeDeleted.emit(sortiesTypeId);
        },
        error: (error) => {
          console.error('Error deleting phase:', error);
        },
      });
    }
  }
}

