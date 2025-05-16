import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppComponent } from './app/app.component';
import { environment } from './app/enviroment';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes),

    // Firebase inicializálása
    provideFirebaseApp(() => initializeApp(environment)),

    // 🔥 Ezeket NE HAGYD KI:
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
  ]
}).catch(err => console.error(err));
