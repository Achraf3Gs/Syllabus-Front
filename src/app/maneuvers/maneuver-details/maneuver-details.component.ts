import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faFloppyDisk,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FlightDomainService } from '../../services/flightDomain.service';
import { FlightDomain } from '../../model/FlightDomain';

@Component({
  selector: 'app-maneuver-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './maneuver-details.component.html',
  styleUrl: './maneuver-details.component.scss',
})
export class ManeuverDetailsComponent {
  @Input() maneuverItem: any;
  @Input() flightDomain!: FlightDomain;
  @Output() flightDomainDeleted = new EventEmitter<number>();

  router = inject(Router);
  flightDomainService = inject(FlightDomainService);

  selectedFlightDomain: FlightDomain = {} as FlightDomain;

  // Assign icons to class properties for template binding
  faUser = faUser;
  faTrash = faTrash;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faFloppyDisk = faFloppyDisk;

  openUpdateModal(flightDomain: FlightDomain): void {
    this.selectedFlightDomain = { ...flightDomain };
  }

  updateFlightDomain(): void {
    if (this.selectedFlightDomain && this.selectedFlightDomain.id) {
      const updatePayload = { name: this.selectedFlightDomain.name };
      this.flightDomainService.updateFlightDomain(this.selectedFlightDomain.id, updatePayload)
        .subscribe({
          next: () => {
            console.log('Update successful');
            window.location.reload();
          },
          error: (error) => {
            console.error('Update failed', error);
          },
        });
    }
  }

  deleteFlightDomain(flightDomainId: number): void {
    this.flightDomainService.deleteFlightDomain(flightDomainId).subscribe({
      next: () => {
        console.log('Flight domain deleted successfully');
        this.flightDomainDeleted.emit(flightDomainId);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting flightDomain:', error);
      },
    });
  }

  goToSyllabusDetails() {
    this.router.navigate(['dashboard/syllabusdetaile']);
  }
}
