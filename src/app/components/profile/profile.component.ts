import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification } from 'firebase/auth';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { updateEmail, deleteUser } from 'firebase/auth';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  selectedIndex = 0; 
  ProfileObject: any[] = [];
  userEmail: string = ''; 
  userName: string = '';  

  newEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userEmail = user.email || '';  
        this.userName = user.displayName || 'Felhasználó';  
        this.ProfileObject = [
          {
            avatar: user.photoURL || 'X)'
            
          }
        ];
      } else {
        this.userEmail = '';
        this.userName = '';
      }
    });

  
    const currentProfile = this.ProfileObject.find(profile => profile.email === localStorage.getItem('userEmail'));
    if (currentProfile) {
      this.userName = `${currentProfile.name.firstname} ${currentProfile.name.lastname}`;
      this.userEmail = currentProfile.email;
    }
  }

  reload(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  
deleteAccount(): void {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user && confirm('Biztosan törölni szeretnéd a fiókodat? Ez a művelet nem visszavonható.')) {
    deleteUser(user)
      .then(() => {
        alert('A fiók törlése sikeres volt.');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Fiók törlése sikertelen:', error);
        alert('Hiba történt a fiók törlésekor: ' + error.message);
      });
  }
}
}