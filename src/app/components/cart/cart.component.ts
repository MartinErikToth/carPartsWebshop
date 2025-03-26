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

  <div *ngIf="cart.length > 0; else emptyCart" class="cart-grid">
    <div class="cart-item" *ngFor="let item of cart; let i = index">
      <div class="cart-card">
        <h2 class="item-name">{{ item.name }}</h2>
        <p class="item-category">Kategória: {{ item.category }}</p>
        <p class="item-price">Ár: {{ item.price + " HUF"}}</p>
        <p class="item-quantity">Mennyiség: {{ item.quantity }}</p>
        <p class="item-total-price">Összesen: {{ (item.price * item.quantity) | currency: 'HUF' }}</p>
        <button class="remove-button" (click)="removeFromCart(i)">Eltávolítás</button>
      </div>
    </div>
  </div>

  <div *ngIf="cart.length > 0" class="cart-actions">
    <button class="checkout-button" (click)="proceedToCheckout()">Fizetés</button>
    <button class="clear-cart-button" (click)="clearCart()">Kosár törlése</button>
  </div>

  <ng-template #emptyCart>
    <div class="empty-cart">
      <p>A kosár üres!</p>
      <button class="back-to-products" (click)="goToProducts()">Vissza a termékekhez</button>
    </div>
  </ng-template>
</div>
  `,
  styles: [
    `
      .cart-container {
        text-align: center;
        padding: 20px;
      }

      h1 {
        font-size: 2rem;
        margin-bottom: 20px;
      }

      .cart-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* 4 oszlopos elrendezés */
        gap: 20px;
        padding: 20px;
      }

      .cart-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        background-color: #f9f9f9;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .cart-card:hover {
        transform: translateY(-5px);
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
      }

      .item-name {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      .item-category,
      .item-price,
      .item-quantity {
        font-size: 1rem;
        margin-bottom: 10px;
        color: #555;
      }

      .remove-button {
        background-color: #e63946;
        color: #fff;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.3s;
      }

      .remove-button:hover {
        background-color: #d62828;
      }

      .cart-actions {
        margin-top: 30px;
      }

      .checkout-button,
      .clear-cart-button {
        background-color: #0077b6;
        color: #fff;
        border: none;
        padding: 15px 20px;
        border-radius: 5px;
        font-size: 1rem;
        margin: 0 10px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .checkout-button:hover {
        background-color: #005f89;
      }

      .clear-cart-button {
        background-color: #e63946;
      }

      .clear-cart-button:hover {
        background-color: #d62828;
      }

      .empty-cart {
        text-align: center;
        margin-top: 30px;
      }

      .back-to-products {
        background-color: #0077b6;
        color: #fff;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
      }

      .back-to-products:hover {
        background-color: #005f89;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  cart: { id: number; name: string; price: number; category: string; quantity: number }[] = [];

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
      // Ha már létezik, növeljük a mennyiséget
      existingProduct.quantity += 1;
    } else {
      // Ha még nem létezik, hozzáadjuk újként
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
