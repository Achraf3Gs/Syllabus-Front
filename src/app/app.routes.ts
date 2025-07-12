import { PageUserComponent } from './users/page-user/page-user.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashBoardPageComponent } from './dash-board-page/dash-board-page.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PageStudentComponent } from './students/page-student/page-student.component';
import { NewStudentComponent } from './students/new-student/new-student.component';
import { ESyllabusComponent } from './e-Syllabus/e-syllabus/e-syllabus.component';
import { GradeSheetComponent } from './grade-Sheet/grade-Sheet.component';
import { ESyllabusDetaileComponent } from './components/e-syllabus-detaile/e-syllabus-detaile.component';
import { PageInstructorComponent } from './instrctor/page-instructor/page-instructor.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { NewInstructorComponent } from './instructor/new-instructor/new-instructor.component';
import { EmptycomponentComponent } from './components/emptycomponent/emptycomponent.component';
import { PageManeuverComponent } from './maneuvers/page-maneuver/page-maneuver.component';
import { NewManeuverItemComponent } from './maneuvers/new-maneuverItem/new-maneuverItem.component';
import { PageProfilComponent } from './profli/page-profil/page-profil.component';
import { ChangerMotPassComponent } from './profil/changer-mot-pass/changer-mot-pass.component';
import { InstructorStudentsComponent } from './instructor/instructor-students/instructor-students.component';
import { PageAircraftComponent } from './aircraft/page-aircraft/page-aircraft.component';
import { PagePhaseComponent } from './components/page-phase/page-phase.component';
import { NewphaseComponent } from './components/newphase/newphase.component';
import { PageFlightDomainComponent } from './components/page-flight-domain/page-flight-domain.component';
import { NewflightDomainComponent } from './components/newflight-domain/newflight-domain.component';
import { NewAircraftComponent } from './aircraft/new-aircraft/new-aircraft.component';
import { FlightDomainSyllabusComponent } from './pageFlightDomainSyllabus/flight-domain-syllabus/flight-domain-syllabus.component';
import { NewFlightDoaminSyllabusComponent } from './pageFlightDomainSyllabus/new-flight-doamin-syllabus/new-flight-doamin-syllabus.component';
import { NewGradeSheetComponent } from './pageFlightDomainSyllabus/new-grade-sheet/new-grade-sheet.component';
import { PageSylabusComponent } from './Syllabus/page-sylabus/page-sylabus.component';
import { NewSyllabusComponent } from './Syllabus/new-syllabus/new-syllabus.component';
import { NewSortiesTypesComponent } from './SortiesTypes/new-sorties-types/new-sorties-types.component';
import { PageSortiesTpyesComponent } from './SortiesTypes/page-sorties-tpyes/page-sorties-tpyes.component';
import { StandardGradeSheetComponent } from './components/standard-grade-sheet/standard-grade-sheet.component';
import { FlightDoaminSyllabusTemplateComponent } from './pageFlightDomainSyllabus/flight-doamin-syllabus-template/flight-doamin-syllabus-template.component';
import { UpdateGradeSheetComponent } from './pageFlightDomainSyllabus/update-grade-sheet/update-grade-sheet.component';
import { NewstudentSyllabusComponent } from './students/newstudent-syllabus/newstudent-syllabus.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Very important to match the full empty path
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'gradesheet',
    component: GradeSheetComponent,
  },
  {
    path: 'standardGradeSheet',
    component: StandardGradeSheetComponent,
  },
  {
    path: 'newGradeSheet',
    component: NewGradeSheetComponent,
  },

  {
    path: 'updateGradeSheet',
    component: UpdateGradeSheetComponent,
  },
  {
    path: 'dashboard',
    component: DashBoardPageComponent,
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: '',
        component: EmptycomponentComponent, // This is the default route with image
      },
      {
        path: 'maneuvers',
        component: PageManeuverComponent,
      },
      {
        path: 'students',
        component: PageStudentComponent,
      },
      {
        path: 'instructors',
        component: PageInstructorComponent,
      },
      {
        path: 'aircrafts',
        component: PageAircraftComponent,
      },
      {
        path: 'newstudent',
        component: NewStudentComponent,
      },
      {
        path: 'newstudent-syllabus',
        component: NewstudentSyllabusComponent,
      },
      {
        path: 'newinstructor',
        component: NewInstructorComponent,
      },
      {
        path: 'newphase',
        component: NewphaseComponent,
      },
      {
        path: 'newsortiesType',
        component: NewSortiesTypesComponent,
      },
      {
        path: 'sortiesTypes',
        component: PageSortiesTpyesComponent,
      },
      {
        path: 'newflightDomain',
        component: NewflightDomainComponent,
      },
      {
        path: 'newmaneuver',
        component: NewManeuverItemComponent,
      },
      {
        path: 'newaircraft',
        component: NewAircraftComponent,
      },
      {
        path: 'esyllabus',
        component: ESyllabusComponent,
      },

      {
        path: 'syllabusdetaile/:id',
        component: ESyllabusDetaileComponent,
      },
      {
        path: 'syllabusdetaile',
        redirectTo: 'syllabusdetaile/',
        pathMatch: 'full'
      },
      {
        path: 'user',
        component: PageUserComponent,
      },
      {
        path: 'phase',
        component: PagePhaseComponent,
      },
      {
        path: 'flightDomain',
        component: PageFlightDomainComponent,
      },

      {
        path: 'newuser',
        component: NewUserComponent,
      },
      {
        path: 'profil',
        component: PageProfilComponent,
      },
      {
        path: 'changermotpasse',
        component: ChangerMotPassComponent,
      },
      {
        path: 'instructor-students/:id',
        component: InstructorStudentsComponent,
      },
      {
        path: 'flightDomainSyllabus',
        component: FlightDomainSyllabusComponent,
      },
      {
        path: 'flightDoaminSyllabusTemplate/:id',
        component: FlightDoaminSyllabusTemplateComponent,
      },
      {
        path: 'newflightDomainSyllabus',
        component: NewFlightDoaminSyllabusComponent,
      },
      {
        path: 'syllabus',
        component: PageSylabusComponent,
      },
      {
        path: 'newsyllabus',
        component: NewSyllabusComponent,
      },
      {
        path: 'flightDoaminSyllabusTemplateComponent/:id',
        component: FlightDoaminSyllabusTemplateComponent,
      },
    ],
  },
];
