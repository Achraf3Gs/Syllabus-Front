import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
// Import required icons from Font Awesome Solid
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faLocationDot,
  faEnvelope,
  faMobile,

} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
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
  faLocationDot = faLocationDot;
  faEnvelope = faEnvelope;
  faMobile = faMobile;
  
  goToSyllabusDetails() {
    this.router.navigate(['/syllabusdetaile']);
  }
}
