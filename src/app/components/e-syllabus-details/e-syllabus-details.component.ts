import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/Student';
import { StudentSyllabus, ensureStudentSyllabus } from '../../model/StudentSyllabus';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Import FontAwesome icons
import { 
  faUser, 
  faPen, 
  faUserSlash, 
  faInfoCircle, 
  faBook, 
  faFloppyDisk, 
  faCircleInfo, 
  faSpinner,
  faEye,
  faEnvelope, 
  faPhone,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule as FaModule } from '@fortawesome/angular-fontawesome';

// Add icons to the library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

@Component({
  selector: 'app-e-syllabus-details',
  standalone: true,
  imports: [
    CommonModule,
    FaModule,
    FaIconComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './e-syllabus-details.component.html',
  styleUrls: ['./e-syllabus-details.component.scss'],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA] // Removed as it's not needed with proper FontAwesome module imports
})
export class ESyllabusDetailsComponent implements OnChanges {
  @Input() student: Student | null = null;
  
  syllabi: StudentSyllabus[] = [];
  isLoadingSyllabi = false;
  error: string | null = null;
  
  // Use the createDefaultStudent and createDefaultSyllabus from the model files
  // instead of defining default objects here
  
  constructor(
    private router: Router,
    private studentService: StudentService
  ) {}
  
  imagePath = 'assets/images/student.jpg';
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      this.syllabi = []; // Clear previous data
      this.error = null;
      
      if (this.student && this.student.id) {
        this.loadStudentSyllabi();
      }
    }
  }
  
  private loadStudentSyllabi(): void {
    if (!this.student?.id) {
      this.error = 'No student selected';
      this.syllabi = [];
      return;
    }
    
    this.isLoadingSyllabi = true;
    this.error = null;
    
    this.studentService.getStudentSyllabi(this.student.id).pipe(
      catchError(error => {
        this.isLoadingSyllabi = false;
        this.error = 'Failed to load syllabi. Please try again later.';
        console.error('Error loading student syllabi:', error);
        return of([]);
      })
    ).subscribe({
      next: (syllabi) => {
        this.isLoadingSyllabi = false;
        // Use ensureStudentSyllabus to ensure all required fields are present
        this.syllabi = (syllabi || []).map(item => ensureStudentSyllabus(item));
      },
      error: (error) => {
        this.isLoadingSyllabi = false;
        this.error = 'An error occurred while loading syllabi.';
        console.error('Error:', error);
      }
    });
  }

  // Icons
  faEye = faEye;
  faBook = faBook;
  faInfo = faInfoCircle;
  faSpinner = faSpinner;
  faHeadset = faHeadset;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faUser = faUser;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faFloppyDisk = faFloppyDisk;

  // Status mapping for UI display
  statusMap: { [key: string]: string } = {
    'COMPLETED': 'Completed',
    'IN_PROGRESS': 'In Progress',
    'NOT_STARTED': 'Not Started'
  };

  // Status CSS classes
  statusClassMap: { [key: string]: string } = {
    'COMPLETED': 'bg-success',
    'IN_PROGRESS': 'bg-warning',
    'NOT_STARTED': 'bg-secondary'
  };

  /**
   * Navigates to the detailed view of a specific syllabus
   * @param syllabus The syllabus to view details for
   * @param event Optional click event to prevent default behavior
   */
  viewSyllabusDetails(syllabus: StudentSyllabus, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (!syllabus?.syllabusId) {
      console.error('Cannot view syllabus: Invalid syllabus data');
      return;
    }
    
    // Navigate to the syllabus details page with the syllabus ID
    this.router.navigate(['/syllabus', syllabus.syllabusId], {
      state: { 
        studentId: this.student?.id,
        studentName: this.student ? `${this.student.firstName} ${this.student.lastName}` : 'Student',
        syllabusName: syllabus.syllabusName
      }
    });
  }

  goToSyllabusDetails() {
    this.router.navigate(['/dashboard/syllabus']);
  }
}
