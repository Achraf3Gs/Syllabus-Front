import { Component, Input, OnInit } from '@angular/core';
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
  faNoteSticky,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-flight-domain-syllabusdetails',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './flight-domain-syllabusdetails.component.html',
  styleUrl: './flight-domain-syllabusdetails.component.scss',
})
export class FlightDomainSyllabusdetailsComponent {
  @Input() flightDoaminSyllabus: any = '';
  constructor(private router: Router) {}
  imagePath = 'student.jpg';

  ngOnInit(): void {
    console.log(
      'Passing this.flightDomainSyllabus:',
      this.flightDoaminSyllabus
    );

  }

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
    this.router.navigate(['dashboard/flightDoaminSyllabusTemplateComponent']);
  }

  goToNewFlightDomainGradeSheet() {
    this.router.navigate(['/newGradeSheet']);
  }
}
