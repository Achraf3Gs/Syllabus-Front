import { Component, inject, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faUsersViewfinder,
} from '@fortawesome/free-solid-svg-icons';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-instructor-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.scss',
})
export class InstructorDetailsComponent {
  StudentsList: any;
  constructor(private router: Router) {}
  studentService = inject(StudentService);

  imagePath = 'student.jpg';
  @Input() instructor: any;

  // Assign icons to class properties for template binding
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faUsersViewfinder = faUsersViewfinder;

  goToInstructorStudents(id: number): void {
    this.router.navigate(['dashboard/instructor-students', id]);
  }
}
