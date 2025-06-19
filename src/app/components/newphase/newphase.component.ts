import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Instructor } from '../../model/Instructor';
import { InsructorService } from '../../services/insructor.service';
import { NgIf } from '@angular/common';
import { Phase } from '../../model/Phase';
import { PhaseService } from '../../services/phase.service';

@Component({
  selector: 'app-newphase',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './newphase.component.html',
  styleUrl: './newphase.component.scss',
})
export class NewphaseComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newPhase: Phase = {
    
    phaseName: '',
  };
  errorMessage: string = '';
  phaseService = inject(PhaseService);
  router = inject(Router);

  onSave(): void {
    this.phaseService.createPhase(this.newPhase).subscribe({
      next: () => {
        this.router.navigate(['dashboard/phase']);
      },
      error: (error) => {
        console.error('Error creating phase:', error);
        this.errorMessage = 'Failed to create phase. Please try again.';
      },
    });
  }
}
