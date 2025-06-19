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
  faBan,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-changer-mot-pass',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './changer-mot-pass.component.html',
  styleUrl: './changer-mot-pass.component.scss',
})
export class ChangerMotPassComponent {
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faLock = faLock;
  faBan = faBan;
  faSave=faSave;
}
