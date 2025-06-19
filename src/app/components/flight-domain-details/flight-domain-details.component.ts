import { FlightDomain } from '../../model/FlightDomain';
import { NgClass, NgIf } from '@angular/common';
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
import { FlightDomainService } from '../../services/flightDomain.service';

@Component({
  selector: 'app-flight-domain-details',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, NgIf],
  templateUrl: './flight-domain-details.component.html',
  styleUrl: './flight-domain-details.component.scss',
})
export class FlightDomainDetailsComponent {
  @Input() flightDomain: any;
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

  flightDomainService = inject(FlightDomainService);
  router = inject(Router);

  deleteFlightDomain(flightDomainId: number): void {
    if (confirm('Are you sure you want to delete this flightDomain?')) {
      this.flightDomainService.deleteFlightDomain(flightDomainId).subscribe({
        next: (response) => {
          console.log('Maneuver item deleted successfully');

          // Reload the page or trigger parent reload
          window.location.reload(); // Simple but not elegant

          // OR emit to parent (preferred)
          this.phaseDeleted.emit(flightDomainId);
        },
        error: (error) => {
          console.error('Error deleting flightDomain:', error);
        },
      });
    }
  }
}
