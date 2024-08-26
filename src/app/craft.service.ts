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
  isToken: boolean = false;

  constructor(private http: HttpClient) {}

  async addCraftSer(newCraft: NewCraft) {
    return await fetch(`${API}/crafts`, {
      method: 'POST',
      body: JSON.stringify(newCraft),
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token') || '',
      },
    }).then((res) => res.json());
  }

  async getAllCrafts(): Promise<ICraft[]> {
    return await fetch(`${API}/crafts`).then((res) => res.json());
  }

  async getCraftByIdP(id: string): Promise<ICraft> {
    return await fetch(`${API}/crafts/${id}`).then((res) => res.json());
  }

  async deleteCraftById(craft: ICraft) {
    return await fetch(`${API}/crafts/del/${craft.craftId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': localStorage.getItem('token') || '',
      },
    }).then((res) => res.json());
  }

  async updateCraftsInfo(updatedCraft: ICraft) {
    console.log('updating...');
    return await fetch(`${API}/crafts/${updatedCraft.craftId}`, {
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
