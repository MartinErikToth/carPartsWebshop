import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';  // Importáld a RouterModule-t

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule],  // Hozzáadva a RouterModule
  template: `
    <div class="home">
      <h1>Üdvözlünk az Autoalkatrész Webshopban!</h1>
      <p>Vásárolj minőségi alkatrészeket autódhoz!</p>
      <button mat-raised-button color="primary" routerLink="/products">Termékek böngészése</button>
    </div>
  `,
  styles: ['.home { text-align: center; padding: 20px; }'],
})
export class HomeComponent {}
