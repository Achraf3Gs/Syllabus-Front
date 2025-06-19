import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faEraser,
  faCalendarDays,
  faUsers,
  faPlaneDeparture,
  faSheetPlastic,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grade-sheet-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './grade-sheet-details.component.html',
  styleUrl: './grade-sheet-details.component.scss',
})
export class GradeSheetDetailsComponent {
  constructor(private router: Router) {}
  imagePath = 'student.jpg';

  // Assign icons to class properties for template binding
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faEraser = faEraser;
  faCalendarDays = faCalendarDays;
  faUsers = faUsers;
  faPlaneDeparture = faPlaneDeparture;
  faSheetPlastic = faSheetPlastic;

  goToSyllabusDetails() {
    this.router.navigate(['/standardGradeSheet']);
  }
}
