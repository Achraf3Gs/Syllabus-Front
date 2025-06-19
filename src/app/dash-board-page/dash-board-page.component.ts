import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from "../components/menu/menu.component"; // <-- Import this
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dash-board-page',
  standalone: true,
  imports: [RouterModule, MenuComponent,HeaderComponent], // <-- Add RouterModule here
  templateUrl: './dash-board-page.component.html',
  styleUrls: ['./dash-board-page.component.scss'],
})
export class DashBoardPageComponent {}
