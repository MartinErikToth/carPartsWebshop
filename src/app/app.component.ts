import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterModule],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <span class="spacer"></span>
      <a mat-button routerLink="/" class="nav-button">Főoldal</a>
      <a mat-button routerLink="/products" class="nav-button">Termékek</a>
      <a mat-button routerLink="/cart" class="nav-button">Kosár</a>
      <a mat-button routerLink="/admin" class="nav-button">Admin</a>
      <span class="spacer"></span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      mat-toolbar {
        display: flex;
        justify-content: center;
        padding: 0 20px;
      }
      .nav-button {
        text-decoration: none;
        color: black;
        margin: 0 16px;
        padding: 10px 16px;
        font-weight: bold;
        border-radius: 4px;
        transition: all 0.3s ease; 
      }
      .nav-button:hover {
        background-color: rgba(255, 255, 255, 0.2); /* Finom háttérszín */
        color: #ff4081; /* A szöveg színe a hover effektusra */
        transform: scale(1.1); /* Finom növelés */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Enyhe árnyék */
      }
      .nav-button:active {
        transform: scale(1); /* Kattintáskor visszaugrik a normál méretre */
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Erősebb árnyék kattintáskor */
      }
    `,
  ],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
