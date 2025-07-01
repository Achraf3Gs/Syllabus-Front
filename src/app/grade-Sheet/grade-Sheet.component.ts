import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { InsructorService } from '../services/insructor.service';
import { Router } from '@angular/router';
import { Instructor } from '../model/Instructor';
import { AircraftService } from '../services/aircraft.service';
import { Aircraft } from '../model/Aircraft';

import { PhaseService } from '../services/phase.service';
import { Phase } from '../model/Phase';
import { GardeSheetService } from '../services/garde-sheet.service';
import { FlightDomainService } from '../services/flightDomain.service';
import { GradeSheetManeuverItemService } from '../services/grade-sheet-maneuver-item.service';

type Rating = 'E' | 'G' | 'F' | 'U' | 'NG';

@Component({
  selector: 'app-grade-Sheet',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, CommonModule],
  templateUrl: './grade-Sheet.component.html',
  styleUrl: './grade-Sheet.component.scss',
})
export class GradeSheetComponent implements OnInit {
  // table of student
  students: any;
  instructors: any;
  aircrafts: Aircraft[] = [];
  phases: Phase[] = [];
  flightDomains: any[] = [];
  hasSafetyRemark = false;

  instructor: Instructor | undefined;
  studentService = inject(StudentService);
  instructorService = inject(InsructorService);
  aircraftService = inject(AircraftService);
  phaseService = inject(PhaseService);
  gradeSheetService = inject(GardeSheetService);
  flightDomainService = inject(FlightDomainService);
  gradeSheetManeuverItemService = inject(GradeSheetManeuverItemService);

  flightDomainGradeSheet: any;
  maneuverWithMifDTO: any;
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
      console.log(
        'flightDomainSyllabus received :',
        this.flightDomainGradeSheet
      );
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
    }

    // Optional: handle update mode flag
    if (state?.isUpdate) {
     
      console.log('Update mode enabled'); // ✅ You can also set a local `isUpdate` flag
      this.isUpdateMode = true; // define `isUpdateMode` as a class-level boolean if needed
    }
  }

  errorMessage: any;

  ngOnInit(): void {
    console.log(
      'Received flightDomainGradeSheet:',
      this.flightDomainGradeSheet
    );
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
    if (!this.flightDomainGradeSheet) {
      console.error('Missing flightDomainGradeSheet');
      return;
    }

    this.gradeSheetManeuverItemService
      .listGradeSheetManeuverItem(this.flightDomainGradeSheet.id)
      .subscribe((response) => {
        this.maneuverWithMifDTO = response;
        console.log('maneuverWithMifDTO:', this.maneuverWithMifDTO);
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

  // Form data model
  formData = {
    mixDur: '',
    crewMember: '',
    student: '',
    aircraft: '',
    date: '',
    selectedGroupId: 0,
    instructorName: '',
    sortieType: '',
    sortieNbr: '',
    phase: '',
    ///GrageSheet-Name///
    name: '',
  };

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
  selectedGroupId: number | null = null;
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

  onGroupChange(groupId: number | null) {
    if (groupId === null) return;

    console.log('selectedFlightDomains before:', this.selectedFlightDomains);
    this.selectedGroup = this.flightDomains.find((g) => g.id === +groupId);

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
  calculateOverallRating(): void {
    console.log('=== CALCULATING OVERALL RATING ===');
    console.log('hasSafetyRemark flag:', this.hasSafetyRemark);

    if (this.selectedFlightDomains.length === 0) {
      console.log('No selected maneuvers');
      this.overallGrade = '-------';
      return;
    }

    // ✅ Step 1: Safety remark overrides all (CHECK THIS FIRST)
    if (this.hasSafetyRemark) {
      console.log('🚨 SAFETY REMARK DETECTED - Setting grade to U');
      this.overallGrade = 'U';
      return;
    }

    // Flatten all items safely
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

    const ratingCount: Record<Rating, number> = {
      G: 0,
      E: 0,
      F: 0,
      U: 0,
      NG: 0,
    };

    let noRatingCount = 0;

    // ✅ Step 2: Count ratings safely
    for (const item of allItems) {
      if (!item || !item.rating) {
        console.log('Item with no rating:', item?.name || 'Unknown item');
        noRatingCount++;
        continue;
      }

      const rating = item.rating as Rating;
      if (!(rating in ratingCount)) {
        console.log('Invalid rating detected:', rating);
        noRatingCount++;
        continue;
      }

      ratingCount[rating]++;
    }

    console.log('Rating counts:', ratingCount);
    console.log('No rating count (null/undefined):', noRatingCount);

    // ✅ Step 3: Handle unrated items (null/undefined ratings OR NG ratings)
    if (noRatingCount > 0 || ratingCount['NG'] > 0) {
      console.log('Setting to NG due to unrated items or NG ratings');
      console.log('- Null/undefined ratings:', noRatingCount);
      console.log('- NG ratings:', ratingCount['NG']);
      this.overallGrade = 'NG';
      return;
    }

    const percent = (count: number) => (count / totalItems) * 100;

    console.log('Percentages:');
    console.log('E:', percent(ratingCount['E']) + '%');
    console.log('G:', percent(ratingCount['G']) + '%');
    console.log('F:', percent(ratingCount['F']) + '%');
    console.log('U:', percent(ratingCount['U']) + '%');

    // ✅ Step 4: Grading rules (only for E, G, F, U ratings)
    if (
      percent(ratingCount['E']) >= 40 &&
      ratingCount['F'] === 0 &&
      ratingCount['U'] === 0
    ) {
      console.log('Setting to E: E% >= 40, no F, no U');
      this.overallGrade = 'E';
    } else if (
      percent(ratingCount['G']) + percent(ratingCount['E']) >= 40 &&
      ratingCount['U'] === 0
    ) {
      console.log('Setting to G: (G+E)% >= 40, no U');
      this.overallGrade = 'G';
    } else if (ratingCount['U'] >= 3) {
      console.log('Setting to U: 3+ U ratings');
      this.overallGrade = 'U';
    } else {
      console.log('Setting to F: default case');
      this.overallGrade = 'F';
    }

    console.log('Final overall grade:', this.overallGrade);
    console.log('=== END RATING CALCULATION ===');
  }

  // Orange-section
  // Initialize formData2 with default values
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

  comments: String = '';

  // Method to trigger the browser's print dialog
  printPage() {
    window.print();
  }

  // Updated saveGradesheet method to include MIF requirements
  saveGradesheet() {
    // Build the gradeSheetManeuverItems array with MIF requirements
    const gradeSheetManeuverItems: any[] = [];

    this.selectedFlightDomains.forEach((group) => {
      if (group.maneuverItems) {
        group.maneuverItems.forEach((item: any) => {
          gradeSheetManeuverItems.push({
            maneuverItem: {
              id: item.id,
            },
            rating: item.rating || null,
            mifRequirement: item.mifRequirement || '',
          });
        });
      }
    });

    // Build the complete gradesheet object
    const gradesheetData = {
      name: `Flight Training Session - Student ${
        this.formData.student || 'Unknown'
      }`,
      mixDur: this.formData.mixDur || '0',
      crewMember: this.formData.crewMember || 'Unknown',
      student: this.formData.student || 'Unknown',
      aircraft: this.formData.aircraft || 'Unknown',
      date: this.formData.date || new Date().toISOString().slice(0, 10),
      instructorName: this.formData.instructorName || 'N/A',
      sortieType: this.formData.sortieType || 'General',
      sortieNbr: this.formData.sortieNbr || 'N/A',
      overallGrade: this.overallGrade || 'G',
      phase: this.formData.phase || '1',
      sortieStatus: this.formData2.sortieStatus || 'PENDING',
      sortieRemarks: this.formData2.sortieRemarks?.length
        ? this.formData2.sortieRemarks
        : [],
      ils: this.formData3.activities.ils ?? 0,
      overheadPattern: this.formData3.activities.overheadPattern ?? 0,
      vor: this.formData3.activities.vor ?? 0,
      missedApproach: this.formData3.activities.missedApproach ?? 0,
      rnav: this.formData3.activities.rnav ?? 0,
      landings: this.formData3.activities.landings ?? 0,
      esyllabus: { id: 1 },

      comments: this.comments?.trim()
        ? [
            {
              content: this.comments.trim(),
              timestamp: new Date().toISOString(),
            },
          ]
        : [],

      gradeSheetManeuverItems: gradeSheetManeuverItems,
    };

    console.log('Gradesheet Data to Save:', gradesheetData);

    // Call the service to submit the gradesheet
    this.gradeSheetService.createGradeSheet(gradesheetData).subscribe({
      next: () => {
        console.log('GradeSheet successfully created');
        this.router.navigate(['dashboard/esyllabus']); // Navigate after success
      },
      error: (error) => {
        console.error('Error creating GradeSheet:', error);
        this.errorMessage = 'Failed to create GradeSheet. Please try again.';
      },
    });
  }
}
