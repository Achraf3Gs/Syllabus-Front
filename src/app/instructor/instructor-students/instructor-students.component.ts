import { Instructor } from './../../model/Instructor';
import { Component, inject, OnInit } from '@angular/core';
import { StudentDetailsComponent } from '../../components/student-details/student-details.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgFor, NgIf } from '@angular/common';
import { InsructorService } from '../../services/insructor.service';

@Component({
  selector: 'app-instructor-students',
  standalone: true,
  imports: [
    StudentDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor,NgIf
  ],
  templateUrl: './instructor-students.component.html',
  styleUrl: './instructor-students.component.scss',
})
export class InstructorStudentsComponent implements OnInit {
  students: any;
  instructor: any;

  studentService = inject(StudentService);
  instructorService = inject(InsructorService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  instructorId!: number;

  ngOnInit(): void {
    this.instructorId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Instructor ID:', this.instructorId);
    // Fetch students using this ID...

    this.studentService
      .listInstructorStudents(this.instructorId)
      .subscribe((response) => {
        this.students = response;
        console.log('listofStudents:', this.students);
      });
    this.instructorService
      .GetInstructor(this.instructorId)
      .subscribe((response) => {
        this.instructor = response;
        console.log('instructor:', this.instructor);
      });
  }
}
