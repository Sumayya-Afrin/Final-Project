import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCard,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signupForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private snackBar: MatSnackBar
  ) {
    // formGroup -> formControlName
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // usersignUp() {
  //   console.log(this.signupForm.value);
  //   this.loginService.signup(this.signupForm.value).then((data) => {
  //     this.router.navigate(['/login']);
  //   });
  // }

  usersignUp() {
    if (this.signupForm.valid) {
      this.loginService
        .signup(this.signupForm.value)
        .then((data) => {
          this.snackBar.open('Sign-up completed successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error('Sign-up error:', error);
        });
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }

  get username() {
    return this.signupForm.get('username');
  }
  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
