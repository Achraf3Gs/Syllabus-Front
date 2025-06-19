import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Pipe({ name: 'gradeClass', standalone: true })
export class GradeClassPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'grade-empty';
    return 'grade-' + value.toUpperCase();
  }
}

@Component({
  selector: 'app-flight-doamin-syllabus-template',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, CommonModule, GradeClassPipe],
  templateUrl: './flight-doamin-syllabus-template.component.html',
  styleUrl: './flight-doamin-syllabus-template.component.scss',
})
export class FlightDoaminSyllabusTemplateComponent  {
  overallGrade: string = '-------';

  missionColumns = [
    { date: '11/02', overallGrade: 'G' }, // basic
    { date: '12/02', overallGrade: 'F' },
    { date: '13/02', overallGrade: 'E' },
    { date: '14/02', overallGrade: 'G' },
    { date: '15/02', overallGrade: 'G' }, // advanced
    { date: '16/02', overallGrade: 'E' },
    { date: '17/02', overallGrade: 'G' },
    { date: '18/02', overallGrade: 'F' },
  ];

  maneuvers = [
    {
      name: 'Mission preparation',
      grades: ['F', 'F', 'E', 'G', 'F', 'F', 'E', 'G'],
      mif: '3+ (F)',
    },
    {
      name: 'Ground operations',
      grades: ['G', 'F', 'G', 'G', 'F', 'F', 'E', 'G'],
      mif: '4+ (G)',
    },
    {
      name: 'Take off',
      grades: ['G', 'E', 'E', 'G', 'F', 'F', 'E', 'G'],
      mif: '4+ (G)',
    },
    {
      name: 'Departure',
      grades: ['F', 'G', 'E', 'E', 'F', 'F', 'E', 'G'],
      mif: '4+ (G)',
    },
    {
      name: 'Basic Aircraft Control',
      grades: ['G', 'G', 'E', 'G', 'F', 'F', 'E', 'G'],
      mif: '4+ (G)',
    },
    {
      name: 'Straight Level Flight',
      grades: ['G', 'U', 'F', 'F', 'F', 'F', 'E', 'G'],
      mif: '3+ (F)',
    },
    {
      name: 'Spin',
      grades: ['F', 'F', 'E', 'G', 'F', 'F', 'E', 'G'],
      mif: '2 (U)',
    },
  ];

  getGradeLevel(letter: string): number {
    switch (letter) {
      case 'U':
        return 2;
      case 'F':
        return 3;
      case 'G':
        return 4;
      case 'E':
        return 5;
      default:
        return 0; // For unknown or empty values
    }
  }
  extractMifLevel(mif: string): number {
    const match = mif.match(/^(\d+)/); // Get the numeric part at the start
    return match ? +match[1] : 0;
  }
}
