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
        <button mat-raised-button color="accent" routerLink="/products">Termékek böngészése</button>
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

      <footer>
        <div class="footer-content">
          <div class="contact-info">
            <h3>Kapcsolat</h3>
            <p><strong>Telefon:</strong> +36 1 234 5678</p>
            <p><strong>Email:</strong> info&#64;webshop.hu</p>
          </div>
          <div class="social-media">
            <h3>Kövess minket!</h3>
            <a href="#" class="social-link">Facebook</a> | 
            <a href="#" class="social-link">Instagram</a> | 
            <a href="#" class="social-link">Twitter</a>
          </div>
          <div class="footer-bottom">
            <p>© 2025 Autoalkatrész Webshop. Minden jog fenntartva.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .home {
        text-align: center;
      }
      .hero {
        background: #2c3e50;
        padding: 30px;
        border-radius: 10px;
        margin-bottom: 30px;
      }

      .hero h1 {
        color: white;
      }

      .hero p {
        color: white;
      }
      .gallery {
        margin: 30px 0;
      }
      .gallery-container {
        width: 100%;
        overflow: hidden;  /* Ne jelenjenek meg a képek a konténeren kívül */
      }
      .gallery-scroll {
        display: flex;
        gap: 20px;
        animation: scroll 20s linear infinite; 
        transition: all 0.5s ease;
      }
      mat-card {
        min-width: 250px;
        flex-shrink: 0;
        max-width: 300px;
        transition: transform 0.2s ease-in-out;
      }
      mat-card:hover {
        transform: scale(1.05);
      }
      .contact {
        margin: 40px 0;
      }
      .contact-form {
        max-width: 600px;
        margin: 0 auto;
        display: grid;
        gap: 20px;
      }
      .home .contact button:hover {
        background-color: #d1e7ff; /* Hover háttérszín */
        color: #3f51b5; /* Hover szövegszín */
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Enyhe árnyék */
      }
      footer {
        margin-top: 40px;
        padding: 20px;
        background: #2c3e50;
        color: white;
      }
      .footer-content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .footer-content div {
        flex: 1 1 30%;
        margin: 10px;
      }
      .footer-bottom {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9rem;
      }
      .contact-info h3, .social-media h3 {
        margin-bottom: 10px;
        font-size: 1.2rem;
      }
      .social-link {
        color: #fff;
        text-decoration: none;
        margin-right: 10px;
      }
      .social-link:hover {
        text-decoration: underline;
      }

      /* Animation for auto-scrolling */
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);  /* Scroll to the left */
        }
      }
    `,
  ],
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
