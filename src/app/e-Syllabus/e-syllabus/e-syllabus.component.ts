import { Component } from '@angular/core';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ESyllabusDetailsComponent } from '../../components/e-syllabus-details/e-syllabus-details.component';
import { EsyllabusButtonComponent } from '../../components/esyllabus-button/esyllabus-button.component';
import { GradeSheetDetailsComponent } from '../../components/grade-sheet-details/grade-sheet-details.component';

@Component({
  selector: 'app-e-syllabus',
  standalone: true,
  imports: [ESyllabusDetailsComponent,PaginationComponent, EsyllabusButtonComponent,GradeSheetDetailsComponent],
  templateUrl: './e-syllabus.component.html',
  styleUrl: './e-syllabus.component.scss'
})
export class ESyllabusComponent {

}
