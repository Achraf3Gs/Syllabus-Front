import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Instructor } from '../../model/Instructor';
import { InsructorService } from '../../services/insructor.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-instructor',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './new-instructor.component.html',
  styleUrl: './new-instructor.component.scss',
})
export class NewInstructorComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newInstructor: Instructor = {
    id: 0,
    firstName: '',
    lastName: '',
    grade: '',

  };
  errorMessage: string = '';
  instructorService = inject(InsructorService);
  router = inject(Router);

  onSave(): void {
    this.instructorService.createInstructor(this.newInstructor).subscribe({
      next: () => {
        this.router.navigate(['dashboard/instructors']);
      },
      error: (error) => {
        console.error('Error creating instructor:', error);
        this.errorMessage = 'Failed to create instructor. Please try again.';
      },
    });
  }
}
