import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Import required icons from Font Awesome Solid
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-e-syllabus-details',
  standalone: true,
imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './e-syllabus-details.component.html',
  styleUrl: './e-syllabus-details.component.scss',
})
export class ESyllabusDetailsComponent {
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
  faFloppyDisk = faFloppyDisk;;

  goToSyllabusDetails() {
    this.router.navigate(['dashboard/syllabusdetaile']);
  }
}
