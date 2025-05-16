import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { DiscountPricePipe } from '../../shared/pipes/discountprice.pipe';
import { Product } from '../../shared/services/ProductService';
import { CartItem } from '../../shared/services/ProductService';

import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';

export interface Products {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent{
  private firestore = inject(Firestore); // csak itt!
  private storage = inject(Storage);     // csak itt!
  private snackBar = inject(MatSnackBar);
  private auth = inject(Auth);

  alkatreszek: any[] = [];
  nev = '';
  kategoria = '';
  ar: number | null = null;
  kepUrl: string = '';
  selectedFile: File | null = null;
  szerkesztesId: string | null = null;

  constructor() {
    this.getAlkatreszek();
  }
  addToCart(alk: any) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    const existingProduct = cart.find((item: any) => item.id === alk.id);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: alk.id,
        name: alk.nev,
        price: alk.ar,
        originalPrice: alk.ar, 
        category: alk.kategoria,
        quantity: 1,
        image: alk.kepUrl
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${alk.nev} hozzáadva a kosárhoz.`);
  }

  async mentes(): Promise<void> {
    const colRef = collection(this.firestore, 'alkatreszek');
    if (this.szerkesztesId) {
      const docRef = doc(this.firestore, 'alkatreszek', this.szerkesztesId);
      await updateDoc(docRef, {
        nev: this.nev,
        kategoria: this.kategoria,
        ar: this.ar,
        kepUrl: this.kepUrl
      });
    } else {
      await addDoc(colRef, {
        nev: this.nev,
        kategoria: this.kategoria,
        ar: this.ar,
        kepUrl: this.kepUrl
      });
    }
    this.resetForm();
  }

  getAlkatreszek(): void {
    const colRef = collection(this.firestore, 'alkatreszek');
    collectionData(colRef, { idField: 'id' }).subscribe(data => {
      this.alkatreszek = data;
    });
  }

  async torles(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'alkatreszek', id);
    await deleteDoc(docRef);
  }

  szerkeszt(alkatresz: any): void {
    this.nev = alkatresz.nev;
    this.kategoria = alkatresz.kategoria;
    this.ar = alkatresz.ar;
    this.kepUrl = alkatresz.kepUrl;
    this.szerkesztesId = alkatresz.id;
  }

  resetForm(): void {
    this.nev = '';
    this.kategoria = '';
    this.ar = null;
    this.kepUrl = '';
    this.selectedFile = null;
    this.szerkesztesId = null;
  }
}