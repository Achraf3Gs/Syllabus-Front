import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // <-- import FontAwesomeModule
import {
  faChartLine,
  faChartPie,
  faChartColumn,
  faPersonChalkboard,
  faList,
  faListUl,
  faGraduationCap,
  faBook,
  faTableColumns,
  faUsers,
  faCalendar,
  faDiagramProject,
  faGear,
  faNoteSticky,
  faNewspaper,
  faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, FontAwesomeModule], // <-- add FontAwesomeModule here
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  router = inject(Router);

  navigate(url?: string): void {
    this.router.navigate([url]);
  }

  public menuProperties = [
    {
      id: '1',
      title: 'Dashboard',
      icon: faChartLine,
      sousMenu: [
        {
          id: '11',
          title: 'Overview',
          icon: faChartPie,
        },
        {
          id: '12',
          title: 'Statistic',
          icon: faChartColumn,
          url: 'statistics',
        },
      ],
    },
    {
      id: '2',
      title: 'Instructors & Aircrafts',
      icon: faPersonChalkboard,
      sousMenu: [
        {
          id: '21',
          title: 'Instructor',
          icon: faList,
          url: 'dashboard/instructors',
        },
        {
          id: '22',
          title: 'Listes-Aircraft',
          icon: faListUl,
          url: 'dashboard/aircrafts',
        },
      ],
    },
    {
      id: '3',
      title: 'Students',
      icon: faGraduationCap,
      sousMenu: [
        {
          id: '31',
          title: 'Student',
          icon: faListUl,
          url: 'dashboard/students',
        },
        {
          id: '32',
          title: 'E-Syllabus',
          icon: faBook,
          url: 'dashboard/esyllabus',
        },
      ],
    },
    {
      id: '4',
      title: 'Settings',
      icon: faGear,
      sousMenu: [
        {
          id: '46',
          title: 'Syllabus',
          icon: faNewspaper,
          url: 'dashboard/syllabus',
        },
        {
          id: '45',
          title: 'FlightDomain-Syllabus',
          icon: faNewspaper,
          url: 'dashboard/flightDomainSyllabus',
        },

        {
          id: '44',
          title: 'FlightDomains',
          icon: faDiagramProject,
          url: 'dashboard/flightDomain',
        },
        {
          id: '41',
          title: 'Maneuvers',
          icon: faTableColumns,
          url: 'dashboard/maneuvers',
        },

        {
          id: '43',
          title: 'Phases',
          icon: faCalendar,
          url: 'dashboard/phase',
        },
        {
          id: '47',
          title: 'sortiesTypes',
          icon: faPlaneDeparture,
          url: 'dashboard/sortiesTypes',
        },
        {
          id: '42',
          title: 'Users',
          icon: faUsers,
          url: 'dashboard/user',
        },
      ],
    },
  ];
}
