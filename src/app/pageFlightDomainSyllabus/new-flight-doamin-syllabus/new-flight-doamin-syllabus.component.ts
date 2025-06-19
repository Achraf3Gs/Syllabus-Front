import { FlightDoaminSyllabus } from './../../model/FlightDoaminSyllabus';
import { Syllabus } from './../../model/Syllabus';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Instructor } from '../../model/Instructor';
import { InsructorService } from '../../services/insructor.service';
import { NgFor, NgIf } from '@angular/common';
import { Phase } from '../../model/Phase';
import { PhaseService } from '../../services/phase.service';

import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { SyllabusService } from '../../services/syllabus.service';


@Component({
  selector: 'app-new-flight-doamin-syllabus',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './new-flight-doamin-syllabus.component.html',
  styleUrl: './new-flight-doamin-syllabus.component.scss',
})
export class NewFlightDoaminSyllabusComponent implements OnInit {
  syllabuss: Syllabus[] = [];
  syllabusService = inject(SyllabusService);
  flightDomainSyllabusService = inject(FlightDomainSyllabusService);

  ngOnInit(): void {
    this.syllabusService.listSyllabus().subscribe((response) => {
      this.syllabuss = response;
      console.log('listofSyllabus:', this.syllabuss);
    });
  }
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newFlightDoaminSyllabus: FlightDoaminSyllabus = {
    name: '',
    block: 0,
    syllabus: {
      id: undefined,
      title: '',
      
    },
  };

  syllabus: any;
  errorMessage: string = '';
  flightDoaminSyllabusService = inject(FlightDomainSyllabusService);
  router = inject(Router);


  onSave(): void {
    const title = this.newFlightDoaminSyllabus.syllabus?.title;

    if (!title) {
      this.errorMessage = 'Syllabus title is missing.';
      return;
    }

    this.syllabusService.getSyllabusByTitle(title).subscribe({
      next: (response) => {
        this.syllabus = response;
        this.flightDoaminSyllabusService
          .createFlightDoaminSyllabus(
            this.newFlightDoaminSyllabus,
            this.syllabus.id
          )
          .subscribe({
            next: () =>
              this.router.navigate(['dashboard/flightDomainSyllabus']),
            error: (err) => {
              console.error('Error creating maneuver item:', err);
              this.errorMessage = 'Failed to create flightDomainSyllabus.';
            },
          });
      },
      error: () => {
        this.errorMessage = 'Syllabus not found. Invalid name.';
      },
    });
  }
}
