import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // <--- you need this!
import { AuthUserService } from '../services/authuser.service';
import { IUserRegister } from '../shared/intefaces/IuserRegister';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, RouterModule, FormsModule], // <--- add RouterModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userRegister: IUserRegister = {
    firstName: '',
    lastName: '',
    grade: '',
    function: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: undefined,
  };
  errorMessages = '';
  http = inject(HttpClient);
  router = inject(Router);
  authuserService = inject(AuthUserService);
  onRegister() {
    this.authuserService.register(this.userRegister).subscribe({
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessages = 'Registration error';
      },
    });
  }
}
