import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PricePipe } from "../../pipes/price.pipe";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, PricePipe, RouterModule, FormsModule],  
  template: `
    <div class="product-list">
      <div class="header-container">
        <h1>Termékek</h1>
        <input type="text" [(ngModel)]="searchTerm" placeholder="Keresés..." class="search-box">
        <select [(ngModel)]="selectedCategory" class="category-filter">
          <option value="">Összes</option>
          <option *ngFor="let category of uniqueCategories" [value]="category">{{ category }}</option>
        </select>
      </div>
      
      <div class="grid-container">
        <mat-card *ngFor="let product of filteredProducts()" class="product-card">
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
      <div *ngIf="filteredProducts().length === 0" class="no-results">
        <p>Nincs találat a keresési feltételek alapján.</p>
      </div>
      <button class="kosarMegtekintes" mat-raised-button color="primary" [routerLink]="'/cart'">Kosár megtekintése</button>
    </div>
  `,styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = '';

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

  get uniqueCategories(): string[] {
    return [...new Set(this.products.map(product => product.category))];
  }

  filteredProducts() {
    return this.products.filter(product =>
      (product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedCategory === '' || product.category === this.selectedCategory)
    );
  }


  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += product.selectedQuantity;
    } else {
      this.cart.push({ 
        ...product, 
        quantity: product.selectedQuantity,
        image: product.image
      });
    }
  
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  
    this.snackBar.open(`${product.name} hozzáadva a kosárhoz.`, 'OK', { duration: 3000 });
  }

  private isLocalStorageAvailable(): boolean {
    try {
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
