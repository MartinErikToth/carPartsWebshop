import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountPricePipe } from '../../shared/pipes/discountprice.pipe';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, DiscountPricePipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[] = [];

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('cart')) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => {
      const discountPercent = 10;
      const discountedPrice = item.price - (item.price * discountPercent / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: CartItem) {
    this.cart = this.cart.filter(cartItem => cartItem !== item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  confirmPayment() {
      alert('Fizetés sikeres! Köszönjük a vásárlást!');
      localStorage.removeItem('cart');
      this.cart = [];
  }
}