
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faUsersViewfinder,
  faRocket,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FlightDomainService } from '../../services/flightDomain.service';

import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { FilghtDomainGradeSheetDetailsComponent } from '../../pageFlightDomainSyllabus/filght-domain-grade-sheet-details/filght-domain-grade-sheet-details.component';

@Component({
  selector: 'app-flight-domain-grade-sheet',
  standalone: true,
  imports: [
    FilghtDomainGradeSheetDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor,
  ],
  templateUrl: './flight-domain-grade-sheet.component.html',
  styleUrl: './flight-domain-grade-sheet.component.scss',
})
export class FlightDomainGradeSheetComponent {
  flightDomains: any;

  flightDomainService = inject(FlightDomainService);
  router = inject(Router);
  ngOnInit(): void {
    this.flightDomainService.listFlightDomain().subscribe((response) => {
      this.flightDomains = response;
      console.log('listofflightDomain:', this.flightDomains);
    });
  }
  goToNewflightDomain() {
    this.router.navigate(['dashboard/newflightDomain']);
  }
}
