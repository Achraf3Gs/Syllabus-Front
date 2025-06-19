import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
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
import { NgClass, NgIf } from '@angular/common';
import { PhaseService } from '../../services/phase.service';

@Component({
  selector: 'app-phase-details',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, NgIf],
  templateUrl: './phase-details.component.html',
  styleUrl: './phase-details.component.scss',
})
export class PhaseDetailsComponent {
  @Input() phase: any;
  @Output() phaseDeleted = new EventEmitter<number>();

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
  phaseService = inject(PhaseService);
  router = inject(Router);

  deletePhase(phaseId: number): void {
    if (confirm('Are you sure you want to delete this phase?')) {
      this.phaseService.deletePhase(phaseId).subscribe({
        next: (response) => {
          console.log('Maneuver item deleted successfully');

          // Reload the page or trigger parent reload
          window.location.reload(); // Simple but not elegant

          // OR emit to parent (preferred)
          this.phaseDeleted.emit(phaseId);
        },
        error: (error) => {
          console.error('Error deleting phase:', error);
        },
      });
    }
  }
}
