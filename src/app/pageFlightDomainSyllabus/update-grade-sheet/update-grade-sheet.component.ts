import { FlightDoaminSyllabus } from './../../model/FlightDoaminSyllabus';

import { SortiesTypesService } from './../../services/sorties-types.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aircraft } from '../../model/Aircraft';
import { Phase } from '../../model/Phase';
import { Instructor } from '../../model/Instructor';
import { StudentService } from '../../services/student.service';
import { InsructorService } from '../../services/insructor.service';
import { AircraftService } from '../../services/aircraft.service';
import { PhaseService } from '../../services/phase.service';
import { GardeSheetService } from '../../services/garde-sheet.service';
import { FlightDomainService } from '../../services/flightDomain.service';
import { Router } from '@angular/router';
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { SortiesType } from '../../model/SortiesType';
import { ManeuverItem } from '../../model/maneuverItem';
import { ManeuverSubmissionItem } from '../../model/ManeuverSubmissionItem';
import { GradeSheetManeuverItemService } from '../../services/grade-sheet-maneuver-item.service';
import { forkJoin } from 'rxjs';

type Rating = 'E' | 'G' | 'F' | 'U' | 'NG';

@Component({
  selector: 'app-update-grade-sheet',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, FormsModule, NgIf, CommonModule],
  templateUrl: './update-grade-sheet.component.html',
  styleUrl: './update-grade-sheet.component.scss',
})
export class UpdateGradeSheetComponent {
  trackById(index: number, item: any): any {
    return item.id; // Use a unique identifier for each item
  }
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  // table of student
  students: any;
  instructors: any;
  flightDomainSyllabus2: any;

  aircrafts: Aircraft[] = [];
  phases: Phase[] = [];
  sortieType: SortiesType[] = [];
  flightDomains: any[] = [];

  flightDomainsSyllabus: any[] = [];
  blocks: number[] = [];
  hasSafetyRemark = false;

  phaseService = inject(PhaseService);
  sortiesTypesService = inject(SortiesTypesService);
  gradeSheetService = inject(GardeSheetService);
  flightDomainService = inject(FlightDomainService);
  flightDomainSyllabusService = inject(FlightDomainSyllabusService);

  gradeSheetManeuverItemService = inject(GradeSheetManeuverItemService);
  studentService = inject(StudentService);
  insructorService = inject(InsructorService);
  aircraftService = inject(AircraftService);

  flightDomainSyllabus: any; // or typed

  flightDomainGradeSheet: any;
  maneuverWithMifDTO: any[] = [];
  availableManeuverItems: ManeuverItem[] = [];
  selectedManeuverItem: ManeuverItem | null = null;
  isUpdateMode: boolean = false;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      flightDomainGradeSheet?: any;
      isUpdate?: boolean;
    };

    if (state?.flightDomainGradeSheet) {
      this.flightDomainGradeSheet = state.flightDomainGradeSheet;

      // Fill form data
      const data = this.flightDomainGradeSheet;
      this.formData.id = data.id || '';
      this.formData.mixDur = data.mixDur || '';
      this.formData.crewMember = data.crewMember || '';
      this.formData.student = data.student || '';
      this.formData.aircraft = data.aircraft || '';
      this.formData.date = data.date || '';
      this.formData.selectedGroupId = data.selectedGroupId || '';
      this.formData.instructorName = data.instructorName || '';
      this.formData.sortieType = data.sortieType || '';
      this.formData.sortieNbr = data.sortieNbr || '';
      this.formData.phase = data.phase || '';
      this.formData.name = data.name || '';
            if (data.block) {
        const parsedBlock = parseInt(String(data.block), 10);
        this.formData.block = isNaN(parsedBlock) ? null : parsedBlock;
      } else {
        this.formData.block = null;
      }
      this.formData.flightDomainSyllabus = data.FlightDoaminSyllabus || '';
      this.formData.overallGrade = data.overallGrade || null;
      this.formData.comments = data.comments || null;
      this.formData.sortieStatus = data.sortieStatus || null;
      this.formData.sortieRemarks = data.sortieRemarks || null;
      this.formData.ils = data.ils || null;
      this.formData.overheadPattern = data.overheadPattern || null;
      this.formData.overallGrade = data.overallGrade || null;
      this.formData.vor = data.vor || null;
      this.formData.missedApproach = data.missedApproach || null;
      this.formData.rnav = data.rnav || null;
      this.formData.landings = data.landings || null;
      this.formData.studentFlightDomainSyllabus = data.studentFlightDomainSyllabus || null;
     
    }

    // Optional: handle update mode flag
    if (state?.isUpdate) {
      console.log('Update mode enabled'); // ✅ You can also set a local `isUpdate` flag
      this.isUpdateMode = true; // define `isUpdateMode` as a class-level boolean if needed
      console.log(
        'flightDomainSyllabus received :',
        this.flightDomainGradeSheet
      );
    }
  }

  errorMessage: any;

  ngOnInit(): void {
    console.log('[DEBUG] ngOnInit: Component initializing.');
    console.log(
      '[DEBUG] ngOnInit: Received flightDomainGradeSheet:',
      JSON.parse(JSON.stringify(this.flightDomainGradeSheet))
    );

    if (!this.flightDomainGradeSheet || !this.flightDomainGradeSheet.flightDomainSyllabus) {
      console.error('[DEBUG] ngOnInit: Grade sheet or syllabus data is missing. Aborting initialization.');
      this.errorMessage = 'Grade sheet data is missing. Cannot load page.';
      return;
    }

    const gradeSheetId = this.flightDomainGradeSheet.id;
    const syllabusId = this.flightDomainGradeSheet.flightDomainSyllabus.id;

    forkJoin({
      students: this.studentService.listStudents(),
      instructors: this.insructorService.listInstructor(),
      aircrafts: this.aircraftService.listAircraft(),
      phases: this.phaseService.listPhase(),
      sortieTypes: this.sortiesTypesService.listSortiesType(),
      flightDomains: this.flightDomainService.listFlightDomain(),
      flightDomainsSyllabus: this.flightDomainSyllabusService.listFlightDoaminSyllabus(),
      fullSyllabus: this.flightDomainSyllabusService.GetFlightDoaminSyllabus(syllabusId),
      assignedManeuvers: this.gradeSheetManeuverItemService.listGradeSheetManeuverItem(gradeSheetId)
    }).subscribe({
      next: (data) => {
        // Assign all loaded data
        this.students = data.students;
        this.instructors = data.instructors;
        this.aircrafts = data.aircrafts;
        this.phases = data.phases;
        this.sortieType = data.sortieTypes;
        this.flightDomains = data.flightDomains;
        this.flightDomainsSyllabus = data.flightDomainsSyllabus;
        
        // IMPORTANT: Replace the partial syllabus object with the full one
        this.flightDomainGradeSheet.flightDomainSyllabus = data.fullSyllabus;
        
        // Find the corresponding syllabus object from the list and set it for the dropdown
        const selectedSyllabus = this.flightDomainsSyllabus.find(s => s.id === syllabusId);
        if (selectedSyllabus) {
          this.flightDomainSyllabus = selectedSyllabus;
          // Manually trigger the logic that happens on change
          this.onFlightDomainSyllabusChange(this.flightDomainSyllabus);
        } else {
          console.error(`[DEBUG] Could not find syllabus with ID ${syllabusId} in the loaded list.`);
          this.flightDomainSyllabus = data.fullSyllabus;
          this.onFlightDomainSyllabusChange(this.flightDomainSyllabus);
        }

        // Handle assigned maneuvers
        this.maneuverWithMifDTO = data.assignedManeuvers || [];

        // All data is loaded, now calculate available maneuvers
        console.log('[DEBUG] ngOnInit: All data loaded. Calling loadAvailableManeuverItems.');
        this.loadAvailableManeuverItems();
      },
      error: (err) => {
        console.error('[DEBUG] ngOnInit: Error fetching data:', err);
        this.errorMessage = 'Failed to load required data for the page.';
      }
    });
  }

  isEmptyObject(obj: any): boolean {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  tCriteriaValue(ratingObject: any, key: string): any {
    if (
      ratingObject &&
      ratingObject.criteria &&
      ratingObject.criteria.length > 0
    ) {
      return ratingObject.criteria[0][key];
    }
    return '-';
  }

  // Blue Section Data with Ratings
  // Dans votre classe de composant
  Object = Object; // Nécessaire pour Object.keys dans le template
  currentItem: any = null; // Pour stocker l'élément actuel

  // Méthode pour vérifier si un objet est vide
  isEmpty(obj: any): boolean {
    return obj && Object.keys(obj).length === 0;
  }

  // Méthode pour obtenir les paires clé-valeur d'un objet
  getCriteriaItems(criteria: any): { key: string; value: any }[] {
    if (!criteria || typeof criteria !== 'object') {
      return [];
    }

    return Object.keys(criteria).map((key) => ({
      key: key,
      value: criteria[key],
    }));
  }

  // La variable qui stocke les manœuvres sélectionnées
  //selectedManeuvers = this.maneuvers; // Ou tout autre logique pour les sélectionner
  // Fonction pour obtenir l'index global

  ////////////////////////////////////////////////////////

  ////////////////////////////////////////////////
  // Blue Section Data with Ratings

  ratingOptions = ['E', 'G', 'F', 'U', 'NG'];

  selectedGroup: any = null;
  selectedFlightDomains: any[] = [];

  onFlightDomainSyllabusChange(selectedSyllabus: any): void {
    this.blocks = [];
    if (!this.isUpdateMode) {
        this.formData.block = null;
    }
    if (selectedSyllabus && selectedSyllabus.block) {
      const numberOfBlocks = parseInt(selectedSyllabus.block, 10);
      this.blocks = Array.from({ length: numberOfBlocks }, (_, i) => i + 1);
    }
    this.loadAvailableManeuverItems();
  }

  getGlobalIndex(groupIndex: number, itemIndex: number): number {
    let count = 0;
    for (let i = 0; i < groupIndex; i++) {
      if (
        this.selectedFlightDomains &&
        this.selectedFlightDomains[i] &&
        this.selectedFlightDomains[i].maneuverItems &&
        Array.isArray(this.selectedFlightDomains[i].maneuverItems)
      ) {
        count += this.selectedFlightDomains[i].maneuverItems.length;
      }
    }
    return count + itemIndex + 1;
  }

  selectedGroupId: number | null = null; // Add this at the top of your component
  selectedFlightDomain: any = null; // Optional: stores the full selected object

  onGroupChange(groupId: number | null): void {
    if (groupId === null) return;

    // Save selected ID
    this.selectedGroupId = groupId;
    this.formData.selectedGroupId = groupId; // ✅ store it in formData

    // Find the selected group object
    this.selectedGroup = this.flightDomains.find((g) => g.id === +groupId);
    this.selectedFlightDomain = this.selectedGroup;

    console.log('Selected Flight Domain ID:', this.selectedGroupId);
    console.log(
      'Assigned to formData.selectedGroupId:',
      this.formData.selectedGroupId
    );
    console.log('selectedFlightDomains before:', this.selectedFlightDomains);

    const alreadySelected = this.selectedFlightDomains.find(
      (g) => g.id === +groupId
    );

    if (!alreadySelected && this.selectedGroup) {
      // Initialize MIF requirement for each item when adding a new group
      const groupWithMif = { ...this.selectedGroup };
      if (groupWithMif.maneuverItems) {
        groupWithMif.maneuverItems = groupWithMif.maneuverItems.map(
          (item: any) => ({
            ...item,
            mifRequirement: item.mif?.phaseValues?.[this.formData.phase] || '',
          })
        );
      }
      this.selectedFlightDomains.push(groupWithMif);
    }

    console.log('selectedFlightDomains after:', this.selectedFlightDomains);
  }

  // Method to update MIF requirement for a specific item
  onMifRequirementChange(groupIndex: number, itemIndex: number, value: string) {
    if (
      this.selectedFlightDomains[groupIndex] &&
      this.selectedFlightDomains[groupIndex].maneuverItems &&
      this.selectedFlightDomains[groupIndex].maneuverItems[itemIndex]
    ) {
      this.selectedFlightDomains[groupIndex].maneuverItems[
        itemIndex
      ].mifRequirement = value;
      console.log('MIF requirement updated:', value);
    }
  }

  //Partie-Comment
  overallGrade: String = '-------';

  //  calculateOverallRating to handle Us (Safety Unsatisfactory)

  // Yellow-section
  // Initialize formData with default values

  // Method to trigger the browser's print dialog
  printPage() {
    window.print();
  }

  loadAvailableManeuverItems(): void {
    console.log('[DEBUG] loadAvailableManeuverItems: Attempting to calculate available items.');

    // Guard clauses to ensure all necessary data is present
    if (!this.flightDomainGradeSheet) {
      console.log('[DEBUG] loadAvailableManeuverItems: Aborting. flightDomainGradeSheet is not loaded.');
      return;
    }
    if (!this.flightDomainGradeSheet.flightDomainSyllabus) {
      console.log('[DEBUG] loadAvailableManeuverItems: Aborting. flightDomainSyllabus on grade sheet is not loaded.');
      return;
    }
    if (!this.flightDomainGradeSheet.flightDomainSyllabus.flightDomains) {
      console.log('[DEBUG] loadAvailableManeuverItems: Aborting. flightDomains array not found on syllabus object.');
      this.availableManeuverItems = [];
      return;
    }
    if (!this.maneuverWithMifDTO) {
      console.log('[DEBUG] loadAvailableManeuverItems: Aborting. maneuverWithMifDTO is not loaded.');
      return;
    }

    // Flatten all maneuver items from all flight domains in the syllabus
    const allSyllabusManeuvers = this.flightDomainGradeSheet.flightDomainSyllabus.flightDomains.flatMap(
      (domain: any) => domain.maneuverItems || []
    );

    // Create a Set of IDs for the maneuvers already in the grade sheet for efficient lookup
    const assignedManeuverIds = new Set(
      this.maneuverWithMifDTO.map((item: any) => item.id)
    );

    console.log(`[DEBUG] loadAvailableManeuverItems: Found ${allSyllabusManeuvers.length} total maneuvers in syllabus.`);
    console.log(`[DEBUG] loadAvailableManeuverItems: Found ${assignedManeuverIds.size} maneuvers already assigned.`);

    // Filter the full list of maneuvers to get only those not already assigned
    this.availableManeuverItems = allSyllabusManeuvers.filter(
      (item: any) => item && item.id && !assignedManeuverIds.has(item.id)
    );

    console.log(`[DEBUG] loadAvailableManeuverItems: Calculated ${this.availableManeuverItems.length} available maneuvers.`);
    console.log('[DEBUG] loadAvailableManeuverItems: Available items:', JSON.parse(JSON.stringify(this.availableManeuverItems)));
  }

  addManeuverItem(): void {
    console.log('[DEBUG] addManeuverItem: "Add Item" button clicked.');
    if (this.selectedManeuverItem) {
      console.log('[DEBUG] addManeuverItem: Selected item to add:', JSON.parse(JSON.stringify(this.selectedManeuverItem)));
      // Create a new object with default properties for the grade sheet
      const newItem = {
        ...this.selectedManeuverItem,
        rating: null, // Initialize rating
        mifRequirement:
          (this.selectedManeuverItem as any).mif?.phaseValues?.[this.formData.phase] || '', // Initialize MIF
      };
      console.log('[DEBUG] addManeuverItem: New item object created:', JSON.parse(JSON.stringify(newItem)));
      console.log('[DEBUG] addManeuverItem: DTO state before adding:', JSON.parse(JSON.stringify(this.maneuverWithMifDTO)));

      // Re-assign the array to trigger change detection
      this.maneuverWithMifDTO = [...this.maneuverWithMifDTO, newItem];
      console.log('[DEBUG] addManeuverItem: DTO state after adding:', JSON.parse(JSON.stringify(this.maneuverWithMifDTO)));
      this.selectedManeuverItem = null; // Reset selection
      this.loadAvailableManeuverItems(); // Refresh available items
    } else {
      console.log('[DEBUG] addManeuverItem: No item selected. Aborting.');
    }
  }

  // Updated saveGradesheet method to include MIF requirements

  // Form data model
  // In your component class

  // Form data structure
  formData: {
    id: any;
    name: string;
    block: number | null;
    sortieType: string;
    sortieNbr: number;
    phase: string;
    mixDur: string;
    crewMember: string;
    student: string;
    aircraft: string;
    date: string;
    overallGrade: string;
    comments: any;
    sortieStatus: any;
    sortieRemarks: any;
    ils: any;
    overheadPattern: any;
    vor: any;
    missedApproach: any;
    rnav: any;
    landings: any;
    studentFlightDomainSyllabus: any;
    // Add this if you need to store overall grade
    selectedGroupId: number;
    instructorName: string;
    maneuverItems: ManeuverSubmissionItem[];
    flightDomainSyllabus: any; // or use a proper type if you have it (e.g., `FlightDomainSyllabus`)
  } = {
    id: 0,
    name: '',
    block: null,
    sortieType: '',
    sortieNbr: 0,
    phase: '',
    mixDur: '',
    crewMember: '',
    student: '',
    aircraft: '',
    date: '',
    overallGrade: '',
    comments: undefined,
    sortieStatus: undefined,
    sortieRemarks: undefined,
    ils: undefined,
    overheadPattern: undefined,
    vor: undefined,
    missedApproach: undefined,
    rnav: undefined,
    landings: undefined,
    studentFlightDomainSyllabus: undefined,
    selectedGroupId: 0,
    instructorName: '',
    maneuverItems: [],
    flightDomainSyllabus: undefined, // ✅ initialized
  };

  // Properties for your existing save method
  newGradeSheet: any;

  collectUpdatedManeuverItems(): ManeuverSubmissionItem[] {
    const maneuverItems: ManeuverSubmissionItem[] = [];

    this.maneuverWithMifDTO.forEach((item: any) => {
      if (item.mifRequirement && item.mifRequirement.trim() !== '') {
        maneuverItems.push({
          id: item.id,
          mifRequirement: item.mifRequirement,
        });
      }
    });

    this.formData.maneuverItems = maneuverItems;

    return maneuverItems;
  }

  // Method to get only items with MIF requirements (for submission)
  getItemsWithMifRequirements() {
    this.collectUpdatedManeuverItems();

    return this.formData.maneuverItems.filter(
      (item) => item.mifRequirement && item.mifRequirement !== ''
    );
  }

  // Your main save method - UPDATED to include maneuver items collection
  UpdateGradeSheet(): void {
    this.errorMessage = null; // Clear previous error messages
    const collected = this.collectUpdatedManeuverItems();
    this.formData['flightDomainSyllabus'] = this.flightDomainSyllabus;
    this.newGradeSheet = this.formData;
    console.log('New Grade Sheet:', this.newGradeSheet);

    // Validate that a block is selected
    if (!this.formData.block) {
      this.errorMessage = 'Block number is required. Please select a block.';
      return; // Stop the submission
    }

    const name = this.newGradeSheet.flightDomainSyllabus?.name;

    if (!name) {
      this.errorMessage = 'FlightDomainSyllabus name is missing.';
      return;
    }

    this.flightDomainSyllabusService
      .getFlightDomainSyllabusName(name)
      .subscribe({
        next: (response) => {
          this.flightDomainSyllabus2 = response;

          this.gradeSheetService
            .updateRowGradeSheet(
              this.newGradeSheet,
              this.flightDomainSyllabus2.id,
              this.flightDomainGradeSheet.id
            )
            .subscribe({
              next: () => {
                this.router.navigate(['dashboard/flightDomainSyllabus']);
              },
              error: (err) => {
                console.error('Error updating Grade Sheet:', err);
                this.errorMessage = 'Failed to update Grade Sheet.';
              },
            });
        },
        error: () => {
          this.errorMessage = 'FlightDomainSyllabus not found. Invalid name.';
        },
      });
  }
}
