import { Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, orderBy, limit, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { map } from 'rxjs/operators';
import { endAt, startAt } from 'firebase/firestore';

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
    const q = query(termekekRef, 
      where('kategoria', '==', 'kipufogo'),
      orderBy('ar', 'asc'), 
      where('ar', '>', 30000), 
      limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    } else {
      return null;
    }
  }

  async getLegolcsobbTermek(): Promise<any | null> {
  const termekekRef = collection(this.firestore, 'alkatreszek');
  const q = query(
    termekekRef,
    where('ar', '>', 1),
    orderBy('nev'),               
    orderBy('ar', 'asc'),         
    startAt('t'),
    endAt('t\uf8ff'),
    limit(1)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty ? snapshot.docs[0].data() : null;
}

  async getDragaTermekek(): Promise<any[]> {
  const termekekRef = collection(this.firestore, 'alkatreszek');
  const dragaQuery = query(
    termekekRef,
    where('ar', '>', 1000),
    where('kategoria', '==', 'fek'),
    orderBy('ar', 'asc')
  );
  const snapshot = await getDocs(dragaQuery);
  return snapshot.docs.map(doc => doc.data());
}


  getMotorEsFekTermekek(): Promise<any[]> {
  const termekekRef = collection(this.firestore, 'alkatreszek');
  const q = query(
    termekekRef,
    where('kategoria', 'in', ['motor', 'fek']),
    where('ar', '>', 5000),
    orderBy('ar', 'asc')
  );
  return getDocs(q).then(snapshot =>
    snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  );
}
}
