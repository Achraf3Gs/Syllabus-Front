import { Component } from '@angular/core';
import { Router } from '@angular/router'; // import Router

@Component({
  selector: 'app-esyllabus-button',
  standalone: true,
  imports: [],
  templateUrl: './esyllabus-button.component.html',
  styleUrl: './esyllabus-button.component.scss'
})
export class EsyllabusButtonComponent {
 constructor(private router: Router) {}

  goToNewStudent() {
    this.router.navigate(['/newstudent']);
  }
}
