import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faEraser,
  faCalendarDays,
  faUsers,
  faPlaneDeparture,
  faSheetPlastic,
} from '@fortawesome/free-solid-svg-icons';
import { GardeSheetService } from '../../services/garde-sheet.service';

@Component({
  selector: 'app-filght-domain-grade-sheet-details',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './filght-domain-grade-sheet-details.component.html',
  styleUrl: './filght-domain-grade-sheet-details.component.scss',
})
export class FilghtDomainGradeSheetDetailsComponent {
  constructor(private router: Router) {}
  imagePath = 'student.jpg';
  @Input() flightDomainGradeSheet: any = '';
  // Assign icons to class properties for template binding
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faEraser = faEraser;
  faCalendarDays = faCalendarDays;
  faUsers = faUsers;
  faPlaneDeparture = faPlaneDeparture;
  faSheetPlastic = faSheetPlastic;
  gradeSheetService = inject(GardeSheetService);
  goToGradeSheetDetails() {
    this.router.navigate(['/gradesheet'], {
      state: { flightDomainGradeSheet: this.flightDomainGradeSheet },
    });
  }
  goToGradeSheetDetails2() {
    this.router.navigate(['/updateGradeSheet'], {
      state: {
        flightDomainGradeSheet: this.flightDomainGradeSheet,
        isUpdate: true, // 👈 Add this flag
      },
    });
  }

  onDelete(id: number) {
    this.gradeSheetService.deleteGradeSheet(id).subscribe({
      next: () => {
        console.log('Grade sheet deleted');
        // Trick Angular to reload the same route
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['dashboard/flightDomainSyllabus']);
          });
      },
      error: (err) => {
        console.error('Error deleting Grade Sheet:', err);
      },
    });
  }
}
