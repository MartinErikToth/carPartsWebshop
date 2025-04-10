import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { PricePipe} from "../../shared/pipes/price.pipe";
import { PRODUCTS } from '../../shared/products/mock-products';
import { CATEGORIES } from '../../shared/categories/mock-categories';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, PricePipe, RouterModule, FormsModule],  
  template: ``,
  templateUrl: "./product-list.component.html",
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = '';
  
  products = PRODUCTS;
  categories = CATEGORIES;

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
      // Ha már létezik a termék a kosárban, növeljük a mennyiséget
      existingProduct.quantity += product.selectedQuantity;
    } else {
      // Ha még nincs a kosárban, hozzáadjuk
      this.cart.push({ 
        ...product, 
        quantity: product.selectedQuantity, 
        image: product.image
      });
    }
  
    // A termék mennyiségét frissítjük a terméklistában is
    const productInList = this.products.find(p => p.id === product.id);
    if (productInList) {
      productInList.selectedQuantity = product.selectedQuantity;
    }
  
    // Mentjük a kosarat localStorage-ba
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  
    // Üzenet megjelenítése
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
