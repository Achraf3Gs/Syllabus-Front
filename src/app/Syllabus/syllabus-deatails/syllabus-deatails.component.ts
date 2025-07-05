import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faFloppyDisk,
  faNoteSticky,
  faNewspaper,
  faTrash,
  
} from '@fortawesome/free-solid-svg-icons';
import { Syllabus } from '../../model/Syllabus';
import { SyllabusService } from '../../services/syllabus.service';
@Component({
  selector: 'app-syllabus-deatails',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './syllabus-deatails.component.html',
  styleUrl: './syllabus-deatails.component.scss',
})
export class SyllabusDeatailsComponent {
  @Input() syllabus: any = '';
 @Output() syllabusDeleted = new EventEmitter<number>();

   selectedSyllabus: Syllabus = {} as Syllabus;
  constructor(private router: Router) {}
  imagePath = 'student.jpg';
 syllabusService = inject(SyllabusService);
  ngOnInit(): void {}

  // Assign icons to class properties for template binding
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faFloppyDisk = faFloppyDisk;
  faNoteSticky = faNoteSticky;
  faNewspaper = faNewspaper;
  faTrash = faTrash;

  goToSyllabusDetails() {
    if (this.syllabus && this.syllabus.id) {
      this.router.navigate(['dashboard', 'syllabusdetaile', this.syllabus.id]);
    } else {
      console.error('Cannot navigate: syllabus or syllabus.id is undefined');
      this.router.navigate(['dashboard/syllabusdetaile']);
    }
  }

  goToNewFlightDomainSyllabus() {
    this.router.navigate(['dashboard/newflightDomainSyllabus']);
  }

 openUpdateModal(syllabus: Syllabus): void {
         // Create a copy to avoid modifying the original object directly
         this.selectedSyllabus = { ...syllabus };
       }
     
       updateSyllabus(): void {
         if (this.selectedSyllabus && this.selectedSyllabus.id) {
           const updatePayload = { title: this.selectedSyllabus.title};
           this.syllabusService.updateSyllabus(this.selectedSyllabus.id, updatePayload)
             .subscribe({
               next: () => {
                 console.log('Update successful');
                 // Reload the page to see the changes
                 window.location.reload();
               },
               error: (error) => {
                 console.error('Update failed', error);
               },
             });
         }
       }
   

  deleteSyllabus(syllabusId: number): void {
    if (confirm('Are you sure you want to delete this Syllabus?')) {
      this.syllabusService.deleteSyllabus(syllabusId).subscribe({
        next: (response) => {
          console.log('Syllabus deleted successfully');

          // Reload the page or trigger parent reload
          window.location.reload(); // Simple but not elegant

          // OR emit to parent (preferred)
          this.syllabusDeleted.emit(syllabusId);
        },
        error: (error) => {
          console.error('Error deleting Syllabus:', error);
        },
      });
    }
  }
}

