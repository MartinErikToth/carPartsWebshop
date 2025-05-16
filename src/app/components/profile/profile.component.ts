import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  selectedIndex = 0; 
  ProfileObject: any[] = [];
  userEmail: string = ''; 
  userName: string = '';  

  constructor() {}

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
}