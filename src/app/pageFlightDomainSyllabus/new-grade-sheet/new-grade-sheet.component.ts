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
import { faInfo, faBan, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlightDomainSyllabusService } from '../../services/flight-domain-syllabus.service';
import { SortiesType } from '../../model/SortiesType';
import { ManeuverItem } from '../../model/maneuverItem';
import { ManeuverSubmissionItem } from '../../model/ManeuverSubmissionItem';

type Rating = 'E' | 'G' | 'F' | 'U' | 'NG';

@Component({
  selector: 'app-new-grade-sheet',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, FormsModule, NgIf, CommonModule],
  templateUrl: './new-grade-sheet.component.html',
  styleUrl: './new-grade-sheet.component.scss',
})
export class NewGradeSheetComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  faTrash = faTrash;
  // table of student
  students: any;
  instructors: any;
  flightDomainSyllabus2: any;

  aircrafts: Aircraft[] = [];
  phases: Phase[] = [];
  sortieType: SortiesType[] = [];
  flightDomains: any[] = [];

  flightDomainsSyllabus: any[] = [];
  hasSafetyRemark = false;

  phaseService = inject(PhaseService);
  sortiesTypesService = inject(SortiesTypesService);
  gradeSheetService = inject(GardeSheetService);
  flightDomainService = inject(FlightDomainService);
  flightDomainSyllabusService = inject(FlightDomainSyllabusService);

  flightDomainSyllabus: any; // or typed
  blocks: number[] = [];

  errorMessage: any;
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.flightDomainSyllabus = nav?.extras?.state?.['flightDomainSyllabus'];
  }

  ngOnInit(): void {
    this.phaseService.listPhase().subscribe((response) => {
      this.phases = response;
      console.log('listofPhases:', this.phases);
    });
    this.sortiesTypesService.listSortiesType().subscribe((response) => {
      this.sortieType = response;
      console.log('listofSortieTypeS:', this.sortieType);
    });
    this.flightDomainService.listFlightDomain().subscribe((response) => {
      this.flightDomains = response;
      console.log('listofFlightDomains:', this.flightDomains);
    });
    this.flightDomainSyllabusService
      .listFlightDoaminSyllabus()
      .subscribe((response) => {
        this.flightDomainsSyllabus = response;
        console.log('listofFlightDomainSyllabus:', this.flightDomainsSyllabus);
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

  onFlightDomainSyllabusChange(selectedSyllabus: any): void {
    this.blocks = [];
    this.formData.block = '';
    if (selectedSyllabus && selectedSyllabus.block) {
      const numberOfBlocks = parseInt(selectedSyllabus.block, 10);
      this.blocks = Array.from({ length: numberOfBlocks }, (_, i) => i + 1);
    }
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

  removeManeuverItem(groupIndex: number, itemIndex: number): void {
    if (this.selectedFlightDomains && this.selectedFlightDomains[groupIndex] && this.selectedFlightDomains[groupIndex].maneuverItems) {
      this.selectedFlightDomains[groupIndex].maneuverItems.splice(itemIndex, 1);
    }
  }

  // Updated saveGradesheet method to include MIF requirements

  // Form data model
  // In your component class

  // Form data structure
  formData: {
    name: string;
    block: string;
    sortieType: string;
    sortieNbr: number;
    phase: string;
    mixDur: string;
    crewMember: string;
    student: string;
    aircraft: string;
    date: string;
    selectedGroupId: number;
    instructorName: string;
    maneuverItems: ManeuverSubmissionItem[];
    flightDomainSyllabus: any; // 👈 or use a proper type if you have it (e.g., `FlightDomainSyllabus`)
  } = {
    name: '',
    block: '',
    sortieType: '',
    sortieNbr: 0,
    phase: '',
    mixDur: '',
    crewMember: '',
    student: '',
    aircraft: '',
    date: '',
    selectedGroupId: 0,
    instructorName: '',
    maneuverItems: [],
    flightDomainSyllabus: undefined, // ✅ initialized
  };

  // Properties for your existing save method
  newGradeSheet: any;

  collectManeuverItems(): ManeuverSubmissionItem[] {
    const maneuverItems: ManeuverSubmissionItem[] = [];

    this.selectedFlightDomains.forEach((group) => {
      group.maneuverItems.forEach((item: ManeuverItem) => {
        if (item.mifRequirement && item.mifRequirement.trim() !== '') {
          maneuverItems.push({
            id: item.id,
            mifRequirement: item.mifRequirement,
          });
        }
      });
    });

    this.formData.maneuverItems = maneuverItems;

    return maneuverItems;
  }

  // Method to get only items with MIF requirements (for submission)
  getItemsWithMifRequirements() {
    this.collectManeuverItems();

    return this.formData.maneuverItems.filter(
      (item) => item.mifRequirement && item.mifRequirement !== ''
    );
  }

  // Your main save method - UPDATED to include maneuver items collection
  onSave2(): void {
    const collected = this.collectManeuverItems(); // ✅ collect items first

    // ✅ Make sure flightDomainSyllabus is included
    this.formData['flightDomainSyllabus'] = this.flightDomainSyllabus;
    this.formData.name = `${this.formData.sortieType}${this.formData.sortieNbr}`;
    this.newGradeSheet = this.formData;
    console.log('this.newGradeSheet :', this.newGradeSheet);
    const name = this.newGradeSheet.flightDomainSyllabus?.name;

    if (!name) {
      this.errorMessage = 'FlightDoaminSyllabus name is missing.';
      return;
    }

    // Optional validation
    // if (!this.validateManeuverItems()) return;

    this.flightDomainSyllabusService
      .getFlightDomainSyllabusName(name)
      .subscribe({
        next: (response) => {
          console.log('Syllabus found:', response); // Add this line
          this.flightDomainSyllabus2 = response;
          const cleanedGradeSheet = { ...this.newGradeSheet };
          delete cleanedGradeSheet.flightDomainSyllabus; // 🔥 remove the extra field

          this.gradeSheetService
            .createRowGradeSheet(
              cleanedGradeSheet,
              this.flightDomainSyllabus2.id
            )
            .subscribe({
              next: () => {
                console.log('Grade sheet created successfully'); // Add this
                this.router.navigate(['dashboard/flightDomainSyllabus']);
              },
              error: (err) => {
                console.error('Error creating Grade Sheet:', err);
                this.errorMessage = 'Failed to create Grade Sheet.';
              },
            });
        },
        error: () => {
          this.errorMessage = 'flightDomainSyllabus not found. Invalid name.';
        },
      });
  }
}
