import { Component, inject, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Student } from '../../model/Student';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { InsructorService } from '../../services/insructor.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, FormsModule, NgIf],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss',
})
export class NewStudentComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  instructor: any;
  student: Student = {
    firstName: '',
    lastName: '',
    grade: '',
    id: undefined,
    callSign: undefined,
    instructor: {
      id: undefined,
      firstName: '',
      lastName: '',
      grade: '',
      callSign: undefined,
    },
  };

  http = inject(HttpClient);
  errorMessage: string = '';
  instructorService = inject(InsructorService);
  studentService = inject(StudentService);
  router = inject(Router);

  onSave() {
    const callSign = this.student.instructor?.callSign;

    if (!callSign) {
      this.errorMessage = 'Instructor call sign is missing.';
      return;
    }

    this.instructorService.getInstructorByCallSign(callSign).subscribe({
      next: (response) => {
        this.instructor = response;
        this.studentService
          .createStudent(this.student, this.instructor.id)
          .subscribe({
            next: () => this.router.navigate(['dashboard/students']),
            error: (err) => (this.errorMessage = 'Failed to create student.'),
          });
      },
      error: () => {
        this.errorMessage = 'Instructor not found. Invalid call sign.';
      },
    });
  }
}
