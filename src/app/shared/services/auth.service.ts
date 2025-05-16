import { Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { getAuth, User } from 'firebase/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
    this.user$.subscribe(user => {
      this.currentUserSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUserSubject.asObservable().pipe(
      map(user => !!user)
    );
  }

  logout(): Promise<void> {
    const auth = getAuth();
    return auth.signOut();
  }
}
