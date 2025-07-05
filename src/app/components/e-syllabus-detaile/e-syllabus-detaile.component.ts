import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { FlightDoaminSyllabus } from '../../model/FlightDoaminSyllabus';
import { FlightDoaminSyllabusTemplateComponent } from '../../pageFlightDomainSyllabus/flight-doamin-syllabus-template/flight-doamin-syllabus-template.component';

@Component({
  selector: 'app-e-syllabus-detaile',
  standalone: true,
  imports: [CommonModule, FlightDoaminSyllabusTemplateComponent],
  templateUrl: './e-syllabus-detaile.component.html',
  styleUrls: ['./e-syllabus-detaile.component.scss'],
})
export class ESyllabusDetaileComponent implements OnInit {
  flightDomainSyllabuses: FlightDoaminSyllabus[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightDomainSyllabusService: FlightDomainSyllabusService
  ) {}

  ngOnInit(): void {
    // Use paramMap to get the syllabus ID from the route
    this.route.paramMap.subscribe(params => {
      const syllabusId = params.get('id');
      if (syllabusId) {
        console.log('Loading flight domain syllabi for syllabus ID:', syllabusId);
        this.loadFlightDomainSyllabuses(+syllabusId);
      } else {
        this.isLoading = false;
        this.errorMessage = 'No syllabus ID provided';
        console.error('No syllabus ID provided in the route');
      }
    });
  }

  // TrackBy function to optimize ngFor performance
  trackBySyllabusId(index: number, syllabus: any): number {
    return syllabus.id;
  }
  

  loadFlightDomainSyllabuses(syllabusId: number) {
    this.isLoading = true;
    this.errorMessage = null;
    this.flightDomainSyllabuses = [];

    this.flightDomainSyllabusService
      .listSyllabusFlightDoaminSyllabus(syllabusId)
      .subscribe({
        next: (data: any) => {
          if (!Array.isArray(data)) {
            console.error('Expected an array of flight domain syllabuses but got:', data);
            this.errorMessage = 'Invalid data format received from server';
            return;
          }

          // Process and filter unique flight domain syllabuses by name and block
          const uniqueSyllabuses = new Map<string, any>();
          
          data.forEach(item => {
            if (!item || !item.name) return;
            
            const key = `${item.name}_${item.block || 1}`;
            
            // Use the composite key to ensure uniqueness
            if (!uniqueSyllabuses.has(key)) {
              uniqueSyllabuses.set(key, {
                id: item.id,
                name: item.name,
                block: item.block || 1, // Default to block 1 if not specified
                flightDomain: item.flightDomain
              });
            }
          });

          this.flightDomainSyllabuses = Array.from(uniqueSyllabuses.values());
          console.log('Processed flight domain syllabuses:', this.flightDomainSyllabuses);
        },
        error: (error) => {
          console.error('Error loading flight domain syllabi:', error);
          this.errorMessage = 'Failed to load flight domain syllabi. Please try again later.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          console.log('Flight domain syllabi loading completed');
        }
      });
  }
}
