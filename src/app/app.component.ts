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
  `,
  styles: [
    `
      .navbar {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
      }
      .logo{
        font-size: 1.5rem;
        font-weight: bold;
      }
      .nav-button {
        font-size: 1rem;
        font-weight: 500;
        text-transform: none;
        color: black;
        padding: 10px 20px;
        border: none;
        background: none;
        box-shadow: none;
        border-radius: 30px; /* Ellipszis forma */
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      .nav-button:hover {
        background-color: #d1e7ff; /* Hover háttérszín */
        color: #3f51b5; /* Hover szövegszín */
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Enyhe árnyék */
        cursor: pointer;
      }
      .nav-button:focus {
        outline: none;
      }
      .spacer {
        flex: 1;
      }
    `,
  ],
})
export class AppComponent {}
