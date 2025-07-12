import { NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../model/Student';
import { Syllabus } from '../../model/Syllabus';
import { StudentSyllabus } from '../../model/StudentSyllabus';
import { StudentService } from '../../services/student.service';
import { SyllabusService } from '../../services/syllabus.service';

@Component({
  selector: 'app-newstudent-syllabus',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, NgIf,FormsModule , CommonModule, RouterModule],
  templateUrl: './newstudent-syllabus.component.html',
  styleUrl: './newstudent-syllabus.component.scss'
})
export class NewstudentSyllabusComponent {
  // Icons
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;

  // Form model
  selectedStudentId: number | null = null;
  selectedSyllabusId: number | null = null;
  
  // Data lists
  studentList: Student[] = [];
  syllabusList: Syllabus[] = [];
  
  // UI state
  isSaving = false;
  errorMessage = '';

  http = inject(HttpClient);
  StudentService = inject(StudentService);
 SyllabusService = inject(SyllabusService);
  router = inject(Router);
 

  onStudentSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.selectedStudentId = value ? parseInt(value, 10) : null;
    // Clear syllabus selection when student changes
    this.selectedSyllabusId = null;
    console.log('Selected student ID:', this.selectedStudentId, 'Raw value:', value);
  }

  onSyllabusSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.selectedSyllabusId = value ? parseInt(value, 10) : null;
    console.log('Selected syllabus ID:', this.selectedSyllabusId, 'Raw value:', value);
  }

  ngOnInit(): void {
    this.StudentService.listStudents().subscribe((response: any) => {
      this.studentList = response;
      console.log('listofStudents:', this.studentList);
    });

    this.SyllabusService.listSyllabus().subscribe((response) => {
      this.syllabusList = response;
      console.log('listofSyllabus:', this.syllabusList);

   
    });
  }

  

  onSave() {
    console.log('onSave called', {
      studentId: this.selectedStudentId,
      syllabusId: this.selectedSyllabusId
    });

    if (!this.selectedStudentId) {
      this.errorMessage = 'Please select a student';
      return;
    }

    if (!this.selectedSyllabusId) {
      this.errorMessage = 'Please select a syllabus';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    this.StudentService.assignSyllabus(this.selectedStudentId, this.selectedSyllabusId).subscribe({
      next: (assignment: StudentSyllabus) => {
        console.log('Syllabus assigned successfully', assignment);
        this.router.navigate(['/dashboard/esyllabus']);
      },
      error: (error: any) => {
        console.group('Error Details');
        console.error('Status:', error.status, error.statusText);
        console.error('Error Object:', error);
        console.error('Error Response:', error.error);
        console.groupEnd();
        
        let errorMessage = 'Failed to assign syllabus. Please try again.';
        
        if (error.status === 0) {
          errorMessage = 'Cannot connect to the server. Please check your internet connection.';
        } else if (error.status === 401 || error.status === 403) {
          errorMessage = 'Authentication failed. Please log in again.';
          // Optionally redirect to login
          this.router.navigate(['/login']);
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.errorMessage = errorMessage;
        this.isSaving = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard/students']);
  }


}

