import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Aircraft } from '../../model/Aircraft';
import { AircraftService } from '../../services/aircraft.service';


@Component({
  selector: 'app-new-aircraft',
  standalone: true,
  imports: [ FontAwesomeModule,
      RouterModule,
      ReactiveFormsModule,
      RouterModule,
      FormsModule,
      NgIf,],
  templateUrl: './new-aircraft.component.html',
  styleUrl: './new-aircraft.component.scss'
})
export class NewAircraftComponent {

 faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newAircraft: Aircraft = {
    registration: '',
    availability: false,
    causes: '',
  };
  errorMessage: string = '';
  aircraftService = inject(AircraftService);
  router = inject(Router);

  onSave(): void {
    this.aircraftService.createAircraft(this.newAircraft).subscribe({
      next: () => {
        this.router.navigate(['dashboard/aircrafts']);
      },
      error: (error) => {
        console.error('Error creating aircraft:', error);
        this.errorMessage = 'Failed to create aircraft. Please try again.';
      },
    });
  }
}

