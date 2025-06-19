import { Component } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ButtonActionComponent } from '../../components/button-action/button-action.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { Router } from '@angular/router'; // import Router

@Component({
  selector: 'app-page-user',
  standalone: true,
  imports: [UserDetailsComponent, PaginationComponent, ButtonActionComponent],
  templateUrl: './page-user.component.html',
  styleUrl: './page-user.component.scss',
})
export class PageUserComponent {
  constructor(private router: Router) {}

  goToNewUser() {
    this.router.navigate(['dashboard/newuser']);
  }
}
