import { GradeSheetComponent } from './grade-Sheet/grade-Sheet.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashBoardPageComponent } from "./dash-board-page/dash-board-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GradeSheetComponent, LoginComponent, RegisterComponent, DashBoardPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'eSyllabus';
}
