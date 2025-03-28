import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container">
    <h1>Kosár</h1>

    <div class="cart-grid" *ngIf="cart.length > 0">
      <div *ngFor="let item of cart; let i = index" class="cart-item">
        <div class="cart-card">
          <h2 class="item-name">{{ item.name }}</h2>
          <img *ngIf="item.image" [src]="item.image" alt="{{ item.name }}" class="cart-item-image" />
          <p class="item-category">Kategória: {{ item.category }}</p>
          <p class="item-price">Ár: {{ item.price | currency: 'HUF '}}</p>
          <p class="item-quantity">Mennyiség: {{ item.quantity}}</p>
          <p class="item-total-price">Összesen: {{ (item.price * item.quantity) | currency: 'HUF ' }}</p>
          <button class="remove-button" (click)="removeFromCart(i)">Eltávolítás</button>
        </div>
      </div>
    </div>
    <div *ngIf="cart.length === 0" class="empty-cart">
      <p>A kosár üres!</p>
      <button class="back-to-products" (click)="goToProducts()">Vissza a termékekhez</button>
    </div>


    <div *ngIf="cart.length > 0" class="cart-actions">
      <button class="checkout-button" (click)="proceedToCheckout()">Fizetés</button>
      <button class="clear-cart-button" (click)="clearCart()">Kosár törlése</button>
    </div>
</div>
  `,
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: { id: number; name: string; price: number; category: string; quantity: number; image: string }[] = [];

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  private loadCart(): void {
    if (this.isLocalStorageAvailable()) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
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

  clearCart() {
    this.cart = [];
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('cart');
    }
    this.snackBar.open('A kosár törölve lett.', 'OK', { duration: 3000 });
  }

  removeFromCart(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
    } else {
      this.cart.splice(index, 1);
    }

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    this.snackBar.open('A termék módosítva a kosárban.', 'OK', { duration: 3000 });
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    this.snackBar.open(`${product.name} hozzáadva a kosárhoz.`, 'OK', { duration: 3000 });
  }

  proceedToCheckout() {
    this.snackBar.open('Fizetés folyamatban...', 'OK', { duration: 3000 });
    this.router.navigate(['/checkout']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
