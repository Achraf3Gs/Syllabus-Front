import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import Router
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { EsyllabusButtonComponent } from '../../components/esyllabus-button/esyllabus-button.component';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { ManeuverDetailsComponent } from '../maneuver-details/maneuver-details.component';

import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { FlightDomainService } from '../../services/flightDomain.service';
import { ManeuverItemService } from '../../services/maneuver-item.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-page-maneuver',
  standalone: true,
  imports: [
    ManeuverDetailsComponent,
    PaginationComponent,
    NgFor,
    EventDetailsComponent,
  ],
  templateUrl: './page-maneuver.component.html',
  styleUrl: './page-maneuver.component.scss',
})
export class PageManeuverComponent implements OnInit {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  flightDomains: {
    id: number;
    name: string;
    maneuverItems: {
      id: number;
      name: string;
      cts: {
        unsatisfactory: string[];
        fair: string[];
        good: string[];
        excellent: string[];
      };
    }[];
  }[] = [];

  ngOnInit() {
    this.flightDomainService.listFlightDomain().subscribe((response) => {
      this.flightDomains = response;
      console.log('listofflightDomains:', this.flightDomains);
    });
  }

  http = inject(HttpClient);
  errorMessage: string = '';
  flightDomainService = inject(FlightDomainService);
  maneuverItemService = inject(ManeuverItemService);
  router = inject(Router);

  goToNewManeuver() {
    this.router.navigate(['dashboard/newmaneuver']);
  }
}
