import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  isLoading = false;
  loginError = '';
  showLoginForm = true;
  isLoggedIn = false;

  constructor(private router: Router) {}

  login() {
    this.loginError = '';
    this.isLoading = true;

    const auth = getAuth();
    const email = this.loginForm.get('email')?.value!;
    const password = this.loginForm.get('password')?.value!;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      this.router.navigate(['/profile']);
      this.isLoggedIn = true;
    })
    .catch(err => {
      this.loginError = 'Az email cím vagy a jelszó nem megfelelő.';
      this.isLoading = false;
    });
  }
}
