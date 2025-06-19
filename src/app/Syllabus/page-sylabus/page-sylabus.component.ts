import { Component, inject } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EsyllabusButtonComponent } from '../../components/esyllabus-button/esyllabus-button.component';
import { GradeSheetDetailsComponent } from '../../components/grade-sheet-details/grade-sheet-details.component';
import { FlightDomainSyllabusdetailsComponent } from '../../pageFlightDomainSyllabus/flight-domain-syllabusdetails/flight-domain-syllabusdetails.component';
import { FilghtDomainGradeSheetDetailsComponent } from '../../pageFlightDomainSyllabus/filght-domain-grade-sheet-details/filght-domain-grade-sheet-details.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { SyllabusService } from '../../services/syllabus.service';
import { SyllabusDeatailsComponent } from '../syllabus-deatails/syllabus-deatails.component';
import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';

@Component({
  selector: 'app-page-sylabus',
  standalone: true,
  imports: [
    PaginationComponent,
    EsyllabusButtonComponent,
    GradeSheetDetailsComponent,
    SyllabusDeatailsComponent,
    FilghtDomainGradeSheetDetailsComponent,
    NgFor,
    FlightDomainSyllabusdetailsComponent,
  ],
  templateUrl: './page-sylabus.component.html',
  styleUrl: './page-sylabus.component.scss',
})
export class PageSylabusComponent {
  syllabuss: any[] = [];
  flightDomainSyllabusesMap: { [syllabusId: number]: any[] } = {};

  constructor(private router: Router) {}
  syllabusService = inject(SyllabusService);
  flightDomainSyllabusService = inject(FlightDomainSyllabusService);
  ngOnInit(): void {
    this.syllabusService.listSyllabus().subscribe((response) => {
      this.syllabuss = response;
      console.log('listofSyllabus:', this.syllabuss);
    });
  }

  goToNewSyllabus() {
    this.router.navigate(['dashboard/newsyllabus']);
  }

  loadFlightDomainSyllabus(syllabusId: number) {
    if (!this.flightDomainSyllabusesMap[syllabusId]) {
      this.flightDomainSyllabusService
        .listSyllabusFlightDoaminSyllabus(syllabusId)
        .subscribe((data: any[]) => {
          this.flightDomainSyllabusesMap[syllabusId] = data;
        });
    }
  }
}
