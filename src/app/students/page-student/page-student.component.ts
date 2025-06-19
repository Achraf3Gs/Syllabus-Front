import { Component, inject, OnInit } from '@angular/core';
import { StudentDetailsComponent } from '../../components/student-details/student-details.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

import { NgFor } from '@angular/common';

@Component({
  selector: 'app-page-student',
  standalone: true,
  imports: [
    StudentDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor,
  ],
  templateUrl: './page-student.component.html',
  styleUrl: './page-student.component.scss',
})
export class PageStudentComponent implements OnInit {
  students: any;

  studentService = inject(StudentService);
  router = inject(Router);
  ngOnInit(): void {
    this.studentService.listStudents().subscribe((response) => {
      this.students = response;
      console.log('listofStudents:', this.students);
    });
  }

  goToNewStudent() {
    this.router.navigate(['dashboard/newstudent']);
  }
}
