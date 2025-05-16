import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../shared/services/auth.service';

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
  private firestore = inject(Firestore); 
  private storage = inject(Storage);     
  private snackBar = inject(MatSnackBar);
  private auth = inject(Auth);

  isLoggedIn = false;

  alkatreszek: any[] = [];
  nev = '';
  kategoria = '';
  ar: number | null = null;
  kepUrl: string = '';
  selectedFile: File | null = null;
  szerkesztesId: string | null = null;

  constructor(private authService: AuthService) {
    this.getAlkatreszek();
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
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