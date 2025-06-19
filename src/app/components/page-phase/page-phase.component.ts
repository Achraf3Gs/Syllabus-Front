import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PhaseService } from '../../services/phase.service';
import { Router } from '@angular/router';
import { PhaseDetailsComponent } from '../phase-details/phase-details.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ButtonActionComponent } from '../button-action/button-action.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-page-phase',
  standalone: true,
  imports: [
    PhaseDetailsComponent,
    PaginationComponent,
    ButtonActionComponent,
    NgFor,
  ],
  templateUrl: './page-phase.component.html',
  styleUrl: './page-phase.component.scss',
})
export class PagePhaseComponent implements OnInit {

  phases: any;

  phaseService = inject(PhaseService);
  router = inject(Router);
  ngOnInit(): void {
    this.phaseService.listPhase().subscribe((response) => {
      this.phases = response;
      console.log('listofPhase:', this.phases);
    });
  }
  goToNewPhase() {
    this.router.navigate(['dashboard/newphase']);
  }

 
}
