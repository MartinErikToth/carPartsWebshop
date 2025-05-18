import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/users/User';
import { ProfileObject } from '../../shared/users/constant';
import { Auth, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private auth: Auth = inject(Auth);
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
  });

  isLoading = false;
  signupError = '';
  showForm = true;
  isLoggedin = false;

  constructor(private router: Router) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Ellenőrizd az adatokat!';
      return;
    }

    const { email, password, rePassword } = this.signUpForm.value;
    if (password !== rePassword) {
      this.signupError = 'A jelszavak nem egyeznek!';
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email!, password!)
      .then(() => {
        this.router.navigate(['/profile']);
        this.isLoggedin = false;
      })
      .catch(err => {
        this.signupError = 'Regisztrációs hiba: ' + err.message;
        this.isLoading = false;
      });
  }
}
