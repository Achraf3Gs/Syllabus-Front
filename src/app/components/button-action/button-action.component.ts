import { Component } from '@angular/core';
import { Router } from '@angular/router'; // import Router

@Component({
  selector: 'app-button-action',
  standalone: true,
  imports: [],
  templateUrl: './button-action.component.html',
  styleUrl: './button-action.component.scss',
})
export class ButtonActionComponent {
  constructor(private router: Router) {}

  goToNewStudent() {
    this.router.navigate(['/newstudent']);
  }
}
