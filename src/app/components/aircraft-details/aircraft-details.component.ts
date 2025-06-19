import { Component, Input } from '@angular/core';
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
  faUsersViewfinder,
  faRocket,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-aircraft-details',
  standalone: true,
  imports: [FontAwesomeModule,NgClass, NgIf],
  templateUrl: './aircraft-details.component.html',
  styleUrl: './aircraft-details.component.scss',
})
export class AircraftDetailsComponent {
  @Input() aircraft: any;

  // Assign icons to class properties for template binding
  faUser = faUser;
  faHeadset = faHeadset;
  faInfo = faInfo;
  faBook = faBook;
  faPen = faPen;
  faUserSlash = faUserSlash;
  faCircleInfo = faCircleInfo;
  faUsersViewfinder = faUsersViewfinder;
  faRocket=faRocket;
  faTrash=faTrash;
}
