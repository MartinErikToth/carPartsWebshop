import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: ``,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 1' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 2' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 3' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 4' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 5' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 6' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 7' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 8' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 9' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 10' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 11' },
    { src: 'https://cdn.euautoteile.de/uploads/custom-catalog/eu/categories/500x500/10343.png', alt: 'Alkatrész 12' },
  ];
}
