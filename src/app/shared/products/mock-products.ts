import { v4 as uuidv4 } from 'uuid';

export const PRODUCTS = [
  { id: uuidv4(), name: 'Fékbetét', price: 12000, category: 'Fékek', selectedQuantity: 1, image: 'assets/fekbetet.png' },
  { id: uuidv4(), name: 'Olajszűrő', price: 4500, category: 'Szűrők', selectedQuantity: 1, image: 'assets/olajszurok.jpg' },
  { id: uuidv4(), name: 'Gumiabroncs', price: 25000, category: 'Kerekek', selectedQuantity: 1, image: 'assets/gumiabroncs.jpg' },
  { id: uuidv4(), name: 'Akkumulátor', price: 18000, category: 'E-rendszerek', selectedQuantity: 1, image: 'assets/aksi.jpg' },
  { id: uuidv4(), name: 'Légszűrő', price: 3500, category: 'Szűrők', selectedQuantity: 1, image: 'assets/levegoszuro.jpg' },
  { id: uuidv4(), name: 'Kormányösszekötő', price: 8000, category: 'Kormányzás', selectedQuantity: 1, image: 'assets/kormanyosszekoto.jpg' },
];
