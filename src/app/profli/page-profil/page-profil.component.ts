import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import {
  faUser,
  faHeadset,
  faInfo,
  faBook,
  faPen,
  faUserSlash,
  faCircleInfo,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-profil',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './page-profil.component.html',
  styleUrl: './page-profil.component.scss',
})
export class PageProfilComponent {
  constructor(private router: Router) {}

  modifyPassword() {
    this.router.navigate(['changermotpasse']);
  }
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faLock = faLock;
}
