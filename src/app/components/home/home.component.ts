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
  template: `
    <div class="home">
      <section class="hero">
        <h1>Üdvözlünk az Autoalkatrész Webshopban!</h1>
        <p>Vásárolj minőségi alkatrészeket autódhoz!</p>
      </section>

      <section class="gallery">
        <h2>Alkatrészek Képgaléria</h2>
        <div class="gallery-container">
          <div class="gallery-scroll">
            <mat-card *ngFor="let image of images">
              <img mat-card-image [src]="image.src" [alt]="image.alt" />
              <mat-card-content>
                <p>{{ image.alt }}</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <section class="contact">
        <h2>Kapcsolatfelvétel</h2>
        <form class="contact-form">
          <mat-form-field appearance="outline">
            <mat-label>Neved</mat-label>
            <input matInput placeholder="Add meg a neved" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Email címed</mat-label>
            <input matInput type="email" placeholder="Add meg az email címed" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Üzenet</mat-label>
            <textarea matInput placeholder="Írd be az üzeneted"></textarea>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">Küldés</button>
        </form>
      </section>
    </div>
  `,styleUrls: ['./home.component.css'],
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
