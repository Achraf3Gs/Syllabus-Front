import { Component, Input } from '@angular/core';
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
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maneuver-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './maneuver-details.component.html',
  styleUrl: './maneuver-details.component.scss',
})
export class ManeuverDetailsComponent {
  @Input() maneuverItem: any; // includes all data
  @Input() flightDomain: any = ''; // this is for the name like "PRE-FLIGHT & DEPARTURE"

  constructor(private router: Router) {}
  imagePath = 'student.jpg';

  // Assign icons to class properties for template binding
  faUser = faUser;
  faTrash = faTrash;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faFloppyDisk = faFloppyDisk;

  goToSyllabusDetails() {
    this.router.navigate(['dashboard/syllabusdetaile']);
  }
}
