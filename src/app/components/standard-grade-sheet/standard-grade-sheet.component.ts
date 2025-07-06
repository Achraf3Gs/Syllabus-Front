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
import { ManeuverSubmissionItem } from '../../model/ManeuverSubmissionItem';
import { ManeuverItem } from '../../model/maneuverItem';
import { GradeSheetManeuverItemService } from '../../services/grade-sheet-maneuver-item.service';

type Rating = 'E' | 'G' | 'F' | 'U' | 'NG';

@Component({
  selector: 'app-standard-grade-sheet',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, FormsModule, NgIf, CommonModule],
  templateUrl: './standard-grade-sheet.component.html',
  styleUrl: './standard-grade-sheet.component.scss',
})
export class StandardGradeSheetComponent {
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
  hasSafetyRemark = false;
  comments: String = '';

  instructor: Instructor | undefined;
  studentService = inject(StudentService);
  instructorService = inject(InsructorService);
  aircraftService = inject(AircraftService);
  phaseService = inject(PhaseService);
  gradeSheetService = inject(GardeSheetService);
  flightDomainService = inject(FlightDomainService);
  gradeSheetManeuverItemService = inject(GradeSheetManeuverItemService);
  flightDomainSyllabus: any; // or typed

  errorMessage: any;
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.flightDomainSyllabus = nav?.extras?.state?.['flightDomainSyllabus'];
  }
  ngOnInit(): void {
    this.studentService.listStudents().subscribe((response) => {
      this.students = response;
      console.log('listofStudents:', this.students);
    });
    this.instructorService.listInstructor().subscribe((response) => {
      this.instructors = response;
      console.log('listofInstructor:', this.instructors);
    });
    this.aircraftService.listAircraft().subscribe((response) => {
      this.aircrafts = response.filter((a) => a.availability);
    });
    this.phaseService.listPhase().subscribe((response) => {
      this.phases = response;
      console.log('listofPhases:', this.phases);
    });
    this.flightDomainService.listFlightDomain().subscribe((response) => {
      this.flightDomains = response;
      console.log('listofIManeuvers:', this.flightDomains);
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
  onCrewMemberChange(event: any) {
    const selectedCallSign = event.target.value;

    this.instructorService.getInstructorByCallSign(selectedCallSign).subscribe({
      next: (selectedInstructor: any) => {
        // Handle successful instructor retrieval
        this.formData.instructorName = selectedInstructor.firstName;
        console.log('Selected Instructor:', selectedInstructor.firstName);
      },
      error: (err) => {
        // Handle error when fetching instructor
        this.formData.instructorName = '';
        console.error(
          'Failed to fetch instructor by call sign:',
          selectedCallSign,
          err
        );
      },
    });
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
 // ---------------------

// ----------------------
// ✅ Improved calculateOverallRating()
// ----------------------

calculateOverallRating(): void {
  console.log('=== STARTING RATING CALCULATION ===');

  if (!this.selectedFlightDomains || this.selectedFlightDomains.length === 0) {
    console.log('No maneuvers selected');
    this.overallGrade = '-------';
    return;
  }

  if (this.hasSafetyRemark) {
    console.log('Safety mark found, setting overall grade to U');
    this.overallGrade = 'U';
    return;
  }

  const allItems = this.selectedFlightDomains.flatMap(
    (m) => m.maneuverItems ?? []
  );
  const totalItems = allItems.length;
  console.log('Total items:', totalItems);

  if (totalItems === 0) {
    console.log('No items found in selected maneuvers');
    this.overallGrade = '-------';
    return;
  }

  const ratingWeights: Record<Rating, number> = {
    'E': 5, 'G': 4, 'F': 3, 'U': 2, 'NG': 1
  };

  const ratingCount: Record<Rating, number> = { G: 0, E: 0, F: 0, U: 0, NG: 0 };
  let itemsWithPlusMif = 0;
  let noRatingCount = 0;

  for (const item of allItems) {
    if (!item || !item.rating) {
      noRatingCount++;
      continue;
    }

    if (item.rating === 'NG') {
      console.log(`Skipping NG item for initial grade: ${item.name}`);
      continue;
    }

    if (item.mifRequirement?.startsWith('+')) {
      const rating = item.rating as Rating;
      ratingCount[rating]++;
      itemsWithPlusMif++;
      console.log(`Counting +MIF item: ${item.name} rating=${rating}`);
    }
  }

  // ✅ NEW: Block calculation if any unrated items found
  if (noRatingCount > 0) {
    console.log(`⛔ Found ${noRatingCount} items with no rating. Blocking calculation.`);
    alert('All items must be rated.');
    this.overallGrade = '-------';
    return;
  }

  const percent = (count: number, total: number) =>
    total > 0 ? (count / total) * 100 : 0;

  console.log('Rating counts (+MIF only, no NG):', ratingCount);
  console.log(`E %: ${percent(ratingCount['E'], itemsWithPlusMif)}`);
  console.log(`G %: ${percent(ratingCount['G'], itemsWithPlusMif)}`);
  console.log(`F %: ${percent(ratingCount['F'], itemsWithPlusMif)}`);
  console.log(`U %: ${percent(ratingCount['U'], itemsWithPlusMif)}`);

  if (percent(ratingCount['E'], itemsWithPlusMif) >= 40 && ratingCount['F'] === 0 && ratingCount['U'] === 0) {
    this.overallGrade = 'E';
  } else if ((percent(ratingCount['G'], itemsWithPlusMif) + percent(ratingCount['E'], itemsWithPlusMif) >= 40)
             && ratingCount['U'] === 0) {
    this.overallGrade = 'G';
  } else if (ratingCount['U'] >= 3) {
    this.overallGrade = 'U';
  } else {
    this.overallGrade = 'F';
  }

  console.log(`✅ Initial overall grade (+MIF only): ${this.overallGrade}`);

  const overallWeight = ratingWeights[this.overallGrade as Rating] || 0;
  let countedLines = 0;
  let eligibleLines = 0;
  let addedNonPlusMifItems = false;

  const finalRatingCount: Record<Rating, number> = { G: 0, E: 0, F: 0, U: 0, NG: 0 };

  for (const item of allItems) {
    if (!item || !item.rating) continue;

    const rating = item.rating as Rating;

    if (rating === 'NG') {
      console.log(`Skipping NG item in second pass: ${item.name}`);
      continue;
    }

    const currentWeight = ratingWeights[rating];
    const hasPlusMif = item.mifRequirement?.startsWith('+') ?? false;

    if (hasPlusMif) {
      eligibleLines++;
      countedLines++;
      finalRatingCount[rating]++;
      console.log(`Line counted (+MIF): ${item.name}, rating=${rating}`);
    } else {
      if (currentWeight >= overallWeight) {
        eligibleLines++;
        countedLines++;
        finalRatingCount[rating]++;
        addedNonPlusMifItems = true;
        console.log(`Line counted (non-+MIF, rating OK): ${item.name}, rating=${rating}`);
      } else {
        console.log(`Skipping line (non-+MIF, rating too low): ${item.name}, rating=${rating}`);
      }
    }
  }

  console.log('Final rating counts (eligible lines):', finalRatingCount);
  console.log(`Eligible lines: ${eligibleLines}`);
  console.log(`Non-+MIF items added: ${addedNonPlusMifItems}`);

  if (addedNonPlusMifItems && eligibleLines > 0) {
    console.log('Recalculating overall grade with all eligible lines.');
    const percentFinal = (count: number) => (count / eligibleLines) * 100;

    console.log(`E %: ${percentFinal(finalRatingCount['E'])}`);
    console.log(`G %: ${percentFinal(finalRatingCount['G'])}`);
    console.log(`F count: ${finalRatingCount['F']}`);
    console.log(`U count: ${finalRatingCount['U']}`);

    if (percentFinal(finalRatingCount['E']) >= 40 && finalRatingCount['F'] === 0 && finalRatingCount['U'] === 0) {
      this.overallGrade = 'E';
    } else if ((percentFinal(finalRatingCount['G']) + percentFinal(finalRatingCount['E']) >= 40)
               && finalRatingCount['U'] === 0) {
      this.overallGrade = 'G';
    } else if (finalRatingCount['U'] >= 3) {
      this.overallGrade = 'U';
    } else {
      this.overallGrade = 'F';
    }

    console.log(`✅ Final overall grade recalculated: ${this.overallGrade}`);
  } else {
    console.log('No non-+MIF items qualified; keeping initial overall grade.');
  }

  console.log(`Counted lines: ${countedLines}/${eligibleLines}`);
  console.log('No rating count (null/undefined):', noRatingCount);
  console.log('=== END RATING CALCULATION ===');
}





  //  calculateOverallRating to handle Us (Safety Unsatisfactory)
  // Orange-section
  // ... (rest of the code remains the same)
  formData2 = {
    sortieStatus: '', // Stores the selected sortie status
    sortieRemarks: [] as string[], // Stores the selected sortie remarks (as an array)
  };

  // Handle Sortie Status Change
  onSortieStatusChange(status: string) {
    // Ensure only one status is selected at a time
    if (this.formData2.sortieStatus === status) {
      this.formData2.sortieStatus = ''; // Deselect if already selected
    } else {
      this.formData2.sortieStatus = status; // Select the new status
    }
    console.log('Sortie Status:', this.formData2.sortieStatus);
  }

  // Handle Sortie Remarks Change
  onSortieRemarksChange(remark: string) {
    const index = this.formData2.sortieRemarks.indexOf(remark);

    if (index === -1) {
      this.formData2.sortieRemarks.push(remark);
    } else {
      this.formData2.sortieRemarks.splice(index, 1);
    }

    // ✅ FIX: Update the safety flag to check for 'SAFETY_MARK' instead of 'Safety Remark'
    this.hasSafetyRemark = this.formData2.sortieRemarks.includes('SAFETY_MARK');

    // Recalculate grade when remarks change
    this.calculateOverallRating();
  }

  // Yellow-section
  // Initialize formData with default values
  formData3 = {
    activities: {
      ils: null, // ILS value
      overheadPattern: null, // O/H PATTERN value
      vor: null, // VOR value
      missedApproach: null, // MISSED APPROACH value
      rnav: null, // RNAV value
      landings: null, // LANDINGS value
    },
    // Other form fields...
  };
  // Initialize formData with default values

  // Method to trigger the browser's print dialog
  printPage() {
    window.print();
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

    this.newGradeSheet = this.formData;

    const name = this.newGradeSheet.flightDomainSyllabus?.name;

    if (!name) {
      this.errorMessage = 'FlightDoaminSyllabus name is missing.';
      return;
    }

    // Optional validation
    // if (!this.validateManeuverItems()) return;
  }
}
