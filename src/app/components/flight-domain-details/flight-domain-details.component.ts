import { FlightDomain } from '../../model/FlightDomain';

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
  faFloppyDisk, // Import faFloppyDisk
} from '@fortawesome/free-solid-svg-icons';
import { FlightDomainService } from '../../services/flightDomain.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-flight-domain-details',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './flight-domain-details.component.html',
  styleUrl: './flight-domain-details.component.scss',
})
export class FlightDomainDetailsComponent {
  @Input() flightDomain!: FlightDomain;
  @Output() flightDomainDeleted = new EventEmitter<number>();

  selectedFlightDomain: FlightDomain = {} as FlightDomain;

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
  faFloppyDisk = faFloppyDisk; // Add faFloppyDisk

  flightDomainService = inject(FlightDomainService);
  router = inject(Router);

  openUpdateModal(flightDomain: FlightDomain): void {
    // Create a copy to avoid modifying the original object directly
    this.selectedFlightDomain = { ...flightDomain };
  }

  updateFlightDomain(): void {
    if (this.selectedFlightDomain && this.selectedFlightDomain.id) {
      const updatePayload = { name: this.selectedFlightDomain.name };
      this.flightDomainService.updateFlightDomain(this.selectedFlightDomain.id, updatePayload)
        .subscribe({
          next: () => {
            console.log('Update successful');
            // Reload the page to see the changes
            window.location.reload();
          },
          error: (error) => {
            console.error('Update failed', error);
          },
        });
    }
  }

  deleteFlightDomain(flightDomainId: number): void {
    if (confirm('Are you sure you want to delete this flightDomain?')) {
      this.flightDomainService.deleteFlightDomain(flightDomainId).subscribe({
        next: () => {
          console.log('Flight domain deleted successfully');
          this.flightDomainDeleted.emit(flightDomainId);
        },
        error: (error) => {
          console.error('Error deleting flightDomain:', error);
        },
      });
    }
  }
}
