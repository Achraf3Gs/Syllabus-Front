import { Component, inject, OnInit } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ESyllabusDetailsComponent } from '../../components/e-syllabus-details/e-syllabus-details.component';
import { EsyllabusButtonComponent } from '../../components/esyllabus-button/esyllabus-button.component';
import { GradeSheetDetailsComponent } from '../../components/grade-sheet-details/grade-sheet-details.component';
import { FlightDomainSyllabusdetailsComponent } from "../flight-domain-syllabusdetails/flight-domain-syllabusdetails.component";
import { FilghtDomainGradeSheetDetailsComponent } from "../filght-domain-grade-sheet-details/filght-domain-grade-sheet-details.component";
import { Router } from '@angular/router';
import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { NgFor } from '@angular/common';
import { GardeSheetService } from '../../services/garde-sheet.service';
@Component({
  selector: 'app-flight-domain-syllabus',
  standalone: true,
  imports: [
    PaginationComponent,
    EsyllabusButtonComponent,
    GradeSheetDetailsComponent,
    FlightDomainSyllabusdetailsComponent,
    FilghtDomainGradeSheetDetailsComponent,
    NgFor,
  ],
  templateUrl: './flight-domain-syllabus.component.html',
  styleUrl: './flight-domain-syllabus.component.scss',
})
export class FlightDomainSyllabusComponent implements OnInit {
  flightDomainsSyllabuss: any[] = [];

  flightDomainGradeSheetMap: { [flightDomainSyllabusId: number]: any[] } = {};
  constructor(private router: Router) {}
  flightDomainSyllabusService = inject(FlightDomainSyllabusService);
  gardeSheetService = inject(GardeSheetService);
  ngOnInit(): void {
    this.flightDomainSyllabusService
      .listFlightDoaminSyllabus()
      .subscribe((response) => {
        this.flightDomainsSyllabuss = response;
        console.log('listofFlightDomainSyllabus:', this.flightDomainsSyllabuss);
      });
  }

  goToNewFlightDomainSyllabus() {
    this.router.navigate(['dashboard/newflightDomainSyllabus']);
  }

  loadGradeSheets(flightDoaminSyllabusId: number) {
    if (!this.flightDomainGradeSheetMap[flightDoaminSyllabusId]) {
      this.gardeSheetService
        .listFlightDoaminSyllabusGradeSheet(flightDoaminSyllabusId)
        .subscribe((data: any[]) => {
          this.flightDomainGradeSheetMap[flightDoaminSyllabusId] = data;
        });
    }
  }
}
