import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importálva a SnackBar-t
import { PricePipe } from "../../pipes/price.pipe";
import { RouterModule } from '@angular/router';  // Importáld a RouterModule-t
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, PricePipe, RouterModule, FormsModule],  
  template: `
    <div class="product-list">
      <h1>Termékek</h1>
      <div class="grid-container">
        <mat-card *ngFor="let product of products" class="product-card">
          <mat-card-title>{{ product.name }}</mat-card-title>
          <mat-card-content>
            <p>Kategória: {{ product.category }}</p>
            <p>Ár: {{ product.price | price }}</p>
            <label for="quantity">Mennyiség:</label>
            <input type="number" id="quantity" [(ngModel)]="product.selectedQuantity" min="1" />
          </mat-card-content>
          <button mat-raised-button color="accent" (click)="addToCart(product)">Kosárba</button>
        </mat-card>
      </div>
      <button class="kosarMegtekintes" mat-raised-button color="primary" [routerLink]="'/cart'">Kosár megtekintése</button>
    </div>
  `,
  styles: [
    '.grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }',
    '.product-card { padding: 16px; }',
    
    'input[type="number"] { width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; margin-top: 8px; transition: border-color 0.3s ease; }',
    'input[type="number"]:focus { border-color: #3f51b5; outline: none; }',
    
    'label { display: block; font-weight: bold; margin-bottom: 5px; color: #333; }',
  
    '.product-card mat-card-content { display: flex; flex-direction: column; }',
    
    '.product-card mat-card-content input { margin-bottom: 10px; }',
  
    '.product-list { padding: 5px; margin: 10px; box-sizing: border-box; }',

    '.kosarMegtekintes {margin: 20px}',
  
    'button[routerLink] { margin-bottom: 100px; }',
  
    '.product-list .product-card button { margin: 10px; }'
  ]
})
export class ProductListComponent implements OnInit {
  products = [
    { id: 1, name: 'Fékbetét', price: 12000, category: 'Fékek', selectedQuantity: 1 },
    { id: 2, name: 'Olajszűrő', price: 4500, category: 'Szűrők', selectedQuantity: 1 },
    { id: 3, name: 'Gumiabroncs', price: 25000, category: 'Kerekek', selectedQuantity: 1 },
    { id: 4, name: 'Akkumulátor', price: 18000, category: 'Elektromos rendszerek', selectedQuantity: 1 },
    { id: 5, name: 'Légszűrő', price: 3500, category: 'Szűrők', selectedQuantity: 1 },
    { id: 6, name: 'Kormányösszekötő', price: 8000, category: 'Kormányzás', selectedQuantity: 1 },
  ];

  cart: { id: number, name: string, price: number, category: string, quantity: number }[] = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    // Ellenőrizzük, hogy van-e kosár az localStorage-ban és ha igen, betöltjük
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  addToCart(product: any) {
    // Ellenőrizzük, hogy a termék már a kosárban van-e
    const existingProduct = this.cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      // Ha már a kosárban van, növeljük a mennyiséget
      existingProduct.quantity += product.selectedQuantity;
    } else {
      // Ha a termék még nincs a kosárban, hozzáadjuk
      this.cart.push({ ...product, quantity: product.selectedQuantity });
    }
    
    // Mentjük a kosár tartalmát a helyi tárolóba
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Megjelenítjük az értesítést
    this.snackBar.open(`${product.name} hozzáadva a kosárhoz.`, 'OK', { duration: 3000 });
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}