import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faFloppyDisk,
  faNoteSticky,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-syllabus-deatails',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './syllabus-deatails.component.html',
  styleUrl: './syllabus-deatails.component.scss',
})
export class SyllabusDeatailsComponent {
  @Input() syllabus: any = '';
  constructor(private router: Router) {}
  imagePath = 'student.jpg';

  ngOnInit(): void {}

  // Assign icons to class properties for template binding
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faFloppyDisk = faFloppyDisk;
  faNoteSticky = faNoteSticky;
  faNewspaper = faNewspaper;

  goToSyllabusDetails() {
    this.router.navigate(['dashboard/syllabusdetaile']);
  }

  goToNewFlightDomainSyllabus() {
    this.router.navigate(['dashboard/newflightDomainSyllabus']);
  }
}

