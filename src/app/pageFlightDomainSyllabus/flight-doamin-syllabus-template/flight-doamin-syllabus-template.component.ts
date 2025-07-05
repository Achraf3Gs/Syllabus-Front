import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap, map, of, catchError, tap } from 'rxjs';
import { GradeSheetManeuverItemService } from '../../services/grade-sheet-maneuver-item.service';
import { GardeSheetService } from '../../services/garde-sheet.service';
import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { GradeSheet } from '../../model/GradeSheet';
import { FlightDoaminSyllabus } from '../../model/FlightDoaminSyllabus';
import { GradeSheetManeuver } from '../../model/GradeSheetManeuver';

// Define interfaces for processed data
interface ProcessedGrade {
  gradeSheetId: number;
  rating: number;
  mif: string | null; // Can be string or null to handle all possible MIF values
  isPresent: boolean;
}

interface ProcessedManeuver {
  maneuverId: number;
  maneuverName: string;
  grades: ProcessedGrade[];
}

interface ProcessedBlock {
  blockNumber: number;
  gradeSheets: GradeSheet[];
  color: string;
}

@Component({
  selector: 'app-flight-doamin-syllabus-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-doamin-syllabus-template.component.html',
  styleUrls: ['./flight-doamin-syllabus-template.component.scss'],
})
export class FlightDoaminSyllabusTemplateComponent implements OnChanges {
  flightDomainSyllabusId!: number;
  
  isLoading = true;
  errorMessage: string | null = null;
  processedManeuvers: ProcessedManeuver[] = [];
  processedBlocks: ProcessedBlock[] = [];
  syllabusTitle = '';
  allGradeSheetsInOrder: GradeSheet[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightDomainSyllabusService: FlightDomainSyllabusService,
    private gradeSheetService: GardeSheetService,
    private gradeSheetManeuverItemService: GradeSheetManeuverItemService
  ) {
    console.log('Component constructor called');
  }



  ngOnInit() {
    console.log('Component initialized');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.flightDomainSyllabusId = +id;
        console.log('Loaded flightDomainSyllabusId from route:', this.flightDomainSyllabusId);
        this.loadSyllabusData();
      } else {
        console.error('No ID found in route parameters');
        this.errorMessage = 'No syllabus ID provided in URL';
        this.isLoading = false;
      }
    });
  }

  // ngOnChanges not needed anymore since we're using route params
  // Keeping it for now in case it's used elsewhere
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Input changed:', changes);
    if (changes['flightDomainSyllabusId']) {
      if (changes['flightDomainSyllabusId'].currentValue) {
        console.log('Input changed - Loading syllabus with ID:', changes['flightDomainSyllabusId'].currentValue);
        this.loadSyllabusData();
      } else {
        const errorMsg = 'flightDomainSyllabusId changed to null or undefined';
        console.error(errorMsg);
        this.errorMessage = errorMsg;
        this.isLoading = false;
      }
    }
  }

  private resetState(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.processedManeuvers = [];
    this.processedBlocks = [];
    this.allGradeSheetsInOrder = [];
  }

  loadSyllabusData(): void {
    console.log('=== Starting to load syllabus data ===');
    console.log('Using syllabus ID:', this.flightDomainSyllabusId);
    
    if (!this.flightDomainSyllabusId) {
      const errorMsg = 'Error: Syllabus ID is missing!';
      console.error(errorMsg);
      this.errorMessage = errorMsg;
      this.isLoading = false;
      return;
    }

    console.log('Loading syllabus with ID:', this.flightDomainSyllabusId);
    this.resetState();

    this.flightDomainSyllabusService.GetFlightDoaminSyllabus(this.flightDomainSyllabusId).pipe(
      tap(syllabus => console.log('Syllabus loaded:', syllabus)),
      switchMap(syllabus => {
        if (!syllabus) {
          console.error('Error: Syllabus not found');
          throw new Error('Syllabus not found');
        }
        this.syllabusTitle = syllabus.name;
        console.log('Loading grade sheets for syllabus...');
        return this.gradeSheetService.listFlightDoaminSyllabusGradeSheet(this.flightDomainSyllabusId).pipe(
          tap(gradeSheets => console.log('Grade sheets loaded:', gradeSheets)),
          switchMap(gradeSheets => {
            if (!gradeSheets || gradeSheets.length === 0) {
              console.warn('No grade sheets found for syllabus');
              return of({ syllabus, gradeSheets: [], maneuverItems: [] });
            }
            
            console.log('Loading maneuvers for grade sheets...');
            const maneuverRequests = gradeSheets
              .filter(gs => gs.id !== undefined)
              .map(gs => {
                console.log(`Loading maneuvers for grade sheet ${gs.id}`);
                return this.gradeSheetManeuverItemService.listGradeSheetManeuverItem(gs.id!).pipe(
                  tap(items => console.log(`Maneuvers for grade sheet ${gs.id}:`, items)),
                  map(items => items.map(item => ({
                    ...item,
                    maneuverId: item.id,
                    gradeSheetId: gs.id!,
                    name: item.name || ''
                  }))),
                  catchError(err => {
                    console.error(`Error loading maneuvers for grade sheet ${gs.id}:`, err);
                    return of([]);
                  })
                );
              });

            console.log('Waiting for all maneuver requests to complete...');
            return forkJoin(maneuverRequests).pipe(
              tap(maneuverItems => console.log('All maneuvers loaded:', maneuverItems)),
              map(maneuverItems => ({
                syllabus,
                gradeSheets,
                maneuverItems: maneuverItems.flat()
              }))
            );
          })
        );
      }),
      catchError(err => {
        console.error('Error in syllabus data loading pipeline:', err);
        this.errorMessage = 'Failed to load syllabus data. Please try again.';
        this.isLoading = false;
        return of({ syllabus: null, gradeSheets: [], maneuverItems: [] });
      })
    ).subscribe({
      next: ({ syllabus, gradeSheets, maneuverItems }) => {
        console.log('Data loaded successfully, processing...');
        if (syllabus) {
          this.processData(syllabus, gradeSheets, maneuverItems);
        } else {
          console.error('No syllabus data received');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Unexpected error in subscription:', err);
        this.errorMessage = 'An unexpected error occurred. Please refresh the page.';
        this.isLoading = false;
      },
      complete: () => {
        console.log('Data loading completed');
      }
    });
  }

  processData(
    syllabus: FlightDoaminSyllabus,
    gradeSheets: GradeSheet[],
    maneuverItems: (GradeSheetManeuver & { gradeSheetId: number })[]
  ): void {
    console.log('=== Starting to process data ===');
    console.log('Syllabus:', JSON.stringify(syllabus, null, 2));
    console.log('Grade Sheets:', JSON.stringify(gradeSheets, null, 2));
    console.log('Maneuver Items:', JSON.stringify(maneuverItems, null, 2));

    try {
      if (!syllabus) {
        const errorMsg = 'Error: No syllabus data received';
        console.error(errorMsg);
        this.errorMessage = 'No syllabus data available.';
        this.isLoading = false;
        return;
      }

      // Log the complete syllabus structure for debugging
      console.log('Complete syllabus structure:', syllabus);
      
      // If we don't have flightDomain, try to proceed with just the maneuverItems we loaded
      if (!syllabus.flightDomain) {
        console.warn('No flightDomain in syllabus, using only grade sheets and maneuver items');
        
        if (!gradeSheets || gradeSheets.length === 0) {
          const errorMsg = 'No grade sheets available for this syllabus';
          console.error(errorMsg);
          this.errorMessage = errorMsg;
          this.isLoading = false;
          return;
        }

        if (!maneuverItems || maneuverItems.length === 0) {
          const errorMsg = 'No maneuver items available for this syllabus';
          console.error(errorMsg);
          this.errorMessage = errorMsg;
          this.isLoading = false;
          return;
        }

        // Process the data without flightDomain
        this.processWithoutFlightDomain(gradeSheets, maneuverItems);
        return;
      }

      // Reset state
      this.processedManeuvers = [];
      this.processedBlocks = [];
      this.allGradeSheetsInOrder = [];

      console.log('Grouping grade sheets by block...');
      // Group grade sheets by block
      const blocksMap = new Map<number, GradeSheet[]>();
      gradeSheets.forEach((gs) => {
        if (!gs) return;
        const blockNum = gs.block || 1; // Default to block 1 if not specified
        if (!blocksMap.has(blockNum)) {
          blocksMap.set(blockNum, []);
        }
        blocksMap.get(blockNum)!.push(gs);
      });

      console.log('Creating processed blocks...');
      // Create processed blocks with colors
      const blockColors = ['#f8b4b4', '#f8d2b4', '#f8eab4', '#d2f8b4', '#b4f8d2', '#b4eaf8', '#b4d2f8', '#d2b4f8'];
      this.processedBlocks = Array.from(blocksMap.entries())
        .map(([blockNumber, gradeSheetsForBlock], index) => {
          const block = {
            blockNumber,
            gradeSheets: gradeSheetsForBlock.sort((a, b) => (a.id || 0) - (b.id || 0)),
            color: blockColors[index % blockColors.length],
          };
          console.log(`Created block ${blockNumber} with ${gradeSheetsForBlock.length} grade sheets`);
          return block;
        })
        .sort((a, b) => a.blockNumber - b.blockNumber);

      // Flatten all grade sheets in order for the columns
      this.allGradeSheetsInOrder = this.processedBlocks.flatMap(b => b.gradeSheets);
      console.log('All grade sheets in order:', this.allGradeSheetsInOrder);

      // Create a map for quick lookup of maneuver items
      const maneuverMap = new Map<string, GradeSheetManeuver & { gradeSheetId: number }>();
      (maneuverItems || []).forEach((item) => {
        if (item?.id && item.gradeSheetId) {
          const key = `${item.gradeSheetId}_${item.id}`;
          maneuverMap.set(key, item);
        }
      });
      console.log('Maneuver map created with', maneuverMap.size, 'items');

      console.log('Processing maneuvers...');
      // Process each maneuver from the flight domain
      this.processedManeuvers = (syllabus.flightDomain.maneuverItems || [])
        .sort((a, b) => (a.id || 0) - (b.id || 0))
        .map(maneuver => {
          if (!maneuver?.id) {
            console.warn('Skipping invalid maneuver:', maneuver);
            return null;
          }
          
          const grades: ProcessedGrade[] = this.allGradeSheetsInOrder.map(gradeSheet => {
            if (!gradeSheet?.id) {
              console.warn('Skipping invalid grade sheet in maneuver processing');
              return {
                gradeSheetId: 0, // Will be filtered out later
                rating: 0,
                mif: null,
                isPresent: false
              };
            }
            
            const key = `${gradeSheet.id}_${maneuver.id}`;
            const item = maneuverMap.get(key);
            
            if (!item) {
              return {
                gradeSheetId: gradeSheet.id,
                rating: 0,
                mif: null,
                isPresent: false
              };
            }
            
            return {
              gradeSheetId: gradeSheet.id,
              rating: typeof item.rating === 'number' ? item.rating : 0,
              mif: item.mifRequirement !== null && item.mifRequirement !== undefined 
                   ? String(item.mifRequirement) 
                   : null,
              isPresent: true
            };
          }).filter(g => g.gradeSheetId > 0); // Filter out invalid grades
          
          if (grades.length === 0) {
            console.warn(`No valid grades found for maneuver ${maneuver.id}`);
            return null;
          }
          
          return {
            maneuverId: maneuver.id,
            maneuverName: maneuver.name || `Maneuver ${maneuver.id}`,
            grades,
          };
        })
        .filter((m): m is ProcessedManeuver => m !== null && m.grades.length > 0);
      
      console.log('Processing complete. Maneuvers:', this.processedManeuvers.length);
    } catch (error) {
      console.error('Error processing data:', error);
      this.errorMessage = 'An error occurred while processing the syllabus data.';
      this.isLoading = false;
    }
  }

  // Process data when flightDomain is missing
  // Helper method to generate a color based on index
  private getBlockColor(index: number): string {
    const colors = [
      '#e1f5fe', // Light Blue
      '#e8f5e9', // Light Green
      '#fff3e0', // Light Orange
      '#f3e5f5', // Light Purple
      '#fce4ec', // Light Pink
    ];
    return colors[index % colors.length];
  }

  private processWithoutFlightDomain(
    gradeSheets: GradeSheet[],
    maneuverItems: (GradeSheetManeuver & { gradeSheetId: number })[]
  ): void {
    console.log('Processing without flightDomain data');
    
    if (!gradeSheets || gradeSheets.length === 0) {
      const errorMsg = 'No grade sheets available for this syllabus';
      console.error(errorMsg);
      this.errorMessage = errorMsg;
      this.isLoading = false;
      return;
    }

    if (!maneuverItems || maneuverItems.length === 0) {
      const errorMsg = 'No maneuver items available for this syllabus';
      console.error(errorMsg);
      this.errorMessage = errorMsg;
      this.isLoading = false;
      return;
    }

    // Create a map of grade sheets by ID for quick lookup
    const gradeSheetMap = new Map<number, GradeSheet>();
    const gradeSheetsByBlock = new Map<number, GradeSheet[]>();
    
    // Group grade sheets by their block property
    gradeSheets.forEach(gs => {
      if (gs.id !== undefined) {
        gradeSheetMap.set(gs.id, gs);
        
        // Use the block property from the grade sheet (default to 1 if not specified)
        const blockNumber = gs.block || 1;
        
        if (!gradeSheetsByBlock.has(blockNumber)) {
          gradeSheetsByBlock.set(blockNumber, []);
        }
        gradeSheetsByBlock.get(blockNumber)?.push(gs);
      }
    });

    // Group maneuver items by maneuver ID
    const maneuversMap = new Map<number, (GradeSheetManeuver & { gradeSheetId: number })[]>();
    
    maneuverItems.forEach(item => {
      if (!maneuversMap.has(item.id)) {
        maneuversMap.set(item.id, []);
      }
      maneuversMap.get(item.id)?.push(item);
    });

    // Create processed maneuvers
    this.processedManeuvers = Array.from(maneuversMap.entries()).map(([maneuverId, items]) => {
      const grades: ProcessedGrade[] = [];
      
      // For each grade sheet, find the corresponding maneuver item
      gradeSheets.forEach(gradeSheet => {
        const item = items.find(i => i.gradeSheetId === gradeSheet.id);
        if (item) {
          grades.push({
            gradeSheetId: gradeSheet.id!,
            rating: typeof item.rating === 'number' ? item.rating : 0,
            mif: item.mifRequirement !== null && item.mifRequirement !== undefined 
                 ? String(item.mifRequirement) 
                 : null,
            isPresent: true
          });
        } else {
          grades.push({
            gradeSheetId: gradeSheet.id!,
            rating: 0,
            mif: null,
            isPresent: false
          });
        }
      });

      // Use the first item's name (they should all have the same name for the same ID)
      const maneuverName = items[0]?.name || `Maneuver ${maneuverId}`;
      
      return {
        maneuverId,
        maneuverName,
        grades
      };
    });

    // Store all grade sheets in order
    this.allGradeSheetsInOrder = [...gradeSheets];
    
    // Create blocks based on grade sheet codes (CS = block 1, CA = block 2)
    this.processedBlocks = Array.from(gradeSheetsByBlock.entries())
      .sort(([blockNumA], [blockNumB]) => blockNumA - blockNumB)
      .map(([blockNumber, gradeSheetsForBlock], index) => ({
        blockNumber,
        gradeSheets: gradeSheetsForBlock.sort((a, b) => (a.id || 0) - (b.id || 0)),
        color: this.getBlockColor(index)
      }));

    this.isLoading = false;
    console.log('Successfully processed data without flightDomain');
  }
}
