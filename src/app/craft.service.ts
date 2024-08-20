import { Injectable } from '@angular/core';
import { ICraft } from './app.component';
import { NewCraft } from '../../craft';
import { API } from '../../global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CraftService {
  constructor(private http: HttpClient) {}

  addCraftSer(newCraft: NewCraft) {
    return fetch(`${API}/crafts`, {
      method: 'POST',
      body: JSON.stringify(newCraft),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  getAllCrafts(): Promise<ICraft[]> {
    return fetch(`${API}/crafts`).then((res) => res.json());
  }

  getCraftByIdP(id: string): Promise<ICraft> {
    return fetch(`${API}/crafts/${id}`).then((res) => res.json());
  }

  deleteCraftById(craft: any) {
    return fetch(`${API}/crafts/${craft.id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  }

  updateCraftsInfo(updatedCraft: ICraft) {
    console.log('updating...');
    return fetch(`${API}/crafts/${updatedCraft.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCraft),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  searchCraft(searchTerm: string): any {
    return this.http.get<ICraft[]>(
      `https://66bd922a74dfc195586ce90a.mockapi.io/crafts?search=${searchTerm}`
    );
  }
}
