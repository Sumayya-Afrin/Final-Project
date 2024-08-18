import { Injectable } from '@angular/core';
import { ICraft } from './app.component';
import { NewCraft } from '../../craft';

@Injectable({
  providedIn: 'root',
})
export class CraftService {
  constructor() {}

  addCraftSer(newCraft: NewCraft) {
    return fetch(`https://66bd922a74dfc195586ce90a.mockapi.io/crafts`, {
      method: 'POST',
      body: JSON.stringify(newCraft),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  getAllCrafts(): Promise<ICraft[]> {
    return fetch('https://66bd922a74dfc195586ce90a.mockapi.io/crafts').then(
      (res) => res.json()
    );
  }

  getCraftByIdP(id: string): Promise<ICraft> {
    return fetch(
      `https://66bd922a74dfc195586ce90a.mockapi.io/crafts/${id}`
    ).then((res) => res.json());
  }

  deleteCraftById(craft: any) {
    return fetch(
      `https://66bd922a74dfc195586ce90a.mockapi.io/crafts/${craft.id}`,
      {
        method: 'DELETE',
      }
    ).then((res) => res.json());
  }

  updateCraftsInfo(updatedCraft: ICraft) {
    console.log('updating...');
    return fetch(
      `https://66bd922a74dfc195586ce90a.mockapi.io/crafts/${updatedCraft.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedCraft),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => res.json());
  }
}
