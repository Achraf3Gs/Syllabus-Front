import { InstructorDetailsComponent } from './../../components/instructor-details/instructor-details.component';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Router } from '@angular/router'; // import Router
import { InsructorService } from '../../services/insructor.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-page-instructor',
  standalone: true,
  imports: [
    InstructorDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor
  ],
  templateUrl: './page-instructor.component.html',
  styleUrl: './page-instructor.component.scss',
})
export class PageInstructorComponent implements OnInit {
  instructors: any;

  instructorService = inject(InsructorService);
  router = inject(Router);
  ngOnInit(): void {
    this.instructorService.listInstructor().subscribe((response) => {
      this.instructors = response;
      console.log('listofInstructor:', this.instructors);
    });
  }
  goToNewInstructor() {
    this.router.navigate(['dashboard/newinstructor']);
  }
}
