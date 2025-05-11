import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './app/enviroment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // A route-okat külön fájlban kezelhetjük

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule), // BrowserAnimationsModule importálása
    provideRouter(routes), // A route-okat itt biztosítjuk
    provideFirebaseApp(() => initializeApp(environment)),  // Firebase inicializálása
    provideAuth(() => getAuth()),  // Firebase Authentication
  ],
}).catch((err) => console.error(err));
