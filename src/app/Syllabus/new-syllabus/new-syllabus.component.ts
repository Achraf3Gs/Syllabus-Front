import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Syllabus } from '../../model/Syllabus';
import { SyllabusService } from '../../services/syllabus.service';
import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { FlightDoaminSyllabus } from '../../model/FlightDoaminSyllabus';

@Component({
  selector: 'app-new-syllabus',
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
  templateUrl: './new-syllabus.component.html',
  styleUrl: './new-syllabus.component.scss',
})
export class NewSyllabusComponent implements OnInit {
  syllabus: any;
  syllabusService = inject(SyllabusService);

  ngOnInit(): void {}
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  newSyllabus: Syllabus = {
    title: '',
  };

  errorMessage: string = '';

  router = inject(Router);

  onSave(): void {
    this.syllabusService.createSyllabus(this.newSyllabus).subscribe({
      next: () => {
        this.router.navigate(['dashboard/syllabus']);
      },
      error: (error) => {
        console.error('Error creating syllabus:', error);
        this.errorMessage = 'Failed to create new syllabus. Please try again.';
      },
    });
  }
}

