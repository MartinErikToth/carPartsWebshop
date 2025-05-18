import { Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, orderBy, limit, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.user$ = user(this.auth);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  async getLegdragabbTermek(): Promise<any | null> {
    const termekekRef = collection(this.firestore, 'alkatreszek');
    const q = query(termekekRef, orderBy('ar', 'desc'), limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    } else {
      return null;
    }
  }

  async getLegolcsobbTermek(): Promise<any | null> {
  const termekekRef = collection(this.firestore, 'alkatreszek');
  const q = query(termekekRef, orderBy('ar', 'asc'), limit(1));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return snapshot.docs[0].data();
  } else {
    return null;
  }
}

  async getKettoLegdragabbTermek(): Promise<any[]> {
  const termekekRef = collection(this.firestore, 'alkatreszek');
  const q = query(termekekRef, orderBy('ar', 'desc'), limit(2));
  const snapshot = await getDocs(q);

  const result: any[] = [];
  snapshot.forEach(doc => result.push(doc.data()));
  return result;
}


  getMotorEsFekTermekek(): Promise<any[]> {
    const termekekRef = collection(this.firestore, 'alkatreszek');
    const q = query(termekekRef, where('kategoria', 'in', ['motor', 'fek']));
    return getDocs(q).then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );
  }
}
