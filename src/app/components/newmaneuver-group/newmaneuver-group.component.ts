import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { maneuverGroup } from '../../model/FlightDomain';
import { ManeuverGroupService } from '../../services/flightDomain.service';

@Component({
  selector: 'app-newmaneuver-group',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './newmaneuver-group.component.html',
  styleUrl: './newmaneuver-group.component.scss',
})
export class NewmaneuverGroupComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newManeuverGroup: maneuverGroup = {
    name: '',
  };
  errorMessage: string = '';
  maneuverGroupService = inject(ManeuverGroupService);
  router = inject(Router);

  onSave(): void {
    this.maneuverGroupService
      .createManeuverGroup(this.newManeuverGroup)
      .subscribe({
        next: () => {
          this.router.navigate(['dashboard/group']);
        },
        error: (error) => {
          console.error('Error creating maneuverGroup:', error);
          this.errorMessage =
            'Failed to create maneuverGroup. Please try again.';
        },
      });
  }
}
