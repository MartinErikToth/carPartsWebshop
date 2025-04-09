import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isHomePage = false;

  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    // Figyelünk a route változásokra
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkIfHomePage();
      this.checkLoginStatus();  // Frissítjük az isLoggedIn állapotot
    });

    // Inicializáljuk az isHomePage állapotot
    this.checkIfHomePage();
  }

  // Ellenőrizzük a bejelentkezett státuszt
  checkLoginStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }

    // A változtatások észlelése az Angular számára
    this.changeDetectorRef.detectChanges();
  }

  // Ellenőrizzük, hogy a felhasználó a főoldalon van-e
  checkIfHomePage(): void {
    this.isHomePage = this.router.url === '/' || this.router.url === '/home';
  }

  // Kijelentkezés
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLoggedIn', 'false');
    }
    this.isLoggedIn = false;
    this.changeDetectorRef.detectChanges(); // Kényszerített frissítés
    window.location.href = '/login'; // Átirányítás a bejelentkező oldalra
  }

  // Bejelentkezés után frissítés
  login(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLoggedIn', 'true');
    }
    this.isLoggedIn = true;
    this.changeDetectorRef.detectChanges(); // Kényszerített frissítés
    this.router.navigate(['/profile']); // Átirányítás a profil oldalra
  }
}
