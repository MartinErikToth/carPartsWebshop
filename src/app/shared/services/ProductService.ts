import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id?: string;
  name: string;
  price: number;
  originalPrice: number,
  category: string;
  image: string;
  selectedQuantity?: number;
}

export interface CartItem extends Product {
    quantity: number;
  }

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
  }

  async addToCart(userId: string, product: Product, quantity: number = 1): Promise<void> {
    const cartItemDocRef = doc(this.firestore, `carts/${userId}/items/${product.id}`);
    const cartItemSnap = await getDoc(cartItemDocRef);

    if (cartItemSnap.exists()) {
      const data = cartItemSnap.data() as { quantity: number };
      const currentQuantity = data['quantity'] ?? 0;
      await updateDoc(cartItemDocRef, { quantity: currentQuantity + quantity });
    } else {
      await setDoc(cartItemDocRef, {
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        quantity: quantity 
      });
    }
  }

  getCart(userId: string): Observable<any[]> {
    const cartItemsRef = collection(this.firestore, `carts/${userId}/items`);
    return collectionData(cartItemsRef) as Observable<any[]>;
  }
}
