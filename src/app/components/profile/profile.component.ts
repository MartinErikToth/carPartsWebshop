import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileObject } from '../../shared/constant';

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

  userEmail: string = ''; // A felhasználó emailje
  userName: string = '';  // A felhasználó neve

  constructor() {}

  ngOnInit(): void {
    // Itt lehet betölteni a regisztrált felhasználó adatokat
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedProfiles = localStorage.getItem('ProfileObject');
      if (storedProfiles) {
        this.ProfileObject = JSON.parse(storedProfiles); // Betöltjük az adatokat
      }
      // Betöltjük a felhasználó nevét és email címét a localStorage-ból
      this.userName = localStorage.getItem('userName') || '';
      this.userEmail = localStorage.getItem('userEmail') || '';
    }
  }

  reload(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
  }

  trackByIndex(index: number, item: any): number {
    return index; // Visszatér az index, így Angular jobban követi az elemeket
  }
}