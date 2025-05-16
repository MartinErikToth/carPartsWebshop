import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const environment = {
    production: false,
    apiKey: "AIzaSyDrJk390LVqqsfVNCB3vkXKSjpkP8qBpG0",
    authDomain: "autoalkatreszbolt-f69f7.firebaseapp.com",
    projectId: "autoalkatreszbolt-f69f7",
    storageBucket: "autoalkatreszbolt-f69f7.firebasestorage.app",
    messagingSenderId: "281758089175",
    appId: "1:281758089175:web:3aa7b06743bd34e1005592"
  };

const app = initializeApp(environment);

export const auth = getAuth(app);
  