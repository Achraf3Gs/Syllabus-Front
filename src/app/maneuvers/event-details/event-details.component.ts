import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faEraser,
  faCalendarDays,
  faUsers,
  faPlaneDeparture,
  faSheetPlastic,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FlightDomainService } from '../../services/flightDomain.service';
import { ManeuverItemService } from '../../services/maneuver-item.service';
import { ManeuverItem } from '../../model/maneuverItem';
import { Phase } from '../../model/Phase';
@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, NgIf, NgFor],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit {
  ngOnInit(): void {}

  @Input() maneuverItem: any;
  @Input() flightDomain: any = '';
  @Input() cts: any;
  @Output() maneuverUpdated = new EventEmitter<any>(); // Optional: to notify parent of successful update
  @Output() maneuverDeleted = new EventEmitter<number>();
  isEmpty(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  item: any;
  getCriteriaItems(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient);
  errorMessage: string = '';
  flightDomainService = inject(FlightDomainService);
  maneuverItemService = inject(ManeuverItemService);
  router = inject(Router);
  imagePath = 'student.jpg';

  // Assign icons to class properties for template binding
  faUser = faUser;
  faEdit = faEdit;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faEraser = faEraser;
  faCalendarDays = faCalendarDays;
  faUsers = faUsers;
  faPlaneDeparture = faPlaneDeparture;
  faSheetPlastic = faSheetPlastic;

  onSave(): void {
    // Debug logs
    console.log('DEBUG - this.maneuverItem:', this.maneuverItem);
    console.log('DEBUG - this.flightDomain:', this.flightDomain);

    // Validate required data
    if (!this.maneuverItem || !this.flightDomain) {
      console.error('Missing required data: maneuverItem or group');
      return;
    }

    // Destructure to remove 'id' from the payload
    const { id, ...rest } = this.maneuverItem;

    // Prepare the maneuver item data without 'id'
    const maneuverData = {
      ...rest,
      cts: {
        unsatisfactory: this.maneuverItem.cts?.unsatisfactory || [],
        fair: this.maneuverItem.cts?.fair || [],
        good: this.maneuverItem.cts?.good || [],
        excellent: this.maneuverItem.cts?.excellent || [],
      },
    } as ManeuverItem;

    // Log the final JSON body
    console.log('ManeuverItem to be updated:', maneuverData);
    console.log('ManeuverItem JSON:', JSON.stringify(maneuverData, null, 2));

    // Call the update service method
    this.maneuverItemService
      .updateManeuverItem(maneuverData, this.flightDomain.id, id)
      .subscribe({
        next: (response) => {
          console.log('Maneuver item updated successfully:', response);
          this.maneuverUpdated.emit(response); // Notify parent if needed
          this.closeModal(); // Close modal/dialog
        },
        error: (error) => {
          console.error('Error updating maneuver item:', error);
          // Optionally handle with toast/notification service
        },
      });
  }

  private closeModal(): void {
    // Close the modal using Bootstrap's modal methods
    const modalElement = document.getElementById(
      `modifyModal_${this.maneuverItem.id}`
    );
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
  // Method to open the modify modal
  openModifyModal(maneuverItem: any) {
    // Convert strings to arrays before binding to the modal
    this.maneuverItem = {
      ...maneuverItem,
      cts: {
        unsatisfactory: this.stringToArray(maneuverItem.cts.unsatisfactory),
        fair: this.stringToArray(maneuverItem.cts.fair),
        good: this.stringToArray(maneuverItem.cts.good),
        excellent: this.stringToArray(maneuverItem.cts.excellent),
      },
    };
  }
  stringToArray(value: any): string[] {
    if (typeof value === 'string') {
      return value
        .split(/[\n,]/) // split on new lines OR commas
        .map((e) => e.trim())
        .filter(Boolean);
    }

    if (Array.isArray(value)) {
      // If array has 1 string that contains commas, split it
      if (
        value.length === 1 &&
        typeof value[0] === 'string' &&
        value[0].includes(',')
      ) {
        return value[0]
          .split(',')
          .map((e) => e.trim())
          .filter(Boolean);
      }

      // If it's already a clean array of strings
      return value
        .map((e) => (typeof e === 'string' ? e.trim() : ''))
        .filter(Boolean);
    }

    return [];
  }

  // Helper method to convert array back to string for textarea display
  arrayToString(value: string[]): string {
    return Array.isArray(value) ? value.join(',\n') : value || '';
  }

  deleteManeuverItem(maneuverItemId: number): void {
    if (confirm('Are you sure you want to delete this maneuver item?')) {
      this.maneuverItemService.deleteManeuverItem(maneuverItemId).subscribe({
        next: (response) => {
          console.log('Maneuver item deleted successfully');

          // Reload the page or trigger parent reload
          window.location.reload(); // Simple but not elegant

          // OR emit to parent (preferred)
          this.maneuverDeleted.emit(maneuverItemId);
        },
        error: (error) => {
          console.error('Error deleting maneuver item:', error);
        },
      });
    }
  }
}
