import { v4 as uuidv4 } from 'uuid';

export const PRODUCTS = [
  { 
    id: uuidv4(), 
    name: 'Fékbetét', 
    price: 12000, 
    originalPrice: 12000,  // Eredeti ár hozzáadása
    category: 'Fékek', 
    selectedQuantity: 1, 
    image: 'assets/fekbetet.png' 
  },
  { 
    id: uuidv4(), 
    name: 'Olajszűrő', 
    price: 4500, 
    originalPrice: 4500,  // Eredeti ár hozzáadása
    category: 'Szűrők', 
    selectedQuantity: 1, 
    image: 'assets/olajszurok.jpg' 
  },
  { 
    id: uuidv4(), 
    name: 'Gumiabroncs', 
    price: 25000, 
    originalPrice: 25000,  // Eredeti ár hozzáadása
    category: 'Kerekek', 
    selectedQuantity: 1, 
    image: 'assets/gumiabroncs.jpg' 
  },
  { 
    id: uuidv4(), 
    name: 'Akkumulátor', 
    price: 18000, 
    originalPrice: 18000,  // Eredeti ár hozzáadása
    category: 'E-rendszerek', 
    selectedQuantity: 1, 
    image: 'assets/aksi.jpg' 
  },
  { 
    id: uuidv4(), 
    name: 'Légszűrő', 
    price: 3500, 
    originalPrice: 3500,  // Eredeti ár hozzáadása
    category: 'Szűrők', 
    selectedQuantity: 1, 
    image: 'assets/levegoszuro.jpg' 
  },
  { 
    id: uuidv4(), 
    name: 'Kormányösszekötő', 
    price: 8000, 
    originalPrice: 8000,  // Eredeti ár hozzáadása
    category: 'Kormányzás', 
    selectedQuantity: 1, 
    image: 'assets/kormanyosszekoto.jpg' 
  },
];
