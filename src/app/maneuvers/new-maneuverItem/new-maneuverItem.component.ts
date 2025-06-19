import { FlightDomain } from '../../model/FlightDomain';
import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ManeuverItem } from '../../model/maneuverItem';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ManeuverItemService } from '../../services/maneuver-item.service';
import { FlightDomainService } from '../../services/flightDomain.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PhaseService } from '../../services/phase.service';
import { Phase } from '../../model/Phase';

@Component({
  selector: 'app-new-maneuver-Item',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, FormsModule, CommonModule],
  templateUrl: './new-maneuverItem.component.html',
  styleUrl: './new-maneuverItem.component.scss',
})
export class NewManeuverItemComponent implements OnInit {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  flightDomain: any;
  flightDomains: any;
  maneuverItem: any = {
    name: '',
    flightDomain: null,
    cts: {
      unsatisfactoryCriteria: {} as Record<string, string>,
      fairCriteria: {} as Record<string, string>,
      goodCriteria: {} as Record<string, string>,
      excellentCriteria: {} as Record<string, string>,
      noGradeCriteria: {} as Record<string, string>,
    },
  };

  phases: Phase[] = [];

  http = inject(HttpClient);
  errorMessage: string = '';
  flightDomainService = inject(FlightDomainService);
  maneuverItemService = inject(ManeuverItemService);
  router = inject(Router);
  phaseService = inject(PhaseService);

  ngOnInit(): void {
    this.flightDomainService.listFlightDomain().subscribe((response) => {
      this.flightDomains = response;
      console.log('listofFlightDomains:', this.flightDomains);
    });

    this.phaseService.listPhase().subscribe((response) => {
      this.phases = response;
      console.log('listofPhases:', this.phases);

      // Initialize CTS objects for each phase
      this.initializeCTSForPhases();
    });
  }

  private initializeCTSForPhases(): void {
    this.phases.forEach((phase) => {
      this.maneuverItem.cts.unsatisfactoryCriteria[phase.phaseName] = '';
      this.maneuverItem.cts.fairCriteria[phase.phaseName] = '';
      this.maneuverItem.cts.goodCriteria[phase.phaseName] = '';
      this.maneuverItem.cts.excellentCriteria[phase.phaseName] = '';
      this.maneuverItem.cts.noGradeCriteria[phase.phaseName] = '';
    });
  }

  onSave() {
    const name = this.maneuverItem.flightDomain?.name;

    if (!name) {
      this.errorMessage = 'FlightDomain name is missing.';
      return;
    }

    // Transform textarea strings into arrays for each phase
    const transformedCTS = {
      unsatisfactoryCriteria: {} as Record<string, string[]>,
      fairCriteria: {} as Record<string, string[]>,
      goodCriteria: {} as Record<string, string[]>,
      excellentCriteria: {} as Record<string, string[]>,
      noGradeCriteria: {} as Record<string, string[]>,
    };

    // Process each phase
    this.phases.forEach((phase) => {
      const phaseName = phase.phaseName;

      transformedCTS.unsatisfactoryCriteria[phaseName] =
        this.transformTextareaToArray(
          this.maneuverItem.cts.unsatisfactoryCriteria[phaseName]
        );
      transformedCTS.fairCriteria[phaseName] = this.transformTextareaToArray(
        this.maneuverItem.cts.fairCriteria[phaseName]
      );
      transformedCTS.goodCriteria[phaseName] = this.transformTextareaToArray(
        this.maneuverItem.cts.goodCriteria[phaseName]
      );
      transformedCTS.excellentCriteria[phaseName] =
        this.transformTextareaToArray(
          this.maneuverItem.cts.excellentCriteria[phaseName]
        );
      transformedCTS.noGradeCriteria[phaseName] = this.transformTextareaToArray(
        this.maneuverItem.cts.noGradeCriteria[phaseName]
      );
    });

    const itemToSend = {
      ...this.maneuverItem,
      cts: transformedCTS,
    };

    console.log('Item to send:', itemToSend);

    this.flightDomainService.getFlightDomainByName(name).subscribe({
      next: (response) => {
        this.flightDomain = response;
        this.maneuverItemService
          .createManeuverItem(itemToSend, this.flightDomain.id)
          .subscribe({
            next: () => this.router.navigate(['dashboard/maneuvers']),
            error: (err) => {
              console.error('Error creating maneuver item:', err);
              this.errorMessage = 'Failed to create maneuverItem.';
            },
          });
      },
      error: () => {
        this.errorMessage = 'FlightDomain not found. Invalid name.';
      },
    });
  }

  private transformTextareaToArray(textareaValue: string): string[] {
    if (!textareaValue) return [];
    return textareaValue
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean);
  }
}
