import { Component, OnInit } from '@angular/core';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ESyllabusDetailsComponent } from '../../components/e-syllabus-details/e-syllabus-details.component';
import { EsyllabusButtonComponent } from '../../components/esyllabus-button/esyllabus-button.component';
import { GradeSheetDetailsComponent } from '../../components/grade-sheet-details/grade-sheet-details.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/Student';
@Component({
  selector: 'app-e-syllabus',
  standalone: true,
  imports: [
    CommonModule,
    ESyllabusDetailsComponent,
    PaginationComponent, 
    EsyllabusButtonComponent,
    GradeSheetDetailsComponent
  ],
  templateUrl: './e-syllabus.component.html',
  styleUrl: './e-syllabus.component.scss'
})
export class ESyllabusComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.error = 'Failed to load students. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  goToNewStudentSyllabus() {
    this.router.navigate(['dashboard/newstudent-syllabus']);
  }
}
