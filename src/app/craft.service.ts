import { Injectable } from '@angular/core';
import { ICraft } from './app.component';
import { NewCraft } from '../../craft';
import { API } from '../../global';

@Injectable({
  providedIn: 'root',
})
export class CraftService {
  constructor() {}

  addCraftSer(newCraft: NewCraft) {
    return fetch(`${API}`, {
      method: 'POST',
      body: JSON.stringify(newCraft),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  getAllCrafts(): Promise<ICraft[]> {
    return fetch(`${API}`).then((res) => res.json());
  }

  getCraftByIdP(id: string): Promise<ICraft> {
    return fetch(`${API}/${id}`).then((res) => res.json());
  }

  deleteCraftById(craft: any) {
    return fetch(`${API}/${craft.id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  }

  updateCraftsInfo(updatedCraft: ICraft) {
    console.log('updating...');
    return fetch(`${API}/${updatedCraft.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCraft),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
