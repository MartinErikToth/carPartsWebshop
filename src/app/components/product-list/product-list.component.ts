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
         <img [src]="product.image" alt="{{ product.name }}" />
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
    '.product-list { padding: 30px; margin: 10px; box-sizing: border-box; }',
    '.product-list h1 { text-align: center; margin-bottom: 20px; font-size: 2rem; color: #333; }',
    '.grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }',
    '.product-card { padding: 20px; border-radius: 8px; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease; }',
    '.product-card:hover { transform: scale(1.05); }',
    '.product-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px; }',
    '.product-card mat-card-content { display: flex; flex-direction: column; }',
    '.product-card mat-card-content p { margin: 10px 0; }',
    'input[type="number"] { width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; margin-top: 8px; }',
    'input[type="number"]:focus { border-color: #3f51b5; outline: none; }',
    'label { display: block; font-weight: bold; margin-bottom: 5px; color: #333; }',
    '.kosarMegtekintes { margin: 30px auto; display: block; }',
    'button[routerLink] { margin-bottom: 100px; }',
    '.product-card button { margin-top: 15px; }',
    '.product-list .product-card button { margin-top: 10px; }'
  ]
})
export class ProductListComponent implements OnInit {
  products = [
    { id: 1, name: 'Fékbetét', price: 12000, category: 'Fékek', selectedQuantity: 1, image: 'assets/fekbetet.png' },
    { id: 2, name: 'Olajszűrő', price: 4500, category: 'Szűrők', selectedQuantity: 1, image: 'assets/fekbetet.png' },
    { id: 3, name: 'Gumiabroncs', price: 25000, category: 'Kerekek', selectedQuantity: 1, image: 'assets/fekbetet.png' },
    { id: 4, name: 'Akkumulátor', price: 18000, category: 'E-rendszerek', selectedQuantity: 1, image: 'assets/fekbetet.png' },
    { id: 5, name: 'Légszűrő', price: 3500, category: 'Szűrők', selectedQuantity: 1, image: 'assets/fekbetet.png' },
    { id: 6, name: 'Kormányösszekötő', price: 8000, category: 'Kormányzás', selectedQuantity: 1, image: 'assets/fekbetet.png' },
  ];

  cart: { id: number, name: string, price: number, category: string, quantity: number, image: string}[] = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    if (this.isLocalStorageAvailable()) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += product.selectedQuantity;
    } else {
      // A termékhez hozzáadjuk a képet is a kosárhoz
      this.cart.push({ 
        ...product, 
        quantity: product.selectedQuantity,
        image: product.image // biztosítjuk, hogy a kép is bekerüljön
      });
    }
  
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  
    this.snackBar.open(`${product.name} hozzáadva a kosárhoz.`, 'OK', { duration: 3000 });
  }
  
  


  private isLocalStorageAvailable(): boolean {
    try {
      // Ellenőrizzük, hogy a 'window' és a 'localStorage' elérhető-e
      if (typeof window !== 'undefined' && window.localStorage) {
        const testKey = '__test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        return true;
      }
    } catch (e) {
      console.warn('localStorage nem érhető el:', e);
    }
    return false;
  }
}
