import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faPen,
  faUserSlash,
  faFloppyDisk,
  faNoteSticky,
    faNewspaper,
    faEraser,
} from '@fortawesome/free-solid-svg-icons';

import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { FlightDoaminSyllabus } from '../../model/FlightDoaminSyllabus';

@Component({
  selector: 'app-flight-domain-syllabusdetails',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './flight-domain-syllabusdetails.component.html',
  styleUrls: ['./flight-domain-syllabusdetails.component.scss'],
})
export class FlightDomainSyllabusdetailsComponent implements OnInit {
  @Input() flightDoaminSyllabus!: FlightDoaminSyllabus;
  selectedSyllabus: FlightDoaminSyllabus = {} as FlightDoaminSyllabus;

  // Icons
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faFloppyDisk = faFloppyDisk;
  faNoteSticky = faNoteSticky;
  faEraser = faEraser;
  faNewspaper = faNewspaper;

  constructor(
    private router: Router,
    private flightDomainSyllabusService: FlightDomainSyllabusService
  ) {}

  ngOnInit(): void {
    // The flightDoaminSyllabus is received via @Input
  }

  goToSyllabusDetails() {
    this.router.navigate(['dashboard/flightDoaminSyllabusTemplateComponent']);
  }

  goToNewFlightDomainGradeSheet() {
    this.router.navigate(['/newGradeSheet']);
  }

  openUpdateModal(syllabus: FlightDoaminSyllabus): void {
    // Create a deep copy to avoid modifying the original object directly in the form
    this.selectedSyllabus = JSON.parse(JSON.stringify(syllabus));
  }

  updateFlightDomainSyllabus(): void {
    if (this.selectedSyllabus && this.selectedSyllabus.id && this.flightDoaminSyllabus.syllabus?.id) {
      this.flightDomainSyllabusService
        .updateFlightDoaminSyllabus(
          this.selectedSyllabus,
          this.flightDoaminSyllabus.syllabus.id,
          this.selectedSyllabus.id
        )
        .subscribe({
          next: (response: any) => {
            console.log('Update successful', response);
            // Update the original object with the new data
            Object.assign(this.flightDoaminSyllabus, this.selectedSyllabus);

            // Close the modal by targeting its ID
            const closeButton = document.querySelector('#exampleModal .btn-close') as HTMLElement;
            if (closeButton) {
              closeButton.click();
            }
          },
          error: (error: any) => {
            console.error('Update failed', error);
          },
        });
    }
  }

   onDelete(flightDomainSyllabusId: number) {
    if (!this.flightDoaminSyllabus.syllabus?.id) {
      console.error('Cannot delete: Syllabus ID is missing.');
      return;
    }

    this.flightDomainSyllabusService
      .deleteFlightDoaminSyllabus(
        flightDomainSyllabusId
      )
      .subscribe({
      next: () => {
        console.log('flightDomainSyllabus deleted');
        // Trick Angular to reload the same route
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['dashboard/flightDomainSyllabus']);
          });
      },
      error: (err) => {
        console.error('Error deleting flightDomainSyllabus:', err);
      },
    });
  }
}

