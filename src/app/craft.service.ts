import { Injectable } from '@angular/core';
import { ICraft } from './app.component';
import { NewCraft } from '../../craft';
import { API } from '../../global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CraftService {
  cart: Array<{ craft: ICraft; quantity: number }> = [];

  constructor(private http: HttpClient) {}

  addCraftSer(newCraft: NewCraft) {
    return fetch(`${API}/crafts`, {
      method: 'POST',
      body: JSON.stringify(newCraft),
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token') || '',
      },
    }).then((res) => res.json());
  }

  getAllCrafts(): Promise<ICraft[]> {
    return fetch(`${API}/crafts`).then((res) => res.json());
  }

  getCraftByIdP(id: string): Promise<ICraft> {
    return fetch(`${API}/crafts/${id}`).then((res) => res.json());
  }

  deleteCraftById(craft: ICraft) {
    return fetch(`${API}/crafts/del/${craft.craftId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token') || '',
      },
    }).then((res) => res.json());
  }

  updateCraftsInfo(updatedCraft: ICraft) {
    console.log('updating...');
    return fetch(`${API}/crafts/${updatedCraft.craftId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCraft),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') || '',
      },
    }).then((res) => res.json());
  }

  searchCraft(searchTerm: string) {
    return this.http.get(`${API}/crafts?search=${searchTerm}`);
  }

  addCraftP(craft: ICraft) {
    const item = this.cart.find((p) => p.craft.craftId === craft.craftId);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ craft, quantity: 1 });
    }
    console.log(this.cart);
  }

  getCartItems(): Array<{ craft: ICraft; quantity: number }> {
    return this.cart;
  }

  removeItem(craftId: number) {
    this.cart = this.cart.filter((item) => item.craft.craftId !== craftId);
  }
}
