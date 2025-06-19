import { Component, inject, OnInit } from '@angular/core';
import { FlightDomainDetailsComponent } from '../flight-domain-details/flight-domain-details.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ButtonActionComponent } from '../button-action/button-action.component';
import { NgFor } from '@angular/common';
import { FlightDomainService } from '../../services/flightDomain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-flight-domain',
  standalone: true,
  imports: [
    FlightDomainDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor,
  ],
  templateUrl: './page-flight-domain.component.html',
  styleUrl: './page-flight-domain.component.scss',
})
export class PageFlightDomainComponent implements OnInit {
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
