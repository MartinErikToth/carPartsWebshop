import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-container">
      <h1>Fizetés</h1>

      <div class="order-summary">
        <h2>Rendelés összegzése</h2>
        <table class="order-table">
          <thead>
            <tr>
              <th>Termék</th>
              <th>Mennyiség</th>
              <th>Ár</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of cart">
              <td>{{ item.name }}</td>
              <td>{{ item.quantity}} </td>
              <td>{{ item.price * item.quantity| currency: 'HUF ' }}</td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <h3>Teljes összeg: {{ calculateTotal() | currency: 'HUF ' }}</h3>
        </div>
      </div>

      <div class="payment-form">
        <h2>Fizetési adatok</h2>
        <form (ngSubmit)="completePayment()">
          <label for="cardNumber">Kártyaszám</label>
          <input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            [(ngModel)]="paymentDetails.cardNumber"
            name="cardNumber"
            required
            maxlength="19"
          />

          <label for="cardHolder">Kártyabirtokos neve</label>
          <input
            id="cardHolder"
            type="text"
            placeholder="Kártyabirtokos neve"
            [(ngModel)]="paymentDetails.cardHolder"
            name="cardHolder"
            required
          />

          <label for="expiry">Lejárati dátum</label>
          <input
            id="expiry"
            type="text"
            placeholder="MM/YY"
            [(ngModel)]="paymentDetails.expiry"
            name="expiry"
            required
            maxlength="5"
          />

          <label for="cvv">CVV</label>
          <input
            id="cvv"
            type="password"
            placeholder="123"
            [(ngModel)]="paymentDetails.cvv"
            name="cvv"
            required
            maxlength="3"
          />

          <button type="submit" class="payment-button">Fizetés befejezése</button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .checkout-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      h1 {
        font-size: 2rem;
        margin-bottom: 20px;
      }

      .order-summary {
        margin-bottom: 30px;
      }

      .order-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      .order-table th,
      .order-table td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
      }

      .order-table th {
        background-color: #f4f4f4;
      }

      .total {
        font-size: 1.2rem;
        margin-top: 10px;
      }

      .payment-form {
        margin-top: 30px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      label {
        font-weight: bold;
        text-align: left;
      }

      input {
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 5px;
      }

      .payment-button {
        background-color: #0077b6;
        color: #fff;
        border: none;
        padding: 15px;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .payment-button:hover {
        background-color: #005f89;
      }
    `,
  ],
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[] = [];
  paymentDetails = {
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  };

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('cart')) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  completePayment() {
    if (
      !this.paymentDetails.cardNumber ||
      !this.paymentDetails.cardHolder ||
      !this.paymentDetails.expiry ||
      !this.paymentDetails.cvv
    ) {
      alert('Kérjük, töltse ki az összes mezőt!');
      return;
    }

    alert('Fizetés sikeres! Köszönjük a vásárlást!');
    localStorage.removeItem('cart');
    this.cart = [];
  }
}
