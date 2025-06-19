import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [FaIconComponent,RouterLink], // <-- Important
})
export class HeaderComponent {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faMagnifyingGlass);
  }
}
