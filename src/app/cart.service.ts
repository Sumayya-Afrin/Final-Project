import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getCartItems(): import('./app.component').ICraft[] {
    throw new Error('Method not implemented.');
  }
  gettingCart(): any {
    throw new Error('Method not implemented.');
  }

  constructor() {}
}
