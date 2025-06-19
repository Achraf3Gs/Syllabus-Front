import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FlightDomain } from '../../model/FlightDomain';
import { FlightDomainService } from '../../services/flightDomain.service';

@Component({
  selector: 'app-newflight-domain',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './newflight-domain.component.html',
  styleUrl: './newflight-domain.component.scss',
})
export class NewflightDomainComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newflightDomain: FlightDomain = {
    name: '',
  };
  errorMessage: string = '';
  flightDomainService = inject(FlightDomainService);
  router = inject(Router);

  onSave(): void {
    this.flightDomainService
      .createFlightDomain(this.newflightDomain)
      .subscribe({
        next: () => {
          this.router.navigate(['dashboard/flightDomain']);
        },
        error: (error) => {
          console.error('Error creating flightDomain:', error);
          this.errorMessage =
            'Failed to create flightDomain. Please try again.';
        },
      });
  }
}
