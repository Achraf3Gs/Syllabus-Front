import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IUserLogin } from '../shared/intefaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from '../services/authuser.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true, // <--- you forgot this also if it's standalone
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // <-- 'styleUrls' not 'styleUrl'
  host: {
    ngSkipHydration: 'true', // ✅ This is the correct way
  },
})
export class LoginComponent {
  userLogin: IUserLogin = {
    email: '',
    password: '',
  };
  errorMessages = '';

  http = inject(HttpClient);
  router = inject(Router);
  authuserService = inject(AuthUserService);

  onlogin() {
    console.log('User attempting to log in:', this.userLogin);

    this.authuserService.login(this.userLogin).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('Login successful', response);
        this.router.navigate(['dashboard']); // or wherever you want to redirect
      },
      error: (err) => {
        // Handle login error
        console.error('Login error', err);
        this.errorMessages = 'Your email and/or password is incorrect.';
      },
    });
  }
}
