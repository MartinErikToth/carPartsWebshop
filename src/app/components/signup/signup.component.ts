import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/User';
import { ProfileObject } from '../../shared/constant';

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
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  });

  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router: Router) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Please correct the form errors before submitting.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      name: {
        firstname: this.signUpForm.value.name?.firstname || '',
        lastname: this.signUpForm.value.name?.lastname || ''
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
    };

    // Tárold el az adatokat a localStorage-ban
    localStorage.setItem('userEmail', newUser.email);
    localStorage.setItem('userPassword', newUser.password);

    // Betöltjük a meglévő ProfileObject-et a localStorage-ból
    const storedProfiles = localStorage.getItem('ProfileObject');
    const profileObject = storedProfiles ? JSON.parse(storedProfiles) : [];

    // Hozzáadjuk az új felhasználót a ProfileObject-hez
    ProfileObject.push({
      id: profileObject.length + 1,
      email: newUser.email,
      name: newUser.name,
      avatar: 'X)', // Alapértelmezett avatar
      tasks: {
        total: 0,
        completed: 0,
        pending: 0
      }
    });

    // Elmentjük a frissített ProfileObject-et a localStorage-ba
    localStorage.setItem('ProfileObject', JSON.stringify(ProfileObject));

    console.log('New user:', newUser);
    console.log('ProfileObject:', ProfileObject);

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  }
}
