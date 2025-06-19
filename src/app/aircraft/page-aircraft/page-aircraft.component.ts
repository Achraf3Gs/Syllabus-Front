import { Component, inject, OnInit } from '@angular/core';
import { AircraftDetailsComponent } from '../../components/aircraft-details/aircraft-details.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { NgFor } from '@angular/common';
import { AircraftService } from '../../services/aircraft.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-aircraft',
  standalone: true,
  imports: [
    AircraftDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor,
  ],
  templateUrl: './page-aircraft.component.html',
  styleUrl: './page-aircraft.component.scss',
})
export class PageAircraftComponent implements OnInit {
  aircrafts: any;

  aircraftService = inject(AircraftService);
  router = inject(Router);
  ngOnInit(): void {
    this.aircraftService.listAircraft().subscribe((response) => {
      this.aircrafts = response;
      console.log('listofAircraft:', this.aircrafts);
    });
  }
  goToNewAircraft() {
    this.router.navigate(['dashboard/newaircraft']);
  }
}
