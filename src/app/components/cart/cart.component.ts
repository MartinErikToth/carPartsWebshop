import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: { id: number; name: string; price: number; originalPrice: number; category: string; quantity: number; image: string }[] = [];
  @Output() clearCartFeedback = new EventEmitter<void>();
  @Output() updateCart = new EventEmitter<any[]>();

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  updateCart2() {
    this.updateCart.emit(this.cart);
  }

  handleUpdateCart(updatedCart: any[]) {
  console.log('Frissített kosár:', updatedCart);
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
    this.clearCartFeedback.emit();
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

  handleClearCart() {
    console.log("A kosár törölve lett.");
  }
}
