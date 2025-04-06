import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule, 
    RouterModule, 
    CommonModule  
  ],
  template: `
  <body>
  <div class="home">
      <mat-toolbar color="primary" class="navbar">
        <span class="logo">Autoalkatrész Webshop</span>
        <span class="spacer"></span>
        <nav>
          <button mat-button routerLink="/" class="nav-button">Főoldal</button>
          <button mat-button routerLink="/products" class="nav-button">Termékek</button>
          <button mat-button routerLink="/cart" class="nav-button">Kosár</button>
          <!--<button mat-button routerLink="/profile" class="nav-button">Profil</button>-->

          @if (isLoggedIn) {
            <button mat-button routerLink="/profile" class="nav-button">Profil</button>
          }

          @if (isLoggedIn) {
            <button mat-button routerLink="/login" class="nav-button" (click)="logout()">Kijelentkezés</button>
          }


          @if (!isLoggedIn) {
            <button mat-button routerLink="/login" class="nav-button">Bejelentkezés</button>
          }

          <!-- Ha be van jelentkezve, akkor jelenjen meg a logout gomb 
          <button *ngIf="isLoggedIn" mat-button routerLink="/login" class="nav-button" (click)="logout()">Logout</button>
          <button *ngIf="!isLoggedIn" mat-button routerLink="/login" class="nav-button">Login</button
          <button mat-button routerLink="/admin" class="nav-button">Admin</button>-->





        </nav>
      </mat-toolbar>
    </div>  
    <router-outlet></router-outlet>
  </body>
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
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  intervalId: any;

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    // Ellenőrizzük, hogy létezik-e localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
    // Frissítjük a komponens detektálását
    this.changeDetectorRef.detectChanges(); 
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLoggedIn', 'false');
    }
    this.isLoggedIn = false;
    window.location.href = '/login';
  }
}
