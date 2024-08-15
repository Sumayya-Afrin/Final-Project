import { Injectable } from '@angular/core';
import { ICraft } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class CraftService {
  constructor() {}

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
}
