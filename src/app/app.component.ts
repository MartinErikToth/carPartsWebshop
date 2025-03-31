import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterModule],
  template: `
    <div class="home">
      <mat-toolbar color="primary" class="navbar">
        <span class="logo">Autoalkatrész Webshop</span>
        <span class="spacer"></span>
        <nav>
          <button mat-button routerLink="/" class="nav-button">Főoldal</button>
          <button mat-button routerLink="/products" class="nav-button">Termékek</button>
          <button mat-button routerLink="/cart" class="nav-button">Kosár</button>
          <button mat-button routerLink="/admin" class="nav-button">Admin</button>
        </nav>
      </mat-toolbar>
    </div>  
    <router-outlet></router-outlet>
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
  `, styleUrls: ['./app.component.css'],
})
export class AppComponent {}
