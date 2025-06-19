import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Import required icons from Font Awesome Solid
import { faInfo, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent {
  faInfo = faInfo;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
}
