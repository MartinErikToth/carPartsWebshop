import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  selectedIndex = 0; // Kezdő index, ha van több profil
  ProfileObject: any[] = []; // Az összes felhasználói profil
  language: string = 'hu';
  isDarkMode: boolean = false;
  userEmail: string = ''; // A felhasználó emailje
  userName: string = '';  // A felhasználó neve

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedProfiles = localStorage.getItem('ProfileObject');
      if (storedProfiles) {
        this.ProfileObject = JSON.parse(storedProfiles); 
      }
      this.userName = localStorage.getItem('userName') || '';
      this.userEmail = localStorage.getItem('userEmail') || '';
    }
  }

  reload(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}